import {Router} from 'express';
import multer from '../libs/multer'
//controllers import 
import {createPhoto,getPhotos,getPhoto,deletePhoto, updatePhoto} from '../controllers/photo.controller'

const router =Router();
// root routes 
router.route('/photos')
    .post(multer.single('image'),createPhoto)
    .get(getPhotos);
// route to get one photo and search it by ID
router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto);

export default router;