var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    jur = require('../src/jurisdictions.js'),
    test = require('../src/testdata.js'),
    sofa = require('../src/petition/sofa.js'),
    tasks = require('../src/tasks.js'),
    activ = require('../src/activities.js');
    

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs,
    mocha = require('selenium-webdriver/testing');

mocha.describe('ACTIVITIES', function() {
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
    
    mocha.it('CRUD Activities on Dashboard', function() {
        this.slow(30000);
        activ.dashboardActivities()
    });
    
    mocha.it('CRUD Activities in Contacts Events', function() {
        this.slow(60000);
        req.closeTabs();
        req.openCreateContact('dashboard', 'person');
        req.createPerson(test.testPerson);
        activ.contactActivities()
    });
    
    mocha.it('CRUD Activities in Matter Overview', function() {
        this.slow(70000);
        req.closeTabs();
        req.openCreateContact('dashboard', 'person');
        req.createPerson(test.testPerson);
        req.createBKmatter(test.testMatter);
        activ.overviewActivities();
    });
    
    mocha.it('CRUD Activities in Matter Tasks', function() {
        this.slow(70000);
        activ.matterActivities();
    });
      
});