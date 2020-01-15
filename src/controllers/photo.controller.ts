import {Request,Response} from 'express';

import path from 'path';
// imported fs-extra that supports promises 
import fs, { closeSync } from 'fs-extra'
import Photo from '../models/Photo'
// get all the photos saved in the app 
export async function getPhotos(req:Request , res: Response):Promise<Response>{
    const photos =await Photo.find();
    return res.json(photos);
}
// search the photo by ID
export async function deletePhoto(req:Request, res:Response): Promise<Response>{
    const {id}=req.params;
        // code to delete the photo info from the database         
        const photo =await Photo.findByIdAndRemove(id);
        //Code to delete photo from the storage
        if (photo) {
            await fs.unlink(path.resolve(photo.imagePath));
        }
        return res.json({
            message:'Photo deleted successfuly',
            photo
        });
    
}
//Deleta a photo 
export async function getPhoto(req:Request, res:Response): Promise<Response>{
    const {id}=req.params;
    const photo =await Photo.findById(id);
    console.log();
    return res.json(photo);
}
// Update a photo 
export async function updatePhoto(req:Request, res:Response): Promise<Response>{
    //Get id to update 
    const {id}=req.params;
    ///Get params to update 
    const {tittle, description} = req.body;
    ///update data 
    const updatedPhoto=await Photo.findByIdAndUpdate(id,{
        tittle,
        description
        //conf to get the udpated item 
    },{new: true});
    //console.log(updatePhoto);
    return res.json({
        message:'The data has been updated ',
        updatedPhoto
    });
    
}
//Create a photo 
export  async function createPhoto(req : Request ,res : Response) :Promise<Response>{
    const {tittle, description}=req.body;
    console.log(req.file);
    const newPhoto ={
        tittle: tittle,
        description: description,
        imagePath:req.file.path
    };
    const photo =new Photo(newPhoto);
    await photo.save();
    console.log('Saving Photo')
    console.log(req.body);
    return res.json({
        message: 'Photo has been saved',
        photo
    })
}
 