const Poster = require("../models/posterModel");


exports.createPoster = async (req, res, next) => {
    try{
	req.body.user = await req.user.id;

	const poster = await Poster.create(req.body);

	res.status(201).json({
		success: true,
		poster,
	});

    }catch(err){
		await res.status(500).json({success: false, message: err.message});
    }
}