import mongoose from "mongoose";

const { Schema } = mongoose;

const OrdersSchema = new Schema({
    customer: {
        type: Schema.ObjectId,
        ref: 'Customers'
    },
    order: [{
        product: {
            type: Schema.ObjectId,
            ref: 'Products'
        },
        amount: Number
    }],
    total: {
        type: Number
    } 
})

export default mongoose.model('Orders', OrdersSchema)