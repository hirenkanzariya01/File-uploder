const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const multer = require('multer')
const db = require('./db.js')

app.use(cors())
app.use(express.json())
db()

const cloudinaryconn = require('./config/cloudinary.js')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryconn,
  params: async (req, file) => ({
    folder: "profile",
    resource_type: "auto",
  }),
});

const parser = multer({ storage });

app.post("/upload", parser.single("file"), async (req, res) => {
  try {
    console.log(req.file);
    res.json({
      success:true,
      message:'file uplode successfully',
      data:req.file
    })

    
  } catch (err) {
    console.error(err);
  }

});


app.listen(process.env.PORT, () => {
  console.log(`Application running on port number ${process.env.PORT}`)
})

