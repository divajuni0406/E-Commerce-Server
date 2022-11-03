const Cryptr = require("cryptr");
// const SecretKey = "secretKey";
// const passConverter = new Cryptr(SecretKey);



const passConverter=(secretKey)=>{
    const encrypt = new Cryptr(secretKey)

    return encrypt
}


module.exports = { passConverter }