
const User = require("../models/UserModels");
const sendToken = require("../utils/jwtToken");
const { use } = require("express/lib/router");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");


//Register a User

exports.registerUser = (async (req, res, next) => {
    try{

 
        let role = "user";
        if(req.body.role){
            role = "admin";
        }
        
        const { name, email, password ,avatar} = req.body;
        
        const user = await User.create({
            name,
            email,
            password,
            role,
            avatar
        });
        
        sendToken(user, 201, res);
    }catch(err) {
        res.send({success:false  , message : err.stack});
    }
    });




    //Login User

exports.loginUser = (async (req, res, next) => {
    try{
        const { email, password } = await req.body;
        
        if (!email || !password) {
           await res.status(400).json({success :false , message : "Invalid Email or Password"})
           return;

        }
        
        const user = await User.findOne({ email }).select("+password");
        
        if (!user) {
            await res.status(400).json({success :false , message : "Invalid Email or Password"})
           return;

        }
        
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
          await  res.status(400).json({success :false , message : "Invalid Email or Password"})
           return;
        }
        
         sendToken(user, 200, res);
    }catch(err){
       await res.json({success:false , message : err.message})
    }
    });
    
//Logout User

exports.logout = (async (req, res, next) => {
    try{

        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        
        res.status(200).json({ success: true, message: "logged out successfully" });
    }catch(err){
        res.send({success  :false , message : err.message});
        
    }
    });



//Get User Details

exports.getUserDetails = (async (req, res, next) => {
    try{
        const cookie = req.headers.cookie;
        if(!cookie){
            res.status(404).send({success:false , message : "You have already Logged in !"})
            return;
        }

        const user = await User.findById(req.user.id);
        
        res.status(200).json({
            success: true,
            user,
        });
    }catch(err){
        res.status(400).send({success:false  , message : err.message})
    }
});

//Update User password

exports.updatePassword = (async (req, res, next) => {
    try{

        const user = await User.findById(req.user.id).select("+password");
        
        const isMatch = await user.comparePassword(req.body.oldPassword);
        
        if (!isMatch) {
            res.status(400).send({success :false , message :"Old Password is incorrect"});
            return 
        }
        
        if (req.body.newPassword !== req.body.confirmPassword) {
            res.status(400).send({success :false , message :" New Password and Confirm Password does not match"});
            return         }
        
        user.password = req.body.newPassword;
        
        await user.save();
        
        sendToken(user, 200, res);
    }catch(err){
        res.send({success :false , message :err.message});
        
    }
});

//Update User Profile

exports.updateProfile = (async (req, res, next) => {
    try{

        const newUserData = {
            name: req.body.name,
            email: req.body.email,
	};
    
	//Cloudinary
	// if (req.body.avatar !== "") {
        // 	const user = await User.findById(req.user.id);
        
        // 	const imageId = user.avatar.public_id;
        
        // 	await cloudinary.v2.uploader.destroy(imageId);
        
        // 	const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            // 		folder: "avatars",
            // 		width: 150,
            // 		crop: "scale",
            // 	});
            
            // 	newUserData.avatar = {
                // 		public_id: myCloud.public_id,
                // 		url: myCloud.secure_url,
                // 	};
                // }
                
                const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: true,
                });
                
                res.status(200).json({ success: true , user : user});
            }catch(err){
                res.status(400).send({success : false , message : err.message})
            }
});



exports.getAllUsers = async(req,res,next)=>{
    try{
        const users = await User.find();
        const userCount =await  users.length;
        res.status(200).send({success:true , users,userCount})
    }catch(error){
        res.status(400).send({success : false , message : err.message})
    }
}