const Product = require("../models/productModel");
const cloudinary = require("cloudinary").v2;



exports.getAllProduct = (async (req, res, next) => {
    try{

        let products = await Product.find();
		const productCount =await Product.countDocuments();
       await  res.status(200).send({ success: true,  products,productCount });
    }catch(err){
        console.log(err.message)
    }
});

exports.getlatestAppliances=async(req,res,next)=>{
	try{
		let tele = await Product.find({category:'Television'}).skip(Product.count()-8);
		let refri = await Product.find({category:'Refrigerator'}).skip(Product.count()-8);
		let ac = await Product.find({category:'Air Conditioner'}).skip(Product.count()-8);
		let micro = await Product.find({category:'Microwave'}).skip(Product.count()-8);
		await res.status(200).send({ success: true,tele , refri ,ac ,micro});

	}catch(err){
		await res.status(500).json({success: false, message: err.message});
	}
}


exports.getAllTelevisions = async(req,res,next)=>{
	try{

		let products = await Product.find({categery : 'Television'});
		await res.status(200).send({ success: true,products});

	}catch(err){
		await res.status(500).json({success: false, message: err.message});

	}
}

exports.getClothing =async(req,res,next)=>{
	try{
		let products = await Product.find({categery : 'Clothing'});
		await res.status(200).send({ success: true,products});
	}catch(err){
		await res.status(500).json({success: false, message: err.message});

	}
}


exports.getDealsOfTheDay = async(req,res,next)=>{
	try{

		let products = await Product.find({dealOfTheDay : true});
		await res.status(200).json({success: true, products});
	}catch(err){
		await res.status(500).json({success: false, message: err.message});

	}
}

exports.getProductsKitchenUnder = async(req,res,next)=>{
	try{
		const products = await Product.find({category:'Kitchen' , price :  {$lte : 399}});
		await res.status(200).json({success: true, products});
	}catch(err){
		await res.status(500).json({success: false, message: err.message});
	}
}


exports.getDeo = async(req,res,next)=>{
	try{
const products = await Product.find({category:"Deo"});
await res.status(200).json({success: true, products});
	}catch(err){
		await res.status(500).json({success: false, message: err.message});	
	}
}
exports.getAdminProduct = async (req, res, next) => {
try{
    let data = await Product.find({listedBy:req.user.id});

    await res.status(200).json({success:true , products:data });
}catch(error){
	await res.status(500).json({success: false, message: err.message});
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
		await res.status(500).json({success: false, message: err.message});
    }
}



exports.updateProduct = (async (req, res) => {
    try{
	let product = await Product.findById(req.params.id);
	if (!product) {
		await res.status(404).send({success: false, message: 'Product not found'});
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

	await res
		.status(200)
		.json({ success: true, message: "Product updated successfully" });

    }catch(err) {
		await res.status(500).json({success: false, message: err.message});
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
		await res
			.status(200)
			.json({ status: true, message: "Product deleted successfully" });
	}
}catch(err) {
	await res.status(500).json({success: false, message: err.message});
}
});


// Get product details
exports.getProductDetails = (async (req, res, next) => {
    try{

        
        const product = await Product.findById(req.params.id);
        if (!product) {
			await res.status(404).send({success :false , message : "Product not found" });
            return 
        } else {
            await res.status(200).json({ success: true, product });
        }
    }catch(err){
		await res.status(500).json({success: false, message: err.message});
    }
});