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


driver.manage().window().maximize();
driver.manage().timeouts().implicitlyWait(10000);
//Logging in test

req.authorize(sprint3, login, password);
req.closeTabs();



driver.sleep(2000);



    


req.logOut();