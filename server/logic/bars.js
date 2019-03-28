const chalk = require('chalk')
const _ = require('lodash')

const colors = ['77, 5, 232']

const c = data => {
  let total = 0

  data.forEach(answer => {
    total += answer.count
  })

  return total
}

exports.update = data => {
  return new Promise((resolve, reject) => {
    let total = c(data.answers)

    let color = colors[Math.floor(Math.random() * colors.length)]

    let steps = 1 / data.answers.length
    data.answers = data.answers.map((item, index) => {
      return {
        ...item,
        color:
          item.count === 0
            ? `rgba(${color}, 0.1)`
            : `rgba(${color}, ${Math.round(steps * (index + 1) * 10) / 10})`,
        percent:
          item.count === 0 ? '0%' : Math.floor((item.count / total) * 100) + '%'
      }
    })

    data.answers = _.sortBy(data.answers, 'count').reverse()

    resolve(data)
  })
}

exports.count = data => {
  return c(data)
}
