import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import cors from "cors"; // Cors allow a different client connects to the server
import dotenv from "dotenv";
import routes from "./routes/index.js";

const app = express()

dotenv.config({path: '.env'})

// connect to mongo
const bd = (async () => {
    await mongoose.connect(process.env.DB_URL)
        .then(()=>{
            console.log("DB connection successful.");
            console.log('**********************************');
        })
        .catch((err)=>{
            console.log(`DB connection error:${err}`);
        });
})()

// Enable BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// public folder
// Should be before Cors configuration
app.use(express.static('uploads'))

// Define the domins that are allow to receive requests (White List)
const whiteList = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: (origin, callback) => {
        // check if the request is from a server that is in the white list 
        // const exist = whiteList.some( domain => domain === origin)
        const exist = true

        if(exist) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// Enable Cors
// Allow a client to connect to another server for resource sharing
app.use(cors(corsOptions))

// app routes
app.use('/', routes)

const port = process.env.PORT || 5000
const host = process.env.HOST || '0.0.0.0'

app.listen(port, host, (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log('The server is running on port ', port)
        console.log('**********************************')
    }
})