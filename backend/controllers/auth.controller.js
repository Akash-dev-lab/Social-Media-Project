const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function registerController(req, res) {
    const {username, password} = req.body

    const userExist = await userModel.findOne({username})

    if(userExist) return res.status(401).json({
        message: "User already exist."
    })

    const user = await userModel.create({
        username: username,
        password: await bcrypt.hash(password, 10)
    })
 
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User created successfully",
        user
    })
}

async function loginController(req, res) {
    const {username, password} = req.body

    const userExist = await userModel.findOne({username})

    if(!userExist) return res.status(401).json({
        message: "User not registered."
    })

    const isPasswordValid = await bcrypt.compareSync(password, userExist.password)


    if(!isPasswordValid) return res.status(401).json({
        message: "Invalid Password"
    })

     const token = jwt.sign({ _id: userExist._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.cookie("token", token);

    res.status(200).json({
        message: "User Logged in successfully."
    })
}

module.exports = {
    registerController,
    loginController
}