const express = require("express");
const {
	registerUser,
	loginUser,
	logout,
	getUserDetails,
	updatePassword,
	updateProfile,
	getAllUsers,
	deleteUser,
	changeUserRole
} = require("../controller/userController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/me/updatePassword").put(isAuthenticatedUser, updatePassword);


router.route("/admin/users").get(isAuthenticatedUser,authorizeRole("admin"),getAllUsers);

router.route("/admin/delete/user/:id").delete(isAuthenticatedUser,  authorizeRole("admin") , deleteUser)

router.route("/admin/update/role").put(isAuthenticatedUser , authorizeRole("admin") , changeUserRole)
module.exports = router;