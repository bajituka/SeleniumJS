var req = require('./tempfunctions.js');

var driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert;
    
var login = req.login,
    password = req.password,
    dev = req.dev,
    sprint3 = req.sprint3,
    trunk = req.trunk;

var testFirstName = req.testFirstName,
    testMiddleName = req.testMiddleName,
    testLastName = req.testLastName,
    testSSN = req.testSSN,
    testEmail = req.testEmail,
    testPhone = req.testPhone;

var chapter7 = req.chapter7,
    chapter13 = req.chapter13,
    individual = req.individual,
    joint = req.joint,
    illinois = req.illinois,
    georgia = req.georgia,
    ilnb = req.ilnb,
    ilcb = req.ilcb,
    ilsb = req.ilsb,
    ganb = req.ganb,
    gamb = req.gamb,
    gasb = req.gasb;




//AUTHORIZATION BEGIN
req.authorize(sprint3);
//AUTHORIZATION END

//SEARCH SCREEN OPENING BEGIN
req.closeTabs();
driver.sleep(2000);
driver.findElement(By.id('btnCreateClient')).click();    
driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='btnCreateClient']/ul/li[1]/a"))), 1000);
driver.findElement(By.xpath("//*[@id='btnCreateClient']/ul/li[1]/a")).click();
driver.wait(until.elementLocated(By.id('searchBtn')));
//SEARCH SCREEN OPENING END

//SEARCH SCREEN BEGIN
driver.findElement(By.id('searchBtn')).getAttribute('disabled') //checking for search button disabled
    .then(function(disabled) {
        assert.equal(disabled, 'true');
        console.log('Default ContactCreationButton is disabled: ' + disabled);
    });
driver.findElement(By.id('FirstName')).sendKeys(testFirstName);
driver.findElement(By.id('MiddleName')).sendKeys(testMiddleName);
driver.findElement(By.id('LastName')).sendKeys(testLastName);
driver.findElement(By.id('TaxPayerId')).sendKeys(testSSN);
driver.findElement(By.id('Email')).sendKeys(testEmail);
driver.findElement(By.id('Phone')).sendKeys(testPhone);
driver.findElement(By.id('Zip')).sendKeys('60007');
driver.sleep(1000);
driver.findElement(By.xpath("//button[starts-with(@id, 'nextBtnCreateContactTabs')]")).click();
//SEARCH SCREEN END

//CONTACT CREATION BEGIN
driver.wait(until.elementLocated(By.id('Model_Phones_0__Type')));

driver.findElement(By.xpath("//select[@id='Model_Phones_0__Type']/option[@selected='selected']")).getText() //Check for default phone type selected
    .then(function(phoneSelected) {
        assert.equal(phoneSelected, 'Home mobile');
        console.log('Phone type is correct: ' + phoneSelected + ' OK');
    }, function(err) {
        console.log('Phone type is wrong: ' + err + ' FAIL');
        driver.findElement(By.xpath("//select[@id='Model_Phones_0__Type']/option[@value='3']")).click();
        driver.findElement(By.xpath("//section[starts-with(@id, 'PhoneNumber_')]/div/div[4]/div/a")).click();
        
        driver.wait(until.elementIsEnabled(driver.findElement(By.id('Model_Phones_0__UseForNotifications'))));
        driver.findElement(By.id('Model_Phones_0__UseForNotifications')).click();
    });

driver.findElement(By.xpath("//select[@id='Model_Emails_0__Type']/option[@selected='selected']")).getText() //Check for default email type selected
    .then(function(emailSelected) {
        assert.equal(emailSelected, 'Personal');
        console.log('Email type is correct: ' + emailSelected + ' OK');
    }, function(err) {
        console.log('Email type is wrong: ' + err + ' FAIL');
        driver.findElement(By.xpath("//select[@id='Model_Emails_0__Type']/option[@value='1']")).click();
    });

driver.findElement(By.xpath("//select[@id='Model_SSNs_0__Type']/option[@selected='selected']")).getText() //Check for default Social Security type selected
    .then(function(socialSelected) {
        assert.equal(socialSelected, 'Social Security');
        console.log('Social Security type is correct: ' + socialSelected + ' OK');
    }, function(err) {
        console.log('Social Security type is wrong: ' + err + ' FAIL');
        driver.findElement(By.xpath("//select[@id='Model_SSNs_0__Type']/option[@value='1']")).click();
    });

driver.findElement(By.id('Model_Person_Name_FirstName')).getAttribute('value') //Check for first name carried on
    .then(function(firstNameInput) {
        assert.equal(firstNameInput, testFirstName);
        console.log('FirstName is correct: ' + firstNameInput + ' OK');
    }, function(err) {
        console.log('FirstName is wrong: ' + err + ' FAIL');
    });

driver.findElement(By.id('Model_Person_Name_MiddleName')).getAttribute('value') //Check for middle name carried over
    .then(function(middleNameInput) {
        assert.equal(middleNameInput, testMiddleName);
        console.log('MiddleName is correct: ' + middleNameInput + ' OK');
    }, function(err) {
        console.log('MiddleName is wrong: ' + err + ' FAIL');
    });

driver.findElement(By.id('Model_Person_Name_LastName')).getAttribute('value') //Check for last name carried over
    .then(function(lastNameInput) {
        assert.equal(lastNameInput, testLastName);
        console.log('LastName is correct: ' + lastNameInput + ' OK');
    }, function(err) {
        console.log('LastName is wrong: ' + err + ' FAIL');
    });

driver.findElement(By.id('Model_SSNs_0__Value')).getAttribute('value') //Check for SSN carried over
    .then(function(ssnInput) {
        assert.equal(ssnInput, testSSN);
        console.log('SSN is correct: ' + ssnInput + ' OK');
    }, function(err) {
        console.log('SSN is wrong: ' + err + ' FAIL');
    });

driver.findElement(By.xpath("//select[@id='Model_Person_Name_Prefix']/option[@value='1']")).click();
driver.findElement(By.xpath("//select[@id='Model_Person_PrimaryRoleGroupId']/option[@value='2']")).click();
driver.findElement(By.xpath("//select[@id='Model_Person_PrimaryRoleId']/option[@value='1']")).click();
driver.findElement(By.xpath("//select[@id='Model_Addresses_0__Type']/option[@value='1']")).click();
driver.findElement(By.id('Model_Addresses_0__Street1')).sendKeys('Lindstrom Dr');
driver.findElement(By.id('Model_Addresses_0__Title')).sendKeys('My home address');
driver.findElement(By.id('Model_Phones_0__Ext')).sendKeys('365');
driver.findElement(By.id('Model_Person_ClientId')).sendKeys('785412');
//driver.findElement(By.xpath("//select[@id='Model_SSNs_0__Type']/option[@value='3']")).click();
driver.sleep(500);
driver.findElement(By.xpath("//*[@id='createNavigation']/div/button[@type='submit']"), 1000).click();
//CONTACT CREATION END

//MATTER CREATION BEGIN
req.createBKmatter(chapter13, joint, georgia, gasb, brunswick);
driver.sleep(5000);
req.logOut();
//MATTER CREATION END