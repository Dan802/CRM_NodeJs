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

// express example
const allowlist = [process.env.FRONTEND_URL, 'https://dashboard.render.com/*', 'https://crm-nodejs-aih7.onrender.com/*']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

// Define the domins that are allow to receive requests (White List)
const whiteList = [process.env.FRONTEND_URL, 'https://dashboard.render.com/*', 'https://crm-nodejs-aih7.onrender.com/*']
const corsOptions = {
    origin: (origin, callback) => {
        // check if the request is from a server that is in the white list 
        const exist = whiteList.some( domain => domain === origin)

        if(exist) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

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