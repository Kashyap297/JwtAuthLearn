const userModel = require("../models/userModel")

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
            const data = await userModel.create({ username, email, password })
            res.status(201).json({
                message: 'SignUp Successfully',
                success: true,
                data
            })
        } catch (error) {
            res.status(500).json({
                message: 'Error while creating user in DB',
                success: false
            })
        }
    }
}

module.exports = userController