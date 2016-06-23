var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
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
        req.openCreateContact('dashboard', 'person');
        req.createPerson(test.testPerson);
    });
    
    mocha.after(function() {
        req.closeTabs();
        req.logOut()
    });

    mocha.it('File single jurisdiction', function() {
        req.createBKmatter(test.testMatter);
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.creditors.self, nav.navMatter.petition.creditors.secured);
        /*
        driver.wait(until.elementLocated(By.id('stateId')), 15000);
        driver.wait(until.elementLocated(By.id('Case_CountyId')), 15000);
        driver.wait(until.elementLocated(By.id('District_Id')), 15000);
        driver.wait(until.elementLocated(By.id('Case_DivisionId')), 15000);
        driver.wait(until.elementLocated(By.id('Case_CaseStatus')), 15000);
        */
        req.closeTabs()
    });

    mocha.it.skip('File all jurisdictions', function() {
        efp.states.forEach(function (item, i, arr) {
            req.createBKmatter(test.testMatter);
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

};