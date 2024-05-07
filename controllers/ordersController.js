import Orders from "../models/Orders.js"

export async function newOrder(req, res, next) {
    const order = new Orders(req.body)

    try {
        await order.save()
        res.json({message: 'You have successfully added a new order'})
    } catch (error) {
       console.log(error)
       res.json({message: 'There was an error adding the new order'}) 
       return next()
    }
}

export async function showOrders(req, res, next) {
    try {
        
        // Join customer with idCustomer defined in the model Orders
        // and also Join products with idProduct defined in the model Orders
        const orders = await Orders.find({}).populate('customer').populate({
            path: 'order.product',
            // model: 'Orders'
        })

        if(orders.length > 0) {
            res.json(orders)
        } else {
            res.json({message: 'There are no orders yet.'})
        }

    } catch (error) {
        console.log(error)
        res.json({message: error})
        return next()
    }
}

export async function showOrder(req, res, next) {

    try {
        const order = await Orders.findById(req.params.idOrder)
            .populate('customer')
            .populate({
                path: 'order.product',
                // model: 'Orders'
            })

        res.json(order)
    } catch (error) {
        console.log(error)
        res.json({message: 'That order does not exist'})
        return next()
    }
}

export async function updateOrder(req, res, next) {
    try {
        let order = await Orders.findOneAndUpdate(
            {_id: req.params.idOrder},
            req.body,
            {new: true}
        )
            .populate('customer')
            .populate({
                path: 'order.product',
                // model: 'Orders'
            })

        res.json(order)
        
    } catch (error) {
        console.log(error)
        res.json({message: 'The order does not exist'})
        return next()
    }
}

export async function deleteOrder(req, res, next) {
    try {
        await Orders.findOneAndDelete({_id: req.params.idOrder})
        res.json({message: 'The order have successfully been deleted'})
    } catch (error) {
        console.log(error)
        res.json({message: 'The order does not exist'})
        return next()
    }
}