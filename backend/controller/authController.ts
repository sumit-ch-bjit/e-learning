import { Request, Response } from "express";
const bcrypt = require('bcrypt')
import HTTP_STATUS from "../constants/statusCodes";
import Auth from "../model/authModel";
import sendResponse from "../utils/common";
import User from "../model/userModel";
import generateToken from "../utils/generateToken";

const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password, role, firstName, lastName } = req.body
        // console.log(username, email, password, role, firstName, lastName);
        const existingUser = await Auth.findOne({ email })
        if (existingUser) {
            return sendResponse(res, 400, "email already taken")
        }
        // res.send("register controller working")
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            profile: {
                firstName,
                lastName
            }
        })

        const user = await newUser.save()

        const userId = user._id;

        const newAuth = new Auth({
            user: userId,
            role,
            email,
            password: hashedPassword
        })

        await newAuth.save()

        return sendResponse(res, HTTP_STATUS.CREATED, "new user created successfully", newUser)

    } catch (error) {
        console.log(error)
    }
}

const login = async (req: Request, res: Response) => {
    // return sendResponse(res, HTTP_STATUS.OK, "login activated")
    try {
        const { email, password } = req.body
        const auth = await Auth.findOne({ email })

        // const user = await User.findOne({ email })
        if (!auth) {
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "user not found")
        }

        const data = {
            id: auth._id,
            email: auth.email,
            role: auth.role
        }

        if (auth && (await bcrypt.compare(password, auth.password))) {
            return sendResponse(res, HTTP_STATUS.OK, "log in successfull", generateToken(data))
        } else {
            return sendResponse(res, HTTP_STATUS.NOT_FOUND, "invalid credentials")
        }
    } catch (error) {
        console.log(error)
    }
}


export { register, login }