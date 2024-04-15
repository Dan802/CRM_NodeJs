import mongoose from "mongoose";

const { Schema } = mongoose;

const customersSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    secondName: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    }, 
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    }, 
    cellphone: {
        type: String,
        trim: true
    }
})

export default mongoose.model('Customers', customersSchema);

