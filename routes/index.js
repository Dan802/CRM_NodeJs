import express from "express";
// import { newCustomer, showCustomers, showCustomer, updateCustomer, deleteCustomer} from "./../controllers/customersController.js";
import { deleteProduct, newProduct, searchProduct, showProduct, showProducts, updateProduct, uploadImage } from "./../controllers/productsController.js"
import { deleteOrder, newOrder, showOrder, showOrders, updateOrder } from "./../controllers/ordersController.js";
import {singUpUser, authUser, token} from "./../controllers/usersController.js";
import auth from './../middleware/auth.js' // middleware to protect routes

const router = express.Router()

router.get('/', (req, res) => {
    res.send('<a href="/juanfgonzalez.netlify.app">Hi, visit my portfolio clicking here.</a>')
})

//#region CustomersController.js

    // Add new customers
    // router.post('/customers', auth, newCustomer)

    // Get all the customers
    // router.get('/customers', auth, showCustomers)

    // Show a specific customer
    // router.get('/customers/:idCustomer', auth, showCustomer)

    // update a specific customer
    // router.put('/customers/:idCustomer', auth, updateCustomer)

    // Delete a specific customer
    // router.delete('/customers/:idCustomer', auth, deleteCustomer)

//#endregion

//#region productsController.js

    // New products
    router.post('/products', auth, uploadImage, newProduct)

    // Show all the products
    router.get('/products', auth, showProducts)

    // Show a specific product by their id
    router.get('/products/:idProduct', auth, showProduct)

    // Update a specific product
    router.put('/products/:idProduct', auth, uploadImage, updateProduct)

    // Delete a specific product
    router.delete('/products/:idProduct', auth, deleteProduct)

    // Search a product 
    router.post('/products/search/:query', auth, searchProduct)

//#endregion 

//#region ordersController.js

    router.post('/orders/new/:idUser', auth, newOrder)

    router.get('/orders', auth, showOrders)

    router.get('/orders/:idOrder', auth, showOrder)

    router.put('/orders/:idOrder', auth, updateOrder)

    router.delete('/orders/:idOrder', auth, deleteOrder)

//#endregion

//#region usersController.js

    router.post('/create-account', singUpUser)

    router.post('/log-in', authUser)

    router.get('/token', auth, token)

//#endregion

export default router