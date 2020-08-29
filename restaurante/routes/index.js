var express = require('express');
var request = require('request');
var router = express.Router();

var pedido = "";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/new',function(req, res, next) {
  pedido=req.body.valor;
  console.log(pedido);
  request.post('http://localhost:3200/new', {
  json: {
    valor: 'en espera'
    }
  }, (error, res2, body) => {
  if (error) {
    console.error(error)
    respuesta="no creado"
    return
    }
  console.log(`statusCode: ${res2.statusCode}`)
  console.log(body)
  respuesta=body;
  })
  res.send(pedido);
});

router.get('/sts',function(req, res, next) {
  res.send(pedido);
});

router.post('/cambiar',function(req, res, next) {
  pedido=req.body.status;
  res.send(pedido);
});

module.exports = router;
