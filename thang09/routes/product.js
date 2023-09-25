import express from 'express'
import { productController } from '../controllers/index.js'

const productRouter = express.Router()

//Activities -> User object
productRouter.get('/', (req, res) =>{
    productController.addNewProduct
})

productRouter.get('/:id', async(req, res) =>{
    res.send("Get prod by prod id ")
})

productRouter.post('/create', async(req, res) =>{
    productController.addNewProduct
})

export default productRouter