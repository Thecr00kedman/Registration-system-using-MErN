import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URL = process.env.MONGO_URL;
const connection = async()=> {
    try {
        await mongoose.connect(MONGO_URL,
        {
            useUnifiedTopology:true,
        useNewUrlParser:true
    })
    console.log('database is connected successfully')
    } catch (error) {
        console.log(error,'error while connecting to database')
        

        
    }
}
export default connection;
