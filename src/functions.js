var nav = require('./navigation.js'),
    efp = require('./efilingparams.js'),
    test = require('./testdata.js');

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
    
var assert = require('assert'),
    fs = require('fs');

var currentDate = function() {
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    /*if(dd<10) {
        dd='0'+dd
    };
    if(mm<10) {
    mm='0'+mm
    };*/
    today = mm + '/' + dd + '/' + yyyy;
    return today;
};
    
var currentTime = function() {
    
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    if(hours < 10) {
        hours = '0' + hours
    };
    if(minutes < 10) {
        minutes = '0' + minutes
    };
    if(seconds < 10) {
        seconds = '0' + seconds
    };
    
    return hours + ' ' + minutes + ' ' + seconds;
};



driver.manage().timeouts().implicitlyWait(2000);

var saveScreenshot = function(filename) {
    
    return driver.takeScreenshot().then(function(data) {
        fs.writeFile('../logs/screenshots/' + currentTime() + filename, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
            if(err) throw err;
        });
    });
    
};

var catchUncaughtExceptions = function() {
    
    webdriver.promise.controlFlow().on('uncaughtException', function(e) {
        if (e.name == 'ElementNotVisibleError') {
            console.error(e.name);
            saveScreenshot('ElementNotVisibleError.png');
            logOut()
        } else {
            console.error(e.message + '\n' + e.stack);
            saveScreenshot('UncaughtException.png');
            logOut()
        }
    
    });
    
};

var waitForLoadingBar = function() {
    var overlay = By.xpath("//*[@class='windowOverlay' or @class='dataTables_processing' or @class='loadingBar']");
    driver.wait(until.elementLocated(overlay), 1000).then(function() {
        driver.wait(until.stalenessOf(driver.findElement(overlay)), 30000)
    }, function() {
    });
    
};

var authorize = function (testEnv, login, password) {
    
    driver.get(testEnv);
    driver.wait(until.elementLocated(By.name('UserName'))); 
    driver.findElement(By.name('UserName')).sendKeys(login);
    driver.findElement(By.name('Password')).sendKeys(password);
    driver.findElement(By.className('saveButton')).click();
    driver.wait(until.elementLocated(By.className("title")), 2000).then(function() { // Check for presence of popup by title availability
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//button[@data-pe-id='confirm']"))));
        driver.sleep(500);
        driver.findElement(By.xpath("//button[@data-pe-id='confirm']")).click();
    }, function(){

    });
    if (testEnv == 'http://192.168.2.77:94/') {
        driver.wait(until.elementLocated(By.xpath("//div[@class='row'][3]/label/input[@id='FirmGuid']")));
        driver.findElement(By.xpath("//div[@class='row'][3]/label/input[@id='FirmGuid']")).click();
        driver.findElement(By.xpath("//*[@id='loginForm']//button[@type='submit']")).click();
        driver.wait(until.elementLocated(By.className("title")), 2000).then(function() { // Check for presence of popup by title availability
            driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//button[@data-pe-id='confirm']"))));
            driver.sleep(500);
            driver.findElement(By.xpath("//button[@data-pe-id='confirm']")).click();
        }, function(){
            
        });
    } 
    driver.wait(until.titleIs('Home Page - StratusBK'), 10000).then(function(){
       console.log("Authorization: successful");
       driver.wait(until.elementLocated(By.xpath("//div[@id='Events_Tab']/div/div/div")));
       driver.wait(until.elementLocated(By.xpath("//div[@id='Tasks_Tab']/div/div/div")));
       driver.wait(until.elementLocated(By.xpath("//div[@id='Messages_Tab']/div/div/div")));
       driver.wait(until.elementLocated(By.xpath("//div[@id='Contacts_Tab']/div/div/div")));
       driver.wait(until.elementLocated(By.xpath("//div[@id='Docs_Tab']/div/div/div")));
       driver.wait(until.elementLocated(By.xpath("//div[@id='Cases_Tab']/div/div/div")));
       driver.sleep(1000);
   }, function(err) {
        console.log("Authorization: failed: - " + err);
        driver.quit();
    });
};



var closeTabs = function() {
    
    driver.wait(until.elementIsEnabled(driver.findElement(By.className('closeAllTabsBtn'))), 15000);
    driver.wait(until.elementLocated(By.xpath("//*[@id='AppTabs']/ul/li")));
    driver.findElements(By.xpath("//*[@id='AppTabs']/ul/li")).then(function(initElemCount) {
        if (initElemCount.length > 1) {
            driver.findElement(By.className('closeAllTabsBtn')).click();
            driver.sleep(1000);
            driver.findElements(By.xpath("//*[@id='AppTabs']/ul/li")).then(function(finElemCount) {
                if (finElemCount.length != 1) {
                    driver.findElement(By.className('closeAllTabsBtn')).click();   
                }
            });
        }
    }, function(error) {
        console.log(error);
    });
    driver.sleep(1000);

};



var openCreateContact = function (location, contactType) {
    
    if (location == 'navBarNew') {
        
        driver.findElement(nav.navBar.navNew.self).click();
        driver.sleep(500);
        driver.wait(until.elementIsEnabled(driver.findElement(nav.navBar.navNew.contact.self)), 15000);
        
        new webdriver.ActionSequence(driver).
            mouseMove(driver.findElement(nav.navBar.navNew.contact.self)).
            perform();
            
        if (contactType == 'company') {
            driver.wait(until.elementIsEnabled(driver.findElement(nav.navBar.navNew.contact.company)), 15000);
            driver.findElement(nav.navBar.navNew.contact.company).click();
        } else {
            driver.wait(until.elementIsEnabled(driver.findElement(nav.navBar.navNew.contact.person)), 15000);
            driver.findElement(nav.navBar.navNew.contact.person).click();
        }
        
        
    } else if (location == 'navBarContacts') {
        
        driver.findElement(nav.navBar.contacts).click();
        driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'contacts-gridview')]//tr[contains(@id, '_DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
        driver.findElement(By.xpath("//div[@id='createNewContactLink']/span")).click();
        driver.sleep(500);
        if (contactType == 'company') {
            driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='createNewContactLink']//a[@data-pe-tab='Create Company']"))), 15000);
            driver.findElement(By.xpath("//div[@id='createNewContactLink']//a[@data-pe-tab='Create Company']")).click();
        } else {
            driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='createNewContactLink']//a[@data-pe-tab='Create Person']"))), 15000);
            driver.findElement(By.xpath("//div[@id='createNewContactLink']//a[@data-pe-tab='Create Person']")).click();
        }
        
        
    } else if (location == 'dashboard') {
        
        driver.findElement(By.xpath("//*[@id='AppTabs']/ul/li[1]")).click();
        driver.findElement(By.id('btnCreateClient')).click();
        if (contactType == 'company') {
            driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='btnCreateClient']/ul/li[2]/a"))), 1000);
            driver.findElement(By.xpath("//*[@id='btnCreateClient']/ul/li[2]/a")).click();
        } else {
            driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='btnCreateClient']/ul/li[1]/a"))), 1000);
            driver.findElement(By.xpath("//*[@id='btnCreateClient']/ul/li[1]/a")).click();
        }
        
    }
};



var createPerson = function (contact) {

    //SEARCH SCREEN
    driver.wait(until.elementLocated(By.id('FirstName')), 15000);
    driver.wait(until.elementLocated(By.id('searchBtn')), 15000);
    driver.findElement(By.id('searchBtn')).getAttribute('disabled').then(function(disabled) { //checking for search button to be disabled
        assert.equal(disabled, 'true');
    });
    driver.findElement(By.id('FirstName')).sendKeys(contact.firstName);
    driver.sleep(500);
    if (contact.middleName != '') {
        driver.sleep(500);
        driver.findElement(By.id('MiddleName')).sendKeys(contact.middleName);
    };
    driver.findElement(By.id('LastName')).sendKeys(contact.lastName);
    driver.sleep(500);
    driver.findElement(By.id('TaxPayerId')).sendKeys(contact.ssn);
    driver.sleep(500);
    driver.findElement(By.id('Email')).sendKeys(contact.email());
    driver.sleep(500);
    driver.findElement(By.id('Phone')).sendKeys(contact.phone);
    driver.sleep(500);
    driver.findElement(By.id('Zip')).sendKeys(contact.zip);
    driver.sleep(1000);
    driver.findElement(By.id('searchBtn')).click();
    driver.sleep(1000);
    driver.findElement(By.xpath("//button[starts-with(@id, 'nextBtnCreateContactTabs')]")).click();

    //CONTACT CREATION
    driver.wait(until.elementLocated(By.id('Model_Phones_0__Type')), 30000).thenCatch(function() {
        driver.findElement(By.xpath("//button[starts-with(@id, 'nextBtnCreateContactTabs')]")).click();
    });
    driver.wait(until.elementLocated(By.xpath("//select[@id='Model_Phones_0__Type']/option[@selected='selected']")), 10000);
    driver.wait(until.elementLocated(By.xpath("//select[@id='Model_Person_Name_Prefix']/option[@value='1']")));
    driver.findElement(By.xpath("//select[@id='Model_Phones_0__Type']/option[@selected='selected']")).getText().then(function(phoneSelected) {
        assert.equal(phoneSelected, 'Home mobile');
    });

    driver.findElement(By.xpath("//select[@id='Model_Emails_0__Type']/option[@selected='selected']")).getText().then(function(emailSelected) {
        assert.equal(emailSelected, 'Personal');
    });

    driver.findElement(By.xpath("//select[@id='Model_SSNs_0__Type']/option[@selected='selected']")).getText().then(function(socialSelected) {
        assert.equal(socialSelected, 'Social Security');
    });

    driver.findElement(By.id('Model_Person_Name_FirstName')).getAttribute('value').then(function(firstNameInput) {
        assert.equal(firstNameInput, contact.firstName);
    });

    if (contact.middleName != '') {
        driver.findElement(By.id('Model_Person_Name_MiddleName')).getAttribute('value').then(function(middleNameInput) {
            assert.equal(middleNameInput, contact.middleName);
        });
    };
    
    driver.findElement(By.id('Model_Person_Name_LastName')).getAttribute('value').then(function(lastNameInput) {
        assert.equal(lastNameInput, contact.lastName);
    });

    driver.findElement(By.id('Model_SSNs_0__Value')).getAttribute('value').then(function(ssnInput) {
        assert.equal(ssnInput, contact.ssn);
    });
    
    driver.sleep(1000);
    driver.findElement(By.xpath("//select[@id='Model_Person_Name_Prefix']/option[@value='1']")).click();
    driver.findElement(By.id('Model_Person_ClientId')).sendKeys('785412');
    driver.findElement(By.xpath("//select[@id='Model_Person_PrimaryRoleGroupId']/option[@value='2']")).click();
    driver.findElement(By.xpath("//select[@id='Model_Person_PrimaryRoleId']/option[@value='1']")).click();
    driver.findElement(By.id('Model_Phones_0__Ext')).sendKeys('365');
    
    driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(By.xpath("//select[@id='Model_Addresses_0__Type']/option[@value='1']")));
    
    driver.findElement(By.xpath("//select[@id='Model_Addresses_0__Type']/option[@value='1']")).click();
    driver.findElement(By.id('Model_Addresses_0__Street1')).sendKeys('Lindstrom Dr');
    driver.findElement(By.id('Model_Addresses_0__Title')).sendKeys('My home address');
    
    
    //driver.findElement(By.xpath("//select[@id='Model_SSNs_0__Type']/option[@value='3']")).click();
    driver.sleep(500);
    //waitForLoadingBar();
    var createBtn = By.xpath("//div[@id='createNavigation']/div/button[@type='submit']");
    driver.findElement(createBtn).click();
    driver.sleep(2000);
    
    var firstPhone = By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow0')]"),
        firstEmail = By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow0')]"),
        firstAddress = By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//tr[contains(@id, 'DXDataRow0')]");
        
    driver.wait(until.elementLocated(firstPhone), 20000).then(function() {
        driver.wait(until.elementLocated(firstEmail));
        driver.wait(until.elementLocated(firstAddress));
    }, function(err) {
        driver.findElement(createBtn).click().then(function() {
            driver.wait(until.elementLocated(firstPhone), 20000).then(function() {
                driver.wait(until.elementLocated(firstEmail));
                driver.wait(until.elementLocated(firstAddress));
            }, function(err) {
                driver.findElement(By.xpath("//div[@id='zipCode']//div[@class='validationMessage']/span/span")).getText().then(function(message) {
                    if (message == "The remote name could not be resolved: 'production.shippingapis.com'") {
                        driver.findElement(By.xpath("//div[@id='zipCode']//button[contains(@class, 'btn-search')]")).click();
                        driver.sleep(2000);
                        driver.findElement(createBtn).click();
                        driver.wait(until.elementLocated(firstPhone), 20000).then(function() {
                            driver.wait(until.elementLocated(firstEmail));
                            driver.wait(until.elementLocated(firstAddress));
                        }, function(err) {
                            throw err
                        });
                    } else {
                        saveScreenshot('zipcode error.png')
                    }
                })
            });
        });
    });

};



var createCompany = function(company) {

    //SEARCH SCREEN
    driver.wait(until.elementLocated(By.id('searchBtn')), 15000);
    driver.findElement(By.id('searchBtn')).getAttribute('disabled').then(function(disabled) { //checking for search button to be disabled
        assert.equal(disabled, 'true');
    });
    driver.findElement(By.id('Name')).sendKeys(company.displayName);
    driver.findElement(By.id('Email')).sendKeys(company.email());
    driver.findElement(By.id('Phone')).sendKeys(company.phone);
    driver.findElement(By.id('Zip')).sendKeys(company.zip);
    driver.sleep(1000);
    driver.findElement(By.id('searchBtn')).click();
    driver.sleep(1000);
    driver.findElement(By.xpath("//button[starts-with(@id, 'nextBtnCreateContactTabs')]")).click();

    //CONTACT CREATION
    driver.wait(until.elementLocated(By.id('Model_Phones_0__Type')), 10000).then(function() {
        
        }, function() {
        driver.findElement(By.xpath("//button[starts-with(@id, 'nextBtnCreateContactTabs')]")).click();
    });

    driver.findElement(By.xpath("//div[@data-role='panel']//select[@id='Model_Phones_0__Type']/option[@selected='selected']")).getText().then(function(phoneSelected) {
        assert.equal(phoneSelected, 'Work');
    });

    driver.findElement(By.xpath("//div[@data-role='panel']//select[@id='Model_Emails_0__Type']/option[@selected='selected']")).getText().then(function(emailSelected) {
        assert.equal(emailSelected, 'Work');
    });

    driver.findElement(By.id('Model_Company_Name')).getAttribute('value').then(function(companyNameInput) {
        assert.equal(companyNameInput, company.displayName);
    });
    
    driver.sleep(1000);
    driver.findElement(By.xpath("//select[@id='Model_Company_PrimaryRoleGroupId']/option[@value='2']")).click();
    driver.findElement(By.xpath("//select[@id='Model_Company_PrimaryRoleId']/option[@value='1']")).click();
    driver.findElement(By.xpath("//div[@data-role='panel']//select[@id='Model_Addresses_0__Type']/option[@selected='selected']")).getText().then(function(addressSelected) {
        assert.equal(addressSelected, 'Work')
    });
    driver.findElement(By.id('Model_Addresses_0__Street1')).sendKeys('Lindstrom Dr');
    driver.findElement(By.id('Model_Addresses_0__Title')).sendKeys('Our business address');
    driver.findElement(By.id('Model_Phones_0__Ext')).sendKeys('365');
    driver.findElement(By.id('Model_Company_ClientId')).sendKeys('785412');
    //driver.findElement(By.xpath("//select[@id='Model_SSNs_0__Type']/option[@value='3']")).click();
    driver.sleep(500);
    var createBtn = By.xpath("//div[@id='createNavigation']/div/button[@type='submit']");
    driver.findElement(createBtn).click();
    driver.sleep(2000);
    
    var firstPhone = By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow0')]"),
        firstEmail = By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow0')]"),
        firstAddress = By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//tr[contains(@id, 'DXDataRow0')]");
    
    driver.wait(until.elementLocated(firstPhone), 20000);
    driver.wait(until.elementLocated(firstEmail));
    driver.wait(until.elementLocated(firstAddress));
    
};


var findContact = function (displayName) {
    
    driver.wait(until.elementLocated(nav.navBar.contacts));
    driver.findElement(nav.navBar.contacts).click();
    driver.wait(until.elementLocated(By.xpath("//td[1]/input[contains(@id ,'_DXFREditorcol2_I')]")), 10000);
    driver.sleep(1000);
    driver.findElement(By.xpath("//td[1]/input[contains(@id ,'_DXFREditorcol2_I')]")).sendKeys(displayName);
    driver.findElement(By.xpath("//td[1]/input[contains(@id ,'_DXFREditorcol2_I')]")).sendKeys(webdriver.Key.ENTER);
    driver.sleep(2000);
    driver.findElement(By.xpath("//span[text()='Processing...']")).then(function() {
        driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath("//span[text()='Processing...']"))));
    }, function(err) {
        
    });
    driver.findElement(By.xpath("//div[contains(@class, 'contacts-gridview')]//*[contains(@id, 'DXDataRow0')]/td[2]")).getText().then(function(foundContact) {
        assert.equal(foundContact, displayName)
    });
    
}



var selectMatter = function (type, chapter) {
    
    driver.wait(until.elementLocated(nav.navBar.matters));
    driver.findElement(nav.navBar.matters).click();
    driver.wait(until.elementLocated(By.xpath("//td[2]/input[contains(@id, '_DXFREditorcol9')]")), 10000);
    
    driver.findElement(By.xpath("//select[@id='mattersFilter']/option[@value='3']")).click();
    driver.sleep(1000);
    driver.findElement(By.xpath("//td[2]/input[contains(@id, '_DXFREditorcol9')]")).sendKeys(chapter);
    driver.findElement(By.xpath("//td[2]/input[contains(@id, '_DXFREditorcol9')]")).sendKeys(webdriver.Key.ENTER);
    driver.sleep(1500);
    
    driver.findElement(By.xpath("//table[contains(@id, 'DXHeaderTable')]/tbody/tr[3]/td[2]//input[contains(@onchange, '_DXFREditorcol1')]")).sendKeys(type); //';' - joint, '' - individual
    driver.findElement(By.xpath("//table[contains(@id, 'DXHeaderTable')]/tbody/tr[3]/td[2]//input[contains(@onchange, '_DXFREditorcol1')]")).sendKeys(webdriver.Key.ENTER);
    driver.sleep(1500);
    
    /*
    driver.findElement(By.xpath("//td[1]/input[contains(@id, '_DXFREditorcol13')]")).sendKeys(jurisdiction);
    driver.findElement(By.xpath("//td[1]/input[contains(@id, '_DXFREditorcol13')]")).sendKeys(webdriver.Key.ENTER);
    driver.sleep(1500);
    */
    
    driver.findElement(By.xpath("//td[2]/input[contains(@id, '_DXFREditorcol11')]")).sendKeys('bankruptcy');
    driver.findElement(By.xpath("//td[2]/input[contains(@id, '_DXFREditorcol11')]")).sendKeys(webdriver.Key.ENTER);
    
    driver.sleep(1000);
    driver.findElement(By.xpath("//span[text()='Processing...']")).then(function() {
        driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath("//span[text()='Processing...']"))));
    }, function(err) {
        
    });
    driver.findElement(By.xpath("//*[contains(@id, 'DXDataRow0')]")).click();
    driver.wait(until.elementLocated(nav.navMatter.events.self));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewParties')]/div/div[2]/table/tbody")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewTasks')]/div/div[2]")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewAppointments')]/div/div[2]")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewActivityHistory')]/div/div[2]"))).then(function() {
        console.log('Matter opened');
    });
    
};






var createBKmatter = function (matter) {
    
    
    driver.wait(until.elementLocated(nav.navContact.matters.self), 15000);
    driver.findElement(nav.navContact.matters.self).click();
    driver.wait(until.elementLocated(By.xpath("//*[@data-pe-navigationtitle='Create']")));
    driver.findElement(By.xpath("//*[@data-pe-navigationtitle='Create']")).click();
    driver.wait(until.elementLocated(By.xpath("//div[@data-ajax-text='Bankruptcy' and @preselected='true']"))).then(function() {
        console.log('BK is defaulted: OK');
    }, function(err) {
        console.log('BK is defaulted: FAIL');
        driver.findElement(By.xpath("//div[@data-ajax-text='Bankruptcy']")).click();
    });
    driver.wait(until.elementLocated(By.id('Case_Chapter')));
    driver.wait(until.elementLocated(By.id('Case_DivisionId')));
    driver.wait(until.elementLocated(By.id('District_Id')));
    driver.findElement(matter.chapter).click();
    driver.sleep(500);
    //driver.findElement(By.id('Case_Ownership')).click();
    driver.findElement(matter.type).click().then(function() {
        if (matter.type == efp.joint) {
            driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='case_client2']/div[2]/span/button"))), 10000);
            driver.sleep(500);
            driver.findElement(By.xpath("//div[@id='case_client2']/div[2]/span/button")).click();
            driver.sleep(2000);
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
            driver.findElement(nav.dvxprsPopupFirstRow).click();
            driver.sleep(1000);
        }
    });
    driver.findElement(matter.jurisdiction.state).click();
    driver.sleep(1000);
    driver.findElement(matter.jurisdiction.county).click();
    driver.sleep(500);
    driver.findElement(matter.jurisdiction.district).click();
    driver.sleep(500);
    if (matter.jurisdiction.division == undefined) {
        matter.jurisdiction.division = By.xpath("//select[@id='Case_DivisionId']/option[not(@disabled='')][not(@value='')]")
    };
    driver.findElement(matter.jurisdiction.division).click();
    driver.sleep(500);
    driver.findElement(By.xpath("//form[starts-with(@id, 'CreateCase_')]/div[@class='button-set']/button[@type='submit']")).click();
    driver.wait(until.elementLocated(nav.navMatter.events.self));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewParties')]/div/div[2]/table/tbody")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewTasks')]/div/div[2]")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewAppointments')]/div/div[2]")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewActivityHistory')]/div/div[2]"))).then(function() {
        console.log('Matter created');
    });
    driver.sleep(1000);
    
};

var waitForSuccessMsg = function() {
    var successMsg = By.xpath("//div[contains(@class, 'messageBox')][contains(@class, 'success')]");
    driver.wait(until.elementLocated(successMsg), 10000).then(function() {
        driver.wait(until.stalenessOf(driver.findElement(successMsg)), 5000).thenCatch(function(err) {
            console.log('Success message did not disappear FAIL ');
            saveScreenshot('SuccessMsgNotDisappeared.png')
        })
        
    }, function(err) {
        console.log('Success message did not appear FAIL\n');
        saveScreenshot('SuccessMsgFail.png');
    });
};

var confirmDelete = function() {
    driver.wait(until.elementLocated(By.xpath("//section[@data-pe-id='confirmPopup']//button[@data-pe-id='confirm']")));
    driver.findElement(By.xpath("//section[@data-pe-id='confirmPopup']//button[@data-pe-id='confirm']")).click();
};




var waitForAddressZip = function() {
    
    var createContactCounty = {
        locator: By.xpath("//div[@id='counties']//select[@id='Model_Addresses_0__CountyId']"),
        option: By.xpath("//div[@id='counties']//select[@id='Model_Addresses_0__CountyId']/option[not(@value='')]")
    };
    
    var addAddressCounty = {
        locator: By.xpath("//div[@id='counties']//select[@id='address_CountyId']"),
        option: By.xpath("//div[@id='counties']//select[@id='address_CountyId']/option[not(@value='')]")
    };
    /*
    var  sofaCounty = {
        locator: By.xpath("//div[@id='state']//select[@id='modelObject_StateId']"),
        option: By.xpath("//div[@id='state']//select[@id='modelObject_StateId']/option[not(@value='')]")
    };
       */
    var countySelect = [createContactCounty, addAddressCounty];
    



    countySelect.forEach(function(item, i, arr){
        
        driver.findElement(item.locator).then(function() {
            driver.wait(until.elementLocated(item.option), 10000).thenCatch(function(err) {
                driver.findElement(By.xpath("//div[@class='messageBox error']//article")).getText().then(function(message) {
                    console.log(message);
                    if (message == "The remote name could not be resolved: 'production.shippingapis.com'") {
                        driver.findElement(By.xpath("//div[@id='zipCode']//button[contains(@class, 'btn-search')]")).click();
                        driver.wait(until.elementLocated(item.option), 10000);
                        
                    } else {
                        saveScreenshot('zipcode error.png')
                    }
                })
            });
            
        }, function(err) {
            //console.log(item.locator + ' not found')
        });
        
    })
    
    
};

var logOut = function() {
    
    driver.wait(until.elementLocated(By.xpath("//*[@id='mainNavBar']/ul[2]/li/a")));
    driver.findElement(By.xpath("//*[@id='mainNavBar']/ul[2]/li/a")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='logoutForm']/a"))));
    driver.findElement(By.xpath("//*[@id='logoutForm']/a")).click();
    driver.wait(until.titleIs('Log In - StratusBK'), 10000).then(function() {
       console.log("Logout: successful");
       driver.quit();
   }, function(err) {
       console.log("Logout: failed:\n" + err);
       driver.quit();
   });

};


module.exports = {
    authorize: authorize,
    closeTabs: closeTabs,
    openCreateContact: openCreateContact,
    createPerson: createPerson,
    createCompany: createCompany,
    findContact: findContact,
    selectMatter: selectMatter,
    createBKmatter: createBKmatter,
    confirmDelete: confirmDelete,
    waitForSuccessMsg: waitForSuccessMsg,
    waitForLoadingBar: waitForLoadingBar,
    waitForAddressZip: waitForAddressZip,
    logOut: logOut,
    
    currentDate: currentDate,
    currentTime: currentTime,
    saveScreenshot: saveScreenshot,
    catchUncaughtExceptions: catchUncaughtExceptions,
    
    webdriver: webdriver,
    driver: driver,
    By: By,
    until: until,
    
    assert: assert,
    fs: fs
}












