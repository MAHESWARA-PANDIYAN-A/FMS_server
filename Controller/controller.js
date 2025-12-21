import fmsCollection from '../Model/model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JSON_WEB, { expiresIn: "1h" })
}

export const signUp = async (req, res) => {
    const { name, email, password, phone } = req.body;
    console.log('Signup request:', { name, email, phone, passwordLength: password?.length });

    try {
        const user = await fmsCollection.findOne({ email })
        if (user) return res.status(400).json({ message: "user already exist" })

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt)
        const newUser = new fmsCollection({ name,phone, email, password: hashedPass })

        await newUser.save()
        
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
            jwt: generateToken(newUser._id),
            message: "Account Created Successfully"
        })
    }
    catch (err) {
        console.log("signup :", err);
        res.status(500).json({ message: "Error in signup" })
    }
}


export const login = async (req, res) => {
    const { name, password } = req.body;
    console.log('Login request:', { name, passwordLength: password?.length });

    try {
        const user = await fmsCollection.findOne({ name })
        if (!user) return res.status(400).json({ message: "Account doesn't Exist" })

        const user_password = await bcrypt.compare(password, user.password)
        if (!user_password) return res.status(400).json({ message: "invalid credential" })

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            jwt: generateToken(user._id)
        })

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}