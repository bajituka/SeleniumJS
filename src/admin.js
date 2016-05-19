var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
    test = require('../src/testdata.js');

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;
    
driver.manage().timeouts().implicitlyWait(2000);
req.catchUncaughtExceptions();

var manageMyAccount = function() {
    
    var person = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Person']"),
        contactInformation = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Contact Information']"),
        security = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Security']"),
        userRoles = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='User Roles']"),
        emailAccounts = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Email Accounts']"),
        jurisdiction = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Jurisdiction']");
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)), 15000);
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.manageMyAccount)), 15000);
    driver.findElement(nav.navMenu.manageMyAccount).click();
    
    driver.wait(until.elementLocated(person), 10000);
    driver.findElement(person).click();
    driver.wait(until.elementLocated(By.id('Model_Person_Name_FirstName')), 10000);
    
    driver.wait(until.elementLocated(contactInformation), 10000);
    driver.findElement(contactInformation).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//span[text()='New']")), 10000);
    
    driver.wait(until.elementLocated(security), 10000);
    driver.findElement(security).click();
    driver.wait(until.elementLocated(By.id('NewPassword')), 10000);
    
    driver.wait(until.elementLocated(userRoles), 10000);
    driver.findElement(userRoles).click();
    driver.wait(until.elementLocated(By.xpath("//button[text()='Add Role']")), 10000);
    
    driver.wait(until.elementLocated(emailAccounts), 10000);
    driver.findElement(emailAccounts).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'emailAccountsusercontainer')]//tr[contains(@id, 'DXEmptyRow') or contains(@id, 'DXDataRow0')]")), 10000);
    
    driver.wait(until.elementLocated(jurisdiction), 10000);
    driver.findElement(jurisdiction).click();
    driver.wait(until.elementLocated(By.id("Case_CountyId")), 15000);
    
};


var manageUsers = function() {
    
    var firstRow = By.xpath("//tr[contains(@id, 'DXDataRow0')]");
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)), 15000);
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.manageUsers)), 15000);
    driver.findElement(nav.navMenu.manageUsers).click();
    
    driver.wait(until.elementLocated(firstRow));
    
};


var admin = function() {
    
    var captions = By.xpath("//a[@data-pe-tab='#captions']"),
        matterDisplaySettings = By.xpath("//a[@data-pe-tab='#caseDisplaySettings']"),
        offices = By.xpath("//a[@data-pe-tab='#offices']"),
        finance = By.xpath("//a[@data-pe-tab='#finance']"),
        courtViewSettings = By.xpath("//a[@data-pe-tab='#ecfEvents']"),
        listItems = By.xpath("//a[@data-pe-tab='#listitems']"),
        idSettings = By.xpath("//a[@data-pe-tab='#idSettings']"),
        userDefinedRoles = By.xpath("//a[@data-pe-tab='#udf_roles']"),
        vendorLogins = By.xpath("//a[@data-pe-tab='#vendorlogins']"),
        defaultMatterType = By.xpath("//a[@data-pe-tab='#matterDefaultType']"),
        defaultBKSettings = By.xpath("//a[@data-pe-tab='#matterDefaultSettings']"),
        appointmentSettings = By.xpath("//a[@data-pe-tab='#appointmentSettings']"),
        appointmentTypes = By.xpath("//a[@data-pe-tab='#appointmentTypes']"),
        efiling = By.xpath("//a[@data-pe-tab='#efiling']"),
        generalCases = By.xpath("//a[@data-pe-tab='#generalCases']"),
        dueDiligence = By.xpath("//a[@data-pe-tab='#dueDiligence']"),
        orders = By.xpath("//a[@data-pe-tab='#orders']"),
        importTab = By.xpath("//a[@data-pe-tab='#import']"),
        notificationsSettings = By.xpath("//a[@data-pe-tab='#notificationsSettings']"),
        reassignMatters = By.xpath("//a[@data-pe-tab='#reassignTo']");
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)), 15000);
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.admin)), 15000);
    driver.findElement(nav.navMenu.admin).click();
    
    //FIRM
    driver.findElement(appointmentSettings).click();
    driver.wait(until.elementLocated(By.id("aptSettingsRibbon_T0G0I1")), 15000);
    driver.sleep(1000);
    
    driver.findElement(appointmentTypes).click();
    driver.wait(until.elementLocated(By.xpath("//tbody[@id='dataRows']/tr[1]")), 15000);
    driver.sleep(1000);
    
    driver.findElement(efiling).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='efiling']//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
    driver.sleep(1000);
    driver.findElement(By.xpath("//a[text()='DEFAULT TASKS']")).click();
    driver.wait(until.elementLocated(By.id("modelObject_0__IsActive")), 15000);
    driver.sleep(1000);
    
    driver.findElement(userDefinedRoles).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='udf_roles']//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
    driver.sleep(1000);
    
    driver.findElement(vendorLogins).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='vendorlogins']//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
    driver.sleep(1000);
    
    driver.findElement(offices).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='offices']//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
    driver.sleep(1000);
    
    driver.findElement(finance).click();
    driver.wait(until.elementLocated(By.id("employeeTable")), 15000);
    driver.sleep(1000);
    
    driver.findElement(notificationsSettings).click();
    driver.wait(until.elementLocated(By.id("notificationsSettings")), 15000);
    driver.sleep(1000);
    
    driver.findElement(courtViewSettings).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='ecfEvents']//tr[contains(@id, 'DXDataRow0')]")), 15000);
    driver.sleep(1000);
    
    //MATTER
    driver.findElement(defaultBKSettings).click();
    driver.wait(until.elementLocated(By.id("chapterSelect")), 15000);
    driver.sleep(1000);
    
    driver.findElement(defaultMatterType).click();
    driver.wait(until.elementLocated(By.id("matterTypeSelected")), 15000);
    driver.sleep(1000);
    
    driver.findElement(dueDiligence).click();
    driver.wait(until.elementLocated(By.id('CreditReportCLR')), 15000);
    driver.sleep(1000);
    
    driver.findElement(generalCases).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'generalCaseOwnershipsSection_')]//div[starts-with(@class, 'clickable')]")), 15000);
    driver.sleep(6000); //tons of entries to wait for
    
    driver.findElement(matterDisplaySettings).click();
    driver.wait(until.elementLocated(By.xpath("//button[text()='Add']")), 15000);
    driver.findElement(By.xpath("//a[text()='ASSOCIATED PARTIES']")).click();
    driver.wait(until.elementLocated(By.xpath("//button[@id='btnRemoveAll']")), 15000);
    driver.sleep(1000);
    
    driver.findElement(reassignMatters).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='reassignTo']//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
    driver.sleep(1000);
    
    //GLOBAL
    driver.findElement(captions).click();
    driver.wait(until.elementLocated(By.xpath("//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
    driver.sleep(1000);
    
    driver.findElement(listItems).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='listitems']//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
    driver.sleep(1000);
    
    driver.findElement(importTab).click();
    driver.wait(until.elementLocated(By.id("fileName")), 15000);
    driver.sleep(1000);
    
    driver.findElement(idSettings).click();
    driver.wait(until.elementLocated(By.id("clearSetting_0__Value")), 15000);
    driver.sleep(1000);
    
    driver.findElement(orders).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='orders']//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
    driver.sleep(1000);
      
};


var federalExemptions = function() {
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)), 15000);
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.federalExemptions)), 15000);
    driver.findElement(nav.navMenu.federalExemptions).click();
    driver.wait(until.elementLocated(By.xpath("//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
    
};

var stateExemptions = function() {
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)), 15000);
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.stateExemptions)), 15000);
    driver.findElement(nav.navMenu.stateExemptions).click();
    driver.wait(until.elementLocated(By.xpath("//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
    
};

var medianIncomeAllowance = function() {
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)), 15000);
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.medianIncome)), 15000);
    driver.findElement(nav.navMenu.medianIncome).click();
    driver.wait(until.elementLocated(By.xpath("//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
    
};

var whatsNew = function() {
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)), 15000);
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.whatsNew)), 15000);
    driver.findElement(nav.navMenu.whatsNew).click();
    driver.wait(until.elementLocated(By.xpath("//table[@class='table hovered']")), 15000);
    
};


var submitMyIdea = function() {
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)), 15000);
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.submitMyIdea)), 15000);
    driver.findElement(nav.navMenu.submitMyIdea).click();
    driver.wait(until.elementLocated(By.id("FullName")), 15000);
    driver.findElement(By.className('btn-close')).click();
    driver.findElement(nav.navMenu.self).click();
    driver.sleep(1000);
    
};

var help = function() {
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)), 15000);
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.help)), 15000);
    driver.findElement(nav.navMenu.help).click();
    driver.wait(until.elementLocated(By.xpath("//iframe[@class='height100']")), 15000);
    driver.switchTo().frame(0);
    driver.wait(until.elementLocated(By.xpath("//frame[@id='toolbar']")), 15000);
    driver.switchTo().defaultContent();
    
};

module.exports = {
    manageMyAccount: manageMyAccount,
    manageUsers: manageUsers,
    admin: admin,
    federalExemptions: federalExemptions,
    stateExemptions: stateExemptions,
    medianIncomeAllowance: medianIncomeAllowance,
    whatsNew: whatsNew,
    submitMyIdea: submitMyIdea,
    help: help
};