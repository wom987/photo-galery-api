import {Schema, model, Document} from 'mongoose';

const schema=new Schema({
    tittle:String,
    description:String,
    imagePath:String
});

// creating the interface 
interface IPhoto extends Document{
    tittle:string ;
    description :string;
    imagePath: string;
};
export default model<IPhoto>('Photo',schema);