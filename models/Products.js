import mongoose from "mongoose";

const { Schema } = mongoose;

const productsSchema = new Schema({ 
    name: {
        type: String,
        trim: true
    },
    amount : {
        type: Number,
        default: 0
    },
    available: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number
    },
    image: {
        type: String
    }
})

export default mongoose.model('Products', productsSchema);