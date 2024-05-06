import jwt from "jsonwebtoken";

export default async function auth(req, res, next){

    // authorize via header
    const authHeader = req.get('Authorization')

    if(!authHeader) {
        const error = new Error('There is not Json Web Token')
        error.statusCode = 401
        res.json({message: 'There is no web token'})
        throw error
    }

    // get the token
    const token = authHeader.split(' ')[1]
    let reviewToken

    // verify the token
    try {
        reviewToken = jwt.verify(token, "OLIKÑJKMHHFTG")
    } catch (error) {
        error.statusCode = 500
        throw error
    }

    if(!reviewToken) {
        const error = new Error('No authentize')
        error.statusCode = 401
        throw error
    }

    next()
}