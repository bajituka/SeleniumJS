var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    jur = require('../src/jurisdictions.js'),
    test = require('../src/testdata.js'),
    sofa = require('../src/petition/sofa.js'),
    tasks = require('../src/tasks.js'),
    efp = require('../src/court/efiling.js');
    
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

        mocha.describe('File single jurisdiction', function() {
        
            mocha.it('File ' + test.matter.state.toString(), function() {

                req.openCreateContact('dashboard', 'person');
                req.createPerson(test.person);
                req.createBKmatter(test.matter);
                efp.fileJurisdiction();

            });

            
        });
    });

});