// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: 'doqt4lhc6', 
    api_key: '748742174275851', 
    api_secret: 'PBysSDfH-HQqoCnehYNh_fQa-7s' 
  });

module.exports = cloudinary;
