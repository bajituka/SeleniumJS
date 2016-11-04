var util = require('../utilities.js'),
    nav = require('../navigation.js'),
    test = require('../testdata.js');

var webdriver = util.webdriver,
    driver = util.driver,
    By = util.By,
    until = util.until;

var assert = util.assert,
    fs = util.fs;

driver.manage().timeouts().implicitlyWait(2000);
util.catchUncaughtExceptions();

var documents = function() {
    
    util.navigateTo(nav.navMatter.manage.self, nav.navMatter.manage.documents);
    
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseDocuments')]//tr[contains(@id, 'DXDataRow') or contains(@id, 'DXEmptyRow')]")), 15000);
    
};

module.exports.documents = documents;