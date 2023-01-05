const multer = require('multer');
const path = require('path');
const productmodel = require('../models/productmodel');

const storage = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null, './uploads');
    },
    filename : function(req,file,cb){
        cb(null,`${file.originalname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null,true);
    } else {
        cb(new Error('Unsupported files'), false);
    }
}

const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024*1024*10
    },
    fileFilter : fileFilter
});

module.exports = {
    upload : upload
}