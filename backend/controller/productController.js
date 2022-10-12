const Product = require("../models/productModel");
const cloudinary = require("cloudinary").v2;



exports.getAllProduct = (async (req, res, next) => {
    try{

        let products = await Product.find();
        res.status(200).json({ success: true, products });
    }catch(err){
        console.log(err.message)
    }
});


exports.getAdminProduct = async (req, res, next) => {
try{
    let products = await Product.find({listedBy:req.user.id});

    res.status(200).json({success:true , products });
}catch(error){
    console.log(error.message);
}
}

exports.createProduct = async (req, res, next) => {
    try{

    //     let images = [];
	// if (typeof req.body.images === "string") {
	// 	images.push(req.body.images);
	// } else {
	// 	images = req.body.images;
	// }

	// const imagesLink = [];

	// for (let i = 0; i < images.length; i++) {
	// 	const result = await cloudinary.v2.uploader.upload(images[i], {
	// 		folder: "products",
	// 	});
	// 	imagesLink.push({
	// 		public_id: result.public_id,
	// 		url: result.secure_url,
	// 	});
	// }

	// req.body.images = imagesLink;
	req.body.user = req.user.id;

	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product,
	});

    }catch(err){
        console.log(err.message);
    }
}



exports.updateProduct = (async (req, res) => {
    try{
	let product = await Product.findById(req.params.id);
	if (!product) {
		res.status(404).send({success: false, message: 'Product not found'});
		return 
	}

	//Images

	// let images = [];
	// if (typeof req.body.images === "string") {
	// 	images.push(req.body.images);
	// } else {
	// 	images = req.body.images;
	// }

	// if (images !== undefined) {
	// 	// Deleting images from cloudinary

	// 	for (let i = 0; i < product.images.length; i++) {
	// 		await cloudinary.v2.uploader.destroy(product.images[i].public_id);
	// 	}
	// }

	//Adding new images
	// const imagesLink = images;

	// for (let i = 0; i < images.length; i++) {
	// 	const result = await cloudinary.v2.uploader.upload(images[i], {
	// 		folder: "products",
	// 	});
	// 	imagesLink.push({
	// 		public_id: result.public_id,
	// 		url: result.secure_url,
	// 	});
	// }
	// req.body.images = imagesLink;

	product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res
		.status(200)
		.json({ success: true, message: "Product updated successfully" });

    }catch(err) {
        console.log(err.message);
    }
});


// Delete a Product
exports.deleteProduct = (async (req, res, next) => {
    try{

   
	const product = await Product.findById(req.params.id);
	if (!product) {

	res.status(404).send({success :false , message : "Product not found" });
            return 
			} else {
		// Deleting images from cloudinary
		for (let i = 0; i < product.images.length; i++) {
			await cloudinary.v2.uploader.destroy(product.images[i].public_id);
		}
		await product.remove();
		res
			.status(200)
			.json({ status: true, message: "Product deleted successfully" });
	}
}catch(err) {
        console.log(err.message);
}
});


// Get product details
exports.getProductDetails = (async (req, res, next) => {
    try{

        
        const product = await Product.findById(req.params.id);
        if (!product) {
			res.status(404).send({success :false , message : "Product not found" });
            return 
        } else {
            res.status(200).json({ success: true, product });
        }
    }catch(err){
        console.log(err.message);
    }
});