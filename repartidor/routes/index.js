var express = require('express');
var request = require('request');
var router = express.Router();

var pedido="";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/new',function(req, res, next) {
  pedido=req.body.valor;
  console.log(pedido);
  res.send(pedido);
});

router.get('/sts',function(req, res, next) {
  res.send(pedido);
});
router.get('/completado',function(req, res, next) {
  pedido="Entregado";
  console.log(pedido);
  request.post('http://localhost:3100/cambiar', {
  json: {
    status: 'Entregado'
    }
  }, (error, res2, body) => {
  if (error) {
    console.error(error)
    respuesta="no Entregado"
    return
    }
  console.log(`statusCode: ${res2.statusCode}`)
  console.log(body)
  respuesta=body;
  })
  res.send(pedido);
});

router.post('/cambiar',function(req, res, next) {
  pedido=req.body.status;
  res.send(pedido);
});

module.exports = router;
