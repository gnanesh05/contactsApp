import express from 'express'
import { createContact, deleteContact, getContact, getContacts, updateContact } from '../controllers/contactController.js'
import validateToken from '../middleware/validateToken.js'
const router = express.Router()

router.use(validateToken)

/**
 * @swagger
 * tags:
 *   - name: Contacts
 *     description: API endpoints for managing contacts
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieve a list of all contacts.
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []  # This indicates that a JWT token is required for authentication
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         description: Bearer token for authentication.
 *         Format: Bearer {accessToken}.
 *     responses:
 *       200:
 *         description: Successfully retrieved all contacts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "123"
 *                   name:
 *                     type: string
 *                     example: "Jane Doe"
 *                   phone:
 *                     type: string
 *                     example: "123-456-7890"
 *                   email:
 *                     type: string
 *                     example: "janedoe@example.com"
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       500:
 *         description: Server error.
 */
router.get("/", getContacts)

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get a specific contact by ID
 *     tags:
 *       - Contacts
 *     description: Retrieve details of a contact using their unique ID. Requires an authorization header with a valid access token.
 *     security:
 *       - bearerAuth: []  # Indicates that this route requires a Bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the contact.
 *         schema:
 *           type: string
 *       - in: header
 *         name: authorization
 *         required: true
 *         description: Bearer token for authentication.
 *         Format: Bearer {accessToken}.
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Successfully retrieved contact details.
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
 *       404:
 *         description: Contact not found.
 *       500:
 *         description: Server error.
 */
router.get("/:id", getContact)

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact.
 *     description: This endpoint allows you to create a new contact by providing the contact details in the request body.
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []  # This indicates that a JWT token is required for authentication
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *         description: Bearer token for authentication.
 *         Format: Bearer {accessToken}.
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               phone:
 *                 type: string
 *                 example: "123-456-7890"
 *               email:
 *                 type: string
 *                 example: "janedoe@example.com"
 *     responses:
 *       201:
 *         description: Successfully created the contact.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 name:
 *                   type: string
 *                   example: "Jane Doe"
 *                 phone:
 *                   type: string
 *                   example: "123-456-7890"
 *                 email:
 *                   type: string
 *                   example: "janedoe@example.com"
 *       400:
 *         description: Bad request. Invalid data provided.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       500:
 *         description: Server error.
 */
router.post("/", createContact)

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update an existing contact
 *     description: This endpoint allows you to update an existing contact by providing the contact ID and updated details in the request body.
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []  # This indicates that a JWT token is required for authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact to be updated
 *         schema:
 *           type: string
 *       - in: header
 *         name: authorization
 *         required: true
 *         description: Bearer token for authentication.
 *         Format: Bearer {accessToken}.
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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
 *               phone:
 *                 type: string
 *                 example: "987-654-3210"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *     responses:
 *       200:
 *         description: Successfully updated the contact.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 phone:
 *                   type: string
 *                   example: "987-654-3210"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *       400:
 *         description: Bad request. Invalid data provided.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       404:
 *         description: Contact not found. Invalid contact ID.
 *       500:
 *         description: Server error.
 */
router.put("/:id", updateContact)

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     description: This endpoint allows you to delete a contact by providing the contact ID.
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []  # This indicates that a JWT token is required for authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact to be deleted
 *         schema:
 *           type: string
 *       - in: header
 *         name: authorization
 *         required: true
 *         description: Bearer token for authentication.
 *         Format: Bearer {accessToken}.
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Successfully deleted the contact.
 *       401:
 *         description: Unauthorized. Invalid or missing access token.
 *       404:
 *         description: Contact not found. Invalid contact ID.
 *       500:
 *         description: Server error.
 */
router.delete("/:id", deleteContact)

export default router;