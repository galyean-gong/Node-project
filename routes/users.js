var express = require('express');
var router = express.Router();
var path = require("path");
var User = require(path.join(__dirname,'../public/models/user.js'));
var Err = require(path.join(__dirname,'../views/message/errinfo.js'));

/* GET users listing. */
router.post('/user/regist', function(req, res) {
	if(req.body['name'] && req.body['pas']){
		console.log(req.body)
		var name = req.body.name
		User.findOne({name}).then((data)=>{
			if(data){
				Err.showSuccess("/index","用户名已经存在",res)
		// 		res.render("message/errinfo",{
		// 	urlPath:"/index",
		// 	message:"用户名已经存在"
		// })
			}else{
				req.body.isAdmin = req.body.isAdmin?true:false;
				if(req.body.name=="admin"){
					req.body.isAdmin = true;
				}
				User.create(req.body).then((data)=>{
					if(data){
						
						res.cookie('username', data.name);
						res.redirect("/index");
					}else{
						res.render("message/errinfo",{
								urlPath:"/index",
								message:"用户注册失败,请重试"
						});
					}
				},(err)=>{
					res.render("message/errinfo",{
						urlPath:"/index",
						message:"服务器发生错误"
					});	
				})
			}
		},(err)=>{
			res.render("message/errinfo",{
						urlPath:"/index",
						message:"服务器发生错误"
					});	
		})

	}else{
		
    	res.render("message/errinfo",{
			urlPath:"/index",
			message:"用户名密码不能为空，请重新注册"
		})
	}
		
});

router.post("/user/login",(req,res)=>{
	if(req.body["name"] && req.body["pas"]){
		var name = req.body["name"];
		var pas = req.body["pas"];
		User.findOne({name}).then(function(data){
			if(data){
				//比较密码
				if(pas == data.pas){
					res.cookie('username', data.name);
						res.redirect("/index");
				}else {
					res.render("message/errinfo",{
						urlPath:"/index",
						message:"用户密码错误"
					})
				}
			}else {
				res.render("message/errinfo",{
				urlPath:"/index",
					message:"不存在该用户名称"
				})
			}
		},function(err){
			res.render("message/errinfo",{
					urlPath:"/index",
					message:"服务器错误,请求重试"
			})
		})
	}else {
		//res.send("没有提交用户名和密码");
		res.render("message/errinfo",{
			urlPath:"/index",
			message:"没有提交用户名和密码"
		})
	}
});


 
router.get("/user/loginout",(req,res)=>{
	res.clearCookie("username");
	res.redirect("/index");
})

module.exports = router;
