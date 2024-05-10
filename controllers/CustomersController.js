import Customers from "./../models/Customers.js";

export async function newCustomer (req, res, next) {

    const customer = new Customers(req.body)

    try {
        
        await customer.save()
        res.json({message: 'you added a new customer'})

    } catch (error) {
        console.log(error)
        res.send(error)
        next()
    }
}

export async function showCustomers(req, res, next) {
    try {
        
        const customers = await Customers.find({})

        if(customers.length > 0) {
            res.json(customers)
        } else {
            res.json({message: 'There are no customers yet.'})
        }

    } catch (error) {
        console.log(error)
        next()
    }
}

export async function showCustomer(req, res, next) {
    
    try {
        const customer = await Customers.findById(req.params.idCustomer)
        res.json(customer)
    } catch (error) {
        console.log(error)
        res.json({message: 'That client does not exist'})
        return next()
    }
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
        res.send(error)
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