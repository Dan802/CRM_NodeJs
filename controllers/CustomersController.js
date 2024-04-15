import Customers from "../models/Customers.js";

export async function newCustomer (req, res, next) {

    const customer = new Customers(req.body)

    try {
        
        await customer.save()
        res.json({message: 'you added a new customer'})

    } catch (error) {
        console.log(error)
        next()
    }
}

export async function showCustomers(req, res, next) {
    try {
        
        const customers = await Customers.find({})
        res.json(customers)

    } catch (error) {
        console.log(error)
        next()
    }
}

export async function showCustomer(req, res, next) {
    const customer = await Customers.findById(req.params.idCustomer)

    if(!customer) {
        res.json({message: 'This clients does not exist'})
        return next()
    }

    res.json(customer)
}

export async function updateCustomer(req, res, next) {
    try {
        const customer = await Customers.findOneAndUpdate(
            { _id : req.params.idCustomer },
            req.body, { // Data to update the previous one
                new: true //Bring the new updated customer 
            }
        )

        res.json(customer)

    } catch (error) {
        console.log(error)
        return next()
    }
}

export async function deleteCustomer(req, res, next) {
    try {
        await Customers.findOneAndDelete({_id: req.params.idCustomer})
        res.json({message: 'The customer had been deleted successfully'})
    } catch (error) {
        console.log(error)
        res.json({message: error})
        return next()
    }
}

