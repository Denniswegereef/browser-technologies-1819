const mongo = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const ObjectId = require('mongodb').ObjectID
const chalk = require('chalk')

const config = {
  client: 'polls',
  collection: 'all-polls'
}

exports.insert = data => {
  return new Promise((resolve, reject) => {
    mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }

      const db = client.db(config.client)
      const collection = db.collection(config.collection)

      collection.insertOne(data, (err, result) => {
        console.log(chalk.blue('added to the database'))

        resolve(result.ops[0])
      })
    })
  })
}

exports.find = id => {
  return new Promise((resolve, reject) => {
    mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }

      const db = client.db(config.client)
      const collection = db.collection(config.collection)

      collection.findOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        }

        resolve(result)
      })
    })
  })
}

exports.all = () => {
  return new Promise((resolve, reject) => {
    mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }

      const db = client.db(config.client)
      const collection = db.collection(config.collection)

      collection
        .find()
        .toArray()
        .then(res => {
          resolve(res)
        })
    })
  })
}

exports.vote = async (id, index) => {
  return new Promise((resolve, reject) => {
    mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
      const db = client.db(config.client)
      const collection = db.collection(config.collection)

      collection.findOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        }

        let newData = result

        // Update count by one
        newData.answers[index['vote-answer']].count =
          result.answers[index['vote-answer']].count + 1

        collection.updateOne(
          { _id: ObjectId(id) },
          { $set: newData },
          (err, result) => {
            if (err) {
              console.error(err)
              reject(err)
              return
            }

            resolve(result)
          }
        )
      })
    })
  })
}
