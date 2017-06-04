var mongoose = require("mongoose");

var User = mongoose.model("user",{
         name:String,
         pas:String,
         isAdmin:Boolean
       });

module.exports = User;