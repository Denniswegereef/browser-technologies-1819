const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const _ = require('lodash')
exphbs.create()
const socket = require('socket.io')

let io

const db = require('./logic/database')
const format = require('./logic/format')
const bars = require('./logic/bars')
const sort = require('./logic/sort')

const chalk = require('chalk')

const port = 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

const text = {
  pollDefault: 'Poll optie'
}

app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
  })
)

app.use(
  session({
    secret: 'keyboardcat',
    name: 'voted-polls',
    voted: [],
    proxy: true,
    resave: true,
    saveUninitialized: true,
    maxAge: 3000000
  })
)
app.set('view engine', 'hbs')

app.set('views', __dirname + '/templates')

// ------

// INDEX
app.get('/', (req, res) => {
  res.render('index', {
    inputValue: [text.pollDefault, text.pollDefault, text.pollDefault],
    showRemove: true
  })
})

// Submit the form to the DB
app.post('/create-poll', (req, res) => {
  db.insert(format.data(req.body)).then(data => {
    res.redirect(`/result/${data._id}`)
  })
})

// Add a remove
app.post('/add-row', function(req, res) {
  res.render('index', {
    inputValue:
      typeof req.body.answers === 'string'
        ? [req.body.answers, text.pollDefault]
        : [...req.body.answers, text.pollDefault],
    showRemove: true
  })
})

// Remove a row
app.post('/remove-row', (req, res) => {
  const newRows = req.body.answers.slice(0, -1)

  res.render('index', {
    inputValue: newRows,
    showRemove: newRows.length > 1 ? true : false
  })
})

app.get('/all/sort-new', (req, res) => {
  sort.method('new', req).then(data => {
    res.render('all', {
      all: data,
      total: data.length
    })
  })
})

app.get('/all/sort-populair', (req, res) => {
  sort.method('populair', req).then(data => {
    res.render('all', {
      all: data,
      total: data.length
    })
  })
})

// ALL
app.get('/all', (req, res) => {
  sort.method('populair', req).then(data => {
    res.render('all', {
      all: data,
      total: data.length
    })
  })
})

// POLL
app.get('/poll/:id', (req, res) => {
  db.find(req.params.id).then(data => {
    if (req.session.voted && req.session.voted.includes(req.params.id)) {
      console.log(chalk.red('Already voted'))

      res.redirect(`/result/${req.params.id}`)
      return
    }

    res.render('poll', { data })
  })
})

// RESULTS
app.get('/result/:id', (req, res) => {
  db.find(req.params.id).then(async data => {
    res.render('result', { data: await bars.update(data) })
  })
})

// VOTE
app.post('/vote-poll/:id', (req, res) => {
  db.vote(req.params.id, req.body).then(data => {
    req.session.voted
      ? req.session.voted.push(req.params.id)
      : (req.session.voted = [req.params.id])

    db.find(req.params.id).then(async d => {
      let newData = await bars.update(d)

      res.render(
        'components/result-data',
        { id: req.session.voted, data: newData, layout: false },
        (err, html) => {
          io.sockets.emit('updateData', {
            html,
            params: req.params.id
          })
          res.redirect(`/poll/${req.params.id}`)
        }
      )
    })
  })
})

app.get('*', (req, res) => {
  res.redirect('/')
})

// start
const listen = app.listen(port, () => {
  console.log(chalk.magenta(`Currently listening on port ${port}`))
})

// Socket setup
io = socket(listen)
