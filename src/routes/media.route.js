const express = require("express");
const router = express.Router();
const multerMiddleware = require("../lib/multer");
const {
  postImage,
  getAllImage,
  getOneImage,
  deleteOneImage,
  updateOneImage,
} = require("../controllers/media.controller");

const { restrict } = require("../middlewares/restrict");

router.use(restrict);

/**
 * @swagger
 * /media/image:
 *   post:
 *     tags:
 *      - "Media"
 *     summary: Post image
 *     description: Post image
 *     parameters:
 *      - name: token
 *        in: header
 *        required: true
 *        type: string
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              image:
 *                type: string
 *                format: binary
 *              title:
 *                type: string
 *              description:
 *                type: string
 *     responses:
 *      '200':
 *        description: Image posted
 *      '401':
 *        description: Unauthorized
 *      '500':
 *        description: Internal server error
 */
router.post("/image", multerMiddleware.image, postImage);

/**
 * @swagger
 * /media/image:
 *   get:
 *     tags:
 *      - "Media"
 *     summary: Get all image
 *     description: Get all image
 *     parameters:
 *      - name: authorization
 *        in: header
 *        required: true
 *        type: string
 *     responses:
 *      '200':
 *        description: Image retrieved
 *      '401':
 *        description: Unauthorized
 *      '500':
 *        description: Internal server error
 */
router.get("/image", getAllImage);

/**
 * @swagger
 * /media/image/{id}:
 *   get:
 *     tags:
 *      - "Media"
 *     summary: Get one image
 *     description: Get one image
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
 *        description: Image retrieved
 *      '401':
 *        description: Unauthorized
 *      '500':
 *        description: Internal server error
 */
router.get("/image/:id", getOneImage);

/**
 * @swagger
 * /media/image/{id}:
 *   put:
 *     tags:
 *      - "Media"
 *     summary: Update one image
 *     description: Update one image
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: string
 *      - name: token
 *        in: header
 *        required: true
 *        type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *     responses:
 *      '200':
 *        description: Image updated
 *      '401':
 *        description: Unauthorized
 *      '500':
 *        description: Internal server error
 */
router.put("/image/:id", multerMiddleware.image, updateOneImage);

/**
 * @swagger
 * /media/image/{id}:
 *   delete:
 *     tags:
 *      - "Media"
 *     summary: Delete one image
 *     description: Delete one image
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
 *        description: Image deleted
 *      '401':
 *        description: Unauthorized
 *      '500':
 *        description: Internal server error
 */
router.delete("/image/:id", deleteOneImage);

module.exports = router;
