var util = require('../src/utilities.js'),
    nav = require('../src/navigation.js'),
    jur = require('../src/jurisdictions.js'),
    test = require('../src/testdata.js'),
    man = require('../src//manage/matterForms.js'),
    doc = require('../src/manage/documents.js'),
    fin = require('../src/manage/finance.js'),
    ap = require('../src/manage/associatedParties.js'),
    mes = require('../src/messages.js');
    

var webdriver = util.webdriver,
    driver = util.driver,
    By = util.By,
    until = util.until;

var assert = util.assert,
    fs = util.fs,
    mocha = require('selenium-webdriver/testing');
    
mocha.describe('MANAGE', function() {

    this.timeout(0);
    
    mocha.before(function() {
            driver.manage().window().maximize();
            
            util.authorize(test.env, test.login, test.password);
            util.closeTabs();
            
            util.openCreateContact('dashboard', 'person');
            util.createPerson(test.person);
            util.createBKmatter(test.matter);
            
        });
        
    mocha.after(function() {
        util.closeTabs();
        util.logOut();
    });
    
    mocha.describe('MESSAGES', function() {
       
        mocha.it.skip('Email messages', function() {
            mes.emails.emailManage()
        });
        
        mocha.it.skip('Text messages', function() {
            
                
            
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
    
    mocha.describe.skip('FINANCE', function() {
        
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
                util.navigateTo(nav.navMatter.manage.self, nav.navMatter.manage.associatedParties.self, nav.navMatter.manage.associatedParties.parties);
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
                util.navigateTo(nav.navMatter.manage.self, nav.navMatter.manage.associatedParties.self, nav.navMatter.manage.associatedParties.history);
            });

            mocha.it('History', function() {
                driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CasePartiesHistoryNew_')]//tr[contains(@id, 'DXDataRow0')]")), 15000);
            });
        });
        
    });
    
    mocha.describe('CASE HISTORY', function() {
        
        mocha.before(function() {
            util.navigateTo(nav.navMatter.manage.self, nav.navMatter.manage.caseHistory);
        });

        mocha.it('Case history', function() {
            driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseViewHistory')]//tr[contains(@id, 'DXDataRow0')]")), 15000);
        });
        
    });
    
});