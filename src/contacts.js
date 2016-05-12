var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    test = require('../src/testdata.js');

var driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert;



var crudPhone = function() {
    
    var phoneInput = By.xpath("//*[@id='modelObject_Value' and @data-pe-role='phone']"),
        secondPhone = By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow1')]"),
        gearIcon = By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//a[contains(@class, 'fg-stratusOrange')]"),
        cancelBtn = By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//button[@data-role-action='close']");
    
        //addPhone
        driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//span[text()='New']")).click().then(function() {
            
            driver.wait(until.elementIsEnabled(driver.findElement(phoneInput)));
            driver.findElement(By.xpath("//*[@id='modelObject_Type' and @data-commonname='PhoneType']/option[@value='7']")).click();
            driver.findElement(phoneInput).sendKeys('4564564564');
            driver.findElement(By.xpath("//section[starts-with(@id, 'PhoneCreateInline_')]//button[@type='submit']")).click();
            
            //updatePhone
            driver.wait(until.elementLocated(secondPhone), 10000).then(function() {
                //console.log('Additional phone added OK');
                driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow1')]/td[2]")).getText().then(function(originalPhoneNumber) {
                assert.equal(originalPhoneNumber.replace(/\D/g,''), '4564564564');
                });
                driver.sleep(500);
                driver.findElement(secondPhone).click();
                driver.wait(until.elementLocated(gearIcon), 10000).then(function() {
                    
                    driver.findElement(gearIcon).click();
                    var gearWorks = undefined;
                    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//input[@id='modelObject_IsPreferred']")))).then(function() {
                        driver.sleep(500);
                        driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//input[@id='modelObject_UseForNotifications']")).getAttribute('disabled').then(function(isDisabled) {
                            assert.equal(isDisabled, 'true');
                        });
                        driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//input[@id='modelObject_IsPreferred']")).click();
                        driver.sleep(500);
                        driver.findElement(gearIcon).click();
                        driver.sleep(500);
                        driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//input[@id='modelObject_DoNotContact']")).click();
                        driver.sleep(500);
                        gearWorks = true;
                    }, function(err) {
                        console.log('The phone gear icon was not clicked FAIL ' + err);
                        gearWorks = false;
                    });
                    driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//input[@data-pe-role='phoneext']")).sendKeys('579');
                    driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//input[@data-pe-role='phone']")).clear();
                    driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//input[@data-pe-role='phone']")).sendKeys('1231231231');
                    driver.findElement(By.xpath("//section[starts-with(@id, 'PhoneUpdateInline_')]//button[@type='submit']")).click();
                    driver.sleep(1500);
                    driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow1')]/td[2]")).getText().then(function(phoneAndExt) {
                        assert.equal(phoneAndExt, '(123) 123-1231Ext. 579');
                        
                        if (gearWorks == true) {
                            driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow1')]//td[3]/span")).getAttribute('class').then(function(isPreferred) {
                                assert.equal(isPreferred.match(/edtCheckBoxChecked/g), 'edtCheckBoxChecked');
                            });
                            driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow1')]//td[5]/span")).getAttribute('class').then(function(isDoNotCall) {
                                assert.equal(isDoNotCall.match(/edtCheckBoxChecked/g), 'edtCheckBoxChecked');
                            });
                        };
                    
                
                        //deletePhone
                        new req.webdriver.ActionSequence(driver).
                            mouseMove(driver.findElement(secondPhone)).
                            click(driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow1')]//a"))).
                            perform();
                        req.confirmDelete();
                        driver.sleep(1500);
                        driver.wait(until.elementLocated(secondPhone), 1000).then(function() {
                            console.log('Phone deleted FAIL');
                            req.saveScreenshot('Phone not deleted.png')
                        }, function(err) {
                            //console.log('Phone deleted');
                        });
                            
                    }, function(err) {
                        req.saveScreenshot('Phone Update FAIL.png');
                        console.log('Phone was not updated FAIL');
                        driver.findElement(cancelBtn).click();
                        driver.sleep(1000);
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
    
};



var crudEmail = function() {

    var emailInput = By.xpath("//*[@id='modelObject_Value' and @data-pe-role='email']"),
        secondEmail = By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow1')]"),
        gearIcon = By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//a[contains(@class, 'fg-stratusOrange')]"),
        cancelBtn = By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//button[@data-role-action='close']");


    //addEmail
    driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//span[text()='New']")).click().then(function() {
        
        driver.wait(until.elementIsEnabled(driver.findElement(emailInput)));
        driver.findElement(By.xpath("//*[@id='modelObject_Type' and @data-commonname='EmailType']/option[@value='2']")).click();
        driver.findElement(emailInput).sendKeys('xjustanotheremail@gmail.com');
        driver.findElement(By.xpath("//section[starts-with(@id, 'EmailCreateInline_')]//button[@type='submit']")).click();

        //updateEmail
        driver.wait(until.elementLocated(secondEmail), 10000).then(function() {
            //console.log('Additional email added OK');
            driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow1')]/td[2]")).getText().then(function(originalEmail) {
                assert.equal(originalEmail, 'xjustanotheremail@gmail.com')
            });
            
            driver.findElement(secondEmail).click();
            driver.wait(until.elementLocated(gearIcon), 10000).then(function() {
                
                driver.findElement(gearIcon).click();
                var gearWorks = undefined;
                driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//input[@id='modelObject_IsPreferred']")))).then(function() {
                    
                    driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//input[@id='modelObject_UseForNotifications']")).click();
                    driver.sleep(500);
                    driver.findElement(gearIcon).click();
                    driver.sleep(500);
                    driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//input[@id='modelObject_IsPreferred']")).click();
                    driver.sleep(500);
                    driver.findElement(gearIcon).click();
                    driver.sleep(500);
                    driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//input[@id='modelObject_DoNotContact']")).click();
                    driver.sleep(500);
                    gearWorks = true;
                }, function(err) {
                    console.log('The email gear icon was not clicked FAIL ' + err);
                    gearWorks = false;
                });
                driver.findElement(emailInput).clear();
                driver.findElement(emailInput).sendKeys('zchangedemail@gmail.com');
                driver.findElement(By.xpath("//section[starts-with(@id, 'EmailUpdateInline_')]//button[@type='submit']")).click();
                driver.sleep(1000);
                driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow1')]/td[2]")).getText().then(function(newEmail) {
                    assert.equal(newEmail, 'zchangedemail@gmail.com');
                    
                    if (gearWorks == true) {
                        driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow1')]//td[3]/span")).getAttribute('class').then(function(isPreferred) {
                            assert.equal(isPreferred.match(/edtCheckBoxChecked/g), 'edtCheckBoxChecked');
                        });
                        driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow1')]//td[4]/span")).getAttribute('class').then(function(isPreferred) {
                            assert.equal(isPreferred.match(/edtCheckBoxChecked/g), 'edtCheckBoxChecked');
                        });
                        driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow1')]//td[5]/span")).getAttribute('class').then(function(isPreferred) {
                            assert.equal(isPreferred.match(/edtCheckBoxChecked/g), 'edtCheckBoxChecked');
                        });
                    }
                
                
                //deleteEmail
                    new req.webdriver.ActionSequence(driver).
                            mouseMove(driver.findElement(secondEmail)).
                            click(driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow1')]//a"))).
                            perform();
                    req.confirmDelete();
                    driver.sleep(1000);
                    driver.wait(until.elementLocated(secondEmail), 1000).then(function() {
                        console.log('Email deleted FAIL');
                        req.saveScreenshot('EmailNotDeleted.png')
                    }, function() {
                        //console.log('Email deleted');
                    });
                    
                }, function(err) {
                    req.saveScreenshot('Email was not updated FAIL.png');
                    console.log('Email was not updated FAIL');
                    driver.findElement(cancelBtn).click();
                    driver.sleep(1000);
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
};



var crudAddress = function() {
    
    var city = By.xpath("//input[@placeholder='City']"),
        zip = By.xpath("//input[@placeholder='Zip Code']"),
        zipBtn = By.xpath("//button[preceding-sibling::input[@placeholder='Zip Code']]"),
        street = By.xpath("//input[@placeholder='Street Address, Apt / Suite']");
        
    var //firstRow = By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//tr[contains(@id, 'DXDataRow1')]"),
        cancelBtn = By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//button[@data-role-action='close']");
    
    
    //add Address
    driver.findElement(By.xpath("//*[starts-with(@id, 'contactAdddreses_TabContact')]/div/div[contains(@data-pe-add, '_container_addressForm')]")).click(); // Adding an additional address
    
    driver.wait(until.elementLocated(zip), 10000).then(function() {
        
        driver.findElement(By.xpath("//*[@id='address_Type']/option[@value='99']")).click();
        driver.findElement(zip).sendKeys('12345');
        driver.findElement(zipBtn).click();
        //driver.sleep(2500);
        req.waitForAddressZip();
        driver.findElement(city).getAttribute('value').then(function(city) {
            assert.equal(city, 'Schenectady');
        });
        driver.findElement(street).sendKeys('Grove St.');
        //driver.findElement(By.id('address_Title')).sendKeys('My other address');
        driver.findElement(By.xpath("//*[starts-with(@id, 'addessesSection')]//button[@type='submit']")).click();
        
        /*
        driver.findElement(city).then(function() {
            driver.wait(until.elementIsNotVisible(driver.findElement(city)));
        }, function(err) {
            
        });
        */
        driver.wait(until.elementLocated(secondRow), 10000);
        driver.sleep(1000);
        
        //updateAddress
        driver.wait(until.elementIsEnabled(driver.findElement(secondRow)));
        driver.findElement(secondRow).click().then(function() {
            
        });
        driver.wait(until.elementIsEnabled(driver.findElement(zip)), 5000).then(function() {
            //console.log('Additional address is added');
            driver.sleep(1000);
            driver.findElement(zip).clear();
            driver.findElement(zip).sendKeys('90220');
            driver.findElement(zipBtn).click();
            //driver.sleep(2500);
            req.waitForAddressZip();
            driver.findElement(city).getAttribute('value').then(function(city) {
                assert.equal(city, 'Compton');
            });
            driver.findElement(By.xpath("//section[starts-with(@id, 'Address_')]//input[@id='Address_IsPreferred']")).click();
            driver.findElement(By.xpath("//section[starts-with(@id, 'Address_')]//input[@id='Address_DoNotContact']")).click();
            driver.findElement(street).clear();
            driver.findElement(street).sendKeys('Vespucci Beach');
            //driver.findElement(By.id('Address_Title')).clear();
            //driver.findElement(By.id('Address_Title')).sendKeys('My some other address');
            driver.findElement(By.xpath("//*[starts-with(@id, 'AddressUpdate_')]//button[@type='submit']")).click();
            driver.wait(until.elementIsEnabled(driver.findElement(secondRow)), 5000);
            driver.sleep(2000);
            driver.findElement(By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//tr[contains(@id, 'DXDataRow1')]/td[2]")).getText().then(function(newStreet) {
                assert.equal(newStreet, 'Vespucci Beach');
                
                //deleteAddress
                new req.webdriver.ActionSequence(driver).
                        mouseMove(driver.findElement(secondRow)).
                        click(driver.findElement(By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[3]/td[8]/a"))).
                        perform();
                
                req.confirmDelete();
                driver.sleep(1000);
                driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[3]")), 1000).then(function() {
                    console.log('Address deleted FAIL');
                    req.saveScreenshot('AddressNotDeleted.png')
                }, function() {
                    //console.log('Address deleted OK');
                }); 
                
            }, function(err) {
                 req.saveScreenshot('Address was not updated FAIL.png');
                console.log('Address was not updated FAIL');
                driver.findElement(cancelBtn).click();
                driver.sleep(1000);
            });
              
            
        }, function(err) {
            console.log('Additional address was not opened FAIL');
            req.saveScreenshot('AdditionalAddressNotOpened.png')
        });
        
        
        
    }, function(err) {
        console.log('Address form was not opened FAIL');
        req.saveScreenshot('AddressFormNotShown.png');
    });
    

};


var addSpouse = function() {
    
    var searchBtn = By.xpath("//section[starts-with(@id, 'personDetailsSection_')]//button[contains(@class, 'btn-search')]"),
        single = By.xpath("//input[@id='details_MartialStatus' and @value='Single']");
        
    var saveBtn = By.xpath("//form[@id='entityForm']//button[@type='submit']");
    
    driver.wait(until.elementLocated(nav.navContact.profile.details));
    driver.findElement(nav.navContact.profile.details).click();
    
    driver.wait(until.elementLocated(By.xpath("//input[@value='Married']")));
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//input[@value='Married']"))));
    driver.findElement(By.xpath("//input[@value='Married']")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(searchBtn)));
    driver.findElement(searchBtn).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow));
    driver.sleep(1500);
    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.sleep(1000);
    driver.findElement(By.id('details_DateOfBirth')).sendKeys('Sep 02, 1955');
    driver.findElement(saveBtn).click();
    req.waitForSuccessMsg();
    driver.findElement(single).click();
    driver.findElement(saveBtn).click();
    req.waitForSuccessMsg();
    
    
};

var crudSSN = function() {

    var numberInput = By.xpath("//*[@id='taxpayerIDForm']//input[@id='modelObject_Value']"),
        //isPrimaryYes = By.xpath("//*[@id='taxpayerIDForm']//input[@id='modelObject_IsPrimary' and @value='True']"),
        isPrimaryNo = By.xpath("//*[@id='taxpayerIDForm']//input[@id='modelObject_IsPrimary' and @value='False']"),
        saveBtn = By.xpath("//*[@id='taxpayerIDForm']//button[@type='submit']"),
        cancelBtn = By.xpath("//*[@id='taxpayerIDForm']//button[@data-role-action='close']"),
        newBtn = By.xpath("//*[starts-with(@id, 'taxpayerIDsSection_')]/div[3]");

    //check the cancel button
    driver.wait(until.elementIsEnabled(driver.findElement(newBtn)));
    driver.findElement(newBtn).click();
    driver.wait(until.elementIsEnabled(driver.findElement(numberInput)));
    driver.findElement(cancelBtn).click();
    driver.sleep(500);
    driver.wait(until.elementIsVisible(driver.findElement(numberInput)), 1000).then(function() {
        console.log('SSN: the Cancel button doesnt work FAIL')
    }, function() {
        
    });
    
    //add SSN
    driver.findElement(newBtn).click();
    driver.wait(until.elementIsEnabled(driver.findElement(numberInput)));
    driver.findElement(numberInput).sendKeys('264219873');
    driver.findElement(isPrimaryNo).click();
    driver.findElement(saveBtn).click();
    
    driver.wait(until.elementLocated(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]/td/div/div/span")));
    driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]/td/div/div/span")).getText().then(function(initialSSN) {
        assert.equal(initialSSN, 'xxx-xx-9873');
    });

    //update SSN
    driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]")).click();
    driver.wait(until.elementLocated(By.xpath("//section[@id='taxPayerSection']//input[@id='modelObject_IsPrimary']"))).then(function() {
        //console.log('Additional SSN is added OK')
    }, function(err) {
        console.log('Additional SSN is added FAIL' + err.message)
    });
    driver.findElement(By.xpath("//*[@id='taxPayerEditor']//input[@id='modelObject_Value']")).clear();
    driver.findElement(By.xpath("//*[@id='taxPayerEditor']//input[@id='modelObject_Value']")).sendKeys('288899987');
    driver.findElement(By.xpath("//section[@id='taxPayerSection']//input[@id='modelObject_IsPrimary']")).click();
    driver.findElement(By.xpath("//section[@id='taxPayerSection']//button[@type='submit']")).click();
    req.waitForSuccessMsg();
    driver.findElement(By.xpath("//*[@id='taxpayerIDs']//tr[2]//div[@class='value']/span")).getText().then(function(newSSN) {
        assert.equal(newSSN, 'xxx-xx-9987');
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
        //console.log('SSN deleted')
    });

};


var crudIDs = function() {

    //add ID
    driver.wait(until.elementLocated(By.xpath("//*[starts-with(@id, 'IDsSection_')]/div[2]")), 10000);
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
    
    driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr")).click();
    
    driver.wait(until.elementLocated(By.xpath("//form[@id='identificationForm']//select[@id='modelObject_StateId']")), 5000);
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
    driver.sleep(2000);
    driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr/td[2]"))));
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
        //console.log('ID deleted')
    });
    
};


var crudEmployment = function() {
    
    var emplDetailsNewBtn = By.xpath("//div[starts-with(@id, 'details_employmentIncomesTabs_')]//a[@data-pe-navigationtitle='Create']"),
        emplDetailsSrchBtn = By.xpath("//section[starts-with(@id, 'EmploymentDetail_')]//button[contains(@class, 'btn-search fg-stratusOrange')]"),
        emplDetailsSaveBtn = By.xpath("//article[@id='employmentDetailsList']//button[@type='submit']"),
        emplDetailsSaveAndCloseBtn = By.xpath("//article[@id='employmentDetailsList']//button[@type='submit']"),
        occupation = By.id('modelObject_Title'),
        startDate = By.id('modelObject_EmploymentDates_ValidFrom'),
        endDate = By.id('modelObject_EmploymentDates_ValidTo'),
        currentJob = By.id('modelObject_IsCurrent'),
        emptyRow = By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow1')]");
    
    
    driver.findElement(nav.navContact.profile.income.self).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'paychecks_employmentIncomesTabs_')]//tr[contains(@id, 'DXEmptyRow')]")), 10000).then(function() {
        
        
        
        driver.findElement(nav.navContact.profile.income.employmentDetails).click();
        driver.wait(until.elementLocated(emptyRow), 10000).then(function() {
        
            //ADD THE FIRST JOB
            driver.findElement(emplDetailsNewBtn).click();
            driver.wait(until.elementLocated(emplDetailsSrchBtn), 10000);
            driver.sleep(1000);
            driver.findElement(emplDetailsSrchBtn).click();
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
            driver.sleep(1500);
            var employer = undefined;
            driver.findElement(nav.dvxprsPopupFirstRow).getText().then(function(employerName) {
                employer = employerName.trim()
            });
            driver.findElement(nav.dvxprsPopupFirstRow).click();
            driver.sleep(1000);
            driver.findElement(By.id('modelObject_EmployerId_client_name')).getAttribute('value').then(function (employerNameInInput) {
                assert.equal(employerNameInInput.trim(), employer)
            });
            driver.findElement(occupation).sendKeys('Translator');
            driver.findElement(startDate).sendKeys('Oct 11, 2008');
            driver.findElement(endDate).sendKeys('Sep 18, 2013');
            driver.findElement(emplDetailsSaveBtn).click();
            //req.waitForSuccessMsg();
            driver.wait(until.elementLocated(firstRow), 10000).then(function() {
                //console.log('First job added OK')
                driver.sleep(1000);
                var firstJob = [employer, 'Translator', '10/11/2008', '9/18/2013', ''];
                firstJob.forEach(function(item, i, arr) {
                    
                    driver.findElement(By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow0')]/td[" + (i + 2) + "]")).getText().then(function(data) {
                        assert.equal(data, firstJob[i])
                    });
                });
            });
            
            //ADD THE SECOND JOB
            driver.findElement(emplDetailsNewBtn).click();
            driver.wait(until.elementLocated(emplDetailsSrchBtn), 10000);
            driver.sleep(500);
            driver.findElement(emplDetailsSrchBtn).click();
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
            driver.sleep(1500);
            driver.findElement(nav.dvxprsPopupFirstRow).click();
            driver.sleep(1000);
            driver.findElement(occupation).sendKeys('QA Engineer');
            driver.findElement(startDate).sendKeys('May 19, 2015');
            driver.findElement(currentJob).click();
            driver.findElement(emplDetailsSaveBtn).click();
            //req.waitForSuccessMsg();
            
            driver.wait(until.elementLocated(secondRow), 10000).then(function() {
                //console.log('Second job added OK')
                driver.sleep(1000);
                var secondJob = [employer, 'QA Engineer', '5/19/2015', 'n/a', ''];
                secondJob.forEach(function(item, i, arr) {
                    driver.findElement(By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow1')]/td[" + (i + 2) + "]")).getText().then(function(data) {
                        assert.equal(data, secondJob[i])
                    });
                });
            });
            
            driver.findElement(By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow1')]/td[6]/i")).thenCatch(function(err) {
                console.log('Current Job is not set FAIL')
            });
            
            //UPDATE THE SECOND JOB
            driver.findElement(secondRow).click();
            driver.wait(until.elementLocated(emplDetailsSrchBtn), 10000);
            driver.findElement(emplDetailsSrchBtn).click();
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
            driver.sleep(1500);
            driver.findElement(nav.dvxprsPopupSecondRow).getText().then(function(employerName) {
                employer = employerName.trim()
            });
            driver.findElement(nav.dvxprsPopupSecondRow).click();
            driver.sleep(1500);
            driver.findElement(By.id('modelObject_EmployerId_client_name')).getAttribute('value').then(function (employerNameInInput) {
                assert.equal(employerNameInInput.trim(), employer)
            });
            driver.findElement(occupation).clear();
            driver.findElement(startDate).clear();
            driver.findElement(currentJob).click();
            driver.findElement(occupation).sendKeys('President');
            driver.findElement(startDate).sendKeys('May 07, 2000');
            driver.findElement(endDate).sendKeys('May 19, 2012');
            driver.findElement(emplDetailsSaveAndCloseBtn).click();
            //req.waitForSuccessMsg();
            driver.wait(until.elementIsVisible(driver.findElement(secondRow)), 10000).then(function() {
                
                //console.log('Second job updated OK');
                driver.sleep(1000);
                var changedSecondJob = [employer, 'President', '5/7/2000', '5/19/2012', ''];
                changedSecondJob.forEach(function(item, i, arr) {
                    driver.findElement(By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow1')]/td[" + (i + 2) + "]")).getText().then(function(data) {
                        assert.equal(data, changedSecondJob[i])
                    });
                });
                
                //DELETE THE SECOND JOB
                new req.webdriver.ActionSequence(driver).
                    mouseMove(driver.findElement(secondRow)).
                    click(driver.findElement(By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow1')]//a"))).
                    perform();

                req.confirmDelete();
                driver.sleep(2000);
                driver.findElement(secondRow).then(function() {
                    console.log('Second job was not deleted FAIL');
                }, function() {
                    //console.log('Second job was deleted OK');
                });
                    
            }, function(err) {
                console.log('Updated row did not appear FAIL ' + err.name)
            });
            
            
    
        }, function(err) {
           console.log('Employment grid was not found FAIL') 
        });
    
    }, function(err) {
        console.log('Paychecks grid was not found FAIL')
    });
    
};

    



var marketing = function() {

    driver.findElement(nav.navContact.profile.marketing).click();
    driver.wait(until.elementLocated(By.id('modelObject_LeadType')));
    driver.findElement(By.xpath("//select[@id='modelObject_LeadType']/option[@value='4']")).click();
    driver.findElement(By.xpath("//select[@id='modelObject_ReferralSourceType']/option[@value='3']")).click();
    driver.findElement(By.xpath("//*[starts-with(@id, 'NewContactViewModel_')]/form/div[3]/div/button[@type='submit']")).click();
    req.waitForSuccessMsg();

};

var crudDependents = function() {
    var typesCount = undefined;
    var hasTwoPages = false;
    
    driver.findElement(nav.navContact.profile.dependents).click();
    driver.wait(until.elementLocated(By.xpath("//a[@data-pe-navigationtitle='Dependents']")));
    driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Dependents']")).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'Dependent_')]/div/div/div[2]/select")));
    driver.findElements(By.xpath("//div[starts-with(@id, 'Dependent_')]/div/div/div[2]/select/option[not(@value='') and not(@disabled='')]")).then(function(count) {
        typesCount = count.length;
    });
    driver.findElement(By.xpath("//form[@id='debtForm']//button[contains(@class, 'closeButton')]")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Dependents']")))).then(function() {
        if (typesCount > 4) {
         
            for (var i = 1; i <= 2; i++) {
                driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Dependents']")).click();
                driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'Dependent_')]/div/div/div[2]/select")));
                driver.findElement(By.xpath("//div[starts-with(@id, 'Dependent_')]/div/div/div[2]/select/option[not(@value='') and not(@disabled='')][" + i + "]")).click();
                driver.findElement(By.id('modelObject_Name_FirstName')).sendKeys('Alex' + i);
                driver.findElement(By.id('modelObject_Name_MiddleName')).sendKeys('Van' + i);
                driver.findElement(By.id('modelObject_Name_LastName')).sendKeys('Gradle' + i);
                driver.findElement(By.id('modelObject_DateOfBirth')).sendKeys('Sep 02, 1968');
                driver.findElement(By.xpath("//div[@id='buttonset']/div/button[@type='submit']")).click();
                req.waitForSuccessMsg();
                driver.sleep(500);
            }
         
        } else {
            for (var i = 1; i <= typesCount; i++) {
                driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Dependents']")).click();
                driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'Dependent_')]/div/div/div[2]/select")));
                driver.findElement(By.xpath("//div[starts-with(@id, 'Dependent_')]/div/div/div[2]/select/option[not(@value='') and not(@disabled='')][" + i + "]")).click();
                driver.findElement(By.id('modelObject_Name_FirstName')).sendKeys('Alex' + i);
                driver.findElement(By.id('modelObject_Name_MiddleName')).sendKeys('Van' + i);
                driver.findElement(By.id('modelObject_Name_LastName')).sendKeys('Gradle' + i);
                driver.findElement(By.id('modelObject_DateOfBirth')).sendKeys('Sep 02, 1968');
                driver.findElement(By.xpath("//div[@id='buttonset']/div/button[@type='submit']")).click();
                req.waitForSuccessMsg();
                driver.sleep(500);
            }
        }
    });
    
        
    driver.sleep(1000);
    
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

};

var crudOtherNames = function() {

    //add other name
    driver.findElement(nav.navContact.profile.otherNames).click();
    driver.wait(until.elementLocated(By.xpath("//a[@data-pe-navigationtitle='Other names']")));
    driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Other names']")).click();
    driver.wait(until.elementLocated(By.id('Name_FirstName')));
    driver.findElement(By.xpath("//select[@id='Type']/option[@value='1']")).click();
    driver.findElement(By.id('Name_FirstName')).sendKeys('TestFirstName');
    driver.findElement(By.id('Name_MiddleName')).sendKeys('TestMiddleName');
    driver.findElement(By.id('Name_LastName')).sendKeys('TestLastName');
    driver.findElement(By.xpath("//form[@id='aliasForm']//button[@type='submit']")).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]"))).then(function() {
        
        //console.log('Other name added OK');
        driver.sleep(1500);
        driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[2]")).getText().then(function(firstName) {
            assert.equal(firstName, 'TestFirstName');
        });
        driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[3]")).getText().then(function(middleName) {
            assert.equal(middleName, 'TestMiddleName');
        });
        driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[4]")).getText().then(function(lastName) {
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
        driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[2]"))));
        driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[2]")).getText().then(function(firstName) {
            assert.equal(firstName, 'To');
        });
        driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[3]")).getText().then(function(middleName) {
            assert.equal(middleName, 'Be');
        });
        driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[4]")).getText().then(function(lastName) {
            assert.equal(lastName, 'Deleted');
        });
        
        //delete other name
        var firstRow = driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]"));
        driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[8]/a")).click().then(function() {
            //console.log('Other name changed OK');
        }, function(err) {
            console.log('Other name changed FAIL ' + err);
        });
        req.confirmDelete();
        
        driver.wait(until.stalenessOf(firstRow)).thenCatch(function(err) {
            console.log('Other names deleted FAIL ' + err)
        });
        
    }, function(err) {
        console.log('Other name added FAIL ' + err)
    });
       
};

var deletePersonFromDashboard = function() {
    
    driver.findElement(nav.homeTab).click();
    driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]"))), 2000);
    driver.sleep(1000);

    new req.webdriver.ActionSequence(driver).
            mouseMove(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]"))).
            click(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]//a[@data-hint='Remove']"))).
            perform();

    req.confirmDelete();
    driver.sleep(1500);
    driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]/div/div/div[@title=" + "'" + test.testPerson.displayName().trim() + "'" + "]")).then(function() {
        console.log('Contact from dashboard not deleted FAIL');
    }, function() {
        //console.log('Contact from dashboard deleted OK');
    });
    
};



var crudContactName = function() {

    var firstPhone = By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow0')]"),
        firstEmail = By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow0')]");

    var nameHeader = By.xpath("//header[starts-with(@id, 'entityNameentityTabs_')]/h2");
    req.closeTabs();
    req.openCreateContact('navBarNew', 'person');
    req.createPerson(test.testPerson);

    driver.findElement(nameHeader).click();
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
    driver.sleep(1500);
    driver.wait(until.elementIsVisible(driver.findElement(firstPhone)), 5000);
    driver.wait(until.elementIsVisible(driver.findElement(firstEmail)), 5000);
    driver.wait(until.elementIsVisible(driver.findElement(nameHeader)), 5000);
    driver.findElement(nameHeader).getAttribute('data-pe-navigationtitle').then(function(changedDisplayName) {
        driver.sleep(1000);
        req.findContact(changedDisplayName);
        driver.findElement(By.xpath("//div[contains(@class, 'contacts-gridview')]//*[contains(@id, 'DXDataRow0')]/td[contains(@class, 'dxgvCommandColumn_StratusBK')]/a")).click();
        req.confirmDelete();
        driver.wait(until.stalenessOf(driver.findElement(By.xpath("//div[contains(@class, 'contacts-gridview')]//*[contains(@id, 'DXDataRow0')]"))), 10000).then(function() {
            //console.log('Contact from contacts2 deleted OK');
        });
    });

};


var companyDetails = function() {
    
    var typeOfCorporation = By.id("Details_Type"),
        //natureOfBusiness = By.id("Details_NatureOfBusiness"),
        dateEstablished = By.id("Details_EstablishedOn"),
        isSmallBusiness = By.id("Details_IsSmallBusiness"),
        isTaxExempt = By.id("Details_IsExempt"),
        saveBtnInfo = By.xpath("//form[@id='entityForm']//button[@type='submit']");
        
    var newBtn = By.xpath("//div[starts-with(@id, 'taxpayerIDsSection')]//div[contains(@class, 'clickable')]"),
        ssnNumber = By.xpath("//form[@id='taxpayerIDForm']//*[@id='modelObject_Value']"),
        emptyRow = By.xpath("//div[@id='taxpayerIDs']/div[text()='No tax IDs found...']"),
        saveBtnSSN = By.xpath("//form[@id='taxpayerIDForm']//button[@type='submit']"),
        cancelBtn = By.xpath("//form[@id='taxpayerIDForm']//button[@data-role-action='close']")
    
    driver.findElement(nav.navContact.profile.details).click();
    
    //company info
    driver.wait(until.elementLocated(typeOfCorporation), 10000).then(function() {
    
        

        driver.findElement(By.xpath("//select[@id='Details_Type']/option[@value='3']")).click();
        driver.findElement(By.xpath("//select[@id='Details_NatureOfBusiness']/option[@value='99']")).click();
        driver.findElement(dateEstablished).sendKeys('Sep 02, 1985');
        driver.findElement(isSmallBusiness).click();
        driver.findElement(isTaxExempt).click();
        driver.findElement(saveBtnInfo).click();
        req.waitForSuccessMsg();
    
    }, function(err) {
        console.log('Company info did not appear FAIL')
    });
    
    //SSN
    /*
    driver.wait(until.elementLocated(newBtn), 10000);
    
    driver.wait(until.elementLocated(emptyRow), 5000).then(function() {
        
        //cancel button check
        driver.findElement(newBtn).click();
        driver.wait(until.elementIsEnabled(driver.findElement(ssnNumber)), 1000);
        driver.findElement(cancelBtn).click();
        driver.wait(until.elementIsNotVisible(driver.findElement(ssnNumber)), 1000);
        
        //add SSN
        driver.findElement(newBtn).click();
        driver.wait(until.elementIsEnabled(driver.findElement(ssnNumber)), 1000);
        driver.findElement(ssnNumber).sendKeys('664219873');
        driver.findElement(saveBtnSSN).click();
        driver.wait(until.elementLocated(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr/td/div/div/span")), 10000);
        driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr/td/div/div/span")).getText().then(function(ssn) {
            assert.equal(ssn, 'xxx-xx-9873');
            //console.log('Company details OK')
        });
        
    }, function() {
        //console.log('Company had an SSN')
    });
    */
};

var companyOtherNames = function() {
    
    driver.findElement(By.xpath("//*[starts-with(@id, '_Tabs_')]/ul/li[4]/a")).click();
    driver.wait(until.elementLocated(By.xpath("//a[@data-pe-navigationtitle='Other names']")));
    driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Other names']")).click();
    driver.wait(until.elementLocated(By.id('CompanyName')));
    driver.findElement(By.id('CompanyName')).sendKeys('GPB');
    driver.findElement(By.xpath("//select[@id='Type']/option[@value='1' and position()>1]")).click();
    driver.findElement(By.xpath("//form[@id='aliasForm']//button[@type='submit']")).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]")));
    driver.sleep(1500);
    driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[2]")).getText().then(function(companyName) {
        assert.equal(companyName, 'GPB');
    });
    
};


var deleteCompFromDashboard = function() {
    
    driver.findElement(nav.homeTab).click();
    driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]"))), 2000);
    driver.sleep(1000);

    new req.webdriver.ActionSequence(driver).
            mouseMove(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]"))).
            click(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]//a[@data-hint='Remove']"))).
            perform();

    req.confirmDelete();
    driver.sleep(1000);
    driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]/div/div/div[@title=" + "'" + test.companyName + "'" + "]")).then(function() {
            console.log('Contact from dashboard was not deleted FAIL');
        }, function() {
            //console.log('Contact from dashboard deleted');
        });
    
};


module.exports = {
    crudPhone: crudPhone,
    crudEmail: crudEmail,
    crudAddress: crudAddress,
    
    addSpouse: addSpouse,
    crudSSN: crudSSN,
    crudIDs: crudIDs,
    
    crudDependents: crudDependents,
    crudEmployment: crudEmployment,
    marketing: marketing,
    crudOtherNames: crudOtherNames,
    deletePersonFromDashboard: deletePersonFromDashboard,
    
    crudContactName: crudContactName,
    companyDetails: companyDetails,
    companyOtherNames: companyOtherNames,
    deleteCompFromDashboard: deleteCompFromDashboard
};