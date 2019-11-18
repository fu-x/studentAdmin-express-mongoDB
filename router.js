var express = require('express')
var mongodb = require('./mongodb')

var router = express.Router()

//渲染学生列表
router.get('/', function (req, res) {
  mongodb.find(function(err, data){
    if (err) {
      return res.status(500).send("读取数据失败了。。。");
    }
    res.render('index.html', { "students": data });
  })
})

//渲染添加学生页面
router.get('/students/new', function (req, res) {
  res.render('new.html');
})

//处理添加学生请求
router.post('/students/new',function (req, res) {
  new mongodb(req.body).save(function(err){
    if(err){
      return res.status(500).send("读取数据失败了。。。");
    }else{
      res.redirect('/');
    }
  })
})

//渲染编辑学生信息页面
router.get('/students/edit', function (req, res) {
  mongodb.find({_id:req.query.id},function(err, data){
    if(err){
      return res.status(500).send("读取数据失败了。。。");
    }else{
      if(data[0].sex === '男'){
        data[0].male = 'checked';
      }else{
        data[0].female = 'checked';
      }
      res.render('edit.html', {student:data[0]});
    }
  })
})

//处理编辑学生信息请求
router.post('/students/edit', function(req, res){
  console.log(req.body);
  mongodb.findByIdAndUpdate(req.body.id, req.body, function(err){
    if(err){
      return res.status(500).send("读取数据失败了。。。");
    }else{
      res.redirect('/');
    }
  })
})

//处理删除学生请求
router.get('/students/delete', function(req, res){
  mongodb.findByIdAndDelete(req.query.id, function(err){
    if(err){      
      return res.status(500).send("读取数据失败了。。。");
    }else{
      res.redirect('/');
    }
  })
})

module.exports = router
