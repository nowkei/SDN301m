import { Schema, model } from "mongoose"
import mongoose, {ObjectId, Schema} from "mongoose";

// Defined Product schema
const Product = mongoose.model("Product", new Schema({
    "id": {type: ObjectId},
    name: {
        type: String,
        required: [true, "Please enter product name."]
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    }
},
{
    timestamps: true 
}
)
)

//Create Product model
export default Product