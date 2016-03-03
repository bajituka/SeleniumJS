var req = require('../src/functions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
    test = require('../src/testdata.js');

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;
    
driver.manage().window().maximize();
driver.manage().timeouts().implicitlyWait(2000);

req.catchUncaughtExceptions();

var manageMyAccount = function() {
    
    var person = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Person']"),
        contactInformation = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Contact Information']"),
        security = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Security']"),
        userRoles = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='User Roles']"),
        emailAccounts = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Email Accounts']"),
        jurisdiction = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Jurisdiction']");
    
    driver.wait(until.elementLocated(nav.navMenu.self));
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.manageMyAccount)));
    driver.findElement(nav.navMenu.manageMyAccount).click();
    
    driver.wait(until.elementLocated(person), 10000);
    driver.findElement(person).click();
    driver.wait(until.elementLocated(By.id('Model_Person_Name_FirstName')), 10000);
    
    driver.wait(until.elementLocated(contactInformation), 10000);
    driver.findElement(contactInformation).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//span[text()='New']")), 10000);
    
    driver.wait(until.elementLocated(security), 10000);
    driver.findElement(security).click();
    driver.wait(until.elementLocated(By.id("//*[@id='NewPassword']")), 10000);
    
    driver.wait(until.elementLocated(userRoles), 10000);
    driver.findElement(userRoles).click();
    driver.wait(until.elementLocated(By.xpath("//button[text()='Add Role']")), 10000);
    
    driver.wait(until.elementLocated(emailAccounts), 10000);
    driver.findElement(emailAccounts).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'emailAccountsusercontainer')]//tr[contains(@id, 'DXEmptyRow') or contains(@id, 'DXDataRow0')]")), 10000);
    
    driver.wait(until.elementLocated(jurisdiction), 10000);
    driver.findElement(jurisdiction).click();
    driver.wait(until.elementLocated(By.id("Case_CountyId")));
    
};


req.authorize(test.env, 'mikhail.terentiev@waveaccess.ru', 'Rwq78qvf99a');
req.closeTabs();

