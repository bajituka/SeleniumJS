var util = require('../src/utilities.js'),
    nav = require('../src/navigation.js'),
    test = require('../src/testdata.js');

var driver = util.driver,
    By = util.By,
    until = util.until;

var assert = util.assert;

var contactInformation = {

    phone: {
        
        newBtn: By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//span[text()='New']"),
        cancelBtn: By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//button[@data-role-action='close']"),
        phoneInput: By.xpath("//*[@id='modelObject_Value' and @data-pe-role='phone']"),
        extInput: By.xpath("//*[@id='modelObject_Ext' and @data-pe-role='phoneext']"),
        saveBtn: By.xpath("//button[@type='submit'][@data-role-action='save']"),

        gearIcon: {
            self: By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//a[contains(@class, 'fg-stratusOrange')]"),
            preferred: By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//input[@id='modelObject_IsPreferred']"),
            useForTextMessages: By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//input[@id='modelObject_UseForNotifications']"),
            doNotCall: By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//input[@id='modelObject_DoNotContact']"),
            doNotText: By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//input[@id='modelObject_DoNotText']"),
        },

        addPhone: function(type, number, ext = '', options) {
            driver.findElement(this.newBtn).click();
            util.waitForElementsLocated(this.phoneInput, this.extInput, this.cancelBtn);
            driver.findElement(By.xpath("//*[@id='modelObject_Type' and @data-commonname='PhoneType']/option[text()='" + type + "']")).click();
            driver.findElement(this.phoneInput).sendKeys(number);
            driver.findElement(this.extInput).sendKeys(ext);
            if (options != undefined) {
                options.forEach(function(item, i, arr) {
                    for(var key in contactInformation.phone.gearIcon) {
                        if (key == item) {
                            driver.findElement(contactInformation.phone.gearIcon.self).click();
                            driver.sleep(500);
                            driver.findElement(contactInformation.phone.gearIcon[key]).click();
                            driver.sleep(500);
                        }
                    }
                })
            }
            util.clickBtnAndWaitTillDisappears(this.saveBtn, false);
        },

        updatePhone: function(row, number, ext, options) {
            driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow" + (row - 1) + "')]")).click();
            util.waitForElementsLocated(this.phoneInput, this.extInput, this.cancelBtn);
            util.replaceWithValue(this.phoneInput, number);
            if (ext != undefined) {
                util.replaceWithValue(this.extInput, ext);
            }
            if (options != undefined) {
                options.forEach(function(item, i, arr) {
                    for(var key in contactInformation.phone.gearIcon) {
                        if (key == item) {
                            driver.findElement(contactInformation.phone.gearIcon.self).click();
                            driver.sleep(500);
                            driver.findElement(contactInformation.phone.gearIcon[key]).click();
                            driver.sleep(500);
                        }
                    }
                })
            }
            util.clickBtnAndWaitTillDisappears(this.saveBtn, false);
        },

        deletePhone: function(row) {
            util.clickBtnAndWaitTillDisappears(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow" + (row - 1) + "')]//a"), true);
        },

    },




    email: {

        newBtn: By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//span[text()='New']"),
        cancelBtn: By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//button[@data-role-action='close']"),
        emailInput: By.xpath("//*[@id='modelObject_Value' and @data-pe-role='email']"),
        saveBtn: By.xpath("//button[@type='submit'][@data-role-action='save']"),

        gearIcon: {
            self: By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//a[contains(@class, 'fg-stratusOrange')]"),
            preferred: By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//input[@id='modelObject_IsPreferred']"),
            useForNotifications: By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//input[@id='modelObject_UseForNotifications']"),
            doNotSendEmails: By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//input[@id='modelObject_DoNotContact']"),
        },

        addEmail: function(type, address, options) {
            driver.findElement(this.newBtn).click();
            util.waitForElementsLocated(this.emailInput, this.cancelBtn);
            driver.findElement(By.xpath("//*[@id='modelObject_Type' and @data-commonname='EmailType']/option[text()='" + type + "']")).click();
            driver.findElement(this.emailInput).sendKeys(address);
            if (options != undefined) {
                options.forEach(function(item, i, arr) {
                    for(var key in contactInformation.email.gearIcon) {
                        if (key == item) {
                            driver.findElement(contactInformation.email.gearIcon.self).click();
                            driver.sleep(500);
                            driver.findElement(contactInformation.email.gearIcon[key]).click();
                            driver.sleep(500);
                        }
                    }
                })
            }
            util.clickBtnAndWaitTillDisappears(this.saveBtn, false);
        },

        updateEmail: function(row, address, options) {
            driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow" + (row - 1) + "')]")).click();
            util.waitForElementsLocated(this.emailInput, this.cancelBtn);
            util.replaceWithValue(this.emailInput, address);
            if (options != undefined) {
                options.forEach(function(item, i, arr) {
                    for(var key in contactInformation.email.gearIcon) {
                        if (key == item) {
                            driver.findElement(contactInformation.email.gearIcon.self).click();
                            driver.sleep(500);
                            driver.findElement(contactInformation.email.gearIcon[key]).click();
                            driver.sleep(500);
                        }
                    }
                })
            }
            util.clickBtnAndWaitTillDisappears(this.saveBtn, false);
        },

        deleteEmail: function(row) {
            util.clickBtnAndWaitTillDisappears(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow" + (row - 1) + "')]//a"), true);
        },
    },

    address: {

        newBtn: By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//span[text()='New']"),
        cancelBtn: By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//button[@data-role-action='close']"),
        saveBtn: By.xpath("//button[@type='submit'][@data-role-action='save']"),

        zipInput: By.xpath("//input[@placeholder='Zip code']"),
        zipBtn: By.xpath("//button[preceding-sibling::input[@placeholder='Zip code']]"),
        streetInput: By.xpath("//input[@placeholder='Street address, apt / suite']"),

        addAddress: function(type, zip, street) {
            driver.findElement(this.newBtn).click();
            util.waitForElementsLocated(this.saveBtn, this.zipBtn);
            driver.findElement(By.xpath("//select[@id='address_Type']/option[text()='" + type + "']")).click();
            driver.findElement(this.zipInput).sendKeys(zip);
            driver.findElement(this.zipBtn).click();
            util.waitForAddressZip();
            driver.findElement(this.streetInput).sendKeys(street);
            util.clickBtnAndWaitTillDisappears(this.saveBtn, false);
        },

        updateAddress: function(row, zip, street) {
            driver.findElement(By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//tr[contains(@id, 'DXDataRow" + (row - 1) + "')]")).click();
            util.waitForElementsLocated(this.zipBtn, this.cancelBtn);
            util.replaceWithValue(this.zipInput, zip);
            driver.findElement(this.zipBtn).click();
            util.waitForAddressZip();
            util.replaceWithValue(this.streetInput, street);
            util.clickBtnAndWaitTillDisappears(this.saveBtn, false);
        },

        deleteAddress: function(row) {
            util.clickBtnAndWaitTillDisappears(By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//tr[contains(@id, 'DXDataRow" + (row - 1) + "')]//a"), true);
        },

    }

};


var details = {


    addSpouse: function() {

        var searchBtn = By.xpath("//section[starts-with(@id, 'personDetailsSection_')]//button[contains(@class, 'btn-search')]"),
            single = By.xpath("//input[@id='details_MartialStatus' and @value='Single']");
        
        var saveBtn = By.xpath("//form[@id='entityForm']//button[@type='submit']");
    
        util.navigateTo(nav.navContact.profile.self, nav.navContact.profile.details);
       
        driver.wait(until.elementLocated(By.xpath("//input[@value='Married']")), 20000);
        driver.findElement(By.xpath("//input[@value='Married']")).click();
        driver.wait(until.elementIsEnabled(driver.findElement(searchBtn)));
        driver.findElement(searchBtn).click();
        util.selectDvxprsFirstRow();
        driver.findElement(By.id('details_DateOfBirth')).sendKeys('Sep 02, 1955');
        driver.findElement(saveBtn).click();
        util.waitForSuccessMsg();
        driver.findElement(single).click();
        driver.findElement(saveBtn).click();
        util.waitForSuccessMsg();
    },


    crudSSN: function() {

        var numberInput = By.xpath("//*[@id='taxpayerIDForm']//input[@id='modelObject_DecryptedValue']"),
            //isPrimaryYes = By.xpath("//*[@id='taxpayerIDForm']//input[@id='modelObject_IsPrimary' and @value='True']"),
            isPrimaryNo = By.xpath("//*[@id='taxpayerIDForm']//input[@id='modelObject_IsPrimary' and @value='False']"),
            saveBtn = By.xpath("//*[@id='taxpayerIDForm']//button[@type='submit']"),
            cancelBtn = By.xpath("//*[@id='taxpayerIDForm']//button[@data-role-action='close']"),
            newBtn = By.xpath("//*[starts-with(@id, 'taxpayerIDsSection_')]/div[3]");

        //check the cancel button
        driver.wait(until.elementLocated(newBtn), 20000);
        var newBtnEl = driver.findElement(newBtn);
        var numberInputEl = driver.findElement(numberInput);
        newBtnEl.click();
        driver.wait(until.elementIsEnabled(numberInputEl), 2000);
        driver.findElement(cancelBtn).click();
        driver.sleep(500);
        driver.wait(until.elementIsNotVisible(numberInputEl), 2000);
    
        //add SSN
        newBtnEl.click();
        driver.wait(until.elementIsEnabled(numberInputEl));
        numberInputEl.sendKeys('264219873');
        driver.findElement(isPrimaryNo).click();
        driver.findElement(saveBtn).click();
        
        driver.wait(until.elementLocated(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]/td/div/div/span")));
        driver.sleep(500);
        driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]/td/div/div/span")).getText().then(function(initialSSN) {
            assert.equal(initialSSN, 'xxx-xx-9873');
        });

        //update SSN
        driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]")).click();
        driver.wait(until.elementLocated(By.xpath("//section[@id='taxPayerSection']//input[@id='modelObject_IsPrimary']")), 20000);
        util.replaceWithValue(By.xpath("//*[@id='taxPayerEditor']//input[@id='modelObject_DecryptedValue']"), '288899987');
        driver.findElement(By.xpath("//section[@id='taxPayerSection']//input[@id='modelObject_IsPrimary']")).click();
        driver.findElement(By.xpath("//section[@id='taxPayerSection']//button[@type='submit']")).click();
        util.waitForSuccessMsg();
        var secondRowEl = driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]"));
        driver.findElement(By.xpath("//*[@id='taxpayerIDs']//tr[2]//div[@class='value']/span")).getText().then(function(newSSN) {
            assert.equal(newSSN, 'xxx-xx-9987');
        });
    
        //delete SSN
        new util.webdriver.ActionSequence(driver).
                mouseMove(secondRowEl).
                click(driver.findElement(By.xpath("//*[@id='taxpayerIDs']/table/tbody/tr[2]//a[@title='Delete']"))).
                perform();
        util.confirmDelete();
        driver.wait(until.stalenessOf(secondRowEl), 20000);
    },


    crudIDs: function() {

        //add ID
        driver.wait(until.elementLocated(By.xpath("//*[starts-with(@id, 'IDsSection_')]/div[2]")), 20000);
        var newBtnEl = driver.findElement(By.xpath("//*[starts-with(@id, 'IDsSection_')]/div[2]"));
        var inputEl = driver.findElement(By.xpath("//*[starts-with(@id, 'IDForm_')]/div[2]/div[2]/div[2]/input"));
        driver.executeScript("arguments[0].scrollIntoView(true);", newBtnEl);
        newBtnEl.click();
        driver.wait(until.elementIsEnabled(inputEl), 2000);
        driver.findElement(By.xpath("//form[starts-with(@id, 'IDForm_')]/div[2]/div/div[2]/select[@id='modelObject_Type']/option[@value='1']")).click();
        driver.findElement(By.xpath("//*[starts-with(@id, 'IDForm_')]/div[2]/div[2]/div[2]/input")).sendKeys('595127643268');
        driver.findElement(By.xpath("//*[@id='modelObject_StateId']/option[@value='14']")).click();
        driver.findElement(By.id('modelObject_ExpiresOn')).sendKeys('Sep 02, 2015');
        driver.findElement(By.xpath("//*[starts-with(@id, 'IDForm_')]/div[2]/div[6]/div/button[@type='submit']")).click();
        driver.wait(until.elementLocated(By.xpath("//*[@id='IDs']/table/tbody/tr/td[3]")), 5000);
        var checkList = ["Driver's License", "Illinois", '595127643268'];
        checkList.forEach(function(item, i, arr) {
            driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr/td[" + (i+1) + "]")).getText().then(function(data) {
                assert.equal(data, item);
            });
        });
        driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr/td[4]/i[@class='icon-star']"));
    
        //update ID
        driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr")).click();
        driver.wait(until.elementLocated(By.xpath("//form[@id='identificationForm']//select[@id='modelObject_StateId']")), 5000);
        driver.findElement(By.xpath("//form[@id='identificationForm']//select[@id='modelObject_StateId']/option[@value='11']")).click();
        util.replaceWithValue(By.xpath("//form[@id='identificationForm']//input[@id='modelObject_Value']"), '555666444');
        util.replaceWithValue(By.xpath("//form[@id='identificationForm']//input[@id='modelObject_ExpiresOn']"), 'Sep 03, 2017');
        driver.findElement(By.xpath("//form[@id='identificationForm']//input[@id='modelObject_IsPrimary']")).getAttribute('disabled').then(function(isDisabled) {
            assert.equal(isDisabled, 'true')
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
        var entry = driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr"));
    
        //delete ID
        new util.webdriver.ActionSequence(driver).
                mouseMove(driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr"))).
                click(driver.findElement(By.xpath("//*[@id='IDs']/table/tbody/tr/td[5]//a[@title='Delete']"))).
                perform();
        util.confirmDelete();
        driver.wait(until.stalenessOf(entry), 20000);
    }

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
                util.waitForSuccessMsg();
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
                util.waitForSuccessMsg();
                driver.sleep(500);
            }
        }
    });
    
        
    driver.sleep(1000);
    
    driver.findElement(By.xpath("//div[starts-with(@id, 'dependentsentityTabs_')]//table[contains(@id, '_DXMainTable')]//tr[2]")).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'Dependent_')]/div/div/div[2]/select")));
    driver.findElement(By.xpath("//div[starts-with(@id, 'Dependent_')]/div/div/div[2]/select/option[@value='48']")).click();
    util.replaceWithValue(By.id('modelObject_Name_FirstName'), 'To');
    util.replaceWithValue(By.id('modelObject_Name_MiddleName'), 'Be');
    util.replaceWithValue(By.id('modelObject_Name_LastName'), 'Deleted');
    util.replaceWithValue(By.id('modelObject_DateOfBirth'), 'Sep 02, 2015');
    driver.findElement(By.id('modelObject_LivesWithParent')).click();
    driver.findElement(By.xpath("//div[@id='buttonset']/div/button[@type='submit']")).click();
    util.waitForSuccessMsg();
    var checkList = ['Deleted, To Be', 'Sibling', '9/2/2015'];
    checkList.forEach(function(item, i, arr) {
        driver.findElement(By.xpath("//div[starts-with(@id, 'dependentsentityTabs_')]//table[contains(@id, '_DXMainTable')]//tr[2]/td[" + (i+2) + "]")).getText().then(function(data) {
            assert.equal(data, item)
        });
    });
    var element = driver.findElement(By.xpath("//div[starts-with(@id, 'dependentsentityTabs_')]//table[contains(@id, '_DXMainTable')]//tr[2]"));
    driver.findElement(By.xpath("//div[starts-with(@id, 'dependentsentityTabs_')]//table[contains(@id, '_DXMainTable')]//tr[2]/td[5]/a")).click();
    util.confirmDelete();
    driver.wait(until.stalenessOf(element), 20000);

};


var marketing = function() {

    util.navigateTo(nav.navContact.profile.self, nav.navContact.profile.marketing);
    driver.wait(until.elementLocated(By.id('modelObject_LeadType')));
    driver.findElement(By.xpath("//select[@id='modelObject_LeadType']/option[@value='4']")).click();
    driver.findElement(By.xpath("//select[@id='modelObject_ReferralSourceType']/option[@value='3']")).click();
    driver.findElement(By.xpath("//*[starts-with(@id, 'NewContactViewModel_')]//button[@type='submit']")).click();
    util.waitForSuccessMsg();

};


var crudOtherNames = function() {

    //add other name
    util.navigateTo(nav.navContact.profile.self, nav.navContact.profile.otherNames);
    driver.wait(until.elementLocated(By.xpath("//a[@data-pe-navigationtitle='Other names']")), 20000);
    driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Other names']")).click();
    driver.wait(until.elementLocated(By.id('Name_FirstName')), 20000);
    driver.findElement(By.xpath("//select[@id='Type']/option[@value='1']")).click();
    driver.findElement(By.id('Name_FirstName')).sendKeys('TestFirstName');
    driver.findElement(By.id('Name_MiddleName')).sendKeys('TestMiddleName');
    driver.findElement(By.id('Name_LastName')).sendKeys('TestLastName');
    driver.findElement(By.xpath("//form[@id='aliasForm']//button[@type='submit']")).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]")), 20000);
    driver.sleep(1500);
    var checkListInitial = ['TestFirstName', 'TestMiddleName', 'TestLastName'];
    checkListInitial.forEach(function(item, i, arr) {
        driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[" + (i+2) + "]")).getText().then(function(data) {
            assert.equal(data, item);
        });
    });
    
    //update other name
    driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]")).click();
    driver.wait(until.elementLocated(By.id('Name_FirstName')), 20000);
    driver.findElement(By.xpath("//select[@id='Type']/option[@value='2']")).click();
    util.replaceWithValue(By.id('Name_FirstName'), 'To');
    util.replaceWithValue(By.id('Name_MiddleName'), 'Be');
    util.replaceWithValue(By.id('Name_LastName'), 'Deleted');
    driver.findElement(By.xpath("//form[@id='aliasForm']//button[@type='submit']")).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]")), 20000);
    driver.sleep(1500);
    driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[2]"))));
    var checkListFinal = ['To', 'Be', 'Deleted'];
    checkListFinal.forEach(function(item, i, arr) {
        driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[" + (i+2) + "]")).getText().then(function(data) {
            assert.equal(data, item);
        });
    });
    
    //delete other name
    var firstRow = driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]"));
    driver.findElement(By.xpath("//div[starts-with(@id, 'othernamesNewentityTabs_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow0')]/td[8]/a")).click();
    util.confirmDelete();
    driver.wait(until.stalenessOf(firstRow), 20000);
       
};

var deletePersonFromDashboard = function() {
    
    util.navigateTo(nav.homeTab);
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]"))), 5000);
    driver.sleep(1500);
    var contact = driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]/div/div/div[@title=" + "'" + test.person.displayName().trim() + "'" + "]"));

    new util.webdriver.ActionSequence(driver).
            mouseMove(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]"))).
            click(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]//a[@data-hint='Remove']"))).
            perform();

    util.confirmDelete();
    driver.wait(until.stalenessOf(contact), 20000);

};



var crudContactName = function() {

    var firstPhone = By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow0')]"),
        firstEmail = By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow0')]");

    var nameHeader = By.xpath("//header[starts-with(@id, 'entityNameentityTabs_')]/h2");
    util.closeTabs();
    util.openCreateContact('navBarNew', 'person');
    util.createPerson(test.person);

    driver.findElement(nameHeader).click();
    driver.wait(until.elementLocated(By.id('Model_Person_Name_FirstName')), 20000);
    driver.findElement(By.xpath("//select[@id='Model_Person_Name_Prefix']/option[@value='4']")).click();
    util.replaceWithValue(By.id('Model_Person_Name_FirstName'), 'Temp');
    util.replaceWithValue(By.id('Model_Person_Name_MiddleName'), 'Contact');
    util.replaceWithValue(By.id('Model_Person_Name_LastName'), 'Tobedeleted');
    driver.findElement(By.xpath("//select[@id='Model_Person_Name_Suffix']/option[@value='2']")).click();
    driver.findElement(By.xpath("//form[starts-with(@id, 'entityFormEntityUpdate_')]//button[@type='submit']")).click();
    driver.sleep(1500);
    var elements = [firstPhone, firstEmail, nameHeader];
    elements.forEach(function(item, i, arr) {
        driver.wait(until.elementLocated(item), 5000);
    });
    driver.findElement(nameHeader).getAttribute('data-pe-navigationtitle').then(function(changedDisplayName) {
        driver.sleep(1000);
        util.findContact(changedDisplayName);
        driver.sleep(1000);
        driver.findElement(By.xpath("//div[contains(@class, 'contacts-gridview')]//*[contains(@id, 'DXDataRow0')]/td[contains(@class, 'dxgvCommandColumn_StratusBK')]/a")).click();
        var firstRowEl = driver.findElement(By.xpath("//div[contains(@class, 'contacts-gridview')]//*[contains(@id, 'DXDataRow0')]"));
        util.confirmDelete();
        driver.wait(until.stalenessOf(firstRowEl), 20000);
    });

};


var companyDetails = function() {
    
    var typeOfCorporation = By.id("Details_Type"),
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
    driver.wait(until.elementLocated(typeOfCorporation), 20000);
    driver.findElement(By.xpath("//select[@id='Details_Type']/option[@value='3']")).click();
    driver.findElement(By.xpath("//select[@id='Details_NatureOfBusiness']/option[@value='99']")).click();
    driver.findElement(dateEstablished).sendKeys('Sep 02, 1985');
    driver.findElement(isSmallBusiness).click();
    driver.findElement(isTaxExempt).click();
    driver.findElement(saveBtnInfo).click();
    util.waitForSuccessMsg();
        
};

var companyOtherNames = function() {
    
    driver.findElement(By.xpath("//*[starts-with(@id, '_Tabs_')]/ul/li[4]/a")).click();
    driver.wait(until.elementLocated(By.xpath("//a[@data-pe-navigationtitle='Other names']")));
    driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Other names']")).click();
    driver.wait(until.elementLocated(By.id('CompanyName')), 20000);
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
    var contact = driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]/div/div/div[@title=" + "'" + test.company.displayName.trim() + "'" + "]"));

    new util.webdriver.ActionSequence(driver).
            mouseMove(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]"))).
            click(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]//a[@data-hint='Remove']"))).
            perform();

    util.confirmDelete();
    driver.wait(until.stalenessOf(contact), 20000);

};


module.exports = {
    contactInformation: contactInformation,
    details: details,
    
    crudDependents: crudDependents,
    marketing: marketing,
    crudOtherNames: crudOtherNames,
    deletePersonFromDashboard: deletePersonFromDashboard,
    
    crudContactName: crudContactName,
    companyDetails: companyDetails,
    companyOtherNames: companyOtherNames,
    deleteCompFromDashboard: deleteCompFromDashboard
};