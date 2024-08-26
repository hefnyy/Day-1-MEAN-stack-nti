import express from 'express';
import dotenv from "dotenv";
import database from './config/database';
import mountRoutes from './routes';

const app: express.Application = express()
dotenv.config();
app.use(express.json())

database();

mountRoutes(app);

app.get('/', function (req:express.Request, res:express.Response) {
    res.json({message:"hello App!"})
})

app.listen(process.env.PORT,() => {
    console.log(`App is listen on port ${process.env.PORT}`)
})