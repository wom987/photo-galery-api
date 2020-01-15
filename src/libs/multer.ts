import multer from 'multer';
import uuid from 'uuid/v4';
import path from 'path'
// multer configuration 
const storage =multer.diskStorage({
    destination: 'uploads',
    filename:(req,file,cb)=>{
        cb(null,uuid()+path.extname(file.originalname))
    }
});

export default multer({storage});