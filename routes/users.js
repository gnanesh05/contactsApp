import express from 'express'
import { GetCurrentUser, GetUsers, LoginUser, RegisterUser } from '../controllers/userController.js';
import validateToken from '../middleware/validateToken.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API endpoints for managing users
 */

// router.get("/",GetUsers)

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       500:
 *         description: Server error.
 */
router.post("/register", RegisterUser)

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and return a JWT token.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful. JWT token provided.
 *       401:
 *         description: Unauthorized. Invalid credentials.
 *       500:
 *         description: Server error.
 */
router.post("/login", LoginUser)

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     summary: Get current user
 *     description: Retrieve the details of the currently authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       500:
 *         description: Server error.
 */
router.get("/current", validateToken, GetCurrentUser)
export default router;