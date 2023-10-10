import { body, validationResult } from "express-validator"
import { studentRepository } from "../index.js"
import { request } from "express"

const getAllStudents = async (req, res) => {
    try {
        const allStudent = await studentRepository.getAllStudents()
        res.status(200).json({
            message: 'Get student Successfully',
            data: allStudent 
        })
    } catch (error) {
        res.status(500).json({message: error.toString()})

    }
}

const getStudentById = async (req, res) => {
    try {
        const id = req.params.id
        const userByID = await studentRepository.getStudentById(id)
        res.status(200).json({
            message: 'Get detail student successfully',
            data: userByID 
        })
    } catch (error) {
        res.status(500).json({message: error.toString()})

    }

}

const deleteStudentById = async ( req, res) => {
    try {
        const id = req.params.id
        const deleteStudentByID = await studentRepository.deleteStudentById(id)
        res.status(202).json({
            message: 'Delete student successfully',
            data: deleteStudentByID
        })
    } catch (error) {
        res.status(500).json({message: error.toString()})

    }
}


const createNewStudent = async (req, res) => {
    const errors = validationResult(req.body)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    //Detructuring object
    const{
        name,
        email,
        language,
        gender,
        phoneNumber,
        address
    } = req.body
    try {
        const newStudent = await studentRepository.createNewStudent({name, email, language, gender, phoneNumber, address})
        res.status(201).json({
            message: 'Insert student successfully.',
            data: newStudent
        })
    } catch (error) {
        res.status(500).json({
            errors: error.toString()
        })
    }
}
export default {
    getAllStudents,
    deleteStudentById,
    getStudentById,
    createNewStudent
}