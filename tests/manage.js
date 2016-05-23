var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
    test = require('../src/testdata.js');
    

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs,
    mocha = require('selenium-webdriver/testing');
    
mocha.describe('MANAGE', function() {

    this.timeout(0);
    
    mocha.before(function() {
            driver.manage().window().maximize();
            
            req.authorize(test.env, test.login, test.password);
            req.closeTabs();
        });
        
    mocha.after(function() {
        req.closeTabs();
        req.logOut();
    });
    
    mocha.describe('MESSAGES', function() {
       
        mocha.it('Email messages', function() {
            
                
            
        });
        
        mocha.it('Text messages', function() {
            
                
            
        });
    });   
        
    mocha.describe('DOCUMENTS', function() {
       
        mocha.it('Documents', function() {
           
        });
        
    });
    
    mocha.describe('MATTER FORMS', function() {
        
        mocha.it('Matter forms', function() {
            
        });
        
    })
    
    mocha.describe('FINANCE', function() {
        
        mocha.it('', function() {
            
        });
        
    });
    
    mocha.describe('ASSOCIATED PARTIES', function() {
        
        mocha.it('Parties', function() {
            
        });
        
        mocha.it('History', function() {
            
        });
        
    });
    
    mocha.describe('CASE HISTORY', function() {
        
        mocha.it('Case history', function() {
            
        });
        
    });
    
});