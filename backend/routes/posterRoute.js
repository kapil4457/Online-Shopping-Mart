const express = require("express");
const { createPoster, getLatestPoster } = require("../controller/posterController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");


const router = express.Router();



module.exports = router;


router.route("/poster/create").post(isAuthenticatedUser , authorizeRole("admin") , createPoster);

router.route("/admin/latest/poster").get(isAuthenticatedUser , authorizeRole("admin") , getLatestPoster);
