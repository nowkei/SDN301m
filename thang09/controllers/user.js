import { body, validationResult } from "express-validator"
import { userRepository } from "../repositories/index.js"
import { request } from "express"

const getAllUsers = async (req, res) => {
    try {
        const allUser = await userRepository.getAllUsers()
        res.status(200).json({
            message: 'Get All Users Successfully',
            data: allUser 
        })
    } catch (error) {
        res.status(500).json({message: error.toString()})

    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const userByID = await userRepository.getUsersById(id)
        res.status(200).json({
            message: 'Get All Users Successfully',
            data: userByID 
        })
    } catch (error) {
        res.status(500).json({message: error.toString()})

    }

}

const deleteUserById = async ( req, res) => {
    try {
        const id = req.params.id
        const deleteUserByID = await userRepository.deleteUserById(id)
        res.status(200).json({
            message: 'delete success' 
        })
    } catch (error) {
        res.status(500).json({message: error.toString()})

    }
}

const editUserById = async (req, res) => {
    try {
        const id = req.params.id
        const editUserByID = await userRepository.editUserById(id, req.body)
        res.status(200).json({
            message: 'edit success',
            data: editUserByID 
        })
    } catch (error) {
        res.status(500).json({message: error.toString()})

    }

}
const login = async (req, res) => {
    //Validation done
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {email, password} = req.body
    // Call repository: user
    try {
        const loginUser = await userRepository.login({email, password})
        res.status(200).json({
            message: 'Login sucessfully.',
            data: loginUser
        })
    } catch (error) {
        res.status(500).json({message: error.toString()})

    }
    
}

const register = async (req, res) => {
    const errors = validationResult(req.body)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    //Detructuring object
    const{
        name,
        email,
        password,
        phoneNumber,
        address,
    } = req.body
    try {
        const newUser = await userRepository.register({name, email, password, phoneNumber, address})
        res.status(201).json({
            message: 'Register successfully.',
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            errors: error.toString()
        })
    }
}

export default {
    getAllUsers,
    getUserById,
    login,
    register,
    editUserById,
    deleteUserById
}