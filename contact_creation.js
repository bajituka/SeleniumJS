var req = require('./functions.js');

var driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert;
    
var currentDate = req.currentDate;

var login = req.login,
    password = req.password,
    dev = req.dev,
    sprint3 = req.sprint3,
    trunk = req.trunk;

var testMiddleName = req.testMiddleName,
    testSSN = req.testSSN,
    testEmail = req.testEmail,
    testPhone = req.testPhone;

driver.manage().window().maximize();
driver.manage().timeouts().setScriptTimeout(15000);




req.authorize(sprint3);
req.closeTabs();
req.createPerson('Markon', 'Spencor');

//CONTACT INFORMATION BEGIN
driver.wait(until.elementLocated(By.xpath("//*[starts-with(@id, 'phonesSection')]/div[2]")));
driver.wait(until.elementLocated(By.xpath("//*[starts-with(@id, 'emailsSection')]/div[2]")));
driver.wait(until.elementLocated(By.xpath("//*[starts-with(@id, 'phonesSection')]/div[2]")));
driver.wait(until.elementLocated(By.xpath("//*[@id='dataView']/tr/td[5]/span")));
driver.wait(until.elementLocated(By.xpath("//*[@id='dataView']/tr/td[4]/span")));
driver.sleep(1000);
driver.findElement(By.xpath("//*[@id='dataView']/tr/td[5]/span")).getText() //Check for defaulted Preferred phone
    .then(function(valuePreferredPhone) {
        assert.equal(valuePreferredPhone, 'Preferred');
        console.log('Phone is set to: ' + valuePreferredPhone + ' OK');
    }, function(err) {
        console.log('Phone is set to: ' + valuePreferredPhone + ' FAIL');
    });
driver.findElement(By.xpath("//*[@id='dataView']/tr/td[6]/span")).getText() //Check for defaulted Use for text messages phone
    .then(function(valueTextMessages) {
        assert.equal(valueTextMessages, 'Use for text messages');
        console.log('Phone is set to: ' + valueTextMessages + ' OK');
    }, function(err) {
        console.log('Phone is set to: ' + valueTextMessages + ' FAIL');
    });
driver.findElement(By.xpath("//*[starts-with(@id, 'emailsTable')]/tbody/tr/td[4]/span")).getText() //Check for defaulted Preffered email
    .then(function(valuePreferredEmail) {
        assert.equal(valuePreferredEmail, 'Preferred');
        console.log('Emails is set to: ' + valuePreferredEmail + ' OK');
    }, function(err) {
        console.log('Emails is set to: ' + valuePreferredEmail + ' FAIL');
    });
driver.findElement(By.xpath("//*[starts-with(@id, 'emailsTable')]/tbody/tr/td[5]/span")).getText() //Check for defaulted Use for notifications email
    .then(function(valueUseForNotifications) {
        assert.equal(valueUseForNotifications, 'Use for notifications');
        console.log('Emails is set to: ' + valueUseForNotifications + ' OK');
    }, function(err) {
        console.log('Emails is set to: ' + valueUseForNotifications + ' FAILOK');
    });
driver.findElement(By.xpath("//*[starts-with(@id, 'phonesSection')]/div[2]")).click(); // Adding an additional phone
driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='modelObject_Value' and @data-pe-role='phone']"))));
driver.findElement(By.xpath("//*[@id='modelObject_Type' and @data-commonname='PhoneType']/option[@value='7']")).click();
driver.findElement(By.xpath("//*[@id='modelObject_Value' and @data-pe-role='phone']")).sendKeys('4564564564');
driver.findElement(By.xpath("//*[starts-with(@id, 'phoneForm')]/div[2]/div[4]/div/button[@type='submit']")).click();
driver.sleep(1000);
driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]/td/i"))
    .then(function() {
        console.log('Additional phone is added');
    }, function(err) {
        console.log('Additional phone is not added: ' + err);
    });
driver.findElement(By.xpath("//*[starts-with(@id, 'emailsSection')]/div[2]")).click(); // Adding an additional email
driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='modelObject_Value' and @data-pe-role='email']"))));
driver.findElement(By.xpath("//*[@id='modelObject_Type' and @data-commonname='EmailType']/option[@value='2']")).click();
driver.findElement(By.xpath("//*[@id='modelObject_Value' and @data-pe-role='email']")).sendKeys('justanotheremail@gmail.com');
driver.findElement(By.xpath("//*[starts-with(@id, 'emailForm')]/div[2]/div[3]/div/button[@type='submit']")).click();
driver.sleep(1000);
driver.findElement(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]/td/i"))
    .then(function() {
        console.log('Additional email is added');
    }, function(err) {
        console.log('Additional email is not added: ' + err);
    });
driver.findElement(By.xpath("//*[starts-with(@id, 'contactAdddreses_TabContact')]/div/div[contains(@data-pe-add, '_container_addressForm')]")).click(); // Adding an additional address
driver.wait(until.elementLocated(By.id('address_Zip')));
driver.findElement(By.xpath("//*[@id='address_Type']/option[@value='99']")).click();
driver.findElement(By.id('address_Zip')).sendKeys('12345');
driver.findElement(By.xpath("//*[@id='zipCode']/div/div/button")).click();
driver.sleep(2000);
driver.findElement(By.id('address_City')).getAttribute('value') //Check for correct City
    .then(function(city) {
        assert.equal(city, 'Schenectady');
        console.log('City is: ' + city + ' OK');
    }, function(err) {
        console.log('City is: ' + city + ' FAIL');
    });
driver.findElement(By.xpath("//*[@id='address_StateId']/option[@value='27']")).getText() //Check for correct State
    .then(function(state) {
        assert.equal(state, 'NY');
        console.log('State is: ' + state + ' OK');
    });
driver.findElement(By.xpath("//*[@id='address_CountyId']/option[@value='1895']")).getText() //Check for correct County
    .then(function(county) {
        assert.equal(county, 'Schenectady');
        console.log('County is: ' + county + ' OK');
    });
driver.findElement(By.id('address_Street1')).sendKeys('Lindstrom Dr');
driver.findElement(By.id('address_Title')).sendKeys('My other address');
driver.findElement(By.xpath("//*[starts-with(@id, 'addessesSection')]/form/div/div/button[@type='submit']")).click();
driver.sleep(2000);
//CONTACT INFORMATION END

//DETAILS BEGIN
driver.findElement(By.xpath("//*[starts-with(@id, '_Tabs_')]/ul/li[2]/a")).click();
driver.wait(until.elementLocated(By.id('details_MartialStatus')));
driver.wait(until.elementLocated(By.id('taxpayerIDs')));
driver.wait(until.elementLocated(By.id('IDs')));
driver.findElement(By.id('details_MartialStatus')).click();
driver.findElement(By.id('details_DateOfBirth')).sendKeys('Sep 02, 1955');
driver.findElement(By.xpath("//*[starts-with(@id, 'taxpayerIDsSection_')]/div[3]")).click(); //Adding an ITIN
driver.wait(until.elementIsEnabled(driver.findElement(By.id('taxpayerIDForm'))));
driver.findElement(By.xpath("//*[@id='taxpayerIDForm']/div[2]/div/div[2]/select/option[@value='2']")).click();
driver.findElement(By.xpath("//*[@id='taxpayerIDForm']/div[2]/div[2]/div[2]/input")).sendKeys('64219873');
driver.findElement(By.xpath("//*[@id='modelObject_IsPrimary' and @value='False']")).click();
driver.findElement(By.xpath("//*[@id='taxpayerIDForm']/div[2]/div[4]/div/button[@type='submit']")).click();
driver.wait(until.elementLocated(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]/td/div/div/span")));
driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]/td/div/div/span")).getText() //Check for correct County
    .then(function(itin) {
        assert.equal(itin, 'xxx-xx-9873');
        console.log('ITIN is: ' + itin + ' OK');
    }, function(err) {
        console.log('ITIN is: ' + itin + ' FAIL')
    });;
driver.findElement(By.xpath("//*[starts-with(@id, 'IDsSection_')]/div[2]")).click(); //Adding a driver's license
driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[starts-with(@id, 'IDForm_')]/div[2]/div[2]/div[2]/input"))));
driver.findElement(By.xpath("//form[starts-with(@id, 'IDForm_')]/div[2]/div/div[2]/select[@id='modelObject_Type']/option[@value='1']")).click();
driver.findElement(By.xpath("//*[starts-with(@id, 'IDForm_')]/div[2]/div[2]/div[2]/input")).sendKeys('595127643268');
driver.findElement(By.xpath("//*[@id='modelObject_StateId']/option[@value='14']")).click();
driver.findElement(By.id('modelObject_ExpiresOn')).sendKeys('Sep 02, 2015');
driver.findElement(By.xpath("//*[starts-with(@id, 'IDForm_')]/div[2]/div[6]/div/button[@type='submit']")).click();
driver.wait(until.elementLocated(By.xpath("//*[@id='IDs']/table/tbody/tr/td[3]")));
driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr/td[3]")).getText() //Check for correct ID number
    .then(function(idnumber) {
        assert.equal(idnumber, '595127643268');
        console.log("Driver's license is: " + idnumber + " OK");
    }, function(err) {
        console.log("Driver's license is: " + idnumber + " FAIL")
    });
//DETAILS END


//PAYCHECKS BEGIN

//PAYCHECKS END


//DEPENDENTS BEGIN
driver.manage().timeouts().implicitlyWait(2000);
driver.findElement(By.xpath("//*[starts-with(@id, '_Tabs_')]/ul/li[4]/a")).click();
driver.wait(until.elementLocated(By.xpath("//a[@data-pe-navigationtitle='Dependents']")));
    for (var i = 2; i <= 5; i++) { //[1] is "Select one"
        driver.manage().timeouts().implicitlyWait(2000);
        driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Dependents']")).click();
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'Dependent_')]/div/div/div[2]/select")));
        driver.findElement(By.xpath("//div[starts-with(@id, 'Dependent_')]/div/div/div[2]/select/option[" + i + "]")).click();
        driver.findElement(By.id('modelObject_Name_FirstName')).sendKeys('Alex' + i);
        driver.findElement(By.id('modelObject_Name_MiddleName')).sendKeys('Van' + i);
        driver.findElement(By.id('modelObject_Name_LastName')).sendKeys('Gradle' + i);
        driver.findElement(By.id('modelObject_DateOfBirth')).sendKeys('Sep 02, 1968');
        driver.findElement(By.xpath("//div[@id='buttonset']/div/button[@type='submit']")).click();
        driver.sleep(1000);
        //driver.wait(until.elementLocated(By.xpath("//tr[starts-with(@id, 'grid_')]/i")));
    };
driver.findElements(By.xpath("//div[starts-with(@id, 'dependentsentityTabs_')]/div/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')]"))
    .then(function(dependentsCount) {
        assert.equal(dependentsCount.length, 4);
        console.log('Dependents created: OK')
    }, function(err) {
        console.log('Dependents created: FAIL ' + err)
    });
//DEPENDENTS END


//MARKETING BEGIN
driver.findElement(By.xpath("//*[starts-with(@id, '_Tabs_')]/ul/li[5]/a")).click();
driver.wait(until.elementLocated(By.id('modelObject_LeadType')));
driver.findElement(By.xpath("//select[@id='modelObject_LeadType']/option[@value='4']")).click();
driver.findElement(By.xpath("//select[@id='modelObject_ReferralSourceType']/option[@value='3']")).click();
driver.findElement(By.xpath("//*[starts-with(@id, 'NewContactViewModel_')]/form/div[3]/div/button[@type='submit']")).click();
driver.sleep(1000);
//MARKETING END

/*OTHER NAMES BEGIN
driver.findElement(By.xpath("//*[starts-with(@id, '_Tabs_')]/ul/li[6]/a")).click();
driver.wait(until.elementLocated(By.id('modelObject_LeadType')));
OTHER NAMES END*/

driver.sleep(1000);
req.logOut();