// @ts-check

/* eslint-disable no-console */

const express = require('express')
const fs = require('fs')

const app = express()

const PORT = 5000

app.use('/', async (req, res, next) => {
  console.log('Middleware 1')

  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  const fileContent = await fs.promises.readFile('.gitignore')

  const requestedAt = new Date()
  // @ts-ignore
  req.requestedAt = requestedAt
  // @ts-ignore
  req.fileContent = fileContent
  next()
})

app.use((req, res) => {
  console.log('Middleware 2')
  // @ts-ignore
  res.send(`Requested at ${req.requestedAt}, ${req.fileContent}`)
})

app.listen(PORT, () => {
  console.log(`The Express server listening on port: ${PORT}`)
})
