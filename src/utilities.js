var nav = require('./navigation.js'),
    jur = require('./jurisdictions.js'),
    test = require('./testdata.js');

const webdriver = require('selenium-webdriver'),
      By = require('selenium-webdriver').By,
      until = require('selenium-webdriver').until;

const Capabilities = require('selenium-webdriver/lib/capabilities').Capabilities;

var capabilities = Capabilities.firefox();
//capabilities.set('marionette', true);
//capabilities.set('acceptSslCerts', true);
//capabilities.set('secureSsl', false);

//var driver = new webdriver.Builder().withCapabilities(capabilities).build();

var driver = new webdriver.Builder().forBrowser('firefox').build();
    
var assert = require('assert'),
    fs = require('fs'),
    xlsx = require('xlsx');

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

        } else {
            console.error(e.message + '\n' + e.stack);
            saveScreenshot('UncaughtException.png');

        }
    });
    
};

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

var waitForElementsLocated = function() {

    for (var i = 0; i < arguments.length; i++) {
        driver.wait(until.elementLocated(arguments[i]), 20000);
    };

};

var navigateTo = function () {
    
    for (var i = 0; i < arguments.length; i++) {
        driver.wait(until.elementLocated(arguments[i]), 20000);
        var element = driver.findElement(arguments[i]);
        driver.wait(until.elementIsEnabled(element), 5000);
        driver.sleep(1500);
        element.click();
        driver.sleep(500);
    }
};
    
var currentTime = function() {
    
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    
    if (hours < 10) {
        hours = '0' + hours
    };
    if (minutes < 10) {
        minutes = '0' + minutes
    };
    if (seconds < 10) {
        seconds = '0' + seconds
    };
    
    return hours + ' ' + minutes + ' ' + seconds;
};

var waitForLoadingBar = function() {
    var overlay = By.xpath("//*[text()='Processing...']");
    driver.findElement(overlay).then(function() {
        driver.wait(until.elementIsVisible(driver.findElement(overlay)), 1000).then(function() {
            driver.wait(until.elementIsNotVisible(driver.findElement(overlay)), 30000)
        }, function() {
            //no visible overlay found
        });
    }, function() {
        //no overlay found
    });
    
};

var replaceWithValue = function(locator, value) {
    element = driver.findElement(locator);
    element.clear();
    element.sendKeys(value);
};

var authorize = function (testEnv, login, password) {
    
    driver.get(testEnv);
    driver.manage().timeouts().implicitlyWait(2000);
    driver.wait(until.elementLocated(By.name('UserName'))); 
    driver.findElement(By.name('UserName')).sendKeys(login);
    driver.findElement(By.name('Password')).sendKeys(password);
    driver.findElement(By.xpath("//button[@value='Register']")).click();
    
    function waitForPopupAndProceed () {
        driver.wait(until.elementLocated(By.className("title title_cropped")), 2000).then(function() { // Check for presence of popup by title availability
            driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//button[@data-pe-id='confirm']"))), 20000);
            driver.sleep(500);
            driver.findElement(By.xpath("//button[@data-pe-id='confirm']")).click();
        }, function(){
            //no popup
        });
    };

    waitForPopupAndProceed();

    if (login == 'host') {
        var firstRow = By.xpath("//tr[contains(@id, 'DXDataRow0')]");
        driver.wait(until.elementLocated(firstRow), 5000).then(function() {
            var firstRowEl = driver.findElement(firstRow);
            firstRowEl.click();
            driver.findElement(By.xpath("//*[@id='loginForm']//button[@type='submit']")).click();
            driver.wait(until.stalenessOf(firstRowEl), 20000);
        });
    };

    var dashboardSections = ["//div[@id='Events_Tab']/div/div/div", "//div[@id='Tasks_Tab']/div/div/div", "//div[@id='Messages_Tab']/div/div/div", "//div[@id='Contacts_Tab']/div/div/div", "//div[@id='Docs_Tab']/div/div/div", "//div[@id='Cases_Tab']/div/div/div"];
    
    dashboardSections.forEach(function(item, i, arr) {
        driver.wait(until.elementLocated(By.xpath(item)), 15000)
    });
    
    driver.sleep(1000);
   
};

var closeTabs = function() {
    
    var closeAllTabsBtn = driver.findElement(By.className('closeAllTabsBtn'));
    driver.wait(until.elementIsEnabled(closeAllTabsBtn), 15000);
    driver.wait(until.elementLocated(By.xpath("//*[@id='AppTabs']/ul/li")), 20000);
    driver.findElements(By.xpath("//*[@id='AppTabs']/ul/li")).then(function(initElemCount) {
        if (initElemCount.length > 1) {
            driver.sleep(500);
            closeAllTabsBtn.click();
            driver.sleep(1000);
            driver.findElements(By.xpath("//*[@id='AppTabs']/ul/li")).then(function(finElemCount) {
                if (finElemCount.length != 1) {
                    closeAllTabsBtn.click();   
                }
            });
        }
    });
    driver.sleep(1000);
};

var openCreateContact = function (location, contactType) {
    
    switch (location) {
        
        case 'navBarNew':
            navigateTo(nav.navBar._new.self);
        
            new webdriver.ActionSequence(driver).
                mouseMove(driver.findElement(nav.navBar._new.contact.self)).
                perform();
                
            if (contactType == 'company') {
                driver.wait(until.elementIsEnabled(driver.findElement(nav.navBar._new.contact.company)), 15000);
                driver.sleep(500);
                driver.findElement(nav.navBar._new.contact.company).click();
            } else {
                driver.wait(until.elementIsEnabled(driver.findElement(nav.navBar._new.contact.person)), 15000);
                driver.sleep(500);
                driver.findElement(nav.navBar._new.contact.person).click();
            };
            break;
        
        case 'navBarContacts':
            driver.findElement(nav.navBar.contacts).click();
            driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'contacts-gridview')]//tr[contains(@id, '_DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
            driver.findElement(By.xpath("//div[@id='createNewContactLink']/span")).click();
            driver.sleep(500);
            if (contactType == 'company') {
                driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='createNewContactLink']//a[@data-pe-tab='Create Company']"))), 15000);
                waitForLoadingBar();
                driver.findElement(By.xpath("//div[@id='createNewContactLink']//a[@data-pe-tab='Create Company']")).click();
            } else {
                driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='createNewContactLink']//a[@data-pe-tab='Create Person']"))), 15000);
                driver.findElement(By.xpath("//div[@id='createNewContactLink']//a[@data-pe-tab='Create Person']")).click();
            };
            break;
        
        case 'dashboard':
            driver.findElement(By.xpath("//*[@id='AppTabs']/ul/li[1]")).click();
            driver.findElement(By.id('btnCreateClient')).click();
            if (contactType == 'company') {
                driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='btnCreateClient']/ul/li[2]/a"))), 1000);
                driver.sleep(500);
                driver.findElement(By.xpath("//*[@id='btnCreateClient']/ul/li[2]/a")).click();
            } else {
                driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='btnCreateClient']/ul/li[1]/a"))), 1000);
                driver.sleep(500);
                driver.findElement(By.xpath("//*[@id='btnCreateClient']/ul/li[1]/a")).click();
            };
            break;
    }
};


var createPerson = function (contact) { //pass an object as a parameter

    //SEARCH SCREEN
    driver.wait(until.elementLocated(By.id('RankFirstName')), 15000);
    driver.wait(until.elementLocated(By.id('searchBtn')), 15000);
    driver.findElement(By.id('searchBtn')).getAttribute('disabled').then(function(disabled) { //checking for search button to be disabled
        assert.equal(disabled, 'true');
    });
    driver.findElement(By.id('RankFirstName')).sendKeys(contact.firstName);
    if (contact.middleName != '') {
        driver.findElement(By.id('RankMiddleName')).sendKeys(contact.middleName);
    };
    driver.findElement(By.id('RankLastName')).sendKeys(contact.lastName);
    driver.findElement(By.id('RankTaxPayerId')).sendKeys(contact.ssn);
    driver.findElement(By.id('RankEmail')).sendKeys(contact.email());
    driver.findElement(By.id('RankPhone')).sendKeys(contact.phone);
    driver.findElement(By.id('RankZip')).sendKeys(contact.zip);
    driver.sleep(1500);
    var confirmCreateNewContact = driver.findElement(By.xpath("//button[starts-with(@id, 'nextBtnCreateContactTabs')]"));
    confirmCreateNewContact.click().then(function() {
        driver.wait(until.elementIsNotVisible(confirmCreateNewContact), 2500).catch(function() {
            confirmCreateNewContact.click()
        });
    });

    //CONTACT CREATION
    driver.wait(until.elementLocated(By.id('Model_Phones_0__Type')), 20000).catch(function() {
        confirmCreateNewContact.click();
    });
    driver.wait(until.elementLocated(By.xpath("//select[@id='Model_Phones_0__Type']/option[@selected='selected']")), 20000);
    driver.wait(until.elementLocated(By.xpath("//select[@id='Model_Person_Name_Prefix']/option[@value='1']")), 20000);
    driver.sleep(1000);
    driver.findElement(By.xpath("//select[@id='Model_Phones_0__Type']/option[@selected='selected']")).getText().then(function(phoneSelected) {
        assert.equal(phoneSelected, 'Home mobile');
    });

    driver.findElement(By.xpath("//select[@id='Model_Emails_0__Type']/option[@selected='selected']")).getText().then(function(emailSelected) {
        assert.equal(emailSelected, 'Personal');
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
    
    driver.findElement(By.id('Model_Person_PreferredTaxPayerID_DecryptedValue')).getAttribute('value').then(function(ssnInput) {
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
    
    driver.sleep(1000);
    var createBtn = By.xpath("//div[@id='createNavigation']/div/button[@type='submit' and @data-role-action='open']");
    waitForLoadingBar();
    driver.findElement(createBtn).click();
    driver.sleep(2000);
    
    var firstPhone = By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow0')]"),
        firstEmail = By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow0')]"),
        firstAddress = By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//tr[contains(@id, 'DXDataRow0')]");
        
    driver.wait(until.elementLocated(firstPhone), 20000).then(function() {
        driver.wait(until.elementLocated(firstEmail), 5000).catch(function() {
            console.log('Email not transferred FAIL');
            saveScreenshot('EmailNotTransferred.png')
            });
        driver.wait(until.elementLocated(firstAddress), 5000).catch(function() {
            console.log('Address not transferred FAIL');
            saveScreenshot('AddressNotTransferred.png')
            });
        
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
    driver.findElement(By.id('RankName')).sendKeys(company.displayName);
    driver.findElement(By.id('RankEmail')).sendKeys(company.email());
    driver.findElement(By.id('RankPhone')).sendKeys(company.phone);
    driver.findElement(By.id('RankZip')).sendKeys(company.zip);
    driver.sleep(1000);
    driver.findElement(By.id('searchBtn')).click();
    driver.sleep(1000);
    driver.findElement(By.xpath("//button[starts-with(@id, 'nextBtnCreateContactTabs')]")).click();

    //CONTACT CREATION
    driver.wait(until.elementLocated(By.id('Model_Phones_0__Type')), 20000).catch(function() {
        driver.findElement(By.xpath("//button[starts-with(@id, 'nextBtnCreateContactTabs')]")).click();
    });
    driver.sleep(1000);

    driver.findElement(By.xpath("//select[@id='Model_Phones_0__Type']/option[@selected='selected']")).getText().then(function(phoneSelected) {
        assert.equal(phoneSelected, 'Work');
    });

    driver.findElement(By.xpath("//select[@id='Model_Emails_0__Type']/option[@selected='selected']")).getText().then(function(emailSelected) {
        assert.equal(emailSelected, 'Work');
    });

    driver.findElement(By.id('Model_Company_Name')).getAttribute('value').then(function(companyNameInput) {
        assert.equal(companyNameInput, company.displayName);
    });
    
    driver.findElement(By.xpath("//select[@id='Model_Company_PrimaryRoleGroupId']/option[@value='2']")).click();
    driver.findElement(By.xpath("//select[@id='Model_Company_PrimaryRoleId']/option[@value='1']")).click();
    driver.findElement(By.xpath("//select[@id='Model_Addresses_0__Type']/option[@value='2']")).click();
    driver.findElement(By.id('Model_Addresses_0__Street1')).sendKeys('Lindstrom Dr');
    driver.findElement(By.id('Model_Addresses_0__Title')).sendKeys('Our business address');
    driver.findElement(By.id('Model_Phones_0__Ext')).sendKeys('365');
    driver.findElement(By.id('Model_Company_ClientId')).sendKeys('785412');
    driver.findElement(By.xpath("//input[@id='Model_Company_PreferredTaxPayerID_DecryptedValue']")).sendKeys('321321321');
    driver.sleep(500);
    var createBtn = By.xpath("//div[@id='createNavigation']//button[@type='submit'][@data-role-action='open']");
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
    driver.wait(until.elementLocated(By.xpath("//td[1]/input[contains(@id ,'_DXFREditorcol2_I')]")), 20000);
    driver.sleep(1000);
    driver.findElement(By.xpath("//td[1]/input[contains(@id ,'_DXFREditorcol2_I')]")).sendKeys(displayName);
    driver.findElement(By.xpath("//td[1]/input[contains(@id ,'_DXFREditorcol2_I')]")).sendKeys(webdriver.Key.ENTER);
    driver.sleep(2000);
    driver.findElement(By.xpath("//*[text()='Processing...']")).then(function() {
        driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath("//*[text()='Processing...']"))));
    }, function(err) {
        
    });
    driver.findElement(By.xpath("//div[contains(@class, 'contacts-gridview')]//*[contains(@id, 'DXDataRow0')]/td[2]")).getText().then(function(foundContact) {
        assert.equal(foundContact, displayName)
    });
    
};



var selectMatter = function (id) {
    
    navigateTo(nav.navBar.matters);
    driver.wait(until.elementLocated(By.xpath("//select[@id='mattersFilter']")), 15000);    
    driver.findElement(By.xpath("//select[@id='mattersFilter']/option[@value='3']")).click();
    driver.sleep(1000);
    waitForLoadingBar();

    var lblMatterId = By.xpath("//table[contains(@id, 'DXHeaderTable')]//td[text()='Matter ID']"),
        clmnMatterId = By.xpath("//div[contains(@id, custwindow_PW-1)]//td[contains(@id, 'custwindow_col13')]"),
        lblFiledOn = By.xpath("//table[contains(@id, 'DXHeaderTable')]//td[text()='Filed On']");

    driver.findElement((lblMatterId), 1000).catch(function() {
        
        driver.findElement(By.xpath("//button[@id='btShowCustomizationWindow']")).click();
        driver.sleep(1000);
        driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(clmnMatterId));
        new webdriver.ActionSequence(driver).
                    dragAndDrop(driver.findElement(clmnMatterId), driver.findElement(lblFiledOn)).
                    perform();

    });
    var inputMatterId = By.xpath("//input[contains(@id, 'DXFREditorcol13_')]");
    driver.wait(until.elementLocated(inputMatterId), 20000);
    driver.findElement(inputMatterId).sendKeys(id);
    driver.findElement(inputMatterId).sendKeys(webdriver.Key.ENTER);
    driver.sleep(1500);
    waitForLoadingBar();
    driver.findElement(By.xpath("//*[contains(@id, 'DXDataRow0')]")).click();
   
};

var createBKmatter = function (matter) {
    
    navigateTo(nav.navContact.matters.self);
    driver.wait(until.elementLocated(By.xpath("//*[@data-pe-navigationtitle='Create']")));
    driver.findElement(By.xpath("//*[@data-pe-navigationtitle='Create']")).click();
    driver.wait(until.elementLocated(By.xpath("//div[@data-ajax-text='Bankruptcy']")), 20000);
    driver.findElement(By.xpath("//div[@data-ajax-text='Bankruptcy']")).click();
    driver.wait(until.elementLocated(By.id('Case_Chapter')), 20000);
    driver.wait(until.elementLocated(By.id('Case_DivisionId')), 20000);
    driver.wait(until.elementLocated(By.id('District_Id')), 20000);
    driver.sleep(1000);
    driver.findElement(matter.chapter).click();
    driver.sleep(500);
    driver.findElement(matter.type).click().then(function() {
        if (matter.type == test.joint) {
            driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='case_client2']/div[2]/span/button"))), 20000);
            driver.sleep(500);
            driver.findElement(By.xpath("//div[@id='case_client2']/div[2]/span/button")).click();
            selectDvxprsFirstRow();
        }
    });
    driver.findElement(matter.state).click();
    driver.sleep(1000);
    driver.findElement(matter.county).click();
    driver.sleep(500);
    driver.findElement(matter.district).click();
    driver.sleep(500);
    if (matter.division == undefined) {
        matter.division = By.xpath("//select[@id='Case_DivisionId']/option[not(@disabled='')][not(@value='')]")
    };
    driver.findElement(matter.division).click();
    driver.sleep(500);
    driver.findElement(By.xpath("//form[starts-with(@id, 'CreateCase_')]//button[@type='submit']")).click().then(function() {
        var overviewSections = ["//div[starts-with(@id, 'CaseOverviewParties')]/div/div[2]/table/tbody", "//div[starts-with(@id, 'CaseOverviewTasks')]/div/div[2]", "//div[starts-with(@id, 'CaseOverviewAppointments')]/div/div[2]", "//div[starts-with(@id, 'CaseOverviewActivityHistory')]/div/div[2]"];
        overviewSections.forEach(function(item, i, arr) {
            driver.wait(until.elementLocated(By.xpath(item)), 20000)
        });
    });
    driver.sleep(1000);
    
};

var waitForSuccessMsg = function() {
    var successMsg = By.xpath("//div[contains(@class, 'messageBox')][contains(@class, 'success')]");
    driver.wait(until.elementLocated(successMsg), 20000).then(function() {
        let successMsgElement = driver.findElement(successMsg);
        driver.wait(until.stalenessOf(successMsgElement), 5000)
    })
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

    var adminEfilingTab = {
        locator: By.xpath("//section[starts-with(@id, 'createDivisionFormFile')]//*[@id='Case_DivisionId']"),
        option: By.xpath("//section[starts-with(@id, 'createDivisionFormFile')]//*[@id='Case_DivisionId']/option[not(@value='')]")
    };

    var countySelect = [createContactCounty, addAddressCounty, adminEfilingTab];
    

    countySelect.forEach(function(item, i, arr){
        
        driver.findElement(item.locator).then(function() {
            driver.wait(until.elementLocated(item.option), 20000).catch(function(err) {
                driver.findElement(By.xpath("//div[@class='messageBox error']//article")).getText().then(function(message) {
                    console.log(message);
                    if (message == "The remote name could not be resolved: 'production.shippingapis.com'") {
                        driver.findElement(By.xpath("//div[@id='zipCode']//button[contains(@class, 'btn-search')]")).click();
                        driver.wait(until.elementLocated(item.option), 20000);
                        
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


var selectDvxprsFirstRow = function() {

        driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 20000);
        driver.sleep(1500);
        /*
        driver.findElement(nav.dvxprsEmailFirstRow).getText().then(function(name) {
            var normalRecord = "//section/div/table/tbody/tr/td/div[2]/table/tbody/tr[2]/td[2]";
            while (name.search('%'|'!'|'№') != -1) {
                normalRecord = "//section/div/table/tbody/tr/td/div[2]/table/tbody/tr[2]/td[2]";
                driver.findElement(nav.dvxprsEmailFirstRow).click();
            } 
        })
           
        });
         */
        driver.findElement(nav.dvxprsPopupFirstRow).click();
        driver.sleep(1000);

};

var logOut = function() {
    navigateTo(nav.navMenu.self, nav.navMenu.logOff);
    driver.wait(until.titleIs('Log In - StratusBK'), 20000).then(function() {
       driver.quit();
   }, function(err) {
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
    navigateTo: navigateTo,
    replaceWithValue: replaceWithValue,
    waitForElementsLocated: waitForElementsLocated,
    
    currentDate: currentDate,
    currentTime: currentTime,
    saveScreenshot: saveScreenshot,
    catchUncaughtExceptions: catchUncaughtExceptions,
    
    webdriver: webdriver,
    driver: driver,
    By: By,
    until: until,

    selectDvxprsFirstRow: selectDvxprsFirstRow,
    
    assert: assert,
    fs: fs,
    xlsx: xlsx
};