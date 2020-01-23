import express from 'express'
import morgan from 'morgan';
import indexRoutes from './routes/index'
import path from 'path';
/// Import to allow comunication through the angular server and the api server// it has been added by npn cors 
import cors from 'cors';

const app = express();
//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan('dev'));
// cors use
app.use(cors());
app.use(express.json());
//routes
app.use('/api',indexRoutes );

//this folder  for this app will be used to store public files 
app.use('/uploads',express.static(path.resolve('uploads')));
export default app; 