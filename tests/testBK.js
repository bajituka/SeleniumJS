var util = require('../src/utilities.js'),
    nav = require('../src/navigation.js'),
    jur = require('../src/jurisdictions.js'),
    test = require('../src/testdata.js'),
    cred = require('../src/petition/creditors.js'),
    test = require('../src/testdata.js');


var webdriver = util.webdriver,
    driver = util.driver,
    By = util.By,
    until = util.until;

var mocha = require('mocha');

var webdriverio = require('webdriverio');
//var options = { desiredCapabilities: { browserName: 'firefox' }};
var client = webdriverio.remote();

var assert = util.assert,
    fs = util.fs;

var xlsx = require('xlsx');

//util.authorize(test.env, test.login, test.password);


driver.quit();