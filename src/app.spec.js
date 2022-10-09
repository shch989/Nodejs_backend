/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-console */

const supertest = require('supertest')
const app = require('./app')

const request = supertest(app)

test('our first test', async () => {
  const result = await request.get('/users/55').accept('application/json')
  console.log(result.body)

  expect(result.body).toMatchObject({
    nickname: expect.any(String),
  })
})

test('retrieve user page', async () => {
  const result = await request.get('/users/55').accept('text/html')

  expect(result.text).toMatch(/^<html>.*<\/html>$/)
})

test('update nickname', async () => {
  const newNickName = 'semi'
  const res = await request
    .post('/users/55/nickname')
    .send({ nickname: newNickName })
  expect(res.status).toBe(200)

  const userResult = await request.get('/users/55').accept('application/json')
  expect(userResult.status).toBe(200)
  expect(userResult.body).toMatchObject({
    nickname: newNickName,
  })
})
