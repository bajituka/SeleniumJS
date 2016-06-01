var req = require('../commonFunctions.js'),
    nav = require('../navigation.js'),
    test = require('../testdata.js');

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;

driver.manage().timeouts().implicitlyWait(2000);
req.catchUncaughtExceptions();

var documents = function() {
    
    req.navigateTo(nav.navMatter.manage.self, nav.navMatter.manage.documents);
    
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseDocuments')]//tr[contains(@id, 'DXDataRow') or contains(@id, 'DXEmptyRow')]")), 15000);
    
};

module.exports.documents = documents;