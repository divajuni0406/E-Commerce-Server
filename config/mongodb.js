const mongoose = require('mongoose');

async function main() {
    const con = await mongoose.connect(
        `mongodb+srv://fsw23c9t1:${process.env.MONGOPASS}@fsw23c9t1.09vmpg5.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log(`Mongo connected at ${con.connection.host}`);
}

module.exports = {
    main,
};
