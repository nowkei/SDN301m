import { body, validationResult } from "express-validator"
import { userRepository } from "../index.js"
import { request } from "express"
import jwt from 'jsonwebtoken'


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
        console.log("login", loginUser)
        res.cookie('refreshToken', loginUser.refreshToken, {
            httpOnly: true, // chi lay dc qua http k lay dc qua js
            secure: true,// khi nao deloy se chuyen thanh true
            path: "/",
            sameSite: 'strict'
        })
        res.status(200).json({
            message: 'Login sucessfully.',
            data: loginUser
        })
       
    } catch (error) {
        res.status(500).json({message: error.toString()})

    }
    
}
const refreshToken = async (req, res) => {
    try {
       const refreshToken=(req.cookies.refreshToken);
        const user = jwt.verify(refreshToken, process.env.REFRESH_KEY_JWT)
        const accessToken = await jwt.sign(
            {
                data: user
            },
        process.env.SECRET_KEY_JWT,
            {
                expiresIn: "30m"
            }
        )
        res.status(201).json({
            message: 'Register successfully.',
            accessToken
        })
    } catch (error) {
        res.status(500).json({
            errors: error.toString()
        })
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
    deleteUserById,
    refreshToken
}