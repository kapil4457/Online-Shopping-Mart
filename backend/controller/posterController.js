const Poster = require("../models/posterModel");


exports.createPoster = async (req, res, next) => {
    try{
	req.body.user = await req.user.id;

	const poster = await Poster.create(req.body);

	await res.status(201).json({
		success: true,
		poster,
	});

    }catch(err){
		await res.status(500).json({success: false, message: err.message});
    }
}


exports.getLatestPoster = async (req, res, next) => {
	try{
		const poster = await Poster.find().limit(7);
		await res.status(200).json({success:true , poster});
	}catch(error){
		await res.status(500).json({success:fail , message: error.message});
	}
}