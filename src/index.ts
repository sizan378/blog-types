// external imports
import dotenv from 'dotenv';
import express, {Request, Response, Router} from 'express';
import path from 'path';

// internal imports 
import connectToDatabase from './config/databaseConnect';
import errorHandler from './middleware/errorHandler/errorHandler';

const router = Router();
const app = express();
dotenv.config()

// get server configuration port
const PORT = process.env.PORT || 5000



// database configuration
connectToDatabase()

// request parser configuration
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static folder setup
app.use(express.static(path.join(__dirname, 'public')));


// router configuration
app.get("/", (req: Request, res: Response) => {
    console.log("We get all users list");
  
    // Send a response back to the client
    res.status(200).json({ message: "All users list retrieved successfully" });
  });


// error handling
app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})