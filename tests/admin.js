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
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)));
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
    driver.wait(until.elementLocated(By.id('NewPassword')), 10000);
    
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


var manageUsers = function() {
    
    var firstRow = By.xpath("//tr[contains(@id, 'DXDataRow0')]");
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)));
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.manageUsers)));
    driver.findElement(nav.navMenu.manageUsers).click();
    
    driver.wait(until.elementLocated(firstRow));
    
};


var admin = function() {
    
    var captions = By.xpath("//a[@data-pe-tab='#captions']"),
        matterDisplaySettings = By.xpath("//a[@data-pe-tab='#caseDisplaySettings']"),
        firm = By.xpath("//a[@data-pe-tab='#offices']"),
        listItems = By.xpath("//a[@data-pe-tab='#listitems']"),
        userDefinedRoles = By.xpath("//a[@data-pe-tab='#udf_roles']"),
        vendorLogins = By.xpath("//a[@data-pe-tab='#vendorlogins']"),
        defaultMatterType = By.xpath("//a[@data-pe-tab='#matterDefaultType']"),
        defaultBKSettings = By.xpath("//a[@data-pe-tab='#matterDefaultSettings']"),
        appointmentSettings = By.xpath("//a[@data-pe-tab='#appointmentSettings']"),
        //appointmentTypes = By.xpath("//a[@data-pe-tab='#appointmentTypes']"),
        efiling = By.xpath("//a[@data-pe-tab='#efiling']"),
        generalCases = By.xpath("//a[@data-pe-tab='#generalCases']"),
        dueDiligence = By.xpath("//a[@data-pe-tab='#dueDiligence']"),
        orders = By.xpath("//a[@data-pe-tab='#orders']"),
        importTab = By.xpath("//a[@data-pe-tab='#import']"),
        notificationsSettings = By.xpath("//a[@data-pe-tab='#notificationsSettings']"),
        reassignMatters = By.xpath("//a[@data-pe-tab='#reassignTo']");
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)));
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.admin)));
    driver.findElement(nav.navMenu.admin).click();
    
    driver.wait(until.elementLocated(captions));
    driver.findElement(captions).click();
    driver.wait(until.elementLocated(By.xpath("//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")));
    driver.sleep(1000);
    
    driver.findElement(matterDisplaySettings).click();
    driver.wait(until.elementLocated(By.xpath("//button[text()='Add']")));
    driver.findElement(By.xpath("//a[text()='ASSOCIATED PARTIES']")).click();
    driver.wait(until.elementLocated(By.xpath("//button[@id='btnRemoveAll']")));
    driver.sleep(1000);
    
    driver.findElement(firm).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='offices']//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")));
    driver.sleep(1000);
    
    driver.findElement(listItems).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='listitems']//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")));
    driver.sleep(1000);
    
    driver.findElement(userDefinedRoles).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='udf_roles']//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")));
    driver.sleep(1000);
    
    driver.findElement(vendorLogins).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='vendorlogins']//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")));
    driver.sleep(1000);
    
    driver.findElement(defaultMatterType).click();
    driver.wait(until.elementLocated(By.id("matterTypeSelected")));
    driver.sleep(1000);
    
    driver.findElement(defaultBKSettings).click();
    driver.wait(until.elementLocated(By.id("chapterSelect")));
    driver.sleep(1000);
    
    driver.findElement(appointmentSettings).click();
    driver.wait(until.elementLocated(By.id("aptSettingsRibbon_T0G0I1")));
    driver.sleep(1000);
    
    //driver.findElement(appointmentTypes).click();
    //driver.wait(until.elementLocated(By.))
    
    driver.findElement(efiling).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='efiling']//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")));
    driver.sleep(1000);
    driver.findElement(By.xpath("//a[text()='DEFAULT TASKS']")).click();
    driver.wait(until.elementLocated(By.id("modelObject_0__IsActive")));
    driver.sleep(1000);
    
    driver.findElement(generalCases).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'generalCaseOwnershipsSection_')]//div[starts-with(@class, 'clickable')]")));
    driver.sleep(5000); //tons of entries to wait for
    
    driver.findElement(dueDiligence).click();
    driver.wait(until.elementLocated(By.id('CreditReportCLR')));
    driver.sleep(1000);
    
    driver.findElement(orders).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='orders']//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")));
    driver.sleep(1000);
    
    driver.findElement(importTab).click();
    driver.wait(until.elementLocated(By.id("fileName")));
    driver.sleep(1000);
    
    driver.findElement(notificationsSettings).click();
    driver.wait(until.elementLocated(By.id("notificationsSettings")));
    driver.sleep(1000);
    
    driver.findElement(reassignMatters).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='reassignTo']//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")));
    driver.sleep(1000);
    
    
};


var federalExemptions = function() {
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)));
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.federalExemptions)));
    driver.findElement(nav.navMenu.federalExemptions).click();
    driver.wait(until.elementLocated(By.xpath("//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")));
    
};

var stateExemptions = function() {
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)));
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.stateExemptions)));
    driver.findElement(nav.navMenu.stateExemptions).click();
    driver.wait(until.elementLocated(By.xpath("//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")));
    
};

var medianIncomeAllowance = function() {
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)));
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.medianIncome)));
    driver.findElement(nav.navMenu.medianIncome).click();
    driver.wait(until.elementLocated(By.xpath("//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")));
    
};

var whatsNew = function() {
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)));
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.whatsNew)));
    driver.findElement(nav.navMenu.whatsNew).click();
    driver.wait(until.elementLocated(By.xpath("//table[@class='table hovered']")));
    
};


var submitMyIdea = function() {
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)));
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.submitMyIdea)));
    driver.findElement(nav.navMenu.submitMyIdea).click();
    driver.wait(until.elementLocated(By.id("FullName")));
    driver.findElement(By.className('btn-close')).click();
    driver.findElement(nav.navMenu.self).click();
    driver.sleep(1000);
    
};

var help = function() {
    
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.self)));
    driver.findElement(nav.navMenu.self).click();

    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.help)));
    driver.findElement(nav.navMenu.help).click();
    driver.wait(until.elementLocated(By.xpath("//iframe[@class='height100']")));
    driver.switchTo().frame(0);
    driver.wait(until.elementLocated(By.xpath("//frame[@id='toolbar']")));
    driver.switchTo().defaultContent();
    
};


req.authorize(test.env, 'mikhail.terentiev@waveaccess.ru', 'Rwq78qvf99a');
req.closeTabs();

manageMyAccount();
req.closeTabs();

manageUsers();
req.closeTabs();

admin();
req.closeTabs();

federalExemptions();
req.closeTabs();

stateExemptions();
req.closeTabs();

medianIncomeAllowance();
req.closeTabs();

whatsNew();
req.closeTabs();

submitMyIdea();
req.closeTabs();

help();
req.closeTabs();

req.logOut();