const express = require("express");
const router = express.Router();
const { getOneUser } = require("../controllers/user.controller");

const { restrict } = require("../middlewares/restrict");

router.use(restrict);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *      - "Users"
 *     summary: Get one user
 *     description: Get one user
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: string
 *      - name: token
 *        in: header
 *        required: true
 *        type: string
 *     responses:
 *      '200':
 *        description: user retrieved
 *      '401':
 *        description: Unauthorized
 *      '500':
 *        description: Internal server error
 */
router.get("/:id", getOneUser);

module.exports = router;
