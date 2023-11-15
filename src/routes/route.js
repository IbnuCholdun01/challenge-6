const express = require("express");
const router = express.Router();
const mediaRouter = require("./media.route");

router.use("/v1/media", mediaRouter);
module.exports = router;
