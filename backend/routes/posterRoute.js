const express = require("express");
const { createPoster } = require("../controller/posterController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");


const router = express.Router();



module.exports = router;


router.route("/poster/create").post(isAuthenticatedUser , authorizeRole("admin") , createPoster);
