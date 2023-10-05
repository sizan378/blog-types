// external imports
import { Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import type { JwtPayload } from "jsonwebtoken"

interface userRequest extends Request {
    user?: string | JwtPayload
  }

async function tokenValidation(req: userRequest, res: Response, next: NextFunction){
    const tokenHeader = req.headers.authorization
    if (tokenHeader === undefined){
        res.status(500).json({
            message: "Token is required"
        })
    }


    if (tokenHeader && tokenHeader.startsWith("Bearer ")){
        const token = tokenHeader.split(" ")[1]
        try {
            const tokenValidateCheck = await jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: string, username: string };
            req.user = tokenValidateCheck
            next();
        } catch (error:any) {
            res.status(error.status).json({
                message: error.message,
                stack: error.stack
            })
        }
    }
    
}


export default tokenValidation