const mongoose = require('mongoose')


const connectdb = async () => {
<<<<<<< HEAD:backend/db.js
  console.log(process.env.MONGODB_URL)
  await mongoose.connect(process.env.MONGODB_URL).then(
=======
  await mongoose.connect(process.env.MONGO_URL).then(
>>>>>>> c5ef0fcc27123ac07049d3c7bf4df7b51598cc5b:db.js
    console.log('Connected Successfully')
  ).catch((err) => {
    console.log('Error ', err)

  })

}

module.exports = connectdb