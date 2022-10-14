const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

const {
	getAllProduct,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductDetails,
	getAdminProduct,
	getlatestAppliances,
	getAllTelevisions,
	getClothing,
	getDealsOfTheDay,
	getProductsKitchenUnder,
	getDeo
} = require("../controller/productController");


const router = express.Router();



module.exports = router;


router.route("/products").get(getAllProduct);
router.route("/products/latest").get(getlatestAppliances);
router.route("/products/television").get(getAllTelevisions);
router.route("/products/clothing").get(getClothing);
router.route("/products/dealOfTheDay").get(getDealsOfTheDay);
router.route("/products/kitchen/under399").get(getProductsKitchenUnder);
router.route("/products/deo").get(getDeo);
router.route("/admin/products").get(isAuthenticatedUser , authorizeRole("admin"),getAdminProduct);
router.route("/getProductDetails/:id").get(getProductDetails);
router.route("/admin/createProduct").post(isAuthenticatedUser , authorizeRole("admin"),createProduct);
router.route("/admin/updateProduct/:id").put(isAuthenticatedUser , authorizeRole("admin"),updateProduct);
router.route("/admin/deleteProduct/:id").delete(isAuthenticatedUser , authorizeRole("admin"),deleteProduct);
