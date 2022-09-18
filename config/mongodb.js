const mongoose = require('mongoose');

const mongoConnection = async()=> {
  try {
    const Conn = await mongoose.connect(`mongodb+srv://fsw23c9t1:${process.env.MONGOPASS}@fsw23c9t1.09vmpg5.mongodb.net/?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`MongoDB connected : ${ Conn.connection.host }`)
  } catch (error) {
    console.log(error)
      process.exit(1)
  }
}

module.exports = mongoConnection

