const mongoose = require('mongoose')

const productSchema =new mongoose.Schema({
    name:{
        type: String,
        required:[true , "Please enter product name"],
        trim: true,
    },

    description:{
        type:String,
        required:[true , "Please enter product description"]
    },
    price:{
        type:Number,
        required:true
    },
   
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },

    }],
    brand:{
        type:String,
        required:[true , "Please enterBrand Name"]
    }
    ,
    category:{
        type:String,
        required:[true,"Please Enter Product Category"]
    },
    subCategory:{
        type:String,
        required:[true,"Please Enter Product Sub Category"]
    },
    Stock:{
        type:Number,
        required:[true , "Please enter product Stock"],
        default:1,
    },
   
    Stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
      },
  
    createdAt:{
        type:Date,
        default:Date.now
    }
    ,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true, 
    },
    dealOfTheDay:false,
})

module.exports = mongoose.model("Product" ,productSchema )