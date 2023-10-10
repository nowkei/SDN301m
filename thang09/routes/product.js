import express from 'express'
import { productController } from '../controllers/index.js'

const productRouter = express.Router()

//Activities -> User object
productRouter.get('/', productController.getAllProducts)



productRouter.post('/',  productController.createProduct)

export default productRouter