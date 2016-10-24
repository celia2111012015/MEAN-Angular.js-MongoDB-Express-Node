/**
 * http://usejsdoc.org/
 */
var mongodb=require('mongodb');
var mongodbClient=mongodb.MongoClient;
var url = 'mongodb://assessment:assessmentEvents2014@ds037977.mongolab.com:37977/';

//Use connect method to connect to the Server
var open=function(dbName, callback){
	mongodbClient.connect(url+dbName, function (err, db) {
	if (err) {
	 console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
	 //HURRAY!! We are connected. :)
	 console.log('Connection established to', url);

	 // do some work here with the database.
	 callback&&callback(db);
	 //Close connection
	// db.close();
	}
	}

	);
	
};

var connect=function(name, callback){
		open(name, function(_db){
			this.db=_db;
			console.log("new db is done!");
		    callback&&callback(_db);
		}.bind(this));
};





connect.prototype={
		constructor: connect,
		create : function( name, callback) {
	        this.db.createCollection( name, {safe:true}, function(err, collection){
	            if(err) {
	                console.log(err);
	            }else{
	                callback&&callback(collection);
	            };
	        });
	    },
	    remove : function( name, callback) {
	        this.db.dropCollection(name, {safe:true}, function(err,result) {
	            if(err) {
	                console.log(err);
	                return;
	            };
	            callback&&callback(result);
	        });
	    },
		
		getDB:function(){
			return this.db;
		}
};

module.exports=connect;