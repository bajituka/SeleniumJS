var req = require('../src/functions.js'),
    nav = require('../src/navigation.js'),
    test = require('../src/testdata.js');

var driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert;
    

var crudPhone = function() {
    
        //addPhone
        driver.findElement(By.xpath("//*[starts-with(@id, 'phonesSection')]/div[2]")).click();
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='modelObject_Value' and @data-pe-role='phone']"))));
        driver.findElement(By.xpath("//*[@id='modelObject_Type' and @data-commonname='PhoneType']/option[@value='7']")).click();
        driver.findElement(By.xpath("//*[@id='modelObject_Value' and @data-pe-role='phone']")).sendKeys('4564564564');
        driver.findElement(By.xpath("//*[starts-with(@id, 'phoneForm')]/div[2]/div[4]/div/button[@type='submit']")).click();
        driver.sleep(1000);
        driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]/td[3]")).getText().then(function(originalPhoneNumber) {
            assert.equal(originalPhoneNumber, '(456) 456-4564');
        });
        driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]/td/i")).then(function() {
            console.log('Additional phone is added');
        }, function(err) {
            console.log('Additional phone is not added: ' + err);
        });
    
        //updatePhone
        driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]")).click();
        driver.wait(until.elementLocated(By.xpath("//form[@id='phoneForm']//a[contains(@class, 'fg-stratusOrange')]")));
        driver.findElement(By.xpath("//form[@id='phoneForm']//a[contains(@class, 'fg-stratusOrange')]")).click();
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//form[@id='phoneForm']//input[@id='modelObject_IsPreferred']"))));
        driver.sleep(1000);
        driver.findElement(By.xpath("//form[@id='phoneForm']//input[@id='modelObject_UseForNotifications']")).getAttribute('disabled').then(function(isDisabled) {
            assert.equal(isDisabled, 'true');
        });
        driver.findElement(By.xpath("//form[@id='phoneForm']//input[@id='modelObject_IsPreferred']")).click();
        driver.sleep(500);
        driver.findElement(By.xpath("//form[@id='phoneForm']//a[contains(@class, 'fg-stratusOrange')]")).click();
        driver.sleep(500);
        driver.findElement(By.xpath("//form[@id='phoneForm']//input[@id='modelObject_DoNotContact']")).click();
        driver.sleep(500);
        driver.findElement(By.xpath("//form[@id='phoneForm']//input[@data-pe-role='phoneext']")).sendKeys('579');
        driver.findElement(By.xpath("//form[@id='phoneForm']//input[@data-pe-role='phone']")).clear();
        driver.findElement(By.xpath("//form[@id='phoneForm']//input[@data-pe-role='phone']")).sendKeys('1231231231');
        driver.findElement(By.xpath("//form[@id='phoneForm']//button[@type='submit']")).click();
        driver.sleep(1000);
        driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]/td[4]")).getText().then(function(extNumber) {
            assert.equal(extNumber, 'Ext. 579');
        });
        driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]/td[3]")).getText().then(function(newPhoneNumber) {
            assert.equal(newPhoneNumber, '(123) 123-1231');
        });
        driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]/td[5]/span")).getText().then(function(valuePreferredPhone) {
            assert.equal(valuePreferredPhone, 'Preferred');
        });
        driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]/td[7]/span")).getText().then(function(valueDoNotCall) {
            assert.equal(valueDoNotCall, 'Do Not Call');
        });
    
        //deletePhone
        new req.webdriver.ActionSequence(driver).
            mouseMove(driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]"))).
            click(driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]/td[9]/span/a[@title='Delete']"))).
            perform();
        
        driver.wait(until.elementLocated(By.xpath("//section[@data-pe-id='confirmPopup']//button[@data-pe-id='confirm']")));
        driver.findElement(By.xpath("//section[@data-pe-id='confirmPopup']//button[@data-pe-id='confirm']")).click();
        driver.wait(until.stalenessOf(driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]")))).then(function() {
            console.log('Phone deleted');
        });
    
};



var crudEmail = function() {

    //addEmail
    driver.findElement(By.xpath("//*[starts-with(@id, 'emailsSection')]/div[2]")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='modelObject_Value' and @data-pe-role='email']"))));
    driver.findElement(By.xpath("//*[@id='modelObject_Type' and @data-commonname='EmailType']/option[@value='2']")).click();
    driver.findElement(By.xpath("//*[@id='modelObject_Value' and @data-pe-role='email']")).sendKeys('xjustanotheremail@gmail.com');
    driver.findElement(By.xpath("//*[starts-with(@id, 'emailForm')]/div[2]/div[3]/div/button[@type='submit']")).click();
    driver.sleep(1000);
    driver.findElement(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]/td/i")).then(function() {
        console.log('Additional email is added');
    }, function(err) {
        console.log('Additional email is not added: ' + err);
    });

    //updateEmail
    driver.findElement(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]")).click();
    driver.wait(until.elementLocated(By.xpath("//form[@id='emailForm']//a[contains(@class, 'fg-stratusOrange')]")));
    driver.findElement(By.xpath("//form[@id='emailForm']//a[contains(@class, 'fg-stratusOrange')]")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//form[@id='emailForm']//input[@id='modelObject_IsPreferred']"))));
    driver.findElement(By.xpath("//form[@id='emailForm']//input[@id='modelObject_UseForNotifications']")).click();
    driver.sleep(500);
    driver.findElement(By.xpath("//form[@id='emailForm']//a[contains(@class, 'fg-stratusOrange')]")).click();
    driver.sleep(500);
    driver.findElement(By.xpath("//form[@id='emailForm']//input[@id='modelObject_IsPreferred']")).click();
    driver.sleep(500);
    driver.findElement(By.xpath("//form[@id='emailForm']//a[contains(@class, 'fg-stratusOrange')]")).click();
    driver.sleep(500);
    driver.findElement(By.xpath("//form[@id='emailForm']//input[@id='modelObject_DoNotContact']")).click();
    driver.sleep(500);
    driver.findElement(By.xpath("//form[@id='emailForm']//input[@data-pe-role='email']")).clear();
    driver.findElement(By.xpath("//form[@id='emailForm']//input[@data-pe-role='email']")).sendKeys('zchangedemail@gmail.com');
    driver.findElement(By.xpath("//form[@id='emailForm']//button[@type='submit']")).click();
    driver.sleep(1000);
    driver.findElement(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]/td[3]")).getText().then(function(newEmail) {
        assert.equal(newEmail, 'zchangedemail@gmail.com');
    });
    driver.findElement(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]/td[4]/span")).getText().then(function(valuePreferredEmail) {
        assert.equal(valuePreferredEmail, 'Preferred');
    });
    driver.findElement(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]/td[5]/span")).getText().then(function(valueUseForNotifications) {
        assert.equal(valueUseForNotifications, 'Use for notifications');
    });
    driver.findElement(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]/td[6]/span")).getText().then(function(valueDoNotSendEmails) {
        assert.equal(valueDoNotSendEmails, 'Do not send emails');
    });

    //deleteEmail
    new req.webdriver.ActionSequence(driver).
            mouseMove(driver.findElement(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]"))).
            click(driver.findElement(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]/td[8]/span/a[@title='Delete']"))).
            perform();
    
    driver.wait(until.elementLocated(By.xpath("//section[@data-pe-id='confirmPopup']//button[@data-pe-id='confirm']")));
    driver.findElement(By.xpath("//section[@data-pe-id='confirmPopup']//button[@data-pe-id='confirm']")).click();
    driver.wait(until.stalenessOf(driver.findElement(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]")))).then(function() {
        console.log('Email deleted');
    });
    
};



var crudAddress = function() {

    //addAddress
    driver.findElement(By.xpath("//*[starts-with(@id, 'contactAdddreses_TabContact')]/div/div[contains(@data-pe-add, '_container_addressForm')]")).click(); // Adding an additional address
    driver.wait(until.elementLocated(By.id('address_Zip')));
    driver.findElement(By.xpath("//*[@id='address_Type']/option[@value='99']")).click();
    driver.findElement(By.id('address_Zip')).sendKeys('12345');
    driver.findElement(By.xpath("//*[@id='zipCode']/div/div/button")).click();
    driver.sleep(2000);
    driver.findElement(By.id('address_City')).getAttribute('value').then(function(city) {
        assert.equal(city, 'Schenectady');
    });
    driver.findElement(By.id('address_Street1')).sendKeys('Grove St.');
    driver.findElement(By.id('address_Title')).sendKeys('My other address');
    driver.findElement(By.xpath("//*[starts-with(@id, 'addessesSection')]//button[@type='submit']")).click();
    driver.sleep(2000);

    //updateAddress
    driver.findElement(By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[3]")).click().then(function() {
        console.log('Additional address is added')
    });
    driver.wait(until.elementIsEnabled(driver.findElement(By.id('Address_Zip'))));
    driver.findElement(By.id('Address_Zip')).clear();
    driver.findElement(By.id('Address_Zip')).sendKeys('90220');
    driver.findElement(By.xpath("//*[@id='zipCode']/div/div/button")).click();
    driver.sleep(2500);
    driver.findElement(By.id('Address_City')).getAttribute('value').then(function(city) {
        assert.equal(city, 'Compton');
    });
    driver.findElement(By.xpath("//section[starts-with(@id, 'Address_')]//input[@id='Address_IsPreferred']")).click();
    driver.findElement(By.xpath("//section[starts-with(@id, 'Address_')]//input[@id='Address_DoNotContact']")).click();
    driver.findElement(By.id('Address_Street1')).clear();
    driver.findElement(By.id('Address_Street1')).sendKeys('Vespucci Beach');
    driver.findElement(By.id('Address_Title')).clear();
    driver.findElement(By.id('Address_Title')).sendKeys('My some other address');
    driver.findElement(By.xpath("//*[starts-with(@id, 'AddressUpdate_')]//button[@type='submit']")).click();
    driver.sleep(1000);
    driver.findElement(By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[3]/td[1]")).getText().then(function(newStreet) {
        assert.equal(newStreet, 'Vespucci Beach')
    });
    
    //deleteAddress
    new req.webdriver.ActionSequence(driver).
            mouseMove(driver.findElement(By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[3]"))).
            click(driver.findElement(By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[3]/td[7]/a"))).
            perform();
    
    driver.wait(until.elementLocated(By.xpath("//section[@data-pe-id='confirmPopup']//button[@data-pe-id='confirm']")));
    driver.findElement(By.xpath("//section[@data-pe-id='confirmPopup']//button[@data-pe-id='confirm']")).click();
    driver.wait(until.stalenessOf(driver.findElement(By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[3]")))).then(function() {
        console.log('Address deleted');
    });

};



var createDependents = function() {
    driver.findElement(By.xpath("//*[starts-with(@id, '_Tabs_')]/ul/li[4]/a")).click();
    driver.wait(until.elementLocated(By.xpath("//a[@data-pe-navigationtitle='Dependents']")));

        for (var i = 2; i <= 5; i++) { //[1] is "Select one"
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
        }
    driver.findElements(By.xpath("//div[starts-with(@id, 'dependentsentityTabs_')]/div/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')]")).then(function(dependentsCount) {
        assert.equal(dependentsCount.length, 4);
        console.log('Dependents created: OK');
    }, function(err) {
        console.log('Dependents created: FAIL ' + err);
    });

};


driver.manage().window().maximize();
driver.manage().timeouts().implicitlyWait(2000);


req.authorize(test.env, test.login, test.password);
req.closeTabs();

//'SEE ALL' LINK CHECK
driver.findElement(By.xpath("//div[@id='Contacts_Tab']//a[contains(@class, 'seeAllBtn')]")).click();
driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'contacts-gridview')]//tr[contains(@id, '_DXDataRow0')]")), 15000);

req.closeTabs();
req.openCreateContact('dashboard', 'person');
req.createPerson(test.firstName, test.lastName, test.middleName);

//CONTACT INFORMATION
driver.sleep(1000);
driver.findElement(By.xpath("//*[@id='dataView']/tr/td[5]/span")).getText().then(function(valuePreferredPhone) { //Check for defaulted Preferred phone
    assert.equal(valuePreferredPhone, 'Preferred');
});
driver.findElement(By.xpath("//*[@id='dataView']/tr/td[6]/span")).getText().then(function(valueTextMessages) { //Check for defaulted Use for text messages phone
    assert.equal(valueTextMessages, 'Use for text messages');
});
driver.findElement(By.xpath("//*[starts-with(@id, 'emailsTable')]/tbody/tr/td[4]/span")).getText().then(function(valuePreferredEmail) { //Check for defaulted Preffered email
    assert.equal(valuePreferredEmail, 'Preferred');
});
driver.findElement(By.xpath("//*[starts-with(@id, 'emailsTable')]/tbody/tr/td[5]/span")).getText().then(function(valueUseForNotifications) { //Check for defaulted Use for notifications email
    assert.equal(valueUseForNotifications, 'Use for notifications');
});

//crudPhone();
//crudEmail();
//crudAddress();

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
driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]/td/div/div/span")).getText().then(function(itin) {
    assert.equal(itin, 'xxx-xx-9873');
});
driver.findElement(By.xpath("//*[starts-with(@id, 'IDsSection_')]/div[2]")).click(); //Adding a driver's license
driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[starts-with(@id, 'IDForm_')]/div[2]/div[2]/div[2]/input"))));
driver.findElement(By.xpath("//form[starts-with(@id, 'IDForm_')]/div[2]/div/div[2]/select[@id='modelObject_Type']/option[@value='1']")).click();
driver.findElement(By.xpath("//*[starts-with(@id, 'IDForm_')]/div[2]/div[2]/div[2]/input")).sendKeys('595127643268');
driver.findElement(By.xpath("//*[@id='modelObject_StateId']/option[@value='14']")).click();
driver.findElement(By.id('modelObject_ExpiresOn')).sendKeys('Sep 02, 2015');
driver.findElement(By.xpath("//*[starts-with(@id, 'IDForm_')]/div[2]/div[6]/div/button[@type='submit']")).click();
driver.wait(until.elementLocated(By.xpath("//*[@id='IDs']/table/tbody/tr/td[3]")));
driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr/td[3]")).getText().then(function(idnumber) {
    assert.equal(idnumber, '595127643268');
});

//PAYCHECKS

//DEPENDENTS

//createDependents();



//MARKETING
driver.findElement(By.xpath("//*[starts-with(@id, '_Tabs_')]/ul/li[5]/a")).click();
driver.wait(until.elementLocated(By.id('modelObject_LeadType')));
driver.findElement(By.xpath("//select[@id='modelObject_LeadType']/option[@value='4']")).click();
driver.findElement(By.xpath("//select[@id='modelObject_ReferralSourceType']/option[@value='3']")).click();
driver.findElement(By.xpath("//*[starts-with(@id, 'NewContactViewModel_')]/form/div[3]/div/button[@type='submit']")).click();
driver.sleep(1000);

//OTHER NAMES
driver.findElement(By.xpath("//*[starts-with(@id, '_Tabs_')]/ul/li[6]/a")).click();
driver.wait(until.elementLocated(By.xpath("//a[@data-pe-navigationtitle='Other names']")));
driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Other names']")).click();
driver.wait(until.elementLocated(By.id('Name_FirstName')));
driver.findElement(By.id('Name_FirstName')).sendKeys('TestFirstName');
driver.findElement(By.id('Name_MiddleName')).sendKeys('TestMiddleName');
driver.findElement(By.id('Name_LastName')).sendKeys('TestLastName');
driver.findElement(By.xpath("//form[@id='aliasForm']//button[@type='submit']")).click();
driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]")));
driver.sleep(1500);
driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[1]")).getText().then(function(firstName) {
    assert.equal(firstName, 'TestFirstName');
});
driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[2]")).getText().then(function(middleName) {
    assert.equal(middleName, 'TestMiddleName');
});
driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[3]")).getText().then(function(lastName) {
    assert.equal(lastName, 'TestLastName');
});

//DELETE FROM DASHBOARD BEGIN
driver.findElement(nav.navBarTabHome).click();
driver.sleep(500);

new req.webdriver.ActionSequence(driver).
        mouseMove(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]"))).
        click(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]//a[@data-hint='Remove']"))).
        perform();

req.confirmDelete();
driver.wait(until.stalenessOf(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]/div/div/div[@title=" + "'" + test.displayName() + "'" + "]")))).then(function() {
console.log('Contact from dashboard deleted');
});

//CREATE AND DELETE FROM NAVBARCONTACTS
req.closeTabs();
req.openCreateContact('navBarContacts', 'person');
req.createPerson(test.firstName, test.lastName, test.middleName);

req.findContact(test.displayName);
driver.findElement(By.xpath("//div[contains(@class, 'contacts-gridview')]//*[contains(@id, 'DXDataRow0')]/td[contains(@class, 'dxgvCommandColumn_StratusBK')]/a")).click();
req.confirmDelete();
driver.wait(until.stalenessOf(driver.findElement(By.xpath("//div[contains(@class, 'contacts-gridview')]//*[contains(@id, 'DXDataRow0')]")))).then(function() {
    console.log('Contact from contacts deleted');
});

//CREATE FROM NAVBARNEW AND DELETE FROM NAVBARCONTACTS BEGIN
req.closeTabs();
req.openCreateContact('navBarNew', 'person');
req.createPerson(test.firstName, test.lastName, test.middleName);

req.findContact(test.displayName);
driver.findElement(By.xpath("//div[contains(@class, 'contacts-gridview')]//*[contains(@id, 'DXDataRow0')]/td[contains(@class, 'dxgvCommandColumn_StratusBK')]/a")).click();
req.confirmDelete();
driver.wait(until.stalenessOf(driver.findElement(By.xpath("//div[contains(@class, 'contacts-gridview')]//*[contains(@id, 'DXDataRow0')]")))).then(function() {
    console.log('Contact from contacts2 deleted');
});

req.closeTabs();
req.logOut();