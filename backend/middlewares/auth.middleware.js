const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken')

async function authMiddlware(req, res, next) {
    const token = req.cookies.token


    if(!token) return res.status(401).json({
        message: "Unauthorized, please Login in Again."
    })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        console.log(decoded)

        const user = await userModel.findOne({
            _id: decoded.id
        })   

        req.user = user

        next()
    } catch (error) {
  console.error("JWT verification failed:", error);
  return res.status(401).json({
    message: error.name === "TokenExpiredError" 
      ? "Token expired, please login again." 
      : "Invalid token, please login again.",
    error: error.message
  });
    }
}

module.exports = authMiddlware