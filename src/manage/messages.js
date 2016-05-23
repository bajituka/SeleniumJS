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


var createEmail = function() {
    
    driver.wait(until.elementLocated(By.xpath("//select[starts-with(@id, 'EmailAccountsSelectBoxId_')]")), 15000);
    driver.findElements(By.xpath("//select[starts-with(@id, 'EmailAccountsSelectBoxId_')]/option")).then(function(emailAccts) {
        if (emailAccts.length == 1) {
            driver.findElement(nav.navMenu.self).click();
            driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.manageMyAccount)), 5000);
            driver.findElement(nav.navMenu.manageMyAccount).click();
            var emailAccountsTab = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Email Accounts']");
            driver.wait(until.elementLocated(emailAccountsTab), 15000);
            driver.findElement(emailAccountsTab).click();
            driver.wait(until.elementLocated(), 15000);
        } else {
            
        }
    });
    
    
};

var emailManage = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.manage.self), 15000);
    driver.findElement(nav.navMatter.manage.self).click();
    driver.wait(until.elementLocated(nav.navMatter.manage.messages.self), 15000);
    driver.findElement(nav.navMatter.manage.messages.self).click();
    driver.wait(until.elementLocated(nav.navMatter.manage.messages.emailMessages), 15000);
    driver.findElement(nav.navMatter.manage.messages.emailMessages).click();
    
    
};

var emailNavbar = function() {
    
    
    
};