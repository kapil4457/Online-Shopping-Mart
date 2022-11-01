const Product = require("../models/productModel");
const cloudinary = require("cloudinary").v2;
const  axios  = require( 'axios');

exports.getAllProduct = (async (req, res, next) => {
    try{

        let products = await Product.find();
		const productCount =await Product.countDocuments();
       await  res.status(200).send({ success: true,  products,productCount });
    }catch(err){
        console.log(err.message)
    }
});





exports.getList = async(req,res,next)=>{
try{
	const temp = await Product.find();
	let products = [];
	let name = await req.params.name.toLowerCase();
	  temp.forEach(async(product)=>{
		let category =  product.category.toLowerCase();
	let subCategory =  product.subCategory.toLowerCase();
	let description =  product.description.toLowerCase();
	let brand = product.brand.toLowerCase();
	let nameOfProduct =  product.name.toLowerCase();
   if(  category.includes(`${name}`) ||  subCategory.includes(`${name}`) || description.includes(`${name}`) || nameOfProduct.includes(`${name}`) ||    name.includes(`${category}`) ||  name.includes(`${subCategory}`) || name.includes(`${description}`) || name.includes(`${nameOfProduct}`  || brand.includes(`${name}`) || name.includes(`${brand}`)) ){
	   products.push(product);
   }
	})

			  
    const t1 = new Set();

    products.forEach((item) => {
      t1.add(item.brand);
    });

    const t2 = [];
    t1.forEach((item) => {
      t2.push({ name: item });
    });

	

	await res.status(200).send({success: true, products , allBrands:t2})


}catch(err){
	await res.status(404).send({ success: false, message : err.message })
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


	


	req.body.user = await req.user.id;

	const product = await Product.create(req.body);

	await res.status(201).json({
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

	await res.status(404).send({success :false , message : "Product not found" });
            return 
			} else {
	
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


exports.getLatest = async(req,res,next)=>{
	try{
		const products = await Product.find({id:-1}).limit(20);
				  
		const t1 = new Set();

		products.forEach((item) => {
		  t1.add(item.brand);
		});
	
		const t2 = [];
		t1.forEach((item) => {
		  t2.push({ name: item });
		});
		  
		await res.status(200).send({success:true , products,allBrands:t2});
		return

	}catch(err){
		await res.status(500).json({success:false , message : err.message}); 
	}
}