const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../schemaModel/Users");
const { ErrorResponse } = require("../utilities/ErrorResponse");

const registerUser = async (req, res, next) => {
  try {
    // send email and password from req.body backend
    const { email, password } = req.body;

    // check if user exists, if yes throw error from ErrorResponse class
    const user = await User.findOne({ email });
    if (user) throw new ErrorResponse("User already exists with this email", 400);

    // if user with input email does not exist, hash the password
    const hashPassword = await bcrypt.hash(password, 5);

    // save the new user with the hashed password
    const newUser = await User.create({ email, password: hashPassword });

    /* generate an One-Time Password (OTP) or security/authentication token 
    to be validated by the server to access the server in a more secured way
    to create a token, payload is required (https://jwt.io/)  */
    const payload = { id: newUser._id, email: newUser.email };

/*     // create a token: Method I
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    // if token is created in /register post request, register route is successful
    res.send(token); */

    // create a token: Method II that expires in certain time
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });

    // receive the access token in a cookie, and receive the payload in response in the frontend
    res.cookie('access_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    })
    .send(payload)

} catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
    try {
      // receive email and password from req.body backend
      const { email, password } = req.body;
  
      // find user with the client input email, and bring everything plus password (since select: false in /schemaModel/users.js)
      // if no user exists with that input email, throw error from ErrorResponse class
      const user = await User.findOne({ email }).select('+password');
      if (!user) throw new ErrorResponse("No account found with this email", 404);
  
      // if user with input email exist, compare the password
      const matchPassword = await bcrypt.compare(password, user.password);

      if(!matchPassword) throw new ErrorResponse('Wrong password', 401)
  
      const payload = { id: user._id, email: user.email };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '24h',
      });
  
      res.cookie('access_token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
      })
      .send(payload)
  
  } catch (error) {
      next(error);
    }
  };


  // no access token for the user and an immediate expiration
  const logoutUser = async (req, res, next) => {
      res.cookie('access_token', '', {
          httpOnly: true,
          maxAge: 0,
      })
      .send('User has successfully logged out')
    };
  
module.exports = { 
    registerUser,
    loginUser,
    logoutUser  
};
