const postModel = require("../models/post.model")
const generateCaption = require("../services/ai.services")
const UploadFile = require("../services/storage.services")
const {v4: uuidv4} = require('uuid')

async function createbPostController(req, res) {
    const file = req.file
    console.log("File Data: ", file)

    const base64Image = new Buffer.from(file.buffer).toString('base64')

    // const caption = await generateCaption(base64Image)
    // const result = await UploadFile(base64Image, `${uuidv4()}`)

    const [caption, result] = await Promise.all([
        generateCaption(base64Image),
        UploadFile(base64Image, `${uuidv4()}`)
    ])

    res.json({
        caption: caption,
        result
    })
 }

 module.exports = {
    createbPostController
}