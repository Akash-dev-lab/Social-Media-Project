const { json } = require("express")
const postModel = require("../models/post.model")
const generateCaption = require("../services/ai.services")

async function createbPostController(req, res) {
    const file = req.file
    console.log("File Data: ", file)

    const base64Image = Buffer.from(file.buffer).toString('base64')

    const caption = await generateCaption(base64Image)

    res.status(200).json({
        caption: caption
    })
 }

 module.exports = createbPostController