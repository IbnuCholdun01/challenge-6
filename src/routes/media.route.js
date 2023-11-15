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

router.post("/image", multerMiddleware.image, postImage);
router.get("/image", getAllImage);
router.get("/image/:id", getOneImage);
router.put("/image/:id", multerMiddleware.image, updateOneImage);
router.delete("/image/:id", deleteOneImage);

module.exports = router;
