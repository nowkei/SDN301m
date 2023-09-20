import express from 'express'
//import productController from '../controllers/productController.js'

const productRouter = express.Router()

//Activities -> User object
productRouter.get('/', (req, res) =>{
    // productController.getAllProducts(req,res)
    res.send("get all products");
})

productRouter.get('/:id', async(req, res) =>{
    res.send("Get prod by prod id ")
})

productRouter.post('/create', async(req, res) =>{
    res.send("Create a new prod")
})

export default productRouter