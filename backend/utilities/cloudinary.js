const cloudinary = require('cloudinary').v2;
// import { v2 as cloudinary } from 'cloudinary';

const cloudinaryCall = async() => {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dqa05t19w', 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET
        // Click 'View API Keys' above to copy your API secret
    });

    const logoURL = cloudinary.url('logo-removebg-preview_gd0gtq',{
        transformation : [
            {fetch_format : "auto"},
            {quality : "auto"},
            {width : "220"}
        ]
    })
    
    return logoURL
}

module.exports = cloudinaryCall