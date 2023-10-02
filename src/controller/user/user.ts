// external imports
import { Request, Response } from "express";
import bcrypt = require("bcrypt");

// internal imports
import User from '../../model/user/userSchema'


async function userList(req: Request, res: Response){
    res.status(200).json({
        message: "User_list is called"
    })
}


async function userRegister(req: Request, res: Response){
    try {
        let newUser 
        const passwordHash = await bcrypt.hash(req.body.password, 10)
        newUser = new User({
            ...req.body,
            password: passwordHash
        })
        await newUser.save()
        res.status(200).json({
            message: "Successfully User Registered"
        })
    } catch (error: any) {
        res.status(error.status).json({message: error.message, stack: error.stack})
    }
}

async function userLogin(req: Request, res: Response){
    try {
        
    } catch (error: any) {
        
    }
}


export { userList, userRegister }