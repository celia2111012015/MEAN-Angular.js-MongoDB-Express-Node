/**
 * http://usejsdoc.org/
 */
var Crud = function(db) {
    this.db = db;
};
Crud.prototype  = {
    constructor : Crud,
    noop : function(){},
    
    insert : function(col, val, cb) {
        cb = cb || this.noop;
        return this.db.collection(col).insert(val,cb);
    },
   
    update : function(col, search, val, cb) {
        cb = cb || this.noop;
        return this.db.collection(col).update(search, {$set : val}, cb);
    },
    update2: function(col, search, val, cb){
    	  cb = cb || this.noop;
          return this.db.collection(col).update(search, {$addToSet : val}, cb);
    },
    remove : function(col,key,cb) {
        cb = cb || this.noop;
        //console.log(this.db.collection(col).remove);
        return this.db.collection(col).remove(key).then(function(result){
        	cb(result);
        });
    },
    
    find : function(col,keyword,cb) {
        cb = cb || this.noop;
        console.log(keyword);
        this.db.collection(col).find(keyword).toArray(function(err, doc){
        	
        	if (err) {
                console.log(err);
              } else if (doc.length) {
                console.log('Found by Key Word:', doc);
                cb(doc);
              } else {
                console.log('No document(s) found with defined "find" criteria!');
              }
        	
        });
    },
    findBy_id : function(col,id, cb) {
        this.db.collection(col).find(id).toArray(function(err, doc){

        	if (err) {
                console.log(err);
              } else if (doc.length) {
                console.log('Found by Id:', doc);
                cb(doc);
              } else {
                console.log('No document(s) found with defined "find" criteria!');
              }
        });
    },
  
    findOne : function(col,keyword,cb) {
        cb = cb || this.noop;
        this.db.collection(col).findOne(keyword,function(err, docs) {
            cb(docs);
        });
    },
   
};
module.exports =  function(db) {
    return new Crud(db);
};
