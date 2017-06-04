var express = require('express');
var router = express.Router();
 //_.extend用新对象里的字段替换老的字段
var _ = require('underscore');
var path = require("path");
var Movie = require(path.join(__dirname,'../public/models/movie.js'));
var User = require(path.join(__dirname,'../public/models/user.js'));
var Err = require(path.join(__dirname,'../views/message/errinfo.js'));


/* GET home page. */
router.get('/', function(req, res, next) {
    //重定向
    res.redirect('/index');
    res.render('index', { title: '影视天下' });
});
router.get('/index', function(req, res, next) {
     var page = req.query.page || 1;
       var pageCount = 6;
Movie.count().then((aCount)=>{
    Movie.find({}).skip((page-1)*pageCount).limit(pageCount).sort({_id:-1}).then((data)=>{
        movies = data;
        var username = null;
   
            // 读取cook
 if(req.cookies.username){
         username = req.cookies.username;
         // 查询该用户是否是管理员
         User.findOne({name:username}).then((data)=>{
            if(data){
               res.render('page/index',{
                  title:"影视天下",
                  isAdmin:data.isAdmin,
                  booksCount:Math.ceil(aCount/pageCount),
                        currentPage:page,
                  username,
                  movies}
               );
            }else {
               res.render('page/index',{
                  title:"影视天下",
                  isAdmin:false,
                  booksCount:Math.ceil(aCount/pageCount),
                        currentPage:page,
                  username,
                  movies}
               );
            }
         },()=>{
            res.render('page/index',{
               title:"影视天下",
               isAdmin:false,
               booksCount:Math.ceil(aCount/pageCount),
                        currentPage:page,
               username,
              movies}
            );
         })
      }else{
         res.render('page/index',{
            title:"影视天下",
            isAdmin:false,
            booksCount:Math.ceil(aCount/pageCount),
                        currentPage:page,
            username,
             movies}
         );
      }


  
   })//--find
});//--count
});//get
//detail page
router.get('/movie/:id', function (req, res) {
    var id = req.params.id;
   
    Movie.findById(id, function (err, movie) {
        res.render('page/detail', {
            title:'影视详情:',
            movie: movie
        });
    });
});

//lu ru page
router.get('/admin/movie', (req, res) => {
    res.render('page/admin', {
        title: '后台录入',
        movie:{
        	title:'',
        	doctor:'',
        	country:'',
        	year:'',
        	poster:'',
        	flash:'',
        	summary:'',
        	language:''
        }
    })
});
//list update skip hui dao luruye
//admin update movie




router.get('/admin/update/:id', function (req, res) {

    var id = req.params.id;
    global.id = id;
    console.log(req.body)
    Movie.findById(id, function (err, movie) {
        res.render('page/admin', {
            title: '影视信息:' + movie.title,
            movie: movie
        });
    });
});

//admin post movie
router.post('/admin/movie/new',(req,res)=>{
    // var id = global.id;
    // console.log('isd--',id)
    console.log('bodt:',req.body)
     console.log('bod---:',req.body.movie._id)
     var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;

    // Movie.findOne({req.body[]})
    // if(movieObj){
    //    Movie.findOne({_id:id}).then((data)=>{
    //     console.log('data--',data)
    //    if(id == data._id){
    //   Movie.update({_id:id},{$set:movieObj}).then((data)=>{
    //        res.render('page/detail');
    //   },(err)=>{
    //     Err.showError('修改失败，请重试',res)
    //   });
    // }else{
        // if(id !== 'undefined'){
        //   Movie.findById(id,function(err,movie){
        //     if(err){
        //       console.log(err)
        //     }
        //     _movie = _.extend(movie,movieObj);
        //      _movie.save((err,movie)=>{
        //         if(err){
        //            console.log(err)
        //         }else{
        //             res.redirect('/movie/'+ movie._id)
        //         }
                
        //     })
        //   })
        // }else{
             _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
          
        });
          _movie.save((err,movie)=>{
                if(err){
                   Err.showError("年份为纯数字",res);
                }else{
                  
                    res.redirect('/movie/'+ movie._id)
                   
                    
                }
                
            })


        //}
       
   //}

    // },(err)=>{
    //   res.send('修改失败')
    // })
    // }else{
    //   Err.showError('不能为空',res)

    // }

   
   
   
    
      
   
})





// list  page
router.get('/admin/list', (req, res) => {
             var page = req.query.page || 1;
       var pageCount = 6;
Movie.count().then((aCount)=>{
    Movie.find({}).skip((page-1)*pageCount).limit(pageCount).sort({_id:-1}).then((data)=>{
        movies = data;
        var username = null;
   
            // 读取cook
 if(req.cookies.username){
         username = req.cookies.username;
         // 查询该用户是否是管理员
         User.findOne({name:username}).then((data)=>{
            if(data){
               res.render('page/list',{
                  title:"后台管理",
                  isAdmin:data.isAdmin,
                  booksCount:Math.ceil(aCount/pageCount),
                        currentPage:page,
                  username,
                  movies}
               );
            }else {
               res.render('page/list',{
                  title:"后台管理",
                  isAdmin:false,
                  booksCount:Math.ceil(aCount/pageCount),
                        currentPage:page,
                  username,
                  movies}
               );
            }
         },()=>{
            res.render('page/list',{
               title:"后台管理",
               isAdmin:false,
               booksCount:Math.ceil(aCount/pageCount),
                        currentPage:page,
               username,
              movies}
            );
         })
      }else{
         res.render('page/list',{
            title:"后台管理",
            isAdmin:false,
            booksCount:Math.ceil(aCount/pageCount),
                        currentPage:page,
            username,
             movies}
         );
      }


  
   })//--find
});


 //        Movie.find(function(err,movies){
 //        if(err){
 //            console.log(err)
 //        }else{
 //            var username = null; 
 //            // 读取cook
 // if(req.cookies.username){
 //         username = req.cookies.username;
 //         // 查询该用户是否是管理员
 //         User.findOne({name:username}).then((data)=>{
 //            if(data){
 //               res.render('page/list',{
 //                  title:"后台管理",
 //                  isAdmin:data.isAdmin,
 //                  username,
 //                  movies}
 //               );
 //            }else {
 //               res.render('page/list',{
 //                  title:"后台管理",
 //                  isAdmin:false,
 //                  username,
 //                  movies}
 //               );
 //            }
 //         },()=>{
 //            res.render('page/list',{
 //               title:"后台管理",
 //               isAdmin:false,
 //               username,
 //              movies}
 //            );
 //         })
 //      }else{
 //         res.render('page/list',{
 //            title:"后台管理",
 //            isAdmin:false,
 //            username,
 //             movies}
 //         );
 //      }

 //        }

 //    }).sort({_id:-1});




});

// detail
router.delete('/admin/list', function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        });
    }
});

module.exports = router;
