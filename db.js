const mongoose = require('mongoose')


const connectdb = async () => {
  console.log(process.env.MONGO_URL)
  await mongoose.connect(process.env.MONGO_URL).then(
    console.log('Connected Successfully')
  ).catch((err) => {
    console.log('Error ', err)

  })

}

module.exports = connectdb