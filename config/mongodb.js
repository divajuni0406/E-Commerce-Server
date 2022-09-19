const mongoose = require('mongoose');

async function main() {
  try {
    const Conn = await mongoose.connect('mongodb+srv://petersatria:12345@cluster0.klwgq.mongodb.net/AppDB',
      { useNewUrlParser: true, useUnifiedTopology: true }
    )

    console.log(`MongoDB connected : ${Conn.connection.host}`)
  } catch (error) {
    console.log(error)
    console.log("failed")
  }

}

module.exports = main
