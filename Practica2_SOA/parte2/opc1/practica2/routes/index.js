var request = require('request');
const express = require("express");
var router = express.Router();
var soap = require('soap'); 
var args = {name: '201403997-Churrumino'};
var url = 'https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=soap&wsdl'; 
var auth = "Basic " + new Buffer("sa" + ":" + "your password").toString("base64"); 
router.get('/create', function(req,resx){
    soap.createClient(url, { wsdl_headers: {Authorization: auth,
        xml: '<s:element name="create">'+
        '<s:complexType>'+
        '<s:sequence>'+
        '<s:element minOccurs="1" maxOccurs="1" name="name" type="s:string"/>'+
        '<s:element minOccurs="0" maxOccurs="1" name="catid" type="s:int"/>'+
        '<s:element minOccurs="0" maxOccurs="1" name="language" type="s:string"/>'+
        '<s:element minOccurs="0" maxOccurs="1" name="published" type="s:int"/>'+
        '</s:sequence>'+
        '</s:complexType>'+
        '</s:element>'} }, function(err, client) { 
        client.create(args, function(err, result) {
            resx.send(result);
        });
    });    
});

router.get('/', function(req,resx){
    soap.createClient(url, { wsdl_headers: {Authorization: auth,
        xml: '<wsdl:operation name="readList">'+
        '<wsdl:input message="tns:readListRequest"/>'+
        '<wsdl:output message="tns:readListResponse"/>'+
        '</wsdl:operation>'} }, function(err, client) { 
        client.readList(function(err, result) {
            resx.send(result);
        });
    });    
});
module.exports = router;
