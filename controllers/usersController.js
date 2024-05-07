import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Users from "../models/Users.js";

export async function singUpUser(req, res) {

    const user = new Users(req.body)
    user.password = await bcrypt.hash(req.body.password, 10)

    try {
        await user.save()
        res.json({message: 'The user has been created successfully'})
    } catch (error) {
        console.log(error)
        res.json({message: 'There was an error'})        
    }
}

export async function authUser(req, res, next) {
    const user = await Users.findOne({ email: req.body.email })

    if(!user) {
        await res.status(401).json({message: 'That user does not exist'})
        return next()
    } else {

        // There is a valid user

        if(!bcrypt.compareSync(req.body.password, user.password)) {
            await res.status(401).json({message: 'The password is not valid'})
            return next()

        } else {

            // The password is correct
            const token = jwt.sign({
                // payload
                email: user.email,
                name: user.name,
                id: user._id
            },
            'OLIKÑJKMHHFTG', {   //Secret Key
                expiresIn: '20h'
            })

            // return token
            res.json({token})
        }
    }
}

export function token(req, res) {
    res.json({message: true})
}