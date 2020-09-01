var request = require('request');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//cliente
router.post('/new_pedido', function(req, res, next) {
  var respuesta="creado";
  var pedido ="";
  request.post('http://localhost:3100/new', {
  json: {
    valor: req.body.valor
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
  res.send(respuesta);
});

router.get('/repartidor_sts', function(req, res, next) {
  var respuesta="";
  request.get('http://localhost:3200/sts', (error, res2, body) => {
  if (error) {
    console.error(error)
    res.send(error);
    }
  console.log(`statusCode: ${res2.statusCode}`)
  console.log(body)
  res.send(body);
  })  
});

router.get('/rest_sts', function(req, res, next) {
  var respuesta="";
  request.get('http://localhost:3100/sts', (error, res2, body) => {
  if (error) {
    console.error(error)
    res.send(error);
    }
  console.log(`statusCode: ${res2.statusCode}`)
  console.log(body)
  res.send(body);
  })
});

//repartidor

router.post('/completado',function(req, res, next) {
  console.log("Llego en el completado: "+req.body.status);
  request.post('http://localhost:3100/cambiar', {
  json: {
    status: req.body.status
    }
  }, (error, res2, body) => {
  if (error) {
    console.error(error)
    respuesta="no Entregado"
    res.send(error);
    }
  console.log(`statusCode: ${res2.statusCode}`)
  console.log(body)
  respuesta=body;
  })
  res.send(respuesta);
});

//Restaurante
router.post('/new_pedidoRES',function(req, res, next) {
  pedido=req.body.valor;
  console.log("datos que vienen:"+pedido);
  request.post('http://localhost:3200/new', {
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
  res.send(pedido);
});


module.exports = router;
