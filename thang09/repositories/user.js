import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const refreshToken = () =>{

}

const login = async ({email, password}) => {
    const userExisting = await User.findOne({email}).exec()
    if(userExisting){
        const isMatch = await bcrypt.compare(password, userExisting.password)
        if(isMatch==true){
        //Tao Acces Token bang JWT
            const accessToken = await jwt.sign(
                {
                    data: userExisting
                },
            process.env.SECRET_KEY_JWT, 
                {
                    expiresIn: "20s"
                }
            )
            const refreshToken = await jwt.sign(
                {
                    data: userExisting
                },
            process.env.REFRESH_KEY_JWT,
                {
                    expiresIn: "365d"   
                }    
            )
            
            return {
            ...userExisting.toObject(),
            password: "Not show",
            token: accessToken,
            refreshToken: refreshToken,
            }
        }else{
            throw new Error("Wrong email and password")
        }
    }else{
        throw new Error('User not exist.')
    }

   
}

const deleteUserById = async (id, data) => {
    try {
        const getById = await User.findOne({_id : id});
        if(getById === null){
           return {
            message: "not found"
           } 
        }
        const deleteUser = await User.deleteOne({_id : id}); 
        
    } catch (error) {
        console.error(error);
    }
}

const editUserById = async (id, data) => {
    try {
        const getById = await User.findOne({_id : id});
        if(getById === null){
           return {
            message: "not found"
           } 
        }
        const updateUser = await User.findByIdAndUpdate(id, data, {
          new: true  
        })
          return {
            ...updateUser._doc,
            password: "******"
        };

    } catch (error) {
        console.error(error);
    }
} 

const getUsersById = async (id) => {
    try {
        const getById = await User.findOne({_id : id});
        
          return {
            ...getById._doc,
            password : "*******"
        };

    } catch (error) {
        console.error(error);
    }
} 

const getAllUsers = async () => {
    try {
        const getAll = await User.find({});
        const AllAccount = getAll.map((User) => {
            return { 
                ...User._doc,
                password: '******'
             }  
        })      
          return {
            AllAccount
        };

    } catch (error) {
        console.error(error);
    }
}


const register = async ({
    name,
    email,
    password,
    phoneNumber,
    address
}) => {
    const UserExisting = await User.findOne({email}).exec()
    if(UserExisting != null){
        throw new Error("User existing.")
    }

    // Mã hóa mật khẩu
    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SECRET_KEY))

    const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        phoneNumber,
        address
    })

    //Clone a new user
    return {
        ...newUser._doc,
        password: 'Not show'
    }
} 

export default {
    login,
    register,
    getAllUsers,
    getUsersById,
    editUserById,
    deleteUserById
}