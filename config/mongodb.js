const mongoose = require('mongoose');

async function main() {
    const con = await mongoose.connect(
        `mongodb+srv://petersatria:${process.env.MONGOPASS}@cluster0.klwgq.mongodb.net/AppDB`
    );
    console.log(`Mongo connected at ${con.connection.host}`);
}

module.exports = {
    main,
};
