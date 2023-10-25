const path = require("path");
const { createError } = require("../helpers");
const Users = require("../models/users");
const cloudinary = require('cloudinary').v2;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
const userChangeData = async (req, res, next) => {
    
    const avaPathTemp = path.join(__dirname, "../", "temp", `${req.user}.jpg`); 
    cloudinary.config({ 
        cloud_name: CLOUDINARY_CLOUD_NAME, 
        api_key: CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_API_SECRET
    }); 

    try {
        const result= await cloudinary.uploader.upload(avaPathTemp, { "tags": "basic_sample", "width": 150, "height": 100, "crop": "fit" })
        console.log(result)
        
    } catch (err) {
       console.log(err) 
    }
    
    
    if (req.query.name) {
        try {
            const data = await Users.findByIdAndUpdate(req.user, { name: req.query.name });
            res.status(200);
            res.json({
                message: 'contact updated',
                status: 'Update',
                code: 200,
                data: req.query
            })
            
        } catch (err) {
            next(createError('NOT_FOUND', err.message));
        }
    } else next();
}
module.exports = userChangeData;