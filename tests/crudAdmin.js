var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    jur = require('../src/jurisdictions.js'),
    test = require('../src/testdata.js'),
    admin = require('../src/admin.js');
    
var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs,
    mocha = require('selenium-webdriver/testing');

mocha.describe('RIGHT TOP MENU', function() {
    this.timeout(0);
    
    mocha.before(function() {
        driver.manage().window().maximize();
        req.authorize(test.env, 'host', 'MustRelease2015!');
        req.closeTabs()
    });
    
    mocha.after(function() {
        req.closeTabs();
        req.logOut()
    });
    
    mocha.describe('MANAGE MY ACCOUNT', function() {
        
        mocha.before(function() {
            driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)), 15000);
            driver.findElement(nav.navMenu.self).click();

            driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.manageMyAccount)), 15000);
            driver.findElement(nav.navMenu.manageMyAccount).click();
        });
        
        mocha.after(function() {
            req.closeTabs()
        });
        
        mocha.it('Person', function() {
            admin.manageMyAccount.person()
        });
        
        mocha.it('Contact information', function() {
            admin.manageMyAccount.contactInformation()
        });
        
        mocha.it('Security', function() {
            admin.manageMyAccount.security()
        });
        
        mocha.it('User roles', function() {
            admin.manageMyAccount.userRoles()
        });
        
        mocha.it('Email accounts', function() {
            admin.manageMyAccount.emailAccounts.crudEmailAccts()
        });
        
        mocha.it('Jurisdiction', function() {
            admin.manageMyAccount.jurisdiction()
        });
        
    });
    
    mocha.describe('ADMIN', function() {
        
        
        mocha.it('Admin', function() {
            admin.admin()
        });
        
    });
    
    mocha.describe('FEDERAL EXEMPTIONS', function() {
        
        mocha.it('Federal exemptions', function() {
            admin.federalExemptions()
        });
        
    });
        
    mocha.describe('STATE EXEMPTIONS', function() {
        
        mocha.it('State exemptions', function() {
            admin.stateExemptions()
        });
        
    });
        
    mocha.describe('MEDIAN INCOME ALLOWANCE', function() {
        
        mocha.it('Median income allowance', function() {
            admin.medianIncomeAllowance()
        });
        
    });
    
    mocha.describe('WHATS NEW', function() {
        
        mocha.it('Whats new', function() {
            admin.whatsNew()
        });
        
    });
      
    mocha.describe('SUBMIT MY IDEA', function() {
        
        mocha.it('Submit my idea', function() {
            admin.submitMyIdea()
        });
        
    });
      
    mocha.describe('HELP', function() {
        
        mocha.it('Help', function() {
            admin.help()
        });
        
    });
    
});