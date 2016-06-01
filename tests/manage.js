var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
    test = require('../src/testdata.js'),
    man = require('../src//manage/matterForms.js'),
    doc = require('../src/manage/documents.js'),
    mes = require('../src/messages.js');
    

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
            
            req.openCreateContact('dashboard', 'person');
            req.createPerson(test.testPerson);
            req.createBKmatter(test.testMatter);
            
        });
        
    mocha.after(function() {
        req.closeTabs();
        req.logOut();
    });
    
    mocha.describe('MESSAGES', function() {
       
        mocha.it('Email messages', function() {
            mes.emails.emailManage()
        });
        
        mocha.it('Text messages', function() {
            
                
            
        });
    });   
        
    mocha.describe('DOCUMENTS', function() {
       
        mocha.it('Documents', function() {
           doc.documents()
        });
        
    });
    
    mocha.describe('MATTER FORMS', function() {
        
        mocha.it('Matter forms', function() {
            man.matterForms()
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