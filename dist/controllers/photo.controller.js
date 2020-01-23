"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
// imported fs-extra that supports promises 
const fs_extra_1 = __importDefault(require("fs-extra"));
const Photo_1 = __importDefault(require("../models/Photo"));
// get all the photos saved in the app 
async function getPhotos(req, res) {
    const photos = await Photo_1.default.find();
    return res.json(photos);
}
exports.getPhotos = getPhotos;
// search the photo by ID
async function deletePhoto(req, res) {
    const { id } = req.params;
    // code to delete the photo info from the database         
    const photo = await Photo_1.default.findByIdAndRemove(id);
    //Code to delete photo from the storage
    if (photo) {
        await fs_extra_1.default.unlink(path_1.default.resolve(photo.imagePath));
    }
    return res.json({
        message: 'Photo deleted successfuly',
        photo
    });
}
exports.deletePhoto = deletePhoto;
//Deleta a photo 
async function getPhoto(req, res) {
    const { id } = req.params;
    const photo = await Photo_1.default.findById(id);
    console.log();
    return res.json(photo);
}
exports.getPhoto = getPhoto;
// Update a photo 
async function updatePhoto(req, res) {
    //Get id to update 
    const { id } = req.params;
    ///Get params to update 
    const { tittle, description } = req.body;
    ///update data 
    const updatedPhoto = await Photo_1.default.findByIdAndUpdate(id, {
        tittle,
        description
        //conf to get the udpated item 
    }, { new: true });
    //console.log(updatePhoto);
    return res.json({
        message: 'The data has been updated ',
        updatedPhoto
    });
}
exports.updatePhoto = updatePhoto;
//Create a photo 
async function createPhoto(req, res) {
    const { tittle, description } = req.body;
    console.log(req.file);
    const newPhoto = {
        tittle: tittle,
        description: description,
        imagePath: req.file.path
    };
    const photo = new Photo_1.default(newPhoto);
    await photo.save();
    console.log('Saving Photo');
    console.log(req.body);
    return res.json({
        message: 'Photo has been saved',
        photo
    });
}
exports.createPhoto = createPhoto;
