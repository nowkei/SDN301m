import express from 'express'
import {body, validationResult} from 'express-validator'
import { userController } from '../controllers/index.js'

const userRouter = express.Router()

userRouter.get('/', async(req, res) =>{
  
})

userRouter.get('/:id', async(req, res) =>{
    res.send("Get users by users id ")
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
    // ,async(req, res) =>{
    // // //debugger
    // // res.send("Login Users")
       
    // }
    )

userRouter.put('/edit', async(req, res) =>{
    res.send("Edit an User")
})

export default userRouter