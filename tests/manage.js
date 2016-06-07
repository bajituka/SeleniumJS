var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
    test = require('../src/testdata.js'),
    man = require('../src//manage/matterForms.js'),
    doc = require('../src/manage/documents.js'),
    fin = require('../src/manage/finance.js'),
    ap = require('../src/manage/associatedParties.js'),
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
        
        mocha.it('Finance', function() {
            fin.finance()
        });
        
    });
    
    mocha.describe('ASSOCIATED PARTIES', function() {

        mocha.it('Overview', function() {
            ap.associatedParties.checkOverviewLink()
        });

        mocha.describe('Parties', function() {
            
            mocha.before(function() {   
                req.navigateTo(nav.navMatter.manage.self, nav.navMatter.manage.associatedParties.self, nav.navMatter.manage.associatedParties.parties);
            });

            mocha.beforeEach(function() {
                ap.associatedParties.waitForPartiesLoaded()
            });

            mocha.it('Clients', function() {
                ap.associatedParties.clients()
            });

            mocha.it('Attorneys', function() {
                ap.associatedParties.attorneys()
            });

            mocha.it('Staff', function() {
                ap.associatedParties.staff()
            });

            mocha.it('Court/Clerk Personnel', function() {
                ap.associatedParties.courtPersonnel()
            });

            mocha.it('Other Associated Parties', function() {
                ap.associatedParties.other()
            });

        });
        
        mocha.describe('History', function() {
            
            mocha.before(function() {
                req.navigateTo(nav.navMatter.manage.self, nav.navMatter.manage.associatedParties.self, nav.navMatter.manage.associatedParties.history);
            });

            mocha.it('History', function() {
                driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CasePartiesHistoryNew_')]//tr[contains(@id, 'DXDataRow0')]")), 15000);
            });
        });
        
    });
    
    mocha.describe('CASE HISTORY', function() {
        
        mocha.before(function() {
            req.navigateTo(nav.navMatter.manage.self, nav.navMatter.manage.caseHistory);
        });

        mocha.it('Case history', function() {
            driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseViewHistory')]//tr[contains(@id, 'DXDataRow0')]")), 15000);
        });
        
    });
    
});