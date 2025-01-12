import express from 'express'
import { GetCurrentUser, GetUsers, LoginUser, RegisterUser } from '../controllers/userController.js';
import validateToken from '../middleware/validateToken.js';
const router = express.Router();


router.get("/",GetUsers)
router.post("/register", RegisterUser)
router.post("/login", LoginUser)
router.get("/current", validateToken, GetCurrentUser)
export default router;