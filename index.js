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

// Enable Cors
app.use(cors())

// app routes
app.use('/', routes)

// public folder
app.use(express.static('uploads'))

app.listen(5000)