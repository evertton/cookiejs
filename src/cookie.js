(function( window, undefined ){
	var Cookie = (function(){

		var Cookie = function (name, value, options){
			switch(arguments.length){
				case 1: 
					return new Cookie.fn.load(name);
				case 2:
					return new Cookie.fn.initTwo(name, value);
				case 3:
					return new Cookie.fn.init(name, value, options, true);
			}
		};

		var name,
			value,
			expires, // Date
			domain,
			path,
			secure; // boolean

		Cookie.fn = Cookie.prototype = {
			constructor: Cookie,
			init: function (n, v, o, save){
				name = n;
				value = v;

				this.setExpires(o.expires);

				domain = o.domain;
				path = o.path;
				http = o.http;
				this.setSecure(o.secure);

				if(save)
					this.save();

				return this;
			},
			initTwo: function(n, v){
				return new Cookie.fn.init(n, v, {}, true);
			},
			load: function(n){
				cookies = document.cookie.split('; ');
				cookieList = [];

				for(i in cookies){
					cookie = cookies[i].split('=');
					cookieList.push({name:cookie[0], value:cookie[1]});
				}

				for(i in cookieList){
					cookie = cookieList[i];
					if(cookie.name == n){
						return new Cookie.fn.init(cookie.name, cookie.value, {}, false);
					}
				}

				throw "Cookie not found!";
			},
			getValue: function(){
				return value;
			},
			setValue: function(v){
				value = v;
				return this;
			},
			setExpires: function(e){
				try{
					if(e === undefined || e === 0){
						expires = undefined;
					} else if(typeof(e) === "number"){
						expires = new Date();
						expires.setDate(expires.getDate()+e);
					} else if(e.getDate()){
						expires = e;
					}
				} catch(event){
					throw "Expires must be a Date object!";
				}

				return this;
			},
			setDomain: function(d){
				domain = d;
				return this;
			},
			setPath: function(p){
				path = p;
				return this;
			},
			setSecure: function(s){
				if(s === undefined){
					secure = false;
				} else if(typeof(s) === "boolean"){
					secure = s;
				} else {
					throw "Secure must be a Boolean type!";
				}

				return this;
			},
			save: function(){
				cookie =  name + '=' + value + ';';
				cookie += expires ? 'expires=' + expires.toUTCString() + ';' : '';
				cookie += domain ? 'domain=' + domain + ';' : '';
				cookie += path ? 'path=' + path + ';' : '';
				cookie += secure ? 'secure;' : '';

				document.cookie = cookie;
			},
			delete: function(){
				expires = new Date(null);
				this.save();
			}
		};

		Cookie.fn.init.prototype = Cookie.fn;

		return Cookie;
	})();

	var raw = Cookie.raw = function(){
		return document.cookie;
	}

	var enabled = Cookie.enabled = navigator.cookieEnabled;

	window.Cookie = Cookie;
})(window);


