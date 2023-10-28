const multer = require("multer");
const path = require("path");
const avaPathTemp = path.join(__dirname, "../", "temp");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, avaPathTemp)
    },
    filename: (req, file, cb)=>{
        cb(null, `${req.user}.jpg`);
    },
    limits: {
        fileSize: 2048
    }
});

const uploadFile = multer({
    storage
});



module.exports = uploadFile;