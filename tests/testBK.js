var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    jur = require('../src/jurisdictions.js'),
    test = require('../src/testdata.js');


var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var mocha = require('mocha');

var webdriverio = require('webdriverio');
//var options = { desiredCapabilities: { browserName: 'firefox' }};
var client = webdriverio.remote();

var assert = req.assert,
    fs = req.fs;

//req.catchUncaughtExceptions();
/*
client
    .init()
    .url(test.sprint3)
    .waitForExist("name='UserName'")
    .setValue("name='UserName'", test.login)
    .setValue("name='Password'", test.password)
    .end();


describe('LOGIN AND LOGOUT', function() {
    this.timeout(0);
    it('should authorize and log out', function(done) {
        
        req.authorize(test.env, test.login, test.password);
        req.logOut(done);
    });
});
*/

        driver.manage().timeouts().implicitlyWait(2000);
        req.catchUncaughtExceptions();
        
        req.authorize(test.env, test.login, test.password);
        req.closeTabs();
        req.openCreateContact('dashboard', 'person');
        
        driver.wait(until.elementLocated(By.id('FirstName')), 15000);
        driver.wait(until.elementLocated(By.id('searchBtn')), 15000);
        driver.findElement(By.id('searchBtn')).getAttribute('disabled').then(function(disabled) { //checking for search button to be disabled
            assert.equal(disabled, 'true');
        });
        driver.findElement(By.id('FirstName')).sendKeys('test1');
        
        
        driver.findElement(By.id('LastName')).sendKeys('test3');
        
        driver.findElement(By.id('TaxPayerId')).sendKeys('123123121');
        
        driver.findElement(By.id('Email')).sendKeys('asd@fas.com');
        
        driver.findElement(By.id('Phone')).sendKeys('1231231231');
        
        driver.findElement(By.id('Zip')).sendKeys('60007');
        driver.findElement(By.id('searchBtn')).click();
        
        //driver.findElement(By.id('searchBtn')).click();
        req.waitForLoadingBar();
        var confirmCreateNewContact = driver.findElement(By.xpath("//button[starts-with(@id, 'nextBtnCreateContactTabs')]"));
        driver.wait(until.elementIsEnabled(confirmCreateNewContact), 10000);
        confirmCreateNewContact.click().then(function() {
    console.log('clicked')    
    });
        driver.wait(until.elementLocated(By.id('Model_Phones_0__Type')), 30000)
req.logOut();