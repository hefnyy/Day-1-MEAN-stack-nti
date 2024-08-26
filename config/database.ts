import mongoose from "mongoose";

const database = () => {
    mongoose.connect(process.env.DB!).then(() => {
        console.log(`Database connected to :${process.env.DB}`);       
    }).catch((err:Error) => {
       console.log(err); 
    })    
}; 

export default database;