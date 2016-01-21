var req = require('../src/functions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js');

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;



driver.manage().window().maximize();
driver.manage().timeouts().implicitlyWait(10000);


req.authorize(req.dev, req.login, req.password);
req.closeTabs();
req.createCompany('Karolinen');


driver.sleep(2000);



    


req.logOut();