const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const multer = require('multer')
const db = require('./db.js')
app.use(express())
app.use(express.json())
app.use(cors())
db()

const cloudinary = require('./config/cloudinary.js')
const { CloudinaryStorage } = require('multer-storage-cloudinary')




const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile",
    formate: ['png', 'pdf', 'jpg', 'jpeg', 'webp']
  }
})


const parser = multer({ storage: storage });


app.post('/uplode/image', parser.single('file'), async (req, resp) => {
  await console.log(req.file)
  await resp.send(req.body)
})

app.listen(process.env.PORT, () => {
  console.log(`Application running on port number ${process.env.PORT}`)
})

