const userModel = require("../models/userModel")
const bcryptjs = require('bcryptjs')

const userController = {
    create: async (req, res) => {
        try {
            const { username, email, password } = req.body
            const user = await userModel.findOne({ email })

            if (user) {
                return res.status(400).json({
                    message: 'Email already Exist',
                    success: false
                })
            }

            // hashing password
            const _SALT_ROUND = 10;
            const hashedPassword = await bcryptjs.hash(password, _SALT_ROUND)
            console.log(hashedPassword)

            const data = await userModel.create({ username, email, password: hashedPassword })
            res.status(201).json({
                message: 'SignUp Successfully',
                success: true,
                data
            })
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({
                message: 'Error while creating user in DB',
                success: false
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await userModel.findOne({ email })

            if (!user) {
                return res.status(401).json({
                    message: "Invalid Email Or Password",
                    success: false
                })
            }

            const isVerify = await bcryptjs.compare(password, user.password)

            if (!isVerify) {
                return res.status(401).json({
                    message: "invalid email or password",
                    success: false
                })
            }

            res.json({
                message: "Login Successfull",
                success: true
            })

        } catch (error) {
            console.error('Error while login user:', error);
            res.status(500).json({
                message: 'Error while login user in DB',
                success: false
            })
        }
    }
}

module.exports = userController