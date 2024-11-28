const express = require("express");
const router = express.Router();
const { registerUser ,logIn,logOut} = require("../controllers/user.controller");
const { storage, upload } = require("../middlewares/multer.middleware");
const { userAuth } = require("../middlewares/auth.middleware");
router.post("/register",
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser);
// router.route("/register").post(registerUser)

router.post("/login",logIn);
router.post("/logout",userAuth,logOut)


module.exports = router;