import jwt from "jsonwebtoken";

export default async function auth(req, res, next){

    // authorize via header
    const authHeader = req.get('Authorization')

    if(!authHeader) {
        res.status(401).json({message: 'There is no web token'})
        return 
        // throw error
    }

    // get the token
    const token = authHeader.split(' ')[1]
    let reviewToken

    // verify the token
    try {
        reviewToken = jwt.verify(token, "OLIKÑJKMHHFTG")
    } catch (error) {
        // error.statusCode = 500
        console.log(error)
        console.log()
        console.log()
        console.log('No authentize')
        console.log()
        console.log()
        // throw error
    }

    if(!reviewToken) {
        res.status(500).json({message: 'No authentize'})
        return 
        // throw error
    }

    next()
}