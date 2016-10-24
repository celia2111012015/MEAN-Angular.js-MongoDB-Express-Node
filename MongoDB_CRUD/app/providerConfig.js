/**
 * http://usejsdoc.org/
 */
var providerConfig={
		twitter:{
			cus_key:'i50CzhmJ8LDZEX2DIJnNTgRVq',
			cus_secret_key:'AOhcOhBu22ATNqVrs0BpXbonBdrYXLXr4QvKjvzvnJnbuwDLFi',
			baseSite:'https://api.twitter.com/',
			accessTokenPath:'oauth2/token',
			requestToken: 'https://api.twitter.com/oauth/request_token',
			//  accessToken:'https://api.twitter.com/oauth/access_token',
			accessToken:'https//api.twitter.com/oauth2/token',
			  authenticate: 'https://api.twitter.com/oauth/authenticate'
		},
		cacoo:{
			cus_key:'pvlraqZWeNmmZMZiUgMzzr',
			cus_secret_key:'QzEfSTUfOopKkjWDBHnujnVWXoNNhxoszLdYafToW',
			requestToken: 'https://cacoo.com/oauth/request_token',
			  accessToken:'https://cacoo.com/oauth/access_token',
			  authenticate: 'https://cacoo.comm/oauth/authenticate'
		},
		linkedin:{
			cus_key:'75aloe7su9ou96',
			cus_secret_key:'MnCVyZWr8h9QHbEy',
			baseSite:'https://www.linkedin.com',
			accessTokenPath:'oauth/v2/accessToken',
			 authenticate:'https://www.linkedin.com/oauth/v2/authorization',

		//	requestToken: 'https://api.linkedin.com/uas/oauth/requestToken',
			 accessToken:' https://www.linkedin.com/oauth/v2/accessToken',
		//	  accessToken:'https://api.linkedin.com/uas/oauth/accessToken',
			//  authenticate: 'https://api.linkedin.com/uas/oauth/authenticate'
		}
};

module.exports=providerConfig;