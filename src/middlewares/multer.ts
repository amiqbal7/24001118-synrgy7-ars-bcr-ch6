const multer = require('multer');
const path = require('path');

const generateStorage = (destination: any) => {
    return multer.diskStorage({
        destination: function (req: any, file: any, cb: any) {
            cb(null, destination)
        },
        filename: function (req: any, file: any, cb: any) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
        }
    })
}

const validateFileType = (allowedMimeTypes: any) => {
    return (req: any, file: any, cb: any) => {
        if(allowedMimeTypes.includes(file.mimetype)){
            cb(null, true);
        } else {
            const err = new Error(`Only accepted file with type ${allowedMimeTypes.toString()}`);
            cb(err, false)
        }
    }
}

const imageUpload = multer({
    storage: generateStorage('./public/images'),
    fileFilter: validateFileType(['image/bmp', 'image/jpeg', 'image/x-png', 'image/png', 'image/gif']),
    limits:{
        fileSize: 2000000 //2mb
    }
});

const pdfUpload = multer({
    storage: generateStorage('./public/files'),
    fileFilter: validateFileType(['application/pdf']),
    limits:{
        fileSize: 1000000
    }
});

const mUpload = multer({storage: multer.memoryStorage()})

module.exports = {imageUpload, pdfUpload, mUpload};