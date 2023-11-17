const express = require("express");
const router = express.Router();

const {
  register,
  login,
  authenticate,
} = require("../controllers/auth.controller");
const { CheckRegister } = require("../middlewares/middleware");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *      - "Auth"
 *     summary: Register
 *     description: Register new user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *      '200':
 *        description: User registered
 *      '500':
 *        description: Internal server error
 *      '400':
 *        description: Bad request
 */

router.post("/register", CheckRegister, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *      - "Auth"
 *     summary: Login
 *     description: Login user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *      '200':
 *        description: User logged
 *      '401':
 *        description: Unauthorized
 *      '500':
 *        description: Internal server error
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/authenticate:
 *   get:
 *     tags:
 *      - "Auth"
 *     summary: Authenticate
 *     description: Authenticate user
 *     responses:
 *      '200':
 *        description: User authenticated
 *      '401':
 *        description: Unauthorized
 *      '500':
 *        description: Internal server error
 */
router.get("/authenticate", authenticate);

module.exports = router;
