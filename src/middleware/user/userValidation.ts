// external imports
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// internal imports
import User from '../../model/user/userSchema';

const userValidation = [
    body("firstName")
        .isLength({ min:1})
        .withMessage("First name should not be empty")
        .isAlpha("en-US", {ignore:"-"})
        .withMessage("Name must be anything without alphabet")
        .toLowerCase()
        .trim(),

    body("lastName")
        .isLength({ min:1})
        .withMessage("First name should not be empty")
        .isAlpha("en-US", {ignore:"-"})
        .withMessage("Name must be anything without alphabet")
        .toLowerCase()
        .trim(),
    
    body("age")
        .isLength({min:1})
        .withMessage("Age cannot be empty")
        .custom(async (value) =>{
            try {
                if (value < 0){
                    throw new Error("Age must cannot be negative")
                }
            } catch (error: any) {
                throw new Error(error.message)
            }
        }),
    
    body("email")
        .isEmail()
        .withMessage("Email is required")
        .toLowerCase()
        .custom(async(value)=>{
            try {
                const email = await User.findOne({email: value})
                if (email) {
                    throw new Error("Email is already available")
                }
            } catch (error: any) {
                throw new Error(error.message)
            }
        }),

    body("phoneNumber")
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage("Mobile number must be valid bangladeshi number")
        .custom(async(value)=>{
            try {
                const user = await User.findOne({phoneNumber: value})
                if (user) {
                    throw new Error("Mobile number is already in use")
                }
            } catch (error:any) {
                throw new Error(error.message)
            }
        }),
    
    body("password")
    
    
]


const validationHandler = function (req: Request, res: Response, next: NextFunction) {
    const error = validationResult(req)
    const mappedError = error.mapped()
    console.log(mappedError)

    if (Object.keys(mappedError).length===0){
        next()
    } else {
        res.status(500).json({
            message: mappedError
        })
    }
}

export { userValidation, validationHandler }