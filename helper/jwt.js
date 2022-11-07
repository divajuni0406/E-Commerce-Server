const JWT = require("jsonwebtoken");

const signToken=(data)=>{
    return JWT.sign(data,process.env.JWT_TOKEN_SECRET,{ expiresIn: "1d" })
}


module.exports = {
    signToken
}