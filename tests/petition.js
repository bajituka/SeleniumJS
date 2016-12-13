var util = require('../src/utilities.js'),
    nav = require('../src/navigation.js'),
    jur = require('../src/jurisdictions.js'),
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
    

var webdriver = util.webdriver,
    driver = util.driver,
    By = util.By,
    until = util.until;

var assert = util.assert,
    fs = util.fs,
    mocha = require('selenium-webdriver/testing');
    
mocha.describe('PETITION', function() {
    
    this.timeout(0);
    
    mocha.before(function() {
        driver.manage().window().maximize();
        
        util.authorize(test.env, test.login, test.password);
        util.closeTabs();
        util.openCreateContact('dashboard', 'person');
        util.createPerson(test.person);
        util.createBKmatter(test.matter);
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.generalInformation.self);
        driver.wait(until.elementLocated(By.id('stateId')), 15000);
        driver.wait(until.elementLocated(By.id('Case_CountyId')), 15000);
        driver.wait(until.elementLocated(By.id('District_Id')), 15000);
        driver.wait(until.elementLocated(By.id('Case_DivisionId')), 15000);
        driver.wait(until.elementLocated(By.id('Case_CaseStatus')), 15000);
    });
    
    mocha.after(function() {
        util.closeTabs();
        util.logOut();
    });
    
    mocha.describe('General information', function() {
        
        mocha.it('Details', function() {
            gi.generalInformation.details()
        });
        
        mocha.it('Fees', function() {
            gi.generalInformation.fees()
        });
        
        mocha.it('Pending / Prior Bankruptcies', function() {
            gi.generalInformation.pendingBankruptcies()
        });
        
        mocha.it('Credit counseling', function() {
            gi.generalInformation.creditCounseling()
        });
        
        mocha.it('Tenant', function() {
            gi.generalInformation.tenant()
        });
        
        mocha.it('Hazardous property', function() {
            gi.generalInformation.hazardousProperty()
        });
        
        mocha.it('Additional', function() {
            gi.generalInformation.additional()
        });
        
        mocha.it('Security', function() {
            gi.generalInformation.security()
        });
        
    });
    
    mocha.describe('Property', function() {
        
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
    
        mocha.it('Income', function() {
            inc.income.budget();
            inc.income.employmentDetails();
            inc.income.incomeChanges();
        });

        mocha.it('Expenses', function() {
            inc.expenses.debtorOne();
            inc.expenses.debtorTwo();
        });
        
        mocha.it('Means Test', function() {
            inc.meansTest.details();
            inc.meansTest.income();
            inc.meansTest.incomeDeductions();
            inc.meansTest.deductions();
        });

    });
    
    mocha.describe('Sofa', function() {

            mocha.it('Sofa', function() {
                for (var index = 2; index <= 28; index++) {
                    sofa.sofa['sofa' + index]()
                }
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
});