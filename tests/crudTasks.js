var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
    test = require('../src/testdata.js'),
    sofa = require('../src/petition/sofa.js'),
    tasks = require('../src/tasks.js');
    

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;

req.authorize(test.env, test.login, test.password);
req.closeTabs();

tasks.dashboardTasks();
req.closeTabs();

req.openCreateContact('dashboard', 'person');
req.createPerson(test.testPerson);
tasks.contactTasks();
req.closeTabs();

req.logOut();