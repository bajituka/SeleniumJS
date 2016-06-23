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
    fs = req.fs,
    mocha = require('selenium-webdriver/testing');

mocha.describe('TASKS', function() {
    this.timeout(0);
    
    mocha.before(function() {
        driver.manage().window().maximize();
        req.authorize(test.env, test.login, test.password);
        req.closeTabs()
    });
    
    mocha.after(function() {
        req.closeTabs();
        req.logOut()
    });
    
    mocha.it('CRUD Tasks on Dashboard', function() {
        this.slow(30000);
        tasks.dashboardTasks()
    });
    
    mocha.it('CRUD Tasks in Contacts Events', function() {
        this.slow(40000);
        req.closeTabs();
        req.openCreateContact('dashboard', 'person');
        req.createPerson(test.testPerson);
        tasks.contactTasks()
    });
    
    mocha.it('CRUD Tasks in Matter Overview', function() {
        this.slow(70000);
        req.closeTabs();
        req.openCreateContact('dashboard', 'person');
        req.createPerson(test.testPerson);
        req.createBKmatter(test.testMatter);
        tasks.overviewTasks();
    });
    
    mocha.it('CRUD Tasks in Matter Tasks', function() {
        this.slow(70000);
        tasks.matterTasks();
    });
      
});