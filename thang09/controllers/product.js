import { productRepository } from "../index.js"

async function  getAllProducts(req, res) {
    res.status(200).json({
        message: 'List of products'
    })
}
async function createProduct(req, res){
    try {
        const {name, price, quantity} = req.body
    const result = await productRepository.createProduct({name, price, quantity})
    if(!result){
        res.status(500).json({
            message: 'Create new product false'
            
        })
    }
    res.status(200).json({
        message: 'List of product',
        data: result
    })
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        })
    }
    
    
}

export default{
getAllProducts,
createProduct
}