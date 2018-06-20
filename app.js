var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;    

app.get('/api/properties/:workflow/:type', function(req,res) {
   var uri = "mongodb://admin:sally123@cluster0-shard-00-00-k1h1t.mongodb.net:27017,cluster0-shard-00-01-k1h1t.mongodb.net:27017,cluster0-shard-00-02-k1h1t.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("api");
        var query = { workflow: req.params.workflow, type: req.params.type };
        dbo.collection("api").find(query).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });
});

app.listen(port);
console.log('Server started!')