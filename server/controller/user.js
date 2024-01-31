const express = require("express");
const router = express.Router();
const User = require("../models/user");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");

const app =  express();
app.use(cookieParser());

// console.log('Secure JWT Secret:', jwtSecret);

router.use(
  session({
    secret: "your secret key", // replace 'your secret key' with your actual secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set secure to true if you're using https
  })
);

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    if (!(username && password && email)) {
      return res.status(400).json({ msg: "Please fill out all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json("User already exists with this email");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      email,
      password: hashPassword,
    });
    await user.save();

    //creating payload  for the token
    const payload = {
      userId: user._id,
      email: user.email,
    };
    //creating jwt secret using inbuilt crypto
    const jwtSecret = crypto.randomBytes(64).toString("hex");
    // create a token
    const token = jwt.sign(
      { payload },
      // process.env.JWT_SECRET || jwtSecret ,
      jwtSecret,
      { expiresIn: "3h" } //expiry of the token is 3 hours
    );

    user.token = token;
    user.password = undefined;

   
  } catch (err) {
    console.log(err.message);
    res.status(409).json("error in registering user ");
  }
};

exports.login = async (req, res) => {
  try {
    //find data coming from reques
    const { email, password } = req.body;
    //check if all fields are filled
    if (!email || !password) {
        return res.status(400).json("All fields are mandatory, please fill them");
    }

    //find user
    const user = await User.findOne({email});
    //if no user found then send error message to client side
    if(!user){
        return res.status(400).json("user not registered");
    }

    //check password
    if(user && (await bcrypt.compare(password,user.password))){
        //create json web token and set it in response header
        const payload = {
            userId: user._id,
            email: user.email,
          };
          //creating jwt secret using inbuilt crypto
          const jwtSecret = crypto.randomBytes(64).toString("hex");
          // create a token
          const token = jwt.sign(
            { payload },
            // process.env.JWT_SECRET || jwtSecret ,
            jwtSecret,
            { expiresIn: "3h" } //expiry of the token is 3 hours
          );

          user.token = token;
          user.password = undefined;

          //cookie section
          const options = {
            expires : new Date(Date.now() + 3*24*60*60*1000),
            httpOnly : true
        }
        res.status(200).cookie("token", token, options).json({
            success: true,
            token: token,
            user
        })
        // res.status(201).json(user);
    }      
     

    // if (user) {
    //   const info = {
    //     name: user.name,
    //     email: user.email,
    //     id: user._id,
    //   };
    //   req.session.userId = user._id;
    //   // req.session.info=info ;
    //   res.send(info);
    // }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("server error");
  }
};

exports.isLoggedin = (req, res) => {
  if (req.session && req.session.userId) {
    return res.send({ loggedIn: true });
  } else {
    return res.send({ loggedIn: false });
  }
};
