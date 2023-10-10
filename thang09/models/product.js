
import mongoose, {ObjectId, Schema} from "mongoose";

// Defined Product schema
const Product = mongoose.model("Product", new Schema({
    "id": {type: ObjectId},
    "name": { 
    type: String,
    require: true,
    validate:{
        validator: (value) => value.length > 3,
        message: 'Length of name > 3 character'
    }
    },
    "price": { 
    type: Number,
    require: true,
    validate:{
        validator: (value) => value > 0,
        message: 'Price must be greater than 0'
    }
    },
    "quantity": {
        type: String,
        require: true
    }
},
{
    timestamps: true
},
))

//Create Product model
export default Product