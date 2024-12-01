const express = require("express");
const router = express.Router();
const { registerUser, logIn, logOut, changePassword, getCurrUser, updateUser } = require("../controllers/user.controller");
const { storage, upload } = require("../middlewares/multer.middleware");
const { userAuth } = require("../middlewares/auth.middleware");
router.post("/register",
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser);
// router.route("/register").post(registerUser)

router.post("/login", logIn);
router.post("/logout", userAuth, logOut);
router.post("/changePassword", userAuth, changePassword);
router.get("/currentUser", userAuth, getCurrUser);
router.patch("/update", userAuth,
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    updateUser
)


module.exports = router;