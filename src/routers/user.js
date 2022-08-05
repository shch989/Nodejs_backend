// @ts-check

const express = require('express')

const router = express.Router()

const USERS = {
  55: {
    nickname: 'John',
  },
  66: {
    nickname: 'Moon',
  },
}
router.get('/', (req, res) => {
  res.send('User list')
})

router.param('id', async (req, res, next, value) => {
  try {
    console.log(`id param: ${value}`)
    // @ts-ignore
    const user = USERS[value]

    if (!user) {
      const err = new Error(`User ${value} not found`)
      // @ts-ignore
      err.statusCode = 404
      throw err
    }

    // @ts-ignore
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
})

// /users/55
router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
  // Register user
  res.send('User registration.')
})

router.post('/:id/nickname', (req, res) => {
  // @ts-ignore
  const { user } = req
  const { nickname } = req.body

  user.nickname = nickname
  res.send(`User nickname updated ${nickname}`)
})

module.exports = router
