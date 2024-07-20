import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// login user
const loginUser = async (req, res) => {
    const {password, number} = req.body
    try {
        const user = await userModel.findOne({number})

        if (!user) {
            return res.json({success:false, message:" User doesn't exist"})
        }

        const isMatch  = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({success:false, message:"Invalid Credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true, token})
    } catch (error) {
        res.json({success:false, message:"Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
    const {name, password, number} = req.body
    try {
        // checking if user already exists
        const exists = await userModel.findOne({number})
        if (exists) {
            return res.json({success:false, message:"User already exist"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            password: hashedPassword,
            number: number
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true, token})

    } catch (error) {
        res.json({success:false, message:"Error"})
    }
}

export {loginUser, registerUser}