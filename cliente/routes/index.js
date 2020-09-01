var express = require('express');
var request = require('request');
var router = express.Router();

var optnew = {
  method: 'POST',
  url: 'https://localhost:3100/new'
  /*body:{
    pedido:
  }*/
};



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TengoHambreAPP', mensaje: "", mensaje2:"no iniciado", mensaje3:"no" });
});

router.post('/new_pedido', function(req, res, next) {
  var respuesta="creado";
  var pedido =`{
    "cliente":`+req.body.cliente+`,
    "status": "Creado",
    "orden": "comida"
  }`;
  request.post('http://localhost:3400/new_pedido', {
  json: {
    valor: pedido
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
  res.render('index', { title: 'TengoHambreAPP', mensaje: respuesta, mensaje2:"iniciado", mensaje3:"" });
});

router.get('/repartidor_sts', function(req, res, next) {
  var respuesta="";
  request.get('http://localhost:3400/repartidor_sts', (error, res2, body) => {
  if (error) {
    console.error(error)
    res.render('index', { title: 'TengoHambreAPP', mensaje: error, mensaje2:"", mensaje3:"no" });
    }
  console.log(`statusCode: ${res2.statusCode}`)
  console.log(body)
  res.render('index', { title: 'TengoHambreAPP', mensaje: body, mensaje2:"", mensaje3:"" });
  })  
});

router.get('/rest_sts', function(req, res, next) {
  var respuesta="";
  request.get('http://localhost:3400/rest_sts', (error, res2, body) => {
  if (error) {
    console.error(error)
    res.render('index', { title: 'TengoHambreAPP', mensaje: error, mensaje2:"", mensaje3:"no" });
    }
  console.log(`statusCode: ${res2.statusCode}`)
  console.log(body)
  res.render('index', { title: 'TengoHambreAPP', mensaje: body, mensaje2:"", mensaje3:"" });
  })
});

module.exports = router;
