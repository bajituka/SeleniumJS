var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
    test = require('../src/testdata.js'),
    cont = require('../src/contacts.js'),
    gi = require('../src/petition/generalInformation.js'),
    prop = require('../src/petition/property.js'),
    cred = require('../src/petition/creditors.js'),
    exec = require('../src/petition/executoryContracts.js'),
    inc = require('../src/petition/incomeAndExpenses.js'),
    sofa = require('../src/petition/sofa.js'),
    soi = require('../src/petition/statementOfIntent.js'),
    dd = require('../src/petition/dueDiligence.js');
    

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs,
    mocha = require('selenium-webdriver/testing');
    
mocha.describe('PETITION', function() {
    
    this.timeout(0);
    
    mocha.before(function() {
        req.closeTabs();
        req.openCreateContact('dashboard', 'person');
        req.createPerson(test.testPerson);
        req.createBKmatter(test.testMatter);
        driver.wait(until.elementLocated(nav.navMatter.petition.self), 15000);
        driver.findElement(nav.navMatter.petition.self).click();
        driver.wait(until.elementLocated(By.id('stateId')), 15000);
        driver.wait(until.elementLocated(By.id('Case_CountyId')), 15000);
        driver.wait(until.elementLocated(By.id('District_Id')), 15000);
        driver.wait(until.elementLocated(By.id('Case_DivisionId')), 15000);
        driver.wait(until.elementLocated(By.id('Case_CaseStatus')), 15000);
    });
    
    mocha.describe('General information', function() {
        
        mocha.it('General information', function() {
           gi.giArr.forEach(function(item, i, arr) {
                item();
            }); 
        });
        
    });
    
    mocha.describe.skip('Property', function() {
        
        mocha.it('Real property', function() {
            prop.realProperty();
        });
        
        mocha.it('Personal property', function() {
            prop.personalProperty();
        });
        
        mocha.it('Asset Exemptions', function() {
            prop.assetExemptions();
        });
        
        mocha.it('Exemption Calculator', function() {
            prop.exemptionCalculator();
        });
    });
    
    mocha.describe('Creditors', function() {
        
        mocha.it('Secured creditor', function() {
            cred.securedCreditor();
        });
        
        mocha.it('Priority creditor', function() {
            cred.priorityCreditor();
        });
        
        mocha.it('Unsecured creditor', function() {
            cred.unsecuredCreditor();
        });
        
        mocha.it('Codebtors', function() {
            cred.codebtors();
        });
        
    });
    
    mocha.describe('Executory contracts', function() {
        
        mocha.it('Executory contracts', function() {
            exec.executoryContracts();
        });
        
    });
    
    mocha.describe('Income and expenses', function() {
    
        mocha.it('Income and expenses', function() {
            inc.incomeAndExpenses();
        });
    
    });
    
    mocha.describe('Sofa', function() {
        
        mocha.it('Sofa', function() {
            sofa.sofaArr.forEach(function(item, i, arr){
                item();
            });
        });
        
    });
    
    mocha.describe('Statement of intent', function() {
    
        mocha.it('Statement of intent', function() {
            soi.statementOfIntent();
        });
        
    });
    
    mocha.describe('Due diligence', function() {
    
        mocha.it('Due diligence', function() {
            dd.dueDiligence();
        });

    });
    
    mocha.after(function() {
        req.closeTabs();
        req.logOut();
    });
    
});