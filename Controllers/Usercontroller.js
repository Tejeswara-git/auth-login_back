const User = require("../models/User")
const bcrypt = require("bcrypt")
const userregister = async(req, res)=>{
    try{
        const {username, email, password} = req.body

        // Check for missing fields
        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        // Check if email already exists
        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(400).json({message: "Email already in use"})
        }

        // Check if username already exists
        const existingUsername = await User.findOne({username})
        if(existingUsername){
            return res.status(400).json({message: "Username already taken"})
        }

        const hashedpassword = await bcrypt.hash(password, 10)
        const newuser = new User({ username, email, password: hashedpassword })
        await newuser.save()

        res.status(201).json({message: "User registered successfully"})
    }
    catch(err){
        console.error(err)
        // Handle MongoDB duplicate key error as a safe fallback
        if(err.code === 11000){
            return res.status(400).json({message: "Username or email already exists"})
        }
        res.status(500).json({message:"Internal server error", error: err.message})
    }
}


const userlogin = async (req, res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user || !(await bcrypt.compare(password, user.password))){
            console.log("Invalid Credentials")
            return res.status(401).json({message: "Invalid email or password"})
        }
        res.status(200).json({message: "Login success", User: user})
    }
    catch(err){
        console.error(err)
        res.status(500).json({message: "Internal server error", error: err.message})
    }
}

module.exports = {userregister, userlogin}