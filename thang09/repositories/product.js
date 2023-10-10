import Product from '../models/Product.js';


async function getAllProducts(req,res){
    
}

async function createProduct({name, price, quantity}){
    try {
        const newProduct = await Product.create({name, price, quantity});
        return newProduct
    } catch (error) {
       throw new Error(error.message) 
    }
}
export default {
    getAllProducts,
    createProduct
}