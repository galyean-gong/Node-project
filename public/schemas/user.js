var mongoose = require("mongoose");

var User = mongoose.model("user",{
         name:String,
         password:String,
         isAdmin:Boolean
       });

module.exports = User;
