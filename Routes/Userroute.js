const {userlogin, userregister} = require("../Controllers/Usercontroller")
const express = require("express")
const router = express.Router()

router.post("/register", userregister)
router.post("/login", userlogin)


module.exports = router