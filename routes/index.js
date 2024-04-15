import express from "express";
import { newCustomer, showCustomer, showCustomers, updateCustomer, deleteCustomer} from "./../controllers/CustomersController.js";
import { newProduct, uploadImage } from "./../controllers/productsController.js"

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

//#endregion 

export default router