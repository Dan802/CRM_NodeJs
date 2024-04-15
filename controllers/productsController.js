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

export async function showProducts(req, res, next) {
    try {
        const products = await Products.find({})
        res.json(products)
    } catch (error) {
        console.log(error)
        res.json({message: error})
        return next()
    }
}

export async function showProduct(req, res, next) {

    try {
        const product = await Products.findById(req.params.idProduct)
        res.json(product)

    } catch (error) {
        console.log(error)
        res.json({message: 'That product does not exist'})
        return next()
    }
}

export async function updateProduct(req, res, next) {

    try {

        let newProduct = req.body

        if(req.file?.filename) {
            newProduct.image = req.file.filename
        } else {
            let previousOne = await Products.findById(req.params.idProduct)
            newProduct.image = previousOne.image
        }

        const product = await Products.findOneAndUpdate(
            { _id: req.params.idProduct},
            newProduct, 
            { new: true } //Bring the new updated product 
        )

        res.json(product)
    } catch (error) {
        console.log(error)
        res.json({message: 'That product does not exist'})
        return next()
    }
}

export async function deleteProduct(req, res, next) {
    try {
        const product = await Products.findByIdAndDelete({_id: req.params.idProduct})

        if(product.image) {
            const previousImage =  fileURLToPath(new URL(`../uploads/${product.image}`, import.meta.url)) 

            fs.unlink(previousImage, (error) => { // delete the image with filesystem
                if(error) {
                    console.log(error)
                }
                return;
            })
        }

        res.json({message: 'The product have been deleted successfully'})
    } catch (error) {
        console.log(error)
        res.json({message: 'That product does not exist'})
        return next()
    }
}