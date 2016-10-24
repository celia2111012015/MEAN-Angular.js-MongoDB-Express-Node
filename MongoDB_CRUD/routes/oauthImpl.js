/**
 * http://usejsdoc.org/
 */
var express = require('express');

var router = express.Router();
var https=require('https');
var Nr2oauth=require('../app/nr2oauth.js');



router.post('/request', function(req, res){
	var provider=req.body.provider;
	nr2oauth=new Nr2oauth(provider, function(){});
	var providerDetail=nr2oauth.getProvider();
	console.log(providerDetail);
	req.session.provider=provider;
	nr2oauth.getOauth().getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
		if(error){
			console.log(error);
			res.send("yeah no. didn't work.");
		}  
		else{
			console.log(results);
			console.log(oauth_token);
			console.log(oauth_token_secret);
			req.session.oauth=results;
			req.session.oauth.token = oauth_token;
			//req.session.oauth.token = oauth_token;
			console.log('oauth.token: ' + req.session.oauth.token);
			req.session.oauth.token_secret = oauth_token_secret;
			console.log('oauth.token_secret: ' + req.session.oauth.token_secret);
			//res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/login/verify');
			
	//		var option={
	//			host:'api.twitter.com',
	//			path:'/oauth/authenticate?'+req.session.oauth.token,
	//			
	//		};
	//		https.get(option, function(res){
	//			console.log(res);
	//		});
		//res.redirect(providerDetail.authenticate + '?oauth_token='+oauth_token);
			req.session.save(function(err){
				console.log("req.session.provider:"+req.session.provider);
				require("openurl").open(providerDetail.authenticate + '?oauth_token='+oauth_token);
			//	res.send({oauthToken: req.session.oauth.token});
			});
			
		  }
	
	});
	
});
router.get('/callback', function(req, res,next){
	if(req.query.oauth_token){
		var verifier = req.query.oauth_verifier;
		var token=req.query.oath_token;
	//	var token_secret=req.session.oauth.token_secret;
	//	var oauth = req.session.oauth;
		var provider=req.session.provider;
		console.log(provider);
	
	var	nr2oauth=new Nr2oauth(req.session.provider, function(){});
		nr2oauth.getOauth().getOAuthAccessToken(token,"",verifier, 
				function(error, oauth_access_token, oauth_access_token_secret, results){
					if (error){
						console.log(error);
						res.send("yeah something broke.");
					} else {
						req.session.oauth.access_token = oauth_access_token;
						req.session.oauth.access_token_secret = oauth_access_token_secret;
						console.log(results);
						res.redirect('http://localhost:8000/app');
					}
				}
				);
	}else{
		next(new Error("you're not supposed to be here."));
	}
	
	
	
});

router.post('/oauth2', function(req, res, next){
	var provider=req.body.provider;
	var nr2oauth=new Nr2oauth(provider, function(){});
	var providerDetail=nr2oauth.getProvider();
	console.log(providerDetail);
	nr2oauth.getOauth().getOAuthAccessToken('',
			   {'grant_type':'client_credentials'},
			   function (e, access_token, refresh_token, results){
			     console.log('bearer: ',access_token);
			     nr2oauth.getOauth().get('http://localhost:8000/app/#/modify/', 
			       access_token, function(e,data,res) {
			         if (e) return;
			         if (res.statusCode!=200) 
			           console.log("Error"+res.errorCode);
			         try {
			           data = JSON.parse(data);        
			         }
			         catch (e){
			           console.log(e);
			         }
			         console.log(res);
			      });
});
});
module.exports = router;