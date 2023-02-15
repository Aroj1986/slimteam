const jwt = require("jsonwebtoken");
const { ErrorResponse } = require("../utilities/ErrorResponse");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token

    try {
        if(token){
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            req.user = payload
            next()
        } else {
            next(new ErrorResponse('Forbidden', 403))
        }
    } catch (error) {
        next(new ErrorResponse('Forbidden', 403))
    }
}

module.exports = {verifyToken}