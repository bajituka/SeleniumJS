var util = require('../src/utilities.js'),
    nav = require('../src/navigation.js'),
    jur = require('../src/jurisdictions.js'),
    test = require('../src/testdata.js'),
    sofa = require('../src/petition/sofa.js'),
    tasks = require('../src/tasks.js');
    

var webdriver = util.webdriver,
    driver = util.driver,
    By = util.By,
    until = util.until;

var assert = util.assert,
    fs = util.fs,
    mocha = require('selenium-webdriver/testing');

mocha.describe('TASKS', function() {
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
    
    mocha.it('CRUD Tasks on Dashboard', function() {
        this.slow(30000);
        tasks.dashboardTasks()
    });
    
    mocha.it('CRUD Tasks in Contacts Events', function() {
        this.slow(40000);
        util.closeTabs();
        util.openCreateContact('dashboard', 'person');
        util.createPerson(test.person);
        tasks.contactTasks()
    });
    
    mocha.it('CRUD Tasks in Matter Overview', function() {
        this.slow(70000);
        util.closeTabs();
        util.openCreateContact('dashboard', 'person');
        util.createPerson(test.person);
        util.createBKmatter(test.matter);
        tasks.overviewTasks();
    });
    
    mocha.it('CRUD Tasks in Matter Tasks', function() {
        this.slow(70000);
        tasks.matterTasks();
    });
      
});