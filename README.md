[![#Cookie.js](https://farm8.staticflickr.com/7362/9029606792_1e76c00d56_o.png "Is a simple library for manipulating cookies.")](http://evertton.github.com/cookiejs/)

`Cookie.js` is a small javascript library that provides a simple API for managing cookies.

## Features

 - Is cute and simple.
 - Lightweight (less than 1 KB, minified and gzipped).

# API Reference

## Methods

### Cookie(name)

Retrieves a `Cookie` object in the document with specific name.

#### Arguments:

*name*: A string value of a cookie name.

#### Returns:

The `Cookie` object.

#### Example Usage:

	// Get the cookie object
	Cookie('name');

### Cookie(name, value)
*Alias: Cookie(name, value, {})*

Creates a `Cookie` object.

#### Arguments:

*name*: A string value of the a cookie name.
*value*: A string value of the a cookie name.

#### Returns:

The `Cookie` object.

#### Example Usage:

	// Create the cookie object
	Cookie('name', 'value');
	
	// Using the alias
	Cookie('name', 'value', {});

### Cookie(name, value [, options])

Creates a `Cookie` object.

#### Arguments:

*name*: A string value of the a cookie name.
*value*: A string value of the a cookie name.
*options*: The object containing additional parameters about the cookie. (discussed below)

#### Returns:

The `Cookie` object.

#### The "options" object:

*path*: A string value of the path of the cookie.
*domain*: A string value of the domain of the cookie.
*expires*: A date object of when of cookie will expires.
*secure*: A boolean value of whether or not cookie should only be avaliable over SSL.

*If any property is left undefined, the browser's default value will be used instead.*

#### Example Usage:

	// Create cookie object with expires option
	Cookie('name', 'value', {
		expires: new Date(2012, 12, 8)
	});
	
	// Create cookie with all options
	Cookie'name', 'value', {
		expires: new Date(2012, 12, 8),
		domain: 'example.com',
		path: '/',
		secure: false
	});

### [object Cookie].delete()

Delete a stored `Cookie`.

#### Example Usage:

	// Delete a stored cookie
	Cookie('name').delete();

	// Delete a new cookie
	Cookie('name', 'value').delete();

### [object Cookie].getValue()

Get the value of the `Cookie`.

#### Returns:

Returns the string object of the cookie value.

#### Example Usage:

	// Get value of the stored cookie
	Cookie('name').getValue();

	// Get value of the new cookie
	Cookie('name', 'value').getValue();

### [object Cookie].setValue(value)

Set the value of the `Cookie`.

#### Arguments:

*value*: A string value of the a cookie value.

#### Returns:

The `Cookie` object.

#### Example Usage:

	// Set value of cookie object
	Cookie('name').setValue('value');

### [object Cookie].setExpires(expires)

Set the value of the `Cookie`.

#### Arguments:

*expires*: A date object of when of cookie will expires.

#### Returns:

The `Cookie` object.

#### Example Usage:

	// Set expires of cookie object
	Cookie('name').setExpires(new Date(2012, 12, 8);

### [object Cookie].setPath(path)

#### Arguments:

*path*: A string value of the path of the cookie.

#### Returns:

The `Cookie` object.

#### Example Usage:

	// Set path of the cookie object
	Cookie('name').setPath('/');

### [object Cookie].setDomain(domain)

Set domain of the cookie object.

#### Arguments:

*domain*: A string value of the domain of the cookie.

#### Returns:

The `Cookie` object.

#### Example Usage:

	// Set domain of the cookie object
	Cookie('name').setDomain('example.com');

### [object Cookie].setSecure(secure)

Set security of the cookie object.

#### Arguments:

*secure*: A boolean value of whether or not cookie should only be avaliable over SSL.

#### Returns:

The `Cookie` object.

#### Example Usage:

	// Set security of the cookie object
	Cookie('name').setSecure(true);

### [object Cookie].save()

Store the cookie object.

#### Returns:

The `Cookie` object.

#### Example Usage:

	// Saves changes of the cookie
	Cookie('name').setSecure(false).save();

### Cookie.raw()

Get raw stored cookies.

#### Returns:

The string value of the raw stored cookies.

#### Example Usage:

	// Get raw cookies
	Cookie.raw();

## Properties

### Cookie.enabled

A boolean value of whether or not the browser has cookies enabled.

#### Example Usage:

	if(!Cookie.enabled){
		alert('To use advanced features enable the cookies or upgrade your browser.');
	}

# Change Log

### v0.1.0

 - Initial release

