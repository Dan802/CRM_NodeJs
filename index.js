import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import cors from "cors"; // Cors allow a different client connects to the server
import dotenv from "dotenv";
import routes from "./routes/index.js";

const app = express()

dotenv.config({path: '.env'})

// connect to mongo
mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB connection successful.");
        console.log('**********************************');
    })
    .catch((err)=>{
        console.log(`DB connection error:${err}`);
    });

// Enable BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// public folder
// Should be before Cors configuration
app.use(express.static('uploads'))

const options = {
    "origin": [process.env.FRONTEND_URL, /.*\.render\.com.*/, /.*\.onrender\.com.*/],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

// Enable Cors
// Allow a client to connect to another server for resource sharing
app.use(cors(options))

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