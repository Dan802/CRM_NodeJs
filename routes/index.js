import express from "express";
import { newCustomer, showCustomer, showCustomers, updateCustomer, deleteCustomer} from "./../controllers/CustomersController.js";
import { deleteProduct, newProduct, showProduct, showProducts, updateProduct, uploadImage } from "./../controllers/productsController.js"

const router = express.Router()

router.get('/', (req, res) => {
    res.send('inicio')
})

//#region CustomersController.js

    // Add new customers
    router.post('/customers', newCustomer)

    // Get all the customers
    router.get('/customers', showCustomers)

    // Show a specific customer
    router.get('/customers/:idCustomer', showCustomer)

    // update a specific customer
    router.put('/customers/:idCustomer', updateCustomer)

    // Delete a specific customer
    router.delete('/customers/:idCustomer', deleteCustomer)

//#endregion

//#region productsController.js

    // New products
    router.post('/products', uploadImage, newProduct)

    // Show all the products
    router.get('/products', showProducts)

    // Show a specific product by their id
    router.get('/products/:idProduct', showProduct)

    // Update a specific product
    router.put('/products/:idProduct', uploadImage, updateProduct)

    // Delete a specific product
    router.delete('/products/:idProduct', deleteProduct)

//#endregion 

export default router