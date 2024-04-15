import Products from "../models/Products.js";
import multer from "multer"; // To upload images
import { fileURLToPath } from 'url'
import { nanoid } from 'nanoid'
import fs from 'fs' // To delete files

const filePath = fileURLToPath(new URL('../uploads/', import.meta.url)) 

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, filePath)
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1]

        // callback( error, nombre del archivo)
        cb(null, `${nanoid()}.${extension}`)
    }
})

const configMulter = { 
    storage: fileStorage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter(req, file, cb) {

        // Check mimetype
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            cb(new Error('The file must be an image (jpeg or png)'), false)
        } else {
            // All checks passed
            cb(null, true);
        }
    }
};

// single('') depends on the name assigned in the name form
const upload = multer(configMulter).single('image')

export function uploadImage(req, res, next) {
   
    upload(req, res, function(error) {

        if(error) {
            res.json({message: error})
        } else {
            return next();
        }
    })
}

export async function newProduct(req, res, next) {
    
    const product = new Products(req.body)

    console.log('req.file: ', req.file)

    if(req.file?.filename) {
        product.image = req.file.filename
    }

    try {
        await product.save()
        res.json({message: 'You have added a new product successfully'})
    } catch (error) {
        console.log(error)
        res.json({message: 'There was an error saving the new product'})
        return next()
    }
}
