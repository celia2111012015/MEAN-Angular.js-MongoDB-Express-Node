/**
 * http://usejsdoc.org/
 */
var express = require('express');
var Col = require("../app/connect.js");
var Crud = require("../app/crud.js");
var ObjectID = require('mongodb').ObjectID;
var app=express();


var router = express.Router();

//Initialize Crud
var crud;

//Initialize Database connection
var db =new Col("events",function(db){
   
    crud = new Crud( db, function(){} );
});
/*
var data = {
    title : "t0do",
    lists : [
    ]
};
*/


/* GET all events */
router.get('/', function(req, res) {
    //
    crud.find("events",{},function(docs) {
        console.log( docs );
      
      //  res.render('index', {title : "events", lists : docs});
        res.send({lists:docs});
    });
});

/* GET delete event refer to id */
router.post('/modify/del/id', function(req, res) {
	console.log(req.body._id);
	var _id=new ObjectID(req.body._id);
   crud.remove("events",{_id :_id}, function(result){
	 
	res.send({deleteRes: result});
	 
   });
});

//


//find event by id
router.post('/modify/findid', function(req, res, next) {
   // var _id = new ObjectID( req.params.id );
	var _id=new ObjectID(req.body._id);
	
    console.log("server get id"+_id);
    crud.findBy_id("events",{_id:_id}, function(doc) {
    //    doc.id = doc._id;
        res.send({event:doc});
    });
});

//update event refer to event's id
router.post('/modify/update', function(req, res, next) {
    var body = req.body;
    console.log(body);
    var val={
    	_id:new ObjectID(body._id),
    	title:body.title,
    	location:body.location,
		from:body.from,
		to:body.to,
		createdOn:body.createdOn,
		description:body.description,
		$push:{participants:body.participants  }
    		
    };
    crud.update("events",{_id : new ObjectID(body._id)}, val,function(result) {
        console.log(result);
        res.send({updateRes: result});
    });
  
});

/* GET add listing. */
//router.get('/add', function(req, res) {
//    res.render("add",{});
//});

//insert new event
router.post("/modify/add",function(req, res) {
	
	console.log(req.body);
	var event={
		title: req.body.title,
		location:req.body.location,
		from: req.body.from,
		to:req.body.to,
		cratedOn:req.body.createdOn,
		description:req.body.description,
		
			participants:req.body.participants
		
		
			
	};
    crud.insert("events",event, function(err,result) {
        if(err){
        	console.log("Insert step1 error!");
        }else{
        	console.log("Insert step1 success");
        }
    });
    
    crud.update2("events", {title: req.body.title}, {participants:req.body.participants }, function(result){
        console.log(result);
    });
 //   res.redirect("./modify/");
});
router.post("/modify/find", function(req, res, next){
	var searchWord=req.body.keyWord;
	console.log(searchWord);
	var pattern='^'+searchWord.trim();
	  crud.find("events",{title: new RegExp(pattern)}, function(doc) {
	       console.log(doc);
	        res.send({results:doc});
	    });
});
module.exports = router;
