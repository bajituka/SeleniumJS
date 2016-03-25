var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
    test = require('../src/testdata.js');


var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var mocha = require('mocha');

var webdriverio = require('webdriverio');
//var options = { desiredCapabilities: { browserName: 'firefox' }};
var client = webdriverio.remote();

var assert = req.assert,
    fs = req.fs;

//req.catchUncaughtExceptions();
/*
client
    .init()
    .url(test.sprint3)
    .waitForExist("name='UserName'")
    .setValue("name='UserName'", test.login)
    .setValue("name='Password'", test.password)
    .end();


describe('LOGIN AND LOGOUT', function() {
    this.timeout(0);
    it('should authorize and log out', function(done) {
        
        req.authorize(test.env, test.login, test.password);
        req.logOut(done);
    });
});
*/
req.authorize(test.env, test.login, test.password);
req.closeTabs();
require('./petition.js');
req.logOut();
