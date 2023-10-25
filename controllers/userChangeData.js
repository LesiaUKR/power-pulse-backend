const path = require("path");
const fs = require("fs/promises");
const { createError } = require("../helpers");
const Users = require("../models/users");
const cloudinary = require('cloudinary').v2;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
const resJson = {
    message: 'contact updated',
    status: 'Update',
    code: 200,   
}

const updPhotoUrlBD = async (id, field) => {
    try {
        const data = await Users.findByIdAndUpdate(id, field);
        
    } catch (err) {
        next(createError('NOT_FOUND', err.message));
    }
    
}


const userChangeData = async (req, res, next) => {
    
    const avaPathTemp = path.join(__dirname, "../", "temp", `${req.user}.jpg`); 
    cloudinary.config({ 
        cloud_name: CLOUDINARY_CLOUD_NAME, 
        api_key: CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_API_SECRET
    }); 

    try {
        const result= await cloudinary.uploader.upload(avaPathTemp, { "tags": "basic_sample", "width": 150, "height": 100, "crop": "fit" })
        if (result) {
            await updPhotoUrlBD(req.user, { avatarUrl: result.url });
            await fs.unlink(avaPathTemp);
            resJson.avatarUrl = result.url; 
            
        }
    } catch (err) {
        delete resJson.avatarUrl
        console.log(err);
        
    }
    
    
    if (req.query.name) {
       await updPhotoUrlBD(req.user, { name: req.query.name });
        resJson.name = req.query.name; 
        
    } else{delete resJson.name}
    

    res.status(200);
    res.json({
        ...resJson,
        
    })
}
module.exports = userChangeData;