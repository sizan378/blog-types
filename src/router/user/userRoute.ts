// external imports
import express from 'express';
const router = express.Router();

// internal imports
import { userList } from '../../controller/user/user'
import { userValidation, validationHandler } from '../../middleware/user/userValidation'
import { userRegister } from '../../controller/user/user'

// router.get("/user-list", )
router.route("/")
    .get(userList)
    .post(userValidation, validationHandler, userRegister)

export default router