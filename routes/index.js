import express from "express";
import { newCustomer, showCustomer, showCustomers, updateCustomer, deleteCustomer} from "../controllers/customersController.js";
import { deleteProduct, newProduct, showProduct, showProducts, updateProduct, uploadImage } from "./../controllers/productsController.js"
import { deleteOrder, newOrder, showOrder, showOrders, updateOrder } from "../controllers/ordersController.js";

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

//#region ordersController.js

    router.post('/orders', newOrder)

    router.get('/orders', showOrders)

    router.get('/orders/:idOrder', showOrder)

    router.put('/orders/:idOrder', updateOrder)

    router.delete('/orders/:idOrder', deleteOrder)

//#endregion

export default router