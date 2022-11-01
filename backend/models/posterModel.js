const mongoose = require("mongoose");

const posterSchema = new mongoose.Schema({
    brand:{
        type:String,
        required:true,
    },
    image:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }]
});


module.exports = mongoose.model("Poster" , posterSchema);    