var util = require('../src/utilities.js'),
    nav = require('../src/navigation.js'),
    jur = require('../src/jurisdictions.js'),
    test = require('../src/testdata.js'),
    sofa = require('../src/petition/sofa.js'),
    tasks = require('../src/tasks.js'),
    activ = require('../src/activities.js');
    

var webdriver = util.webdriver,
    driver = util.driver,
    By = util.By,
    until = util.until;

var assert = util.assert,
    fs = util.fs,
    mocha = require('selenium-webdriver/testing');

mocha.describe('ACTIVITIES', function() {
    this.timeout(0);
    
    mocha.before(function() {
        driver.manage().window().maximize();
        util.authorize(test.env, test.login, test.password);
        util.closeTabs()
    });
    
    mocha.after(function() {
        util.closeTabs();
        util.logOut()
    });
    
    mocha.it('CRUD Activities on Dashboard', function() {
        this.slow(30000);
        activ.dashboardActivities()
    });
    
    mocha.it('CRUD Activities in Contacts Events', function() {
        this.slow(60000);
        util.closeTabs();
        util.openCreateContact('dashboard', 'person');
        util.createPerson(test.person);
        activ.contactActivities()
    });
    
    mocha.it('CRUD Activities in Matter Overview', function() {
        this.slow(70000);
        util.closeTabs();
        util.openCreateContact('dashboard', 'person');
        util.createPerson(test.person);
        util.createBKmatter(test.matter);
        activ.overviewActivities();
    });
    
    mocha.it('CRUD Activities in Matter Tasks', function() {
        this.slow(70000);
        activ.matterActivities();
    });
      
});