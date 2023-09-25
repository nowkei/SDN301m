import express from 'express'
import {body, validationResult} from 'express-validator'
import { studentController } from '../controllers/index.js'

const studentRouter = express.Router()

studentRouter.get('/', studentController.getAllStudents) 

studentRouter.get('/:id', studentController.getStudentById) 

studentRouter.delete('/delete/:id', studentController.deleteStudentById)

studentRouter.post('/create', studentController.createNewStudent)

// studentRouter.post('/login', 
//     body("email").isEmail().withMessage('Email invalid format.'),
//     body("password").isLength({min:5}).withMessage('Password so short'),
//     userController.login
//     // ,async(req, res) =>{
//     // // //debugger
//     // // res.send("Login Users")
       
//     // }
//     )

//     studentRouter.put('/edit/:id', async(req, res) =>{
//     studentController.editStudentById(req, res)
// })

export default studentRouter