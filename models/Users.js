import mongoose from "mongoose";

const { Schema } = mongoose;

const usersSchema = new Schema({ 
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: 'Your name is required'
    },
    password: {
        type: String, 
        required: true
    }
})

export default mongoose.model('Users', usersSchema);