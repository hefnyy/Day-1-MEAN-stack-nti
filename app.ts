import express from 'express';
import dotenv from "dotenv";
import database from './config/database';
import mountRoutes from './routes';
import { Server } from 'http';

const app: express.Application = express()

let server:Server;

dotenv.config();

app.use(express.json())

app.use(express.static('uploads'))

database();

mountRoutes(app);

// app.get('/', function (req:express.Request, res:express.Response) {
//     res.json({message:"hello App!"})
// })

server = app.listen(process.env.PORT,() => {
    console.log(`App is listen on port ${process.env.PORT}`)
})

process.on('unhandledRejection',(err:Error)=>{
    console.error(`unhandledRejection ${err.name} | ${err.message}`);
    server.close(() => {
        console.error('Shutting down the app');
        process.exit(1);
        
    });
});