const Mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await Mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useUniFiedTopology: true,
    });
    console.log(`MongoDb Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
