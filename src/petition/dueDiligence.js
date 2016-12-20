var util = require('../utilities.js'),
    nav = require('../navigation.js'),
    jur = require('../jurisdictions.js'),
    test = require('../testdata.js');

var webdriver = util.webdriver,
    driver = util.driver,
    By = util.By,
    until = util.until;

var assert = util.assert,
    fs = util.fs;

util.catchUncaughtExceptions();

var dueDiligence = function() {
    
    util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.dueDiligence.self);
    
    driver.wait(until.elementLocated(By.id("CreditReportId")), 20000).catch(function() {
        console.log("Due diligence place new order FAIL");
        util.saveScreenshot("DueDiligencePlaceNewOrder.png")
    });
    driver.findElement(nav.navMatter.petition.dueDiligence.viewExistingOrders).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='VendorOrders']//div[text()='None found...']"))).catch(function() {
        console.log("Due diligence view existing orders FAIL");
        util.saveScreenshot("DueDiligenceViewExistingOrders.png")
    });
    
};

module.exports.dueDiligence = dueDiligence;