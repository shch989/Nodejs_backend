// @ts-check

/* eslint-disable no-console */

const express = require('express')
const bodyParser = require('body-parser')

const userRouter = express.Router()

const app = express()
app.use(bodyParser.json())

app.set('views', 'src/views')
app.set('view engine', 'pug')

const PORT = 5000

userRouter.get('/', (req, res) => {
  res.send('User list')
})

const USERS = {
  55: {
    nickname: 'John',
  },
  66: {
    nickname: 'Moon',
  },
}

userRouter.param('id', (req, res, next, value) => {
  console.log(`id param: ${value}`)
  // @ts-ignore
  req.user = USERS[value]
  next()
})

// /users/55
userRouter.get('/:id', (req, res) => {
  const resMimeType = req.accepts(['json', 'html'])

  if (resMimeType === 'json') {
    // @ts-ignore
    res.send(req.user)
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      // @ts-ignore
      nickname: req.user.nickname,
    })
  }
})

userRouter.post('/', (req, res) => {
  // Register user
  res.send('User registration.')
})

userRouter.post('/:id/nickname', (req, res) => {
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname
  res.send(`User nickname updated ${nickname}`)
})

app.use('/users', userRouter)

app.get('/', (req, res) => {
  res.render('index', {
    message: 'Hello Pug!!!!!',
  })
})

app.listen(PORT, () => {
  console.log(`The Express server listening on port: ${PORT}`)
})
