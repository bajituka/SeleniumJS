var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
    test = require('../src/testdata.js'),
    admin = require('../src/admin.js');
    
var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs,
    mocha = require('selenium-webdriver/testing');

mocha.describe('ADMIN', function() {
    this.timeout(0);
    
    mocha.before(function() {
        driver.manage().window().maximize();
        req.authorize(test.env, 'host', 'MustRelease2015!');
        req.closeTabs()
    });
    
    mocha.afterEach(function() {
        req.closeTabs()
    });
    
    mocha.after(function() {
        req.closeTabs();
        req.logOut()
    });
    
    mocha.it('Manage my account', function() {
        admin.manageMyAccount()
    });
    
    mocha.it('Manage users', function() {
        admin.manageUsers()
    });
    
    mocha.it('Admin', function() {
        admin.admin()
    });
    
    mocha.it('Federal exemptions', function() {
        admin.federalExemptions()
    });
      
    mocha.it('State exemptions', function() {
        admin.stateExemptions()
    });
      
    mocha.it('Median income allowance', function() {
        admin.medianIncomeAllowance()
    });
      
    mocha.it('Whats new', function() {
        admin.whatsNew()
    });
    
    mocha.it('Submit my idea', function() {
        admin.submitMyIdea()
    });
    
    mocha.it('Help', function() {
        admin.help()
    });
    
});