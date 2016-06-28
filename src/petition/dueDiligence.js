var req = require('../commonFunctions.js'),
    nav = require('../navigation.js'),
    jur = require('../jurisdictions.js'),
    test = require('../testdata.js');

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;

req.catchUncaughtExceptions();

var dueDiligence = function() {
    
    req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.dueDiligence.self);
    
    driver.wait(until.elementLocated(By.id("CreditReportId")), 10000).thenCatch(function() {
        console.log("Due diligence place new order FAIL");
        req.saveScreenshot("DueDiligencePlaceNewOrder.png")
    });
    driver.findElement(nav.navMatter.petition.dueDiligence.viewExistingOrders).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='VendorOrders']//div[text()='None found...']"))).thenCatch(function() {
        console.log("Due diligence view existing orders FAIL");
        req.saveScreenshot("DueDiligenceViewExistingOrders.png")
    });
    
};

module.exports.dueDiligence = dueDiligence;