var util = require('../src/utilities.js'),
    nav = require('../src/navigation.js'),
    test = require('../src/testdata.js');

var driver = util.driver,
    By = util.By,
    until = util.until;

var assert = util.assert;


var contactInformation = {

    crudPhone: function() {

        var phoneInput = By.xpath("//*[@id='modelObject_Value' and @data-pe-role='phone']"),
        secondPhone = By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow1')]"),
        gearIcon = By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//a[contains(@class, 'fg-stratusOrange')]"),
        cancelBtn = By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//button[@data-role-action='close']");
    
        //add Phone
        driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//span[text()='New']")).click();
        driver.wait(until.elementLocated(phoneInput), 5000);
        driver.findElement(By.xpath("(//*[@id='modelObject_Type' and @data-commonname='PhoneType']/option[@value='7'])[1]")).click();
        driver.findElement(phoneInput).sendKeys('4564564564');
        driver.findElement(By.xpath("//section[starts-with(@id, 'PhoneCreateInline_')]//button[@type='submit']")).click();
            
        //update Phone
        driver.wait(until.elementLocated(secondPhone), 20000);
        driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow1')]/td[2]")).getText().then(function(originalPhoneNumber) {
            assert.equal(originalPhoneNumber.replace(/\D/g,''), '4564564564');
        });
        driver.sleep(500);
        driver.findElement(secondPhone).click();
        driver.wait(until.elementLocated(gearIcon), 20000);
                    
        driver.findElement(gearIcon).click();
        var isPreferredEl = driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//input[@id='modelObject_IsPreferred']"));
        driver.wait(until.elementIsEnabled(isPreferredEl)).then(function() {
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
        });
        driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//input[@data-pe-role='phoneext']")).sendKeys('579');
        util.replaceWithValue(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//input[@data-pe-role='phone']"), '1231231231');
        driver.findElement(By.xpath("//section[starts-with(@id, 'PhoneUpdateInline_')]//button[@type='submit']")).click();
        driver.sleep(1500);
        driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow1')]/td[2]")).getText().then(function(phoneAndExt) {
            assert.equal(phoneAndExt, '(123) 123-1231Ext. 579');
            
            driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow1')]//td[3]/span")).getAttribute('class').then(function(isPreferred) {
                assert.equal(isPreferred.match(/edtCheckBoxChecked/g), 'edtCheckBoxChecked');
            });
            driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow1')]//td[5]/span")).getAttribute('class').then(function(isDoNotCall) {
                assert.equal(isDoNotCall.match(/edtCheckBoxChecked/g), 'edtCheckBoxChecked');
            });
        });

        //deletePhone
        var secondRowEl = driver.findElement(secondPhone);
        new util.webdriver.ActionSequence(driver).
            mouseMove(secondRowEl).
            click(driver.findElement(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow1')]//a"))).
            perform();
        util.confirmDelete();
        driver.wait(until.stalenessOf(secondRowEl), 20000);

    },

    crudEmail: function() {

        var emailInput = By.xpath("//*[@id='modelObject_Value' and @data-pe-role='email']"),
            secondEmail = By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow1')]"),
            gearIcon = By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//a[contains(@class, 'fg-stratusOrange')]"),
            cancelBtn = By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//button[@data-role-action='close']");

            //add Email
            driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//span[text()='New']")).click();
            driver.wait(until.elementLocated(emailInput), 20000);
            driver.findElement(By.xpath("//*[@id='modelObject_Type' and @data-commonname='EmailType']/option[@value='2']")).click();
            driver.findElement(emailInput).sendKeys('xjustanotheremail@gmail.com');
            driver.findElement(By.xpath("//section[starts-with(@id, 'EmailCreateInline_')]//button[@type='submit']")).click();

            //update Email
            driver.wait(until.elementLocated(secondEmail), 20000);
            driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow1')]/td[2]")).getText().then(function(originalEmail) {
                assert.equal(originalEmail, 'xjustanotheremail@gmail.com')
            });
                    
            driver.findElement(secondEmail).click();
            driver.wait(until.elementLocated(gearIcon), 20000);
                        
            driver.findElement(gearIcon).click();

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
            });
            driver.findElement(emailInput).clear();
            driver.findElement(emailInput).sendKeys('zchangedemail@gmail.com');
            driver.findElement(By.xpath("//section[starts-with(@id, 'EmailUpdateInline_')]//button[@type='submit']")).click();
            driver.sleep(1000);
            driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow1')]/td[2]")).getText().then(function(newEmail) {
                assert.equal(newEmail, 'zchangedemail@gmail.com');
                
                    driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow1')]//td[3]/span")).getAttribute('class').then(function(isPreferred) {
                        assert.equal(isPreferred.match(/edtCheckBoxChecked/g), 'edtCheckBoxChecked');
                    });
                    driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow1')]//td[4]/span")).getAttribute('class').then(function(isPreferred) {
                        assert.equal(isPreferred.match(/edtCheckBoxChecked/g), 'edtCheckBoxChecked');
                    });
                    driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow1')]//td[5]/span")).getAttribute('class').then(function(isPreferred) {
                        assert.equal(isPreferred.match(/edtCheckBoxChecked/g), 'edtCheckBoxChecked');
                    });

            });
            
            //delete Email
            var secondRowEl = driver.findElement(secondEmail);
            new util.webdriver.ActionSequence(driver).
                    mouseMove(secondRowEl).
                    click(driver.findElement(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow1')]//a"))).
                    perform();
            util.confirmDelete();
            driver.wait(until.stalenessOf(secondRowEl), 20000);

    },

    crudAddress: function() {

        var city = By.xpath("//input[@placeholder='City']"),
            zip = By.xpath("//input[@placeholder='Zip code']"),
            zipBtn = By.xpath("//button[preceding-sibling::input[@placeholder='Zip code']]"),
            street = By.xpath("//input[@placeholder='Street address, apt / suite']");
        
        var //firstRow = By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//tr[contains(@id, 'DXDataRow0')]"),
            secondRow = By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//tr[contains(@id, 'DXDataRow1')]"),
            cancelBtn = By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//button[@data-role-action='close']");
        
        
        //add Address
        driver.findElement(By.xpath("//*[starts-with(@id, 'contactAdddreses_TabContact')]/div/div[contains(@data-pe-add, '_container_addressForm')]")).click(); // Adding an additional address
        driver.wait(until.elementLocated(zip), 20000);
        driver.findElement(By.xpath("//*[@id='address_Type']/option[@value='99']")).click();
        driver.findElement(zip).sendKeys('12345');
        driver.findElement(zipBtn).click();
        util.waitForAddressZip();
        driver.findElement(city).getAttribute('value').then(function(city) {
            assert.equal(city, 'Schenectady');
        });
        driver.findElement(street).sendKeys('Grove St.');
        driver.findElement(By.xpath("//*[starts-with(@id, 'addessesSection')]//button[@type='submit']")).click();

        driver.wait(until.elementLocated(secondRow), 20000);
        driver.sleep(1000);
            
        //update Address
        driver.findElement(secondRow).click();
        driver.wait(until.elementLocated(zip), 20000);
        util.replaceWithValue(zip, '90220');
        driver.findElement(zipBtn).click();
        util.waitForAddressZip();
        driver.findElement(city).getAttribute('value').then(function(city) {
            assert.equal(city, 'Compton');
        });
        driver.findElement(By.xpath("//section[starts-with(@id, 'Address_')]//input[@id='Address_DoNotContact']")).click();
        util.replaceWithValue(street, 'Vespucci Beach');
        driver.findElement(By.xpath("//*[starts-with(@id, 'AddressUpdate_')]//button[@type='submit']")).click();
        driver.wait(until.elementLocated(secondRow), 20000);
        var secondRowEl = driver.findElement(secondRow);
        driver.findElement(By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//tr[contains(@id, 'DXDataRow1')]/td[2]")).getText().then(function(newStreet) {
            assert.equal(newStreet, 'Vespucci Beach');
        });

        //delete Address
        new util.webdriver.ActionSequence(driver).
                mouseMove(secondRowEl).
                click(driver.findElement(By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//table[contains(@id, 'DXMainTable')]/tbody/tr[3]/td[8]/a"))).
                perform();
        
        util.confirmDelete();
        driver.wait(until.stalenessOf(secondRowEl), 20000); 

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
    
    driver.findElement(nav.homeTab).click();
    driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@id='Contacts_Tab']/div/div/div[1]"))), 2000);
    driver.sleep(1000);
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