var express  = require("express");
var http = require("http");
var redis = require("redis");

var app = express();

var client = redis.createClient('6379','redis');

app.get('/',function(request,response,next){
    client.incr('pagecounter', function(error,pagecounter){
        if(error) return next(error);
        response.send("restart sonrasi " + pagecounter + " kere calisti. Sunucu:" + process.env.SERVERNAME);
    });
});

http.createServer(app).listen(process.env.port|| 8080 ,function(){
    console.log("listening tcp port " + (process.env.port|| 8080));
});
