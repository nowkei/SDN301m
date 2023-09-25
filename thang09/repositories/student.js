import Student from '../models/Student.js'
import bcrypt from 'bcrypt'

const deleteStudentById = async (id, data) => {
    try {
        const deleteStudent = await Student.findByIdAndDelete({_id : id});
        return {
            deleteStudent
        }
        
    } catch (error) {
        console.error(error);
    }
}



const getStudentById = async (id) => {
    try {
        const getById = await Student.findOne({_id : id});
        
          return {
            ...getById._doc,
        };

    } catch (error) {
        console.error(error);
    }
} 

const getAllStudents = async () => {
    try {
        const getAll = await Student.find({});
   
          return {
            getAll
        };

    } catch (error) {
        console.error(error);
    }
}

const createNewStudent = async ({
    name,
    email,
    language,
    gender,
    phoneNumber,
    address
}) => {
    const studentExisting = await Student.findOne({email}).exec()
    if(studentExisting != null){
        throw new Error("Student existing.")
    }
    const newStudent = await Student.create({
        name,
        email,
        language,
        gender,
        phoneNumber,
        address
    })

    return {
        ...newStudent._doc,
    }
} 

export default {
    deleteStudentById,
    getAllStudents,
    getStudentById,
    createNewStudent
}
