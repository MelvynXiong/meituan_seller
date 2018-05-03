var express = require('express');
var port = 8088;

var app = express();

var router = express.Router ();

router.get('/', function (req,res,next) {
  req.url = '/index.html';
  next();
});

app.use(router);

var goods = require('./data/01-商品页(点菜)');
var ratings = require('./data/02-商品页(评价)');
var seller = require('./data/03-商品页(商家)');

var routes = express.Router();

// // 3. 编写接口
routes.get('/goods', (req,res) => {
  //返回数据给客户端，返回json数据
  res.json(goods);
});
routes.get('/ratings', (req,res) => {
  //返回数据给客户端，返回json数据
  res.json(ratings);
});
routes.get('/seller', (req,res) => {
  //返回数据给客户端，返回json数据
  res.json(seller);
});
// 4. 中间件
app.use('/api', routes);

app.use(express.static('./dist'));

module.express = app.listen(port, function(err) {
  if(err) {
    console.log(err);
    return;
  }
  console.log('http://localhost' + port + '\n');
});
