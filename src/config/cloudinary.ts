const cloudinary = require('cloudinary').v2;
import * as dotenv from "dotenv";

dotenv.config();


cloudinary.config({ 
    cloud_name: process.env.CLOUD_API_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET, // Click 'View Credentials' below to copy your API secret
    secure: true
});

module.exports = cloudinary