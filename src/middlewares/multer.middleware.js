const multer = require("multer");

// Define storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Specify the directory to save files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save the file with its original name
  },
});

// Create the multer instance with the storage configuration
const upload = multer({ storage: storage });

// Export both `storage` and `upload`
module.exports = { storage, upload };
