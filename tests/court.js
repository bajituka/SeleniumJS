var util = require('../src/utilities.js'),
    nav = require('../src/navigation.js'),
    jur = require('../src/jurisdictions.js'),
    test = require('../src/testdata.js'),
    sofa = require('../src/petition/sofa.js'),
    tasks = require('../src/tasks.js'),
    efp = require('../src/court/efiling.js');
    
var webdriver = util.webdriver,
    driver = util.driver,
    By = util.By,
    until = util.until;

var assert = util.assert,
    fs = util.fs,
    mocha = require('selenium-webdriver/testing');

mocha.describe('COURT', function() {
    this.timeout(0);
        
    mocha.before(function() {
        driver.manage().window().maximize();
        util.authorize(test.env, test.login, test.password);
        util.closeTabs();
    });
    
    mocha.after(function() {
        util.closeTabs();
        util.logOut()
    });

    mocha.describe('eFiling', function() {

        mocha.describe('File single jurisdiction', function() {
        
            mocha.it('File ' + test.matter.state.toString(), function() {

                util.openCreateContact('dashboard', 'person');
                util.createPerson(test.person);
                util.createBKmatter(test.matter);
                efp.fileJurisdiction();

            });

            
        });
    });

});