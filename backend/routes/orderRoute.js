const express = require("express");
const router = express.Router();
const {
	newOrder,
	getSingleOrder,
	myOrders,
	getAllOrders,
	updateOrder,
	deleteOrder,
	cancelOrder
} = require("../controller/orderController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

// Routes

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/order/cancel").put(isAuthenticatedUser, cancelOrder);

router
	.route("/admin/orders")
	.get(isAuthenticatedUser, authorizeRole("admin"), getAllOrders);

router
	.route("/admin/order/:id")
	.put(isAuthenticatedUser, authorizeRole("admin"), updateOrder)
	.delete(isAuthenticatedUser, authorizeRole("admin"), deleteOrder);
module.exports = router;