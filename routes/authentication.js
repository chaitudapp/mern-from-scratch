var express = require('express');
var { signout, signup, signin, isSignedIn } = require('../controllers/authentication')
var router = express.Router();

const { check, validationResult } = require("express-validator");

router.use("/signup",[
    check("name","name should be atleast 3 char").isLength({min: 3}),
    check("email","email is required").isEmail(),
    check("password","password is 3").isLength({min:3})
],signup);
router.use("/signin",[
    check("email","email is required").isEmail(),
    check("password","password is 3").isLength({min:3})
],signin);
router.get("/signout",signout);


router.get("/testroute",isSignedIn,(req,res) => {
    res.json(req.auth);
})

module.exports = router;
