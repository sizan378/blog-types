// external imports
import express from 'express';
const router = express.Router();

// internal imports
import { userList } from '../../controller/user/user'
import { userValidation, validationHandler } from '../../middleware/user/userValidation'
import { userLoginValidator, userValidationHandler } from '../../middleware/user/userLoginValidation'
import { userRegister, userLogin } from '../../controller/user/user'
import tokenValidation  from '../../utils/tokenValidation'

router.route("/")
    .get(userList)
    .post(userValidation, validationHandler, userRegister)

router.route("/login")
    .post(userLoginValidator, userValidationHandler, userLogin)

router.use(tokenValidation)

export default router