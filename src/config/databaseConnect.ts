import mongoose from "mongoose";


async function connectToDatabase(){
    const db_url:string= process.env.MONGODB_URL as string
    
    try {
        await mongoose.connect(db_url)
        console.log("database connection established")
    } catch (error) {
        console.log(error)
    }
}

export default connectToDatabase