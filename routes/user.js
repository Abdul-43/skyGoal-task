import {signup,login,userDetails} from "../controller/user.js"
import express from 'express';
import { authenticateToken } from "../middleware/auth.js";

const router=express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/userdetails',authenticateToken,userDetails);


export default router;