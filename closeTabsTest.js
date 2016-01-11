var req = require('./functions.js');

var driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert;

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var fs = req.fs;

var currentDate = req.currentDate;

var saveScreenshot = req.saveScreenshot;

var login = req.login,
    password = req.password,
    dev = req.dev,
    sprint3 = req.sprint3,
    trunk = req.trunk;

var testMiddleName = req.testMiddleName,
    testSSN = req.testSSN,
    testEmail = req.testEmail,
    testPhone = req.testPhone;

driver.manage().window().maximize();




req.authorize(sprint3);
req.closeTabs();
saveScreenshot('test.png');
req.logOut();