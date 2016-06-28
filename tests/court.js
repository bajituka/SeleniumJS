var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    jur = require('../src/jurisdictions.js'),
    test = require('../src/testdata.js'),
    sofa = require('../src/petition/sofa.js'),
    tasks = require('../src/tasks.js');
    
var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs,
    mocha = require('selenium-webdriver/testing');

mocha.describe('COURT', function() {
    this.timeout(0);
        
    mocha.before(function() {
        driver.manage().window().maximize();
        req.authorize(test.env, test.login, test.password);
        req.closeTabs();
    });
    
    mocha.after(function() {
        req.closeTabs();
        req.logOut()
    });

    mocha.describe('eFiling', function() {

        mocha.it('File single jurisdiction', function() {

            req.openCreateContact('dashboard', 'person');
            
            var JamesHarden = new test.Person('James', 'Harden', 'Coffee', '4444444444', '123123123', '12345');
            req.createPerson(JamesHarden);
            var illinois = new test.Matter(test.chapter7, test.joint, jur.illinois.self, jur.county, jur.illinois.ilnb);
            req.createBKmatter(illinois);
            req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.creditors.self, nav.navMatter.petition.creditors.secured);
        
            req.closeTabs()
        });

        mocha.it.skip('File all jurisdictions', function() {
            jur.states.forEach(function (item, i, arr) {
                req.createBKmatter(test.matter);
                req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.creditors.self, nav.navMatter.petition.creditors.secured);
            });
            
            /*
            driver.wait(until.elementLocated(By.id('stateId')), 15000);
            driver.wait(until.elementLocated(By.id('Case_CountyId')), 15000);
            driver.wait(until.elementLocated(By.id('District_Id')), 15000);
            driver.wait(until.elementLocated(By.id('Case_DivisionId')), 15000);
            driver.wait(until.elementLocated(By.id('Case_CaseStatus')), 15000);
            */
            req.closeTabs()
        });
    });
    

});