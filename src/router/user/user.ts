// external imports
import express, {Request, Response} from 'express';
const router = express.Router();




router.get("/user-list", (req: Request, res: Response)=>{
    res.status(200).json({
        message: "i got user list"
    })
}) 


export default router