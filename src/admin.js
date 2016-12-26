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
    driver.wait(until.elementLocated(firstRow), 20000);
    
};

var admin = {

    appointments: function() {

        var typesTab = By.xpath("//a[text()='TYPES']"),
            colorCodesTab = By.xpath("//a[text()='COLOR CODES']"),
            courtViewTab = By.xpath("//a[text()='COURT VIEW']");

        var newBtn = By.xpath("//div[@id='appointment_types']//a[@class='element brand gridBtn-new']");

        util.navigateTo(nav.navMenu.self, nav.navMenu.admin.self, nav.navMenu.admin.appointments, typesTab);

        //create appointment type
        driver.wait(until.elementLocated(newBtn), 20000);
        driver.findElement(newBtn).click();
        var displayName = By.xpath("//input[@id='DisplayName']");
        driver.wait(until.elementLocated(displayName), 20000);
        driver.findElement(displayName).sendKeys("TestToBeFound");
        var saveBtnEl = driver.findElement(By.xpath("//*[@id='apntTypeForm']//button[@type='submit']"));
        driver.executeScript("arguments[0].scrollIntoView(true);", saveBtnEl);
        saveBtnEl.click();
        driver.wait(until.stalenessOf(saveBtnEl), 20000);
        driver.sleep(1000);

        //find appointment type
        driver.findElement(By.xpath("//input[contains(@id, 'DXFREditorcol1_I')]")).sendKeys("TestToBeFound");
        driver.findElement(By.xpath("//input[contains(@id, 'DXFREditorcol1_I')]")).sendKeys(webdriver.Key.ENTER);
        driver.sleep(2000);
        
        //update appointment type
        var firstRow = By.xpath("//div[@id='appointment_types']//tr[contains(@id, 'DXDataRow0')]");
        driver.findElement(firstRow).click();
        driver.wait(until.elementLocated(displayName), 20000);
        var displayNameEl = driver.findElement(displayName);
        util.replaceWithValue(displayName, 'TestToBeNotFound');
        driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(By.xpath("//*[@id='apntTypeForm']//button[@type='submit']")));
        driver.findElement(By.xpath("//*[@id='apntTypeForm']//button[@type='submit']")).click();
        driver.wait(until.stalenessOf(displayNameEl), 20000);
        driver.sleep(1000);

        //find and delete appointment type
        util.replaceWithValue(By.xpath("//input[contains(@id, 'DXFREditorcol1_I')]"), "TestToBeNotFound");
        driver.findElement(By.xpath("//input[contains(@id, 'DXFREditorcol1_I')]")).sendKeys(webdriver.Key.ENTER);
        driver.sleep(2000);
        var deleteButton = driver.findElement(By.xpath("//div[@id='appointment_types']//tr[contains(@id, 'DXDataRow0')]//a"));
        deleteButton.click();
        util.confirmDelete();
        driver.wait(until.stalenessOf(deleteButton), 20000);

        //color codes tab
        driver.findElement(colorCodesTab).click();
        var colorSaveBtn = By.xpath("//div[@id='color_codes']//button");
        driver.wait(until.elementIsEnabled(driver.findElement(colorSaveBtn)), 20000);
        driver.findElement(colorSaveBtn).click();
        driver.sleep(2000);

        //courtview tab
        driver.findElement(courtViewTab).click();
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//form[@id='courViewAppointmentForm']//button[@type='submit']"))), 20000);

    },


    efiling: function() {

        var divisionDocumentsTab = By.xpath("//a[text()='DIVISION DOCUMENTS']"),
            defaultTasksTab = By.xpath("//a[text()='DEFAULT TASKS']");

        var newBtn = By.xpath("//a[@id='newDivisionsFilesAnchor']");

        util.navigateTo(nav.navMenu.self, nav.navMenu.admin.self, nav.navMenu.admin.efiling, divisionDocumentsTab);

        driver.wait(until.elementLocated(newBtn), 15000);
        driver.findElement(newBtn).click();
        driver.wait(until.elementLocated(By.xpath("//input[@id='Zip']")), 20000);
        var zipEl = driver.findElement(By.xpath("//input[@id='Zip']"));
        zipEl.sendKeys('82401');
        driver.findElement(By.xpath("//div[@id='zipCode']//button")).click();
        util.waitForAddressZip();
        driver.findElement(By.xpath("//*[starts-with(@id, 'createDivisionFormFile')]//button[@type='submit']")).click();
        driver.wait(until.stalenessOf(zipEl), 20000);
        driver.sleep(1000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a")).click();
        driver.sleep(2000);
        driver.findElement(By.xpath("(//td[@class='dxic']/input)[1]")).sendKeys("Wyoming"); //unsafe locator, need to revise (can point to another input if columns position is changed)
        driver.findElement(By.xpath("(//td[@class='dxic']/input)[1]")).sendKeys(webdriver.Key.ENTER);
        driver.sleep(2000);
        var deleteBtnEl = driver.findElement(By.xpath("//tr[contains(@id, 'DXDataRow0')]//a[2]"));
        deleteBtnEl.click();
        util.confirmDelete();
        driver.wait(until.stalenessOf(deleteBtnEl), 20000);
        
        //default tasks tab
        util.navigateTo(defaultTasksTab);
        driver.wait(until.elementLocated(By.xpath("//*[starts-with(@id, 'DefaultCaseTasks')]//button")), 20000);
        driver.findElement(By.xpath("//*[starts-with(@id, 'DefaultCaseTasks')]//button")).click();
        util.waitForSuccessMsg();
    },


    contactManagement: function() {
        
        var newBtn = By.xpath("//div[@id='udf_roles']//a[@class='element brand gridBtn-new']"),
            saveBtn = By.xpath("//section[starts-with(@id, 'CreateRoleGroupSection')]//button[@type='submit']"),
            name = By.xpath("//section[starts-with(@id, 'CreateRoleGroupSection')]//input[@id='Name']"),
            contactGroupName = By.xpath("//div[@id='udf_roles']//input[contains(@id, 'DXFREditorcol1_I')]");

        util.navigateTo(nav.navMenu.self, nav.navMenu.admin.self, nav.navMenu.admin.contactManagement);

        driver.wait(until.elementLocated(newBtn), 20000);
        driver.findElement(newBtn).click();
        
        util.waitForElementsLocated(name, saveBtn);
        var saveBtnEl = driver.findElement(saveBtn);
        var testName = "TestName";
        driver.findElement(name).sendKeys(testName);
        driver.findElement(saveBtn).click();
        driver.wait(until.stalenessOf(saveBtnEl), 20000);
        
        driver.wait(until.elementLocated(contactGroupName), 20000);
        driver.findElement(contactGroupName).sendKeys(testName);
        driver.findElement(contactGroupName).sendKeys(webdriver.Key.ENTER);
        driver.sleep(2000);

        var deleteBtnEl = driver.findElement(By.xpath("//tr[contains(@id, 'DXDataRow0')]//a[1]"));
        deleteBtnEl.click();
        util.confirmDelete();
        driver.wait(until.stalenessOf(deleteBtnEl), 20000);
    },

    vendorLogins: function() {

        var vendorLoginsTab = By.xpath("//div[@id='vendorlogins']//a[text()='VENDORS LOGINS']"),
            payjunctionLoginsTab = By.xpath("//div[@id='vendorlogins']//a[text()='PAYJUNCTION LOGINS']");

        var newBtnInVendorLogins = By.xpath("(//div[@id='vendorlogins']//a[@class='element brand gridBtn-new'])[1]"), //unsafe
            newBtnInPayjunctionLogins = By.xpath("(//div[@id='vendorlogins']//a[@class='element brand gridBtn-new'])[2]"); //unsafe

        var userName = By.xpath("//input[@id='UserName']"),
            password = By.xpath("//input[@id='Password']"),
            saveAndCloseBtn = By.xpath("//section[@id='CreateVendorLoginSection']//button[@type='submit']");

        var userNameSearchField = By.xpath("(//div[@id='vendorlogins']//input[contains(@id, 'DXFREditorcol2_I')])[1]"); //unsafe

        util.navigateTo(nav.navMenu.self, nav.navMenu.admin.self, nav.navMenu.admin.vendorLogins, vendorLoginsTab);

        driver.wait(until.elementLocated(newBtnInVendorLogins), 20000);
        driver.findElement(newBtnInVendorLogins).click();

        util.waitForElementsLocated(userName, saveAndCloseBtn);
        var saveAndCloseBtnEl = driver.findElement(saveAndCloseBtn);
        var testLogin = "TestLogin";
        driver.findElement(userName).sendKeys(testLogin);
        driver.findElement(password).sendKeys("TestPassword");
        driver.findElement(saveAndCloseBtn).click();
        driver.wait(until.stalenessOf(saveAndCloseBtnEl), 20000);

        driver.wait(until.elementLocated(userNameSearchField), 20000);
        driver.findElement(userNameSearchField).sendKeys(testLogin);

        driver.findElement(contactGroupName).sendKeys(webdriver.Key.ENTER);
        driver.sleep(2000);

        var deleteBtnEl = driver.findElement(By.xpath("(//tr[contains(@id, 'DXDataRow0')]//a[1])[1]"));
        deleteBtnEl.click();
        util.confirmDelete();
        driver.wait(until.stalenessOf(deleteBtnEl), 20000);
    },

    firmDetails: function() {

        var officesTab = By.xpath("//div[@id='offices']//a[text()='Offices']"),
            detailsTab = By.xpath("//div[@id='offices']//a[text()='Details']");

        var newBtn = By.xpath("//div[@id='offices']//a[@class='element brand gridBtn-new']");

        var officeName = By.xpath("//div[@id='offices']//input[@id='office_Name']"),
            displayName = By.xpath("//div[@id='offices']//input[@id='office_DisplayName']"),
            saveBtn = By.xpath("//section[@id='CreateOffice_']//button[@type='submit']");

        util.navigateTo(nav.navMenu.self, nav.navMenu.admin.self, nav.navMenu.admin.firmDetails, officesTab);

        driver.wait(until.elementLocated(newBtn), 20000);
        driver.findElement(newBtn).click();

        util.waitForElementsLocated(officeName, saveBtn);
        var officeTestName = "NewOffice";
        var saveBtnEl = driver.findElement(saveBtn);
        driver.findElement(officeName).sendKeys(officeTestName);
        driver.findElement(displayName).sendKeys("NewOfficeDisplayName");
        saveBtnEl.click();

        driver.wait(until.stalenessOf(saveBtnEl), 20000);

        var nameSearchField = By.xpath("//div[@id='offices']//input[contains(@id, 'DXFREditorcol1_I')]");
        driver.wait(until.elementLocated(nameSearchField), 20000);
        driver.findElement(nameSearchField).sendKeys(officeTestName);

        driver.findElement(nameSearchField).sendKeys(webdriver.Key.ENTER);
        driver.sleep(2000);

        var deleteBtnEl = driver.findElement(By.xpath("//div[@id='offices']//tr[contains(@id, 'DXDataRow0')]//a"));
        deleteBtnEl.click();
        util.confirmDelete();
        driver.wait(until.stalenessOf(deleteBtnEl), 20000);

        driver.findElement(detailsTab).click();
        driver.wait(until.elementLocated(By.xpath("//button[@class='btn-file']")), 20000);
    },

    finance: function() {
        util.navigateTo(nav.navMenu.self, nav.navMenu.admin.self, nav.navMenu.admin.finance);
    },

    notificationsSettings: function() {

        var newBtn = By.xpath("//div[@id='notificationsSettings']//a[@class='element brand gridBtn-new']");

        util.navigateTo(nav.navMenu.self, nav.navMenu.admin.self, nav.navMenu.admin.notificationSettings);

        driver.findElement(newBtn).click();

        var templateName = By.xpath("//div[@id='notificationsSettings']//input[@id='Name']"),
            contactRadioBtn = By.xpath("//div[@id='notificationsSettings']//input[@value='Contact'][not(@type='hidden')]"),
            textMessageType = By.xpath("//div[@id='notificationsSettings']//input[@id='smsTemplateType']"),
            templateContent = By.xpath("//div[@id='notificationsSettings']//textarea[@id='SmsContent']"),
            saveBtn = By.xpath("//div[@id='notificationsSettings']//button[@type='submit']");

        util.waitForElementsLocated(templateName, saveBtn);
        var testTemplateName = "TestTemplateName";
        var saveBtnEl = driver.findElement(saveBtn);
        driver.findElement(templateName).sendKeys(testTemplateName);
        driver.findElement(textMessageType).click();
        driver.findElement(contactRadioBtn).click();
        driver.findElement(templateContent).sendKeys("This is some nice template content");
        saveBtnEl.click();
        driver.wait(until.stalenessOf(saveBtnEl), 20000);


    },

    courtViewSettings: function() {

        util.navigateTo(nav.navMenu.self, nav.navMenu.admin.self, nav.navMenu.admin.courtviewSettings);

    },

    courtviewMailboxes: function() {

        util.navigateTo(nav.navMenu.self, nav.navMenu.admin.self, nav.navMenu.admin.courtviewMailboxes);

        var newBtn = By.xpath("//div[@id='ecfEvents']//a[@class='element brand gridBtn-new']");

        var email = By.xpath("//*[@id='CourtViewEmail']"),
            password = By.xpath("//*[@id='CourtViewPassword']"),
            pacerURL = By.xpath("//input[@id='PacerUrl']"),
            pacerUsername = By.xpath("//input[@id='PacerUsername']"),
            pacerPassword = By.xpath("//input[@id='PacerPassword']");

        var saveBtn = By.xpath("//button[@type='submit'][@data-role-action='save']");

        driver.findElement(newBtn).click();
        driver.wait(until.elementLocated(By.xpath("//*[@id='Id']")), 20000);
        driver.findElement(By.xpath("//*[@id='Id']/option[@value='48']")).click();
        driver.findElement(email).sendKeys("test@test.com");
        driver.findElement(password).sendKeys("testPass");
        driver.findElement(pacerURL).sendKeys("testURL");
        driver.findElement(pacerUsername).sendKeys("testpacerUsername");
        driver.findElement(pacerPassword).sendKeys("testPacerPass");
        driver.findElement(saveBtn).click();

        var courtViewEmailSearchField = By.xpath("//div[@id='ecfEvents']//input[contains(@id, 'DXFREditorcol3_I')]");

        driver.findElement(courtViewEmailSearchField).sendKeys("test@test.com");
        driver.findElement(nameSearchField).sendKeys(webdriver.Key.ENTER);
        driver.sleep(2000);

        var deleteBtnEl = driver.findElement(By.xpath("//div[@id='ecfEvents']//tr[contains(@id, 'DXDataRow0')]//a[2]")); //unsafe
        deleteBtnEl.click();
        util.confirmDelete();
        driver.wait(until.stalenessOf(deleteBtnEl), 20000);
    },

    defaultBKSettings: function() {

        util.navigateTo(nav.navMenu.self, nav.navMenu.admin.self, nav.navMenu.admin.defaultBkSettings);

        driver.wait(until.elementLocated(By.xpath("//div[@id='matterDefaultSettings']//input[@id='chapterSelect'][@value='Chapter7']")), 20000);

    },

    defaultMatterType: function() {

        var bankruptcy = By.xpath("//input[@id='matterTypeSelected'][@value='Bankruptcy']");
        var saveBtn = By.xpath("//div[@id='matterDefaultType']//button[@type='submit']");

        util.navigateTo(nav.navMenu.self, nav.navMenu.admin.self, nav.navMenu.admin.defaultMatterType);

        util.waitForElementsLocated(bankruptcy, saveBtn);

        driver.findElement(bankruptcy).click();
        driver.findElement(saveBtn).click();
        util.waitForSuccessMsg();

    },

    dueDiligence: function() {

        util.navigateTo(nav.navMenu.self, nav.navMenu.admin.self, nav.navMenu.admin.dueDiligence);

        driver.wait(until.elementLocated(By.xpath("//button[@id='resetSetting']")), 20000);
    },

    generalCases: function() {

        util.navigateTo(nav.navMenu.self, nav.navMenu.admin.self, nav.navMenu.admin.generalCases);

        var newBtn = By.xpath("//div[@id='generalCases']//a[@class='element brand gridBtn-new']");

        driver.wait(until.elementLocated(newBtn), 20000);
        driver.findElement(newBtn).click();

        
    }

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
        appointments = By.xpath("//a[@data-pe-tab='#appointmentTypes']"),
        efiling = By.xpath("//a[@data-pe-tab='#efiling']"),
        generalCases = By.xpath("//a[@data-pe-tab='#generalCases']"),
        dueDiligence = By.xpath("//a[@data-pe-tab='#dueDiligence']"),
        orders = By.xpath("//a[@data-pe-tab='#orders']"),
        importTab = By.xpath("//a[@data-pe-tab='#import']"),
        notificationsSettings = By.xpath("//a[@data-pe-tab='#notificationsSettings']"),
        reassignMatters = By.xpath("//a[@data-pe-tab='#reassignTo']");
    
    util.navigateTo(nav.navMenu.self, nav.navMenu.admin);
    
    //FIRM

    
    
    
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