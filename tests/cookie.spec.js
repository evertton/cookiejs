/*
 * The Jasmine tests specifications.
 * http://jasmine.github.io/2.1/
 */
describe('UNIT TESTS', function () {
    var mockDocument = {};

    beforeEach(function () {
        mockDocument = {};
        Cookie._document = mockDocument;
        Cookie._cacheString = '';
        Cookie._cache = {};
    });

    describe('Cookie(key)', function () {
        it('returns `Cookie.get(key)`', function () {
            var key = 'key';

            spyOn(Cookie, 'get').and.returnValue(undefined);
            expect(Cookie(key)).toBeUndefined();
            expect(Cookie.get).toHaveBeenCalledWith(key);
        });
    });

    describe('Cookie(key, value[, options])', function () {
        var key = 'key',
            value = 'value';

        it('calls `Cookie.set(key, value, options)`', function () {
            spyOn(Cookie, 'set');

            Cookie(key, value);
            expect(Cookie.set).toHaveBeenCalledWith(key, value, undefined);
        });

        it('returns the `Cookie` object', function () {
            expect(Cookie.set(key, value)).toEqual(Cookie);
        });
    });

    describe('Cookie.defaults', function () {
        it('is undefined', function () {
            expect(Cookie.defaults).toEqual({});
        });
    });

    describe('Cookie.get(key)', function () {
        var key;

        beforeEach(function () {
            key = 'key';
            mockDocument.cookie = 'key=value;';
        });

        it('returns `undefined` when key is undefined', function () {
            key = undefined;
            expect(Cookie.get(key)).toBeUndefined();
        });

        it('returns `undefined` when key not exist', function () {
            key = 'undefined';
            expect(Cookie.get(key)).toBeUndefined();
        });

        it('calls `Cookie._updateCache` when `Cookie._cacheString` is different from `document.cookie`', function () {
            Cookie._cacheString = undefined;

            spyOn(Cookie, '_updateCache');
            Cookie.get(key);

            expect(Cookie._updateCache).toHaveBeenCalled();
        });

        it('does not update cache when `Cookie._cacheString` equals `document.cookie`', function () {
            Cookie._cacheString = mockDocument.cookie;
            var expectedCache = {};

            Cookie.get(key);

            expect(Cookie._cache).toEqual(expectedCache);
        });

        it('returns the value of `Cookie._cache[key]`', function () {
            Cookie._cacheString = mockDocument.cookie; // prevents cache refresh
            Cookie._cache = {
                key: 'value'
            };

            expect(Cookie.get(key)).toEqual(Cookie._cache[key]);
        });
    });

    describe('Cookie.set(key, value[, options])', function () {
        var key, value;

        beforeEach(function () {
            key = 'key';
            value = 'value';
        });

        it('returns the `Cookie` object', function () {
            expect(Cookie.set(key, value)).toEqual(Cookie);
        });

        it('sets `document.cookie` to the proper cookie string', function () {
            var expectedString = 'key=value;';

            Cookie.set(key, value);

            expect(mockDocument.cookie).toEqual(expectedString);
        });

        it('sets a cookie with options defined', function () {
            var expectedString = 'key=value;domain=evertton.hopper.pw;expires=Wed, 28 Jan 2015 00:00:00 GMT;path=/cookiejs;secure;';

            var options = {
                domain: 'evertton.hopper.pw',
                expires: 'January 28, 2015 00:00:00 GMT',
                path: '/cookiejs',
                secure: true
            };

            Cookie.set(key, value, options);

            expect(mockDocument.cookie).toEqual(expectedString);
        });

        describe('.defaults', function () {
            afterEach(function () {
                Cookie.defaults = {};
            });

            describe('.domain', function () {
                beforeEach(function () {
                    Cookie.defaults = {
                        domain: 'evertton.hopper.pw'
                    };
                });
                
                it('is set', function () {
                    var expectedString = 'key=value;domain=evertton.hopper.pw;';

                    Cookie.set(key, value);

                    expect(mockDocument.cookie).toEqual(expectedString);
                });

                it('overwrite when options is set', function () {
                    var expectedString = 'key=value;domain=evertton.github.io;';

                    var options = {
                        domain: 'evertton.github.io'
                    };

                    Cookie.set(key, value, options);

                    expect(mockDocument.cookie).toEqual(expectedString);
                });
            });

            describe('.expires', function () {
                beforeEach(function () {
                    Cookie.defaults = {
                        expires: 'January 28, 2015 00:00:00 GMT'
                    };
                });
                
                it('is set', function () {
                    var expectedString = 'key=value;expires=Wed, 28 Jan 2015 00:00:00 GMT;';

                    Cookie.set(key, value);

                    expect(mockDocument.cookie).toEqual(expectedString);
                });

                it('overwrite when options is set', function () {
                    var expectedString = 'key=value;expires=Sat, 28 Feb 2015 00:00:00 GMT;';

                    var options = {
                        expires: 'February 28, 2015 00:00:00 GMT'
                    };

                    Cookie.set(key, value, options);

                    expect(mockDocument.cookie).toEqual(expectedString);
                });
            });

            describe('.path', function () {
                beforeEach(function () {
                    Cookie.defaults = {
                        path: '/cookiejs'
                    };
                });
                
                it('is set', function () {
                    var expectedString = 'key=value;path=/cookiejs;';

                    Cookie.set(key, value);

                    expect(mockDocument.cookie).toEqual(expectedString);
                });

                it('overwrite when options is set', function () {
                    var expectedString = 'key=value;path=/cookie;';

                    var options = {
                        path: '/cookie'
                    };

                    Cookie.set(key, value, options);

                    expect(mockDocument.cookie).toEqual(expectedString);
                });
            });

            describe('.secure', function () {
                beforeEach(function () {
                    Cookie.defaults = {
                        secure: true
                    };
                });
                
                it('is set', function () {
                    var expectedString = 'key=value;secure;';

                    Cookie.set(key, value);

                    expect(mockDocument.cookie).toEqual(expectedString);
                });

                it('overwrite when options is set', function () {
                    var expectedString = 'key=value;';

                    var options = {
                        secure: false
                    };

                    Cookie.set(key, value, options);

                    expect(mockDocument.cookie).toEqual(expectedString);
                });
            });
        });
    });

    describe('Cookie.expires(key, options)', function () {
        var key = 'key';

        it('returns the `Cookie` object', function () {
            expect(Cookie.expires(key)).toEqual(Cookie);
        });

        it('calls `Cookie.set(key, undefined, options)`', function () {
            var options;

            spyOn(Cookie, 'set');

            Cookie.expires(key, options);

            expect(Cookie.set).toHaveBeenCalledWith(key, undefined, options);
        });
    });

    describe('Cookie._updateCache()', function () {
        it('not update cache, when `Cookie._cacheString` to equal `document.cookie`', function () {
            Cookie._cacheString = mockDocument.cookie;
            var expectedCache = {};

            Cookie._updateCache();

            expect(Cookie._cache).toEqual(expectedCache);
        });

        it('update cache, when `Cookie._cacheString` not equal `document.cookie`', function () {
            mockDocument.cookie = 'key=value';
            var expectedCache = {
                key: 'value'
            };

            Cookie._updateCache();

            expect(Cookie._cache).toEqual(expectedCache);
        });
    });

});

describe('INTEGRATION TESTS', function () {
    var key = 'key';
    var value = 'value';

    beforeEach(function () {
        Cookie._document = window.document;
        Cookie._navigator = window.navigator;
    });

    describe('Cookie.enabled', function () {
        it('equals `window.navigator.cookieEnabled`', function () {
            expect(Cookie.enabled).toEqual(window.navigator.cookieEnabled);
        });

        it('is true', function () {
            expect(Cookie.enabled).toEqual(true);
        });
    });

    describe('Cookie.get(key)', function () {
        beforeEach(function () {
            Cookie.set(key, value);
        });

        afterEach(function () {
            Cookie.expires(key);
        });

        it('return the value of a cookie', function () {
            expect(Cookie.get(key)).toEqual(value);
        });
    });

    describe('Cookie.set(key, value, options)', function () {
        afterEach(function () {
            Cookie.expires(key);
        });

        it('sets a cookie', function () {
            Cookie.set(key, value);

            expect(document.cookie).toContain('key=value');
        });

        it('expires a cookie when `value` to equal `undefined`', function () {
            Cookie.set(key, value);
            Cookie.set(key, undefined);

            expect(document.cookie).not.toContain('key=');
        });
    });

});