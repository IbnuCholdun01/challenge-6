const express = require("express");
const router = express.Router();
const mediaRouter = require("./media.route");
const userRouter = require("./auth.route");

router.use("/v1/media", mediaRouter);
router.use("/v1/user", userRouter);
module.exports = router;
