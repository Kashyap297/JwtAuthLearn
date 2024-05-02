const userModel = require("../models/userModel")
const bcryptjs = require('bcryptjs')

const userController = {
    create: async (req, res) => {
        try {
            const { username, email, password } = req.body
            const user = await userModel.findOne({ email })
            console.log(req.body)
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

            const data = await userModel.create({ username, email, password : hashedPassword })
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
    }
}

module.exports = userController