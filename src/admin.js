var util = require('../src/utilities.js'),
    nav = require('../src/navigation.js'),
    jur = require('../src/jurisdictions.js'),
    test = require('../src/testdata.js');

var webdriver = util.webdriver,
    driver = util.driver,
    By = util.By,
    until = util.until;

var assert = util.assert,
    fs = util.fs;
    
driver.manage().timeouts().implicitlyWait(2000);
util.catchUncaughtExceptions();

var manageMyAccount = {

    person: function() { 
        var personTab = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Person']");
        driver.wait(until.elementLocated(personTab), 20000);
        driver.findElement(personTab).click();
        driver.wait(until.elementLocated(By.id('Model_Person_Name_FirstName')), 20000);
    },
    
    contactInformation: function() {
        var contactInformationTab = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Contact Information']");
        driver.wait(until.elementLocated(contactInformationTab), 20000);
        driver.findElement(contactInformationTab).click();
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//span[text()='New']")), 20000);
    },
    
    security: function() {
        var securityTab = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Security']");
        driver.wait(until.elementLocated(securityTab), 20000);
        driver.findElement(securityTab).click();
        driver.wait(until.elementLocated(By.id('NewPassword')), 20000);
    },
    
    userRoles: function() {
        var userRolesTab = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='User Roles']");
        driver.wait(until.elementLocated(userRolesTab), 20000);
        driver.findElement(userRolesTab).click();
        driver.wait(until.elementLocated(By.xpath("//button[text()='Add Role']")), 20000);
    },
    
    emailAccounts: {
        
        emailAccountsTab: By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Email Accounts']"),
        firstRow: By.xpath("//div[starts-with(@id, 'emailAccountsusercontainer_')]//tr[contains(@id, 'DXDataRow0')]"),
        
        addEmailAcct: function(type) {
            
            var newBtn = By.xpath("//div[starts-with(@id, 'emailAccountsusercontainer')]//a[contains(@class, 'gridBtn-new')]");
            driver.wait(until.elementLocated(newBtn), 15000);
            driver.findElement(newBtn).click();
            if (type == 'gmail') {
                //coming soon
            } else {
                var yahoo = By.xpath("//select[@id='AccountType']/option[@value='3']");
                driver.wait(until.elementLocated(yahoo), 15000);
                driver.findElement(yahoo).click();
                driver.wait(until.elementIsEnabled(driver.findElement(By.id('Email'))), 15000);
                driver.findElement(By.id('Email')).sendKeys('anhungered@yahoo.com');
                driver.findElement(By.id('PasswordOriginal')).sendKeys('Password1!');
                driver.findElement(By.xpath("//section[starts-with(@id, 'CreateUpdateUserEmailAccount_')]//button[@type='submit']")).click();
                driver.wait(until.elementLocated(this.firstRow), 15000);
                driver.sleep(1000);
            }
        },
        crudEmailAccts: function() {
            driver.wait(until.elementLocated(this.emailAccountsTab), 20000);
            driver.findElement(this.emailAccountsTab).click();
            driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'emailAccountsusercontainer')]//tr[contains(@id, 'DXEmptyRow')]")), 5000).then(function() {
                manageMyAccount.emailAccounts.addEmailAcct()
            }, function() {
                driver.findElements(By.xpath("//div[starts-with(@id, 'emailAccountsusercontainer')]//tr[contains(@id, 'DXDataRow')]")).then(function(emailAccts) {
                    var arr = [];
                    for (var index = 1; index <= emailAccts.length; index++) {
                        driver.findElement(By.xpath("//div[starts-with(@id, 'emailAccountsusercontainer')]//tr[contains(@id, 'DXDataRow')]" + "[" + index + "]/td[1]")).getText().then(function(address) {
                            arr.push(address);
                            console.log(arr)
                        });
                    }
                    driver.findElement(By.xpath("//div[starts-with(@id, 'emailAccountsusercontainer')]//tr[contains(@id, 'DXDataRow')]")).then(function() {
                        if (arr.toString().search('yahoo') == -1) {
                            manageMyAccount.emailAccounts.addEmailAcct()
                        }
                    });
                });
            });
            driver.findElement(this.firstRow).click();
            driver.wait(until.elementLocated(By.id('Email')), 15000);
            driver.findElement(By.xpath("//section[starts-with(@id, 'CreateUpdateUserEmailAccount_')]//button[@data-pe-role='cancel-button']")).click();
            driver.sleep(2000);
            var deleteBtn = driver.findElement(By.xpath("//div[starts-with(@id, 'emailAccountsusercontainer')]//tr[contains(@id, 'DXDataRow0')]//a"));
            deleteBtn.click();
            util.confirmDelete();
            driver.wait(until.stalenessOf(deleteBtn), 5000);
        },
    },   
    jurisdiction: function() {
        var jurisdictionTab = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Jurisdiction']");
        driver.wait(until.elementLocated(jurisdictionTab), 20000);
        driver.findElement(jurisdictionTab).click();
        driver.wait(until.elementLocated(By.id("Case_CountyId")), 15000);
    }    
};

var manageUsers = function() {
    
    var firstRow = By.xpath("//tr[contains(@id, 'DXDataRow0')]");
    util.navigateTo(nav.navMenu.self, nav.navMenu.manageUsers);
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
    
    util.navigateTo(nav.navMenu.self, nav.navMenu.admin);
    
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
    
    util.navigateTo(nav.navMenu.self, nav.navMenu.federalExemptions);
    driver.wait(until.elementLocated(By.xpath("//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
    
};

var stateExemptions = function() {
    
    util.navigateTo(nav.navMenu.self, nav.navMenu.stateExemptions);
    driver.wait(until.elementLocated(By.xpath("//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
    
};

var medianIncomeAllowance = function() {
    
    util.navigateTo(nav.navMenu.self, nav.navMenu.medianIncome);
    driver.wait(until.elementLocated(By.xpath("//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
    
};

var whatsNew = function() {
    
    util.navigateTo(nav.navMenu.self, nav.navMenu.whatsNew);
    driver.wait(until.elementLocated(By.xpath("//table[@class='table hovered']")), 15000);
    
};


var submitMyIdea = function() {
    
    util.navigateTo(nav.navMenu.self, nav.navMenu.submitMyIdea);
    driver.wait(until.elementLocated(By.id("FullName")), 15000);
    driver.findElement(By.className('btn-close')).click();
    driver.findElement(nav.navMenu.self).click();
    driver.sleep(1000);
    
};

var help = function() {
    
    util.navigateTo(nav.navMenu.self, nav.navMenu.help);
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