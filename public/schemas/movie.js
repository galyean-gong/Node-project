var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({

        	doctor:String,
        	title:String,
        	language:String,
        	country:String,
        	summary:String,
        	flash:String,
        	poster:String,
        	year:Number,
        	// 跟新事件的
        	meta:{
        		createAt:{
        			type:Date,
        			default:Date.now()
        		},
        		updateAt:{
        			type:Date,
        			default:Date.now()
        		}
        	}

  	
})
//每一次保存之前会调用这个方法;
MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    }else{
        this.meta.updateAt = Date.now()
    }
    next()
})
	


// MovieSchema.statics = {
// 	fetch:function(cb){
// 		return this
// 		.find({})
// 		.sort({'meta.createAt'})
// 		.exec(cb)
// 	},
// 	findById:function(id,cb){
// 		return this
// 		.findOne({_id:id}).exec(cb)
// 	},
// }
module.exports = MovieSchema;