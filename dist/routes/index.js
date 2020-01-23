"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../libs/multer"));
//controllers import 
const photo_controller_1 = require("../controllers/photo.controller");
const router = express_1.Router();
// root routes 
router.route('/photos')
    .post(multer_1.default.single('image'), photo_controller_1.createPhoto)
    .get(photo_controller_1.getPhotos);
// route to get one photo and search it by ID
router.route('/photos/:id')
    .get(photo_controller_1.getPhoto)
    .delete(photo_controller_1.deletePhoto)
    .put(photo_controller_1.updatePhoto);
exports.default = router;
