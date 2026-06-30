const User = require("../models/User")
const bcrypt = require("bcrypt")
const userregister = async(req, res)=>{
    try{
        const {username, email, password} = req.body
        const useremail  = await User.findOne({email})
if(useremail){
    console.log("user already exists")
   return res.status(400).json({message: "user already exists"})
}
const hashedpassword  = await bcrypt.hash(password, 10)
const newuser = new User({
    username, 
    email,
    password: hashedpassword
})
await newuser.save()

res.status(201).json({message: "user registered"})
    }
    catch(err){
        console.error(err)
        res.status(500).json({message:"Internal server error", error : err.message})
    }
}


const userlogin = async (req, res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user || !( await bcrypt.compare(password, user.password))){
            console.log("Invalid Crendintals")
        }
res.status(201).json({message: "Login success", User: user})
    }
    catch(err){
        console.error(err)
        res.status(500).json({message: "Internal server error", error: err.message})
    }
}

module.exports = {userregister, userlogin}