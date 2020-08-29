var express = require('express');
var request = require('request');
var router = express.Router();

var optRep = {
  method: 'POST',
  url: 'https://api.softwareavanzado.world/index.php?option=token&api=oauth2',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  form: {
    grant_type: 'client_credentials',
    client_id: 'sa',
    client_secret: 'fb5089840031449f1a4bf2c91c2bd2261d5b2f122bd8754ffe23be17b107b8eb103b441de3771745'
  }
};

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
  var pedido ="";
  request.post('http://localhost:3100/new', {
  json: {
    valor: 'iniciado'
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
  request.get('http://localhost:3200/sts', (error, res2, body) => {
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
  request.get('http://localhost:3100/sts', (error, res2, body) => {
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
