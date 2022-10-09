// @ts-check
/* eslint-disable no-console */

const app = require('./app')

const PORT = 5000

app.listen(PORT, () => {
  console.log(`The Express server listening on port: ${PORT}`)
})
