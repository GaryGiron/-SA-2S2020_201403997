var request = require('request');
const express = require("express");
var router = express.Router();


var options = {
    method: 'POST',
    url: 'https://api.softwareavanzado.world/index.php?option=token&api=oauth2',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    form: {
      grant_type: 'client_credentials',
      client_id: 'sa',
      client_secret: 'fb5089840031449f1a4bf2c91c2bd2261d5b2f122bd8754ffe23be17b107b8eb103b441de3771745'
    }
  };

/* GET home page. */
router.get('/', function(req,resx){
  request(options, function (error, response, body) {
      if (error) throw new Error(error);
          var myJson = JSON.parse(body);
          console.log(myJson["access_token"]);
          request({
              url: 'https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal&filter[search]=201403997',
              headers: {
              'Authorization': 'Bearer '+myJson["access_token"]
              },
              rejectUnauthorized: false
          }, function(err, res) {
                  if(err) {
                  console.error(err);
                  
                  } else {
                  var data = JSON.parse(res.body);
                  console.log(data["_embedded"]["item"][0]["id"]);
                  let personas = [];
                  var info = data["_embedded"]["item"];
                  for(var i = 0; i < info.length;i++){
                        var cont= 
                        {
                          id: info[i]["id"],
                          nombre: info[i]["name"]
                        }
                        personas.push(cont);
                  }
                    resx.render('index', { titulo: 'Contactos', mensaje: 'SA - practica 2', personas: personas, result:"" });
                  
                  }
          });
      });
});
//
router.post('/create', function (req, resp) {
  var nombre = req.body.nombre;
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    var myJson = JSON.parse(body);
    console.log(myJson["access_token"]);
    request({
        url: 'https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal',
        method: 'POST',
        json: {name: "201403997-"+nombre},
        headers: {
        'Authorization': 'Bearer '+myJson["access_token"]
        },
        rejectUnauthorized: false
    }, function(err, res) {
            if(err) {
            console.error(err);
            resp.send(err);
            } else {
            console.log(res.body);
            //var data = JSON.parse(res.body);
            resp.render('index', { titulo: 'Contactos', mensaje: 'SA - practica 2', personas: {}, result:"Creacion con exito"});
            }
    
    });
    });
	
});
module.exports = router;
