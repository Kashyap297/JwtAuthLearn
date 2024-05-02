const { Router } = require('express')
const userController = require('../controllers/userController')

const userRouter = Router()

userRouter.post('/signup', userController.create)

module.exports = userRouter