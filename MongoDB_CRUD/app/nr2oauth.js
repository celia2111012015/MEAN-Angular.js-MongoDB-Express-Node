/**
 * http://usejsdoc.org/
 */
var OAuth= require('oauth').OAuth;
var config=require('../app/providerConfig.js');
var OAuth2=require('oauth').OAuth2;
var version="1.0";
var authorize_callback="http://127.0.0.1:3000/login/callback";
var signMethod="HMAC-SHA1";
var getProviderDetails=function(provider){
	if(provider==='twitter'){
		return config.twitter;
	}else if(provider==='linkedin'){
		return config.linkedin;
	}else if(provider==='cacoo'){
		return config.cacoo;
	}
};
var Nr2oauth=function(provider){
	this.providerDetail=getProviderDetails(provider);
	var LoginProvider=getProviderDetails(provider);
//	this.oauth=new OAuth2(LoginProvider.cus_key, LoginProvider.cus_secret_key, LoginProvider.baseSite, null, LoginProvider.accessTokenPath, null);
	this.oauth= new OAuth(LoginProvider.requestToken, LoginProvider.accessToken, 
			LoginProvider.cus_key, LoginProvider.cus_secret_key, version, authorize_callback, signMethod);
};

Nr2oauth.prototype={
		constructor: Nr2oauth,
		noop:function(){},
		getProvider: function(){
			return this.providerDetail;
		},
		getOauth:function(){
			return this.oauth;
		}
		

};

module.exports=function(provider){
	return new Nr2oauth(provider);
};