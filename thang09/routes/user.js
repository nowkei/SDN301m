import express from 'express'
import {body, validationResult} from 'express-validator'
import { userController } from '../controllers/index.js'

const userRouter = express.Router()

userRouter.get('/', async  (req, res) =>{
  userController.getAllUsers(req,res)
})

userRouter.get('/:id', async(req, res) =>{
    userController.getUserById(req,res)
})

userRouter.delete('/delete/:id', async(req, res) => {
    userController.deleteUserById(req, res)
})

userRouter.post('/register',
    body("email").isEmail().withMessage('Email invalid format.'),
    body("password").isLength({min:8}).withMessage('Password so short (>8)'),
    userController.register
)

userRouter.post('/login', 
    body("email").isEmail().withMessage('Email invalid format.'),
    body("password").isLength({min:5}).withMessage('Password so short'),
    userController.login
    )

userRouter.post('/refreshToken', async(req,res) => {
    userController.refreshToken(req,res)
})    

userRouter.put('/edit/:id', async(req, res) =>{
    userController.editUserById(req, res)
})

export default userRouter