const express = require("express");
const router = express.Router();
const mediaRouter = require("./media.route");
const authRouter = require("./auth.route");
const userRouter = require("./user.route");

router.use("/v1/media", mediaRouter);
router.use("/v1/auth", authRouter);
router.use("/v1/user", userRouter);

module.exports = router;
