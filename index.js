const userrouter = require("./Routes/Userroute")
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')


dotenv.config()


const PORT = 5000 || process.env.PORT

app.use(cors())
app.use(express.json())
app.use('/api/user', userrouter)

const dns = require('node:dns/promises');
dns.setServers(['8.8.8.8', '8.8.4.4']);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected")
})
.catch((err)=>{
    console.log("MongoDB not connected")
    console.error(err)
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})



 