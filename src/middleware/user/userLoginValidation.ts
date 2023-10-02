// external imports
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';



const userLoginValidator = [
    body("phoneNumber")
        .isMobilePhone('bn-BD', {
            strictMode: true,
        })
        .withMessage("Mobile number must be valid bangladeshi number"),
    
    body("password")
]


const userValidationHandler = function (req: Request, res: Response, next: NextFunction) {
    const error = validationResult(req)
    const mappedError = error.mapped()
    
    if (Object.keys(mappedError).length===0){
        
    }
}