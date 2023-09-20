import mongoose, {ObjectId, Schema} from "mongoose";
import isEmail from "validator/lib/isEmail.js";
const User = mongoose.model("User", new Schema({
    "id": {type: ObjectId},
    "name": { 
    type: String,
    require: true,
    validate:{
        validator: (value) => value.length > 3,
        message: 'Length of name > 3 character'
    }
    },
    "email": {
        type: String,
        require: true,
        validate:{
            validator: (value) => isEmail,
            message: 'Incorrect format'
        }
    },
    "password": {
        type: String,
        require: true,
        validate:{
            validator: (value) => value.length > 5,
            message: 'Incorrect format'
        }
    },
    "phoneNumber": { 
    type: String,
    require: true
    },
    "address": {
        type: String,
        require: false
    }
}))

export default User