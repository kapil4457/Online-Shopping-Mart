const Order = require("../models/orderModel");
const Product = require("../models/productModel");

//Create New Order
exports.newOrder = (async (req, res, next) => {
	try{

		const {
			itemsPrice,
			taxPrice,
			shippingPrice,
			shippingInfo,
			orderItems,
			paymentInfo,
			totalPrice,
		} = req.body;
		
		
		const order = await Order.create({
			shippingInfo,
			orderItems,
			paymentInfo,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
			paidAt: Date.now(),
			user: req.user.id,
		});
		
		await res.status(201).json({
			success: true,
			order,
		});
	}catch(err){
		await res.status(500).send({ success:false , message : err.message });
	}
	});
	
//getSingle Order
exports.getSingleOrder = (async (req, res, next) => {
	try{

		const order = await Order.findById(req.params.id);
		
		if (!order) {
			res.status(404).send({success: false, message: 'Order not found with this id'});
		}
		
		
		if(order)
		
		await res.status(200).json({
			success: true,
			order,
		});
	}catch(err){
		res.status(500).send({success: false, message: err.message});
	}
	});



//Logged in users
exports.myOrders = (async (req, res, next) => {
	try{

		const orders = await Order.find({ user: req.user._id });
		
	await res.status(200).json({
		success: true,
		orders,
	});
}catch(err){
	await res.status(500).send({success: false, message: err.message });
}
});

//Get all orders(Admin)
exports.getAllOrders = (async (req, res, next) => {
try{

	const orders = await Order.find();
	
	let totalAmount = 0;
	orders.forEach((order) => {
		totalAmount += order.totalPrice;
	});

	await res.status(200).json({
		success: true,
		totalAmount,
		orders,
	});
}catch(err){
	await res.status(500).send({success: false, message: err.message });
}
});

//Update Order Status(Admin)
exports.updateOrder = (async (req, res, next) => {
	try{

		const order = await Order.findById(req.body.id);
		
		if (!order) {
			await res.status(404).send({success: false, message:"Order not found  with this id"});
			return 
		}
		if (order.orderStatus === req.body.status === "Delivered") {
			await res.status(400).send({success: false, message:"You have already delivered this order"});
			return 
		}
		
		if (req.body.status === "Delivered") {
			 order.orderItems.forEach(async (order) => {
				console.log(order);
				await updateStock(order.product, order.quantity);
			});
		}
		const quantity = order.quantity;

	order.orderStatus = req.body.status;
	if (req.body.status === "Delivered") {
		order.deliveredAt = Date.now();
	}
	
	await order.save({ validateBeforeSave: false });
	res.status(200).send({
		success: true,
		order,
		quantity: quantity,
	});
}catch(err){
	res.status(500).send({ success: true, message: err.message });
}
});

async function updateStock(id, quantity) {
	const product = await Product.findById(id);
	product.Stock -= quantity;

	await product.save({ validateBeforeSave: false });
}

//Delete orders(Admin)
exports.deleteOrder = (async (req, res, next) => {
	try{

		const order = await Order.findById(req.params.id);
		
		if (!order) {
			await res.status(404).send({success :false , message : "Order not found with this Id" })
			return
			}
		
		await order.remove();
		
		res.status(200).json({
			success: true,
		});
	}catch(err){
		await res.status(500).json({ success:false , message : err.message })
	}
});

exports.cancelOrder = async(req,res)=>{
	try{

		const order = await Order.findById(req.body.id);
		order.orderStatus  = 'Cancelled';
		await order.save({validateBeforeSave : false});
		await res.status(200).send({success : true , message : "Order Cancelled Successfully"})
	}catch(err){
		await res.status(500).json({ success : false , message : err.message	 })
	}
}