const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/user.controller");
const { storage, upload } = require("../middlewares/multer")
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


module.exports = router;