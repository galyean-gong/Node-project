var mongoose = require('mongoose');
var db = mongoose.connection;
 mongoose.connect('mongodb://127.0.0.1:27017/shopdb');
db.on('err',()=>{
	console.log('this is err')
})
db.once('open',()=>{
	console.log('this is good')
	var Movie = mongoose.model('movie',{
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
});

	Movie.create({
			doctor:'杰弗里·拉什',
        	title:'加勒比海盗5：死无对证',
        	language:'英语',
        	country:'美国',
        	summary:'故事发生在《加勒比海盗3：世界的尽头》沉船湾之战20年后。男孩亨利（布兰顿·思怀兹 Brenton Thwaites 饰）随英国海军出航寻找被聚魂棺诅咒的父亲“深海阎王”威尔·特纳（奥兰多·布鲁姆 Orlando Bloom 饰），却在百慕大三角遭遇被解封的亡灵萨拉查船长（哈维尔·巴登 Javier Bardem 饰）。获取自由的萨拉查屠尽加勒比海盗，征服了整个海域。里海海盗王赫克托·巴博萨船长（杰弗里·拉什 Geoffrey Rush 饰）在女巫Haifaa Meni（格什菲·法拉哈尼 Golshifteh Farahani 饰）口中得知了萨拉查的真实目的：为寻找他的宿敌杰克船长（约翰尼·德普 Johnny Depp 饰）。海盗的命运皆压在落魄的老杰克被封印的黑珍珠号，以及天文学家卡琳娜·史密斯（卡雅·斯考达里奥 Kaya Scodelario 饰',
        	flash:"http://player.youku.com/player.php/Type/Folder/Fid/27327589/Ob/1/sid/XMTU4NjAwMTU2NA==/v.swf",
        	poster:"https://img3.doubanio.com/img/celebrity/large/1243.jpg",
        	year:2012
	},{
			doctor:'艾斯彭·山德伯格',
        	title:'加勒比海盗5：死无对证',
        	language:'英语',
        	country:'美国',
        	summary:'杰弗里·拉什，澳大利亚著名男演员。1971年他在昆士兰大学获得艺术学位以后，签约昆士兰布里斯班戏剧公司，开始了其戏剧生涯。除了参加一些名著的演出以锻炼自己的演技以外，拉什还赴巴黎Jacques Lecoq哑剧学校学习了2年的哑剧。',
        	flash:"http://player.youku.com/player.php/Type/Folder/Fid/27327589/Ob/1/sid/XMTU4NjAwMTU2NA==/v.swf",
        	poster:"https://img3.doubanio.com/img/celebrity/large/58032.jpg",
        	year:2013

	})
})
