var req = require('../src/functions.js'),
    nav = require('../src/navigation.js'),
    test = require('../src/testdata.js');

var driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert;

driver.manage().timeouts().implicitlyWait(2000);
    
req.catchUncaughtExceptions();

var crudPhone = function() {
    
        //addPhone
        driver.findElement(By.xpath("//*[starts-with(@id, 'phonesSection')]/div[2]")).click().then(function() {
            
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
            driver.wait(until.elementLocated(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]")), 10000).then(function() {
                driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]")).click();
                driver.wait(until.elementLocated(By.xpath("//form[@id='phoneForm']//a[contains(@class, 'fg-stratusOrange')]")), 10000).then(function() {
                    
                    driver.findElement(By.xpath("//form[@id='phoneForm']//a[contains(@class, 'fg-stratusOrange')]")).click();
                    var gearWorks = undefined;
                    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//form[@id='phoneForm']//input[@id='modelObject_IsPreferred']")))).then(function() {
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
                        gearWorks = true;
                    }, function(err) {
                        console.log('The phone gear icon was not clicked FAIL ' + err);
                        gearWorks = false;
                    });
                    driver.findElement(By.xpath("//form[@id='phoneForm']//input[@data-pe-role='phoneext']")).sendKeys('579');
                    driver.findElement(By.xpath("//form[@id='phoneForm']//input[@data-pe-role='phone']")).clear();
                    driver.findElement(By.xpath("//form[@id='phoneForm']//input[@data-pe-role='phone']")).sendKeys('1231231231');
                    driver.findElement(By.xpath("//form[@id='phoneForm']//button[@type='submit']")).click();
                    req.waitForSuccessMsg();
                    driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]/td[4]")).getText().then(function(extNumber) {
                        assert.equal(extNumber, 'Ext. 579');
                    });
                    driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]/td[3]")).getText().then(function(newPhoneNumber) {
                        assert.equal(newPhoneNumber, '(123) 123-1231');
                    });
                    if (gearWorks == true) {
                        driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]/td[5]/span")).getText().then(function(valuePreferredPhone) {
                            assert.equal(valuePreferredPhone, 'Preferred');
                        });
                        driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]/td[7]/span")).getText().then(function(valueDoNotCall) {
                            assert.equal(valueDoNotCall, 'Do Not Call');
                        });
                    };
                    
                
                    //deletePhone
                    new req.webdriver.ActionSequence(driver).
                        mouseMove(driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]"))).
                        click(driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]/td[9]/span/a[@title='Delete']"))).
                        perform();
                    
                    req.confirmDelete();
                    driver.wait(until.stalenessOf(driver.findElement(By.xpath("//table[starts-with(@id, 'phonesTable')]/tbody/tr[2]"))), 10000).then(function() {
                        console.log('Phone deleted');
                    }, function(err) {
                        console.log('Phone deleted FAIL ' + err);
                        req.saveScreenshot('Phone not deleted.png')
                    });
                
                }, function(err) {
                    console.log('Phone could not be opened FAIL ' + err)
                });
                
            }, function(err) {
                console.log('Phone was not found FAIL ' + err);
                req.saveScreenshot('crudPhone error1.png')
            });
            
        }, function(err) {
            console.log('The New phone button FAIL ' + err)
        });
    
}



var crudEmail = function() {

    //addEmail
    driver.findElement(By.xpath("//*[starts-with(@id, 'emailsSection')]/div[2]")).click().then(function() {
        
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='modelObject_Value' and @data-pe-role='email']"))));
        driver.findElement(By.xpath("//*[@id='modelObject_Type' and @data-commonname='EmailType']/option[@value='2']")).click();
        driver.findElement(By.xpath("//*[@id='modelObject_Value' and @data-pe-role='email']")).sendKeys('xjustanotheremail@gmail.com');
        driver.findElement(By.xpath("//*[starts-with(@id, 'emailForm')]/div[2]/div[3]/div/button[@type='submit']")).click();
        driver.findElement(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]/td/i")).then(function() {
            console.log('Additional email is added');
        }, function(err) {
            console.log('Additional email is not added: ' + err);
        });

        //updateEmail
        driver.wait(until.elementLocated(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]")), 10000).then(function() {
            driver.findElement(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]")).click();
            driver.wait(until.elementLocated(By.xpath("//form[@id='emailForm']//a[contains(@class, 'fg-stratusOrange')]")), 10000).then(function() {
                
                driver.findElement(By.xpath("//form[@id='emailForm']//a[contains(@class, 'fg-stratusOrange')]")).click();
                var gearWorks = undefined;
                driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//form[@id='emailForm']//input[@id='modelObject_IsPreferred']")))).then(function() {
                    
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
                    gearWorks = true;
                }, function(err) {
                    console.log('The email gear icon was not clicked FAIL ' + err);
                    gearWorks = false;
                });
                driver.findElement(By.xpath("//form[@id='emailForm']//input[@data-pe-role='email']")).clear();
                driver.findElement(By.xpath("//form[@id='emailForm']//input[@data-pe-role='email']")).sendKeys('zchangedemail@gmail.com');
                driver.findElement(By.xpath("//form[@id='emailForm']//button[@type='submit']")).click();
                req.waitForSuccessMsg();
                driver.findElement(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]/td[3]")).getText().then(function(newEmail) {
                    assert.equal(newEmail, 'zchangedemail@gmail.com');
                });
                if (gearWorks == true) {
                    driver.findElement(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]/td[4]/span")).getText().then(function(valuePreferredEmail) {
                        assert.equal(valuePreferredEmail, 'Preferred');
                    });
                    driver.findElement(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]/td[5]/span")).getText().then(function(valueUseForNotifications) {
                        assert.equal(valueUseForNotifications, 'Use for notifications');
                    });
                    driver.findElement(By.xpath("//table[starts-with(@id, 'emailsTable')]/tbody/tr[2]/td[6]/span")).getText().then(function(valueDoNotSendEmails) {
                        assert.equal(valueDoNotSendEmails, 'Do not send emails');
                    });
                }
                
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
            
            }, function(err) {
                    console.log('Email could not be opened FAIL ' + err)
            });
            
        }, function(err) {
            console.log('Email was not found FAIL ' + err);
            req.saveScreenshot('crudEmail error1.png')
        });
        
    }, function(err) {
        console.log('The New email button FAIL ' + err)
    });
}



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
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[3]"))));
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
    
    req.confirmDelete();
    driver.wait(until.stalenessOf(driver.findElement(By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[3]")))).then(function() {
        console.log('Address deleted');
    });

}


var addSpouse = function() {
    
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//input[@value='Married']"))));
    driver.findElement(By.xpath("//input[@value='Married']")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='spouse_select']//button[contains(@class, 'btn-search')]"))));
    driver.findElement(By.xpath("//div[@id='spouse_select']//button[contains(@class, 'btn-search')]")).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow));
    driver.sleep(2000);
    driver.findElement(By.xpath("//section/div/table/tbody/tr/td/div[2]/table/tbody/tr[2]/td[2]")).click();
    driver.sleep(1000);
    driver.findElement(By.id('details_DateOfBirth')).sendKeys('Sep 02, 1955');
    driver.findElement(By.xpath("//form[@id='entityForm']//button[@type='submit']")).click();
    req.waitForSuccessMsg();
    
};

var crudSSN = function() {

    
    //add SSN
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[starts-with(@id, 'taxpayerIDsSection_')]/div[3]"))));
    driver.findElement(By.xpath("//*[starts-with(@id, 'taxpayerIDsSection_')]/div[3]")).click();
    driver.sleep(500);
    driver.wait(until.elementIsEnabled(driver.findElement(By.id('taxpayerIDForm'))));
    driver.findElement(By.xpath("//*[@id='taxpayerIDForm']/div[2]/div/div[2]/select/option[@value='2']")).click();
    driver.findElement(By.xpath("//*[@id='taxpayerIDForm']/div[2]/div[2]/div[2]/input")).sendKeys('64219873');
    driver.findElement(By.xpath("//*[@id='modelObject_IsPrimary' and @value='False']")).click();
    driver.findElement(By.xpath("//*[@id='taxpayerIDForm']/div[2]/div[4]/div/button[@type='submit']")).click();
    driver.wait(until.elementLocated(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]/td/div/div/span")));
    driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]/td/div/div/span")).getText().then(function(initialItin) {
        assert.equal(initialItin, 'xxx-xx-9873');
    });
    driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]/td[1]")).getText().then(function(isItin) {
        assert.equal(isItin, 'ITIN');
    });

    //update SSN
    driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]")).click().then(function() {
        console.log('Additional SSN is added');
    });
    driver.wait(until.elementLocated(By.id('modelObject_Type')));
    driver.findElement(By.xpath("//section[@id='taxPayerSection']//select[@id='modelObject_Type']/option[@value='3']")).click();
    driver.findElement(By.xpath("//section[@id='taxPayerSection']//input[@id='modelObject_Value']")).clear();
    driver.findElement(By.xpath("//section[@id='taxPayerSection']//input[@id='modelObject_Value']")).sendKeys('988899987');
    driver.findElement(By.xpath("//section[@id='taxPayerSection']//input[@id='modelObject_IsPrimary']")).click();
    driver.findElement(By.xpath("//section[@id='taxPayerSection']//button[@type='submit']")).click();
    req.waitForSuccessMsg();
    driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]/td[2]/div/div/span")).getText().then(function(newItin) {
        assert.equal(newItin, 'xx-xxx9987');
    });
    driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]/td[1]")).getText().then(function(isEin) {
        assert.equal(isEin, 'EIN');
    });
    
    //delete SSN
    new req.webdriver.ActionSequence(driver).
            mouseMove(driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]"))).
            click(driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]//a[@title='Delete']"))).
            perform();
    req.confirmDelete();
    driver.sleep(1000);
    driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]")).then(function() {
        console.log('SSN was not deleted FAIL')
    }, function(err) {
        console.log('SSN deleted')
    });

};


var crudIDs = function() {

    //add ID
    driver.wait(until.elementLocated(By.xpath("//*[starts-with(@id, 'IDsSection_')]/div[2]")));
    driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(By.xpath("//*[starts-with(@id, 'IDsSection_')]/div[2]")));
    driver.findElement(By.xpath("//*[starts-with(@id, 'IDsSection_')]/div[2]")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[starts-with(@id, 'IDForm_')]/div[2]/div[2]/div[2]/input"))));
    driver.findElement(By.xpath("//form[starts-with(@id, 'IDForm_')]/div[2]/div/div[2]/select[@id='modelObject_Type']/option[@value='1']")).click();
    driver.findElement(By.xpath("//*[starts-with(@id, 'IDForm_')]/div[2]/div[2]/div[2]/input")).sendKeys('595127643268');
    driver.findElement(By.xpath("//*[@id='modelObject_StateId']/option[@value='14']")).click();
    driver.findElement(By.id('modelObject_ExpiresOn')).sendKeys('Sep 02, 2015');
    driver.findElement(By.xpath("//*[starts-with(@id, 'IDForm_')]/div[2]/div[6]/div/button[@type='submit']")).click();
    driver.wait(until.elementLocated(By.xpath("//*[@id='IDs']/table/tbody/tr/td[3]")));
    driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr/td[1]")).getText().then(function(isDriverLicense) {
        assert.equal(isDriverLicense, "Driver's License");
    });
    driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr/td[2]")).getText().then(function(isIllinois) {
        assert.equal(isIllinois, "Illinois");
    });
    driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr/td[3]")).getText().then(function(idnumber) {
        assert.equal(idnumber, '595127643268');
    });
    driver.isElementPresent(By.xpath("//*[@id='IDs']/table/tbody/tr/td[4]/i[@class='icon-star']")).thenCatch(function(err) {
        console.log('ID is not set as primary FAIL')
    });
    
    //update ID
    req.waitForSuccessMsg();
    driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr")).click().then(function() {
        console.log('ID created');
    });
    driver.wait(until.elementLocated(By.xpath("//form[@id='identificationForm']//select[@id='modelObject_Type']")));
    driver.findElement(By.xpath("//form[@id='identificationForm']//select[@id='modelObject_Type']/option[@value='5']")).click();
    driver.findElement(By.xpath("//form[@id='identificationForm']//select[@id='modelObject_StateId']/option[@value='11']")).click();
    driver.findElement(By.xpath("//form[@id='identificationForm']//input[@id='modelObject_Value']")).clear();
    driver.findElement(By.xpath("//form[@id='identificationForm']//input[@id='modelObject_Value']")).sendKeys('555666444');
    driver.findElement(By.xpath("//form[@id='identificationForm']//input[@id='modelObject_ExpiresOn']")).clear();
    driver.findElement(By.xpath("//form[@id='identificationForm']//input[@id='modelObject_ExpiresOn']")).sendKeys('Sep 03, 2017');
    driver.findElement(By.xpath("//form[@id='identificationForm']//input[@id='modelObject_IsPrimary']")).getAttribute('disabled').then(function(isDisabled) {
        assert.equal(isDisabled, 'true')
    }, function(err) {
        console.log('ID primary checkbox is enabled FAIL')
    });
    driver.findElement(By.xpath("//form[@id='identificationForm']//button[@type='submit']")).click();
    driver.sleep(1000);
    driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr/td[1]")).getText().then(function(isOther) {
        assert.equal(isOther, "Other");
    });
    driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr/td[2]")).getText().then(function(isGeorgia) {
        assert.equal(isGeorgia, "Georgia");
    });
    driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr/td[3]")).getText().then(function(newidnumber) {
        assert.equal(newidnumber, '555666444');
    });
    
    //delete ID
    
    new req.webdriver.ActionSequence(driver).
            mouseMove(driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr"))).
            click(driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr/td[5]//a[@title='Delete']"))).
            perform();
    req.confirmDelete();
    driver.sleep(1000);
    driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr")).then(function() {
        console.log('ID was not deleted FAIL')
    }, function(err) {
        console.log('ID deleted')
    });
    
};


var marketing = function() {

    driver.findElement(By.xpath("//*[starts-with(@id, '_Tabs_')]/ul/li[5]/a")).click();
    driver.wait(until.elementLocated(By.id('modelObject_LeadType')));
    driver.findElement(By.xpath("//select[@id='modelObject_LeadType']/option[@value='4']")).click();
    driver.findElement(By.xpath("//select[@id='modelObject_ReferralSourceType']/option[@value='3']")).click();
    driver.findElement(By.xpath("//*[starts-with(@id, 'NewContactViewModel_')]/form/div[3]/div/button[@type='submit']")).click();
    req.waitForSuccessMsg();

};

var crudDependents = function() {
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
            req.waitForSuccessMsg();
            //driver.sleep(1000);
            //driver.wait(until.elementLocated(By.xpath("//tr[starts-with(@id, 'grid_')]/i")));
        }
    driver.sleep(1000);
    driver.findElements(By.xpath("//div[starts-with(@id, 'dependentsentityTabs_')]//table[contains(@id, '_DXMainTable')]//tr[starts-with(@id, 'grid_')]")).then(function(dependentsCount) {
        assert.equal(dependentsCount.length, 4);
        console.log('Dependents created: OK');
    }, function(err) {
        console.log('Dependents created: FAIL ' + err);
    });
    driver.findElement(By.xpath("//div[starts-with(@id, 'dependentsentityTabs_')]//table[contains(@id, '_DXMainTable')]//tr[2]")).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'Dependent_')]/div/div/div[2]/select")));
    driver.findElement(By.xpath("//div[starts-with(@id, 'Dependent_')]/div/div/div[2]/select/option[@value='48']")).click();
    driver.findElement(By.id('modelObject_Name_FirstName')).clear();
    driver.findElement(By.id('modelObject_Name_FirstName')).sendKeys('To');
    driver.findElement(By.id('modelObject_Name_MiddleName')).clear();
    driver.findElement(By.id('modelObject_Name_MiddleName')).sendKeys('Be');
    driver.findElement(By.id('modelObject_Name_LastName')).clear();
    driver.findElement(By.id('modelObject_Name_LastName')).sendKeys('Deleted');
    driver.findElement(By.id('modelObject_DateOfBirth')).clear();
    driver.findElement(By.id('modelObject_DateOfBirth')).sendKeys('Sep 02, 2015');
    //driver.findElement(By.id('modelObject_MaskName')).click();
    driver.findElement(By.id('modelObject_LivesWithParent')).click();
    driver.findElement(By.xpath("//div[@id='buttonset']/div/button[@type='submit']")).click();
    req.waitForSuccessMsg();
    driver.findElement(By.xpath("//div[starts-with(@id, 'dependentsentityTabs_')]//table[contains(@id, '_DXMainTable')]//tr[2]/td[2]")).getText().then(function(name) {
        assert.equal(name, 'Deleted, To Be')
    });
    driver.findElement(By.xpath("//div[starts-with(@id, 'dependentsentityTabs_')]//table[contains(@id, '_DXMainTable')]//tr[2]/td[4]")).getText().then(function(dateOfBirth) {
        assert.equal(dateOfBirth, '9/2/2015')
    });
    driver.findElement(By.xpath("//div[starts-with(@id, 'dependentsentityTabs_')]//table[contains(@id, '_DXMainTable')]//tr[2]/td[3]")).getText().then(function(relationship) {
        assert.equal(relationship, 'Sibling')
    });
    driver.findElement(By.xpath("//div[starts-with(@id, 'dependentsentityTabs_')]//table[contains(@id, '_DXMainTable')]//tr[2]/td[5]/a")).click();
    req.confirmDelete();
    driver.sleep(1000);
    driver.findElements(By.xpath("//div[starts-with(@id, 'dependentsentityTabs_')]//table[contains(@id, '_DXMainTable')]//tr[starts-with(@id, 'grid_')]")).then(function(dependentsCount) {
        assert.equal(dependentsCount.length, 3);
        console.log('Dependent deleted: OK');
    });
    
};

var crudOtherNames = function() {

    //add other name
    driver.findElement(By.xpath("//*[starts-with(@id, '_Tabs_')]/ul/li[6]/a")).click();
    driver.wait(until.elementLocated(By.xpath("//a[@data-pe-navigationtitle='Other names']")));
    driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Other names']")).click();
    driver.wait(until.elementLocated(By.id('Name_FirstName')));
    driver.findElement(By.xpath("//select[@id='Type']/option[@value='1']")).click();
    driver.findElement(By.id('Name_FirstName')).sendKeys('TestFirstName');
    driver.findElement(By.id('Name_MiddleName')).sendKeys('TestMiddleName');
    driver.findElement(By.id('Name_LastName')).sendKeys('TestLastName');
    driver.findElement(By.xpath("//form[@id='aliasForm']//button[@type='submit']")).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]"))).then(function() {
        
        console.log('Other name added OK');
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
        
        //update other name
        driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]")).click();
        driver.wait(until.elementLocated(By.id('Name_FirstName')));
        driver.findElement(By.xpath("//select[@id='Type']/option[@value='2']")).click();
        driver.findElement(By.id('Name_FirstName')).clear();
        driver.findElement(By.id('Name_MiddleName')).clear();
        driver.findElement(By.id('Name_LastName')).clear();
        driver.findElement(By.id('Name_FirstName')).sendKeys('To');
        driver.findElement(By.id('Name_MiddleName')).sendKeys('Be');
        driver.findElement(By.id('Name_LastName')).sendKeys('Deleted');
        driver.findElement(By.xpath("//form[@id='aliasForm']//button[@type='submit']")).click();
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]")));
        driver.sleep(1500);
        driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[1]")).getText().then(function(firstName) {
            assert.equal(firstName, 'To');
        });
        driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[2]")).getText().then(function(middleName) {
            assert.equal(middleName, 'Be');
        });
        driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[3]")).getText().then(function(lastName) {
            assert.equal(lastName, 'Deleted');
        });
        
        //delete other name
        driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[4]/a")).click();
        req.confirmDelete();
        driver.wait(until.stalenessOf(driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]")))).then(function() {
            console.log('Other names deleted OK')
        }, function(err) {
            console.log('Other names deleted FAIL ' + err)
        });
        
    }, function(err) {
        console.log('Other name added FAIL ' + err)
    });
       
}

var crudContactName = function() {

    req.closeTabs();
    req.openCreateContact('navBarNew', 'person');
    req.createPerson(test.firstName, test.lastName, test.middleName);

    driver.findElement(By.xpath("//header[@id='entityName']/h2")).click();
    driver.wait(until.elementLocated(By.id('Model_Person_Name_FirstName')));
    driver.findElement(By.xpath("//select[@id='Model_Person_Name_Prefix']/option[@value='4']")).click();
    driver.findElement(By.id('Model_Person_Name_FirstName')).clear();
    driver.findElement(By.id('Model_Person_Name_MiddleName')).clear();
    driver.findElement(By.id('Model_Person_Name_LastName')).clear();
    driver.findElement(By.id('Model_Person_Name_FirstName')).sendKeys('Temp');
    driver.findElement(By.id('Model_Person_Name_MiddleName')).sendKeys('Contact');
    driver.findElement(By.id('Model_Person_Name_LastName')).sendKeys('Tobedeleted');
    driver.findElement(By.xpath("//select[@id='Model_Person_Name_Suffix']/option[@value='2']")).click();
    driver.findElement(By.xpath("//form[starts-with(@id, 'entityFormEntityUpdate_')]//button[@type='submit']")).click();
    driver.sleep(1000);
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[starts-with(@id, 'phonesSection')]/div[2]"))));
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[starts-with(@id, 'emailsSection')]/div[2]"))));
    driver.sleep(1000);
    driver.findElement(By.xpath("//header[@id='entityName']/h2")).getAttribute('data-pe-navigationtitle').then(function(changedDisplayName) {
        driver.sleep(1000);
        req.findContact(changedDisplayName);
        driver.findElement(By.xpath("//div[contains(@class, 'contacts-gridview')]//*[contains(@id, 'DXDataRow0')]/td[contains(@class, 'dxgvCommandColumn_StratusBK')]/a")).click();
        req.confirmDelete();
        driver.wait(until.stalenessOf(driver.findElement(By.xpath("//div[contains(@class, 'contacts-gridview')]//*[contains(@id, 'DXDataRow0')]")))).then(function() {
            console.log('Contact from contacts2 deleted');
        });
    });

}








driver.manage().window().maximize();
req.authorize(test.env, test.login, test.password);
req.closeTabs();

//'SEE ALL' LINK CHECK
driver.findElement(By.xpath("//div[@id='Contacts_Tab']//a[contains(@class, 'seeAllBtn')]")).click();
driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'contacts-gridview')]//tr[contains(@id, '_DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);

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

crudPhone();
crudEmail();
crudAddress();

//DETAILS BEGIN
driver.findElement(By.xpath("//*[starts-with(@id, '_Tabs_')]/ul/li[2]/a")).click();
driver.wait(until.elementLocated(By.id('details_MartialStatus')));
driver.wait(until.elementLocated(By.id('taxpayerIDs')));
driver.wait(until.elementLocated(By.id('IDs')));

addSpouse();
crudSSN();
crudIDs();

//PAYCHECKS

//DEPENDENTS

crudDependents();

//MARKETING

marketing();

//OTHER NAMES

crudOtherNames();

//DELETE FROM DASHBOARD
driver.findElement(nav.homeTab).click();
driver.sleep(500);

new req.webdriver.ActionSequence(driver).
        mouseMove(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]"))).
        click(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]//a[@data-hint='Remove']"))).
        perform();

req.confirmDelete();
driver.sleep(1000);
driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]/div/div/div[@title=" + "'" + test.displayName + "'" + "]")).then(function() {
    console.log('Contact from dashboard not deleted FAIL');
}, function() {
    console.log('Contact from dashboard deleted');
});

//CREATE FROM NAVBARNEW AND DELETE FROM NAVBARCONTACTS
crudContactName();
req.closeTabs();





//COMPANY

req.openCreateContact('navBarContacts', 'company');
req.createCompany(test.companyName);

//CONTACT INFORMATION
driver.sleep(1000);
driver.findElement(By.xpath("//*[@id='dataView']/tr/td[5]/span")).getText().then(function(valuePreferredPhone) { //Check for defaulted Preferred phone
    assert.equal(valuePreferredPhone, 'Preferred');
});
driver.findElement(By.xpath("//*[starts-with(@id, 'emailsTable')]/tbody/tr/td[4]/span")).getText().then(function(valuePreferredEmail) { //Check for defaulted Preffered email
    assert.equal(valuePreferredEmail, 'Preferred');
});
driver.findElement(By.xpath("//*[starts-with(@id, 'emailsTable')]/tbody/tr/td[5]/span")).getText().then(function(valueUseForNotifications) { //Check for defaulted Use for notifications email
    assert.equal(valueUseForNotifications, 'Use for notifications');
});

crudPhone();
crudEmail();
crudAddress();

//DETAILS BEGIN
driver.findElement(By.xpath("//*[starts-with(@id, '_Tabs_')]/ul/li[2]/a")).click();
driver.wait(until.elementLocated(By.id('taxpayerIDs')));
driver.wait(until.elementLocated(By.id('companyDetailsSection')));

driver.findElement(By.xpath("//select[@id='Details_Type']/option[@value='3']")).click();
driver.findElement(By.xpath("//select[@id='Details_NatureOfBusiness']/option[@value='99']")).click();
driver.findElement(By.id('Details_EstablishedOn')).sendKeys('Sep 02, 1985');
driver.findElement(By.id('Details_IsSmallBusiness')).click();
driver.findElement(By.id('Details_IsExempt')).click();
driver.findElement(By.xpath("//form[@id='entityForm']//button[@type='submit']")).click();
req.waitForSuccessMsg();

driver.findElement(By.xpath("//*[starts-with(@id, 'taxpayerIDsSection_')]/div[3]")).click(); //Adding an ITIN
driver.wait(until.elementIsEnabled(driver.findElement(By.id('taxpayerIDForm'))), 1000);
driver.findElement(By.xpath("//*[@id='taxpayerIDForm']/div[2]/div/div[2]/select/option[@value='2']")).click();
driver.findElement(By.xpath("//*[@id='taxpayerIDForm']/div[2]/div[2]/div[2]/input")).sendKeys('64219873');
driver.sleep(500);
driver.findElement(By.xpath("//*[@id='taxpayerIDForm']/div[2]/div[4]/div/button[@type='submit']")).click();
driver.wait(until.elementLocated(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr/td/div/div/span")), 10000);
driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr/td/div/div/span")).getText().then(function(itin) {
    assert.equal(itin, 'xxx-xx-9873');
});

//MARKETING
driver.findElement(By.xpath("//*[starts-with(@id, '_Tabs_')]/ul/li[3]/a")).click();
driver.wait(until.elementLocated(By.id('modelObject_LeadType')));
driver.findElement(By.xpath("//select[@id='modelObject_LeadType']/option[1][not(@disabled)][not(@value='')]")).click();
driver.findElement(By.xpath("//select[@id='modelObject_ReferralSourceType']/option[1]")).click();
driver.findElement(By.xpath("//*[starts-with(@id, 'NewContactViewModel_')]/form/div[3]/div/button[@type='submit']")).click();
req.waitForSuccessMsg();

//OTHER NAMES
driver.findElement(By.xpath("//*[starts-with(@id, '_Tabs_')]/ul/li[4]/a")).click();
driver.wait(until.elementLocated(By.xpath("//a[@data-pe-navigationtitle='Other names']")));
driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Other names']")).click();
driver.wait(until.elementLocated(By.id('CompanyName')));
driver.findElement(By.id('CompanyName')).sendKeys('GPB');
driver.findElement(By.xpath("//select[@id='Type']/option[@value='1' and position()>1]")).click();
driver.findElement(By.xpath("//form[@id='aliasForm']//button[@type='submit']")).click();
driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]")));
driver.sleep(1500);
driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[1]")).getText().then(function(companyName) {
    assert.equal(companyName, 'GPB');
});


//DELETE FROM DASHBOARD
driver.findElement(nav.homeTab).click();
driver.sleep(500);

new req.webdriver.ActionSequence(driver).
        mouseMove(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]"))).
        click(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]//a[@data-hint='Remove']"))).
        perform();

req.confirmDelete();
driver.sleep(1000);
driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]/div/div/div[@title=" + "'" + test.companyName + "'" + "]")).then(function() {
        console.log('Contact from dashboard was not deleted FAIL');
    }, function() {
        console.log('Contact from dashboard deleted');
    });

req.closeTabs();

req.logOut();