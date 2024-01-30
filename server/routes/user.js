const express = require("express")
const router = express.Router();
const User = require('../models/user');

router.post('/register',async(req,res)=>{
    const newuser = new User(req.body);
    try{
        const user = await newuser.save();
        res.send("User registered Successfully")
    } catch(err){
        console.log(err.message)
        res.status(409).json({err});
    }
})

router.post('/login', async(req,res)=>{
    const {email, password } = req.body;

    try{
        const user = await User.findByCredentials(email,password);

        if(user){
            const info = {
                name: user.name,
                email : user.email,
                id: user._id
            }
            res.send(info);
        }
    } catch(err){
        console.error(err.message);
        return res.status(500).sende('server error')
    }
})