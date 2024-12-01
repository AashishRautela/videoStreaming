const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/multer.middleware");
const {uploadVideo}=require("../controllers/video.controller")


router.post("/upload", userAuth,
    upload.fields([
        {
            name: "video",
            maxCount: 1
        },
    ]),
    uploadVideo)

module.exports = router;