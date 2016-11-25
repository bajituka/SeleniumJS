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

var finance = function() {
    
    util.navigateTo(nav.navMatter.manage.self, nav.navMatter.manage.finance);
    
    var feesAndCosts = By.xpath("//button[@title='Add Fees and Costs']");
    driver.wait(until.elementLocated(feesAndCosts), 15000);
    driver.wait(until.elementLocated(By.xpath("//legend[text()='Finanacial Breakdown']")), 15000);
    
    driver.findElement(feesAndCosts).click();
    
    var cancelBtn = By.xpath("//button[starts-with(@id, 'cancel') and contains(@class, 'closeButton')]");
    driver.wait(until.elementLocated(cancelBtn), 15000);
    driver.findElement(cancelBtn).click();
    driver.sleep(1000);
    
    driver.findElement(By.xpath("//button[@title='Add Payment']")).click();
    driver.wait(until.elementLocated(cancelBtn), 15000);
    driver.findElement(cancelBtn).click();
    driver.sleep(1000);
    
    driver.findElement(By.xpath("//button[@title='Add Adjustment']")).click();
    driver.wait(until.elementLocated(cancelBtn), 15000);
    driver.findElement(cancelBtn).click();
    driver.sleep(1000);
    
    driver.findElement(By.xpath("//button[@title='Add Payment Source']")).click();
    driver.wait(until.elementLocated(cancelBtn), 15000);
    driver.findElement(cancelBtn).click();
    driver.sleep(1000);
    
    
};

module.exports.finance = finance;