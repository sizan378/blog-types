// external imports
import express from 'express';
const router = express.Router();

// internal imports
import { userList } from '../../controller/user/user'

router.get("/user-list", userList) 


export default router