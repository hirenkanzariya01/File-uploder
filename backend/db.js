const mongoose = require('mongoose')


const connectdb = async () => {
  console.log(process.env.MONGODB_URL)
  await mongoose.connect(process.env.MONGODB_URL).then(
    console.log('Connected Successfully')
  ).catch((err) => {
    console.log('Error ', err)

  })

}

module.exports = connectdb