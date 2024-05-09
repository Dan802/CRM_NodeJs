import express from "express";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import bodyParser from "body-parser"

// Cors allow a different client connects to the server
import cors from "cors";

const app = express()

// connect to mongo
mongoose.connect('mongodb://localhost/restapis')
    .then(()=>{
        console.log("DB connection successful.");
    })
    .catch((err)=>{
        console.log(`DB connection error:${err}`);
    });


// Enable BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// public folder
app.use(express.static('uploads'))

// Define the domins that are allow to receive requests (White List)
const whiteList = ['http://localhost:3000']
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

// Enable Cors
// Allow a client to connect to another server for resource sharing
app.use(cors(corsOptions))

// app routes
app.use('/', routes)

app.listen(5000)