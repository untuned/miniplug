const test = require('tape')
const miniplug = require('./mocks/mp')
const nock = require('nock')('https://plug.dj')

test('Retrieving a user', (t) => {
  t.plan(1)

  nock.get('/_/users/123456').reply(200, require('./mocks/users/123456.json'))

  miniplug().getUser(123456).then((user) => {
    t.equal(user.username, 'Username')
  }).catch((err) => {
    t.fail(err.message)
  })
})

test('Get the current user', (t) => {
  t.plan(1)

  nock.get('/_/users/me').reply(200, require('./mocks/users/me.json'))

  miniplug().getMe().then((user) => {
    t.equal(user.username, 'ReAnna')
  }).catch((err) => {
    t.fail(err.message)
  })
})