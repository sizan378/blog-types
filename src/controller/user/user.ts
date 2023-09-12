// external imports
import { Request, Response } from "express";

async function userList(req: Request, res: Response){
    console.log("userList is called");
    res.status(200).json({
        message: "User_list is called"
    })
}


export { userList }