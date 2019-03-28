const db = require('./database')
const _ = require('lodash')
const chalk = require('chalk')
const bars = require('./bars')

exports.method = async (method, req) => {
  let data = await db.all()

  // Add counts to data
  data = data.map(item => {
    return {
      ...item,
      amount: bars.count(item.answers),
      voted:
        req.session.voted && req.session.voted.includes(item._id.toString())
          ? true
          : false
    }
  })

  // Sort methods
  if (method === 'new') {
    return data.reverse()
  }

  if (method === 'populair') {
    return _.sortBy(data, 'amount').reverse()
  }
}
