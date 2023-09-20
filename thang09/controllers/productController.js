import Product from '../models/productModel.js'


const productController ={
    //Function defined
    getAllProducts : async(req, res) =>{
        const p = new Product({
            name: "Product 1",
            quantity: 10,
            price: 20.5,
            image: 'logo.png'

        })

        const p1 = new Product({
            name: "Product 2",
            quantity: 9,
            price: 21.5,
            image: 'p2.png'

        })

        const list = [p]
        list.push(p1)

        // if(!list){
        //    return res.status(404).json({message: 'product not found'})
        // }
        res.status(200).json(list)
    }
}

export default productController