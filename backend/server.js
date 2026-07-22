const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const multer = require('multer')
const db = require('./db.js')
const productModel = require('./models/Productmodel.js')
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


// ? Post Api 
app.post("/upload", parser.single("file"), async (req, res) => {
  try {
    const data = await {
      "product_name": req?.body?.product_name,
      "product_image_path": req?.file?.path,
      "price": req?.body?.price,
      "description": req?.body?.description
    }

    const addData = await productModel.create(data)
    console.log('Add Data', addData)
    res.json({
      success: true,
      message: 'Product Uplode Successfully',
      data: addData
    })

  } catch (err) {
    console.error(err);
  }

});

// ? Get Api 
app.get('/getproduct', async (req, resp) => {
  try {
    const productData = await productModel.find()
    resp.status(200).json({
      success: true,
      message: 'Product get Successfully',
      data: productData
    })
  } catch (error) {
    resp.json({
      success: false,
      message: error
    })
  }
})


// ? Put Api 
app.put('/updateProduct/:id', parser.single("file"), async (req, resp) => {
  try {
    const data = await {
      "product_name": req?.body?.product_name,
      "product_image_path": req?.file?.path,
      "price": req?.body?.price,
      "description": req?.body?.description
    }
    P_ID = req.params.id

    console.log('Put Api Call ', req.body)
    console.log('Put Api Call ', P_ID)

    const update_product = await productModel.findByIdAndUpdate(P_ID, data)
    resp.json({
      success: true,
      message: "Product Update Successfully",
      data: update_product
    })
  } catch (error) {
    resp.json({
      success: false,
      message: error
    })
  }
})


// ? Delete Api 
app.delete('/deleteProduct/:id', async (req, resp) => {
  try {
    const P_ID = req.params.id
    const delete_product = await productModel.findByIdAndDelete(P_ID)
    resp.status(200).json({
      success: true,
      message: 'Product Delete Successfully',
      data: delete_product
    })
  } catch (error) {
    resp.json({
      success: false,
      message: error
    })
  }
})


app.listen(process.env.PORT, () => {
  console.log(`Application running on port number ${process.env.PORT}`)
})

