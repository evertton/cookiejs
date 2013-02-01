(function (window, undefined) {
	var Cookie = function (key, value, options) {
		return arguments.length === 1 ?
			Cookie.get(key) : Cookie.set(key, value, options);
	};

	Cookie.enabled = navigator.cookieEnabled;

	Cookie.get = function (key) {
		cookies = document.cookie.split('; ');
		cookieList = [];

		for (i in cookies) {
			cookie = cookies[i].split('=');
			cookieList[cookie[0]] = cookie[1];
		}
        
		return cookieList[key];
	};

	Cookie.defaults = {
		path: '/'
	};

	Cookie.set = function (key, value, options) {
		options = (function () {
			return {
				domain: options && options.domain || Cookie.defaults.domain,
				expires: options && options.expires || Cookie.defaults.expires,
				path: options && options.path || Cookie.defaults.path,
				secure: options && options.secure !== undefined ? options.secure : Cookie.defaults.secure
			};
		})();

		options.expires = (value === undefined) ? -1 : options.expires;

		switch (typeof options.expires) {
		case 'number':
			options.expires *= 86400000;
			options.expires = new Date(new Date().getTime() + options.expires);
			break;
		case 'string':
			options.expires = new Date(options.expires);
			break;
		}

		var cookieString = key + '=' + value + ';';

		if (options) {
			cookieString += options.domain ? 'domain=' + options.domain + ';' : '';
			cookieString += options.expires ? 'expires=' + options.expires.toUTCString() + ';' : '';
			cookieString += options.path ? 'path=' + options.path + ';' : '';
			cookieString += options.secure ? 'secure;' : '';
		}

		document.cookie = cookieString;
		return Cookie;
	};

	Cookie.expires = function (key, options) {
		return Cookie.set(key, undefined, options);
	};

	window.Cookie = Cookie;

})(window);
