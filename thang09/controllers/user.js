import { body, validationResult } from "express-validator"
import { userRepository } from "../repositories/index.js"

const getAllUsers = async (req, res) => {
    
}

const getUserById = async (req, res) => {

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
    register
}