
const express = require("express")

const router = express.Router()
const {userPurchaseList,updateUser,getUserByID, getUser} = require("../controllers/user")
const {isAuthenticated, isSignedIn} = require("../controllers/authentication")

router.param("userId",getUserByID)


router.get("/user/:userId",isSignedIn,isAuthenticated,getUser)

router.put("/user/:userId",isSignedIn,isAuthenticated, updateUser)
router.get("/orders/user/:userId",isSignedIn,isAuthenticated, userPurchaseList);

module.exports = router;


