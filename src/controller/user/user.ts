// external imports
import { Request, Response } from "express";
import bcrypt = require("bcrypt");
import jwt from 'jsonwebtoken'

// internal imports
import User from '../../model/user/userSchema'


interface PayloadType {
    userName: string,
    phoneNumber: number,
    email: string | null,
}

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
        const user = await User.findOne({phoneNumber: req.body.phoneNumber})
        if (user){
            const passwordCompared = await bcrypt.compare(req.body.password, user.password)

            if (passwordCompared){
                const payload:PayloadType = {
                    userName: user.firstName + " " + user.lastName,
                    phoneNumber: user.phoneNumber,
                    email: user.email
                }

                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: "1h"})
                const refreshToken = jwt.sign({ user: {
                    id: user.id,
                }}, process.env.JWT_SECRET_KEY!, { expiresIn: "10d"})
                
                await User.findOneAndUpdate({phoneNumber: user.phoneNumber}, {refreshToken: refreshToken})
                res.status(200).json({
                    access: token,
                    refresh: refreshToken
                })
            }

        } else {
            res.status(404).json({message: "User not found"})
        }
    } catch (error: any) {
        res.status(error.status).json({message:error.message, stack: error.stack})
    }
}


export { userList, userRegister, userLogin }