var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
    login = "mikhail.terentiev@waveaccess.ru",
    password = "Rwq78qvf99a",
    sprint3 = 'http://192.168.2.77:100/';

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var assert = require('assert');

var testFirstName = 'Benedict',
    testMiddleName = 'Van',
    testLastName = 'Cumberbatch';
    testPhone = '1231231231',
    testEmail = 'b.cumberbacth@gmail.co.uk',
    testSSN = '123123123';

//Authorization begin
driver.get(sprint3);
driver.wait(until.elementLocated(By.name('UserName')));	
driver.findElement(By.name('UserName')).sendKeys(login);
driver.findElement(By.name('Password')).sendKeys(password);
driver.findElement(By.className('saveButton')).click();
driver.wait(until.elementLocated(By.className("title")), 2000).then(function(element) {
 driver.findElement(By.xpath("//button[@data-pe-id='confirm']")).click();
 console.log("Was logged in: yes");
  }, function(){
    console.log("Was logged in: no");
});
driver.wait(until.titleIs('Home Page - StratusBK'), 4000).then(function(){
 console.log("Authorization: successful")
}, function(err) {
    console.log("Authorization: failed:\n" + err);
    driver.quit();
});
//Authorization end

//Contact search window opening begin
var closeAllTabsBtn = driver.findElement(By.className('closeAllTabsBtn'));
closeAllTabsBtn.click();
driver.sleep(2000);
driver.findElement(By.id('btnCreateClient')).click();    
driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='btnCreateClient']/ul/li[1]/a"))));
driver.findElement(By.xpath("//*[@id='btnCreateClient']/ul/li[1]/a")).click();
driver.wait(until.elementLocated(By.id('searchBtn')));
//Contact search window opening end

//Input of contact primary data begin
driver.findElement(By.id('searchBtn')).getAttribute('disabled') //checking for search button disabled
    .then(function(disabled) {
        assert.equal(disabled, 'true');
        console.log('Button1 is disabled: ' + disabled);
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
//Input of contact primary data end

//Input of contact main data begin
driver.wait(until.elementLocated(By.id('Model_Phones_0__Type')));
driver.findElement(By.xpath("//select[@id='Model_Phones_0__Type']/option[@selected='selected']")).getText() //Check for default phone type selected
    .then(function(phoneSelected) {
        assert.equal(phoneSelected, 'Home mobile');
        console.log('Phone type is correct: ' + phoneSelected);
    });
driver.findElement(By.xpath("//select[@id='Model_Emails_0__Type']/option[@selected='selected']")).getText() //Check for default email type selected
    .then(function(emailSelected) {
        assert.equal(emailSelected, 'Personal');
        console.log('Email type is correct: ' + emailSelected);
    });
driver.findElement(By.id('Model_Person_Name_FirstName')).getAttribute('value') //Check for first name carried on
    .then(function(firstNameInput) {
        assert.equal(firstNameInput, testFirstName);
        console.log('FirstName is correct: ' + firstNameInput);
    });
driver.findElement(By.id('Model_Person_Name_MiddleName')).getAttribute('value') //Check for middle name carried over
    .then(function(middleNameInput) {
        assert.equal(middleNameInput, testMiddleName);
        console.log('MiddleName is correct: ' + middleNameInput);
    });
driver.findElement(By.id('Model_Person_Name_LastName')).getAttribute('value') //Check for last name carried over
    .then(function(lastNameInput) {
        assert.equal(lastNameInput, testLastName);
        console.log('LastName is correct: ' + lastNameInput);
    });
driver.findElement(By.id('Model_SSNs_0__Value')).getAttribute('value') //Check for SSN carried over
    .then(function(ssnInput) {
        assert.equal(ssnInput, testSSN);
        console.log('SSN is correct: ' + ssnInput);
    });
driver.findElement(By.xpath("//select[@id='Model_Person_Name_Prefix']/option[@value='1']")).click();
driver.findElement(By.xpath("//select[@id='Model_Person_PrimaryRoleGroupId']/option[@value='2']")).click();
driver.findElement(By.xpath("//select[@id='Model_Person_PrimaryRoleId']/option[@value='1']")).click();
driver.findElement(By.xpath("//select[@id='Model_Addresses_0__Type']/option[@value='1']")).click();
driver.findElement(By.id('Model_Addresses_0__Street1')).sendKeys('Lindstrom Dr');
driver.findElement(By.id('Model_Addresses_0__Title')).sendKeys('My home address');
driver.findElement(By.id('Model_Phones_0__Ext')).sendKeys('365');
driver.findElement(By.id('Model_Person_ClientId')).sendKeys('785412');
driver.findElement(By.xpath("//select[@id='Model_SSNs_0__Type']/option[@value='3']")).click();
driver.findElement(By.xpath("//*[@id='createNavigation']/div/button[@type='submit']")).click();
//Input of contact main data end

//Contact details population begin
driver.wait(until.elementLocated(By.xpath("//*[starts-with(@id, 'phonesSection')]/div[2]")));