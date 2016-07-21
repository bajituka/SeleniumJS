var nav = require('./navigation.js'),
    jur = require('./jurisdictions.js'),
    test = require('./testdata.js');

const webdriver = require('selenium-webdriver'),
      By = require('selenium-webdriver').By,
      until = require('selenium-webdriver').until;


const Capabilities = require('selenium-webdriver/lib/capabilities').Capabilities;

var capabilities = Capabilities.firefox();
capabilities.set('marionette', true);

//var driver = new webdriver.Builder().withCapabilities(capabilities).build();

var driver = new webdriver.Builder().forBrowser('firefox').build();
    
var assert = require('assert'),
    fs = require('fs');

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
            /*
            driver.findElement(By.xpath("//span[text()='Changes have been made. Would you like to save changes?']")).then(function() {
                driver.findElement(By.xpath("//div[@class='window flat shadow']//button[@data-pe-id='cancel']")).click();
            }, function(err) {
                //no popup
            });
            */
        } else {
            console.error(e.message + '\n' + e.stack);
            saveScreenshot('UncaughtException.png');
            /*
            driver.findElement(By.xpath("//span[text()='Changes have been made. Would you like to save changes?']")).then(function() {
                driver.findElement(By.xpath("//div[@class='window flat shadow']//button[@data-pe-id='cancel']")).click();
            }, function(err) {
                //no popup
            });
            */
        }
    
    });
    
};

catchUncaughtExceptions();

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

var navigateTo = function (stepOne, stepTwo, stepThree) {
    
    /*
    function defineContext () {
        var matterPage = By.xpath("//*[starts-with(@id, 'CaseInfo')]"),
            contactPage = By.xpath("//nav[starts-with(@id, 'EntitySideBar_')]"),
            mattersGrid = By.xpath("//*[contains(@class, 'mattersGrid-filter')]"),
            contactsGrid = By.xpath("//nav[starts-with(@id, 'EntitySideBar_')]");
            
            
        var pages = [matterPage, contactPage, mattersGrid, contactsGrid];
        var activeTab = By.xpath("//li[@tabindex='0' and parent::ul[starts-with(@class, 'singlePageAppWrap-nav')]]");
        
    };
    
    function defineElement (keyWord) {
        
        var navObjects = [nav.navBar, nav.navMatter, nav.navContact, nav.navMenu];
        var result = undefined;

        navObjects.forEach(function(item, i, arr) {
               
            for (var key in item) {
                if (item[key].search(keyWord) != -1) {
                    result = item[key];
                }
            }
        });

        return result;
        
    };

    var elementOne = defineElement(stepOne),
        elementTwo = defineElement(stepTwo),
        elementThree = defineElement(stepThree);
    */
    driver.wait(until.elementLocated(stepOne), 15000).then(function() {
        var elOne = driver.findElement(stepOne);
        driver.wait(until.elementIsEnabled(elOne), 5000);
        elOne.click();
    });
    
    
    if (stepTwo != undefined) {
        driver.wait(until.elementLocated(stepTwo), 15000).then(function() {
            driver.sleep(500);
            var elTwo = driver.findElement(stepTwo);
            driver.wait(until.elementIsEnabled(elTwo), 5000);
            elTwo.click();
            driver.sleep(500);
        });
    }
    
    if (stepThree != undefined) {
        driver.wait(until.elementLocated(stepThree), 15000).then(function() {
            driver.sleep(500);
            var elThree = driver.findElement(stepThree);
            driver.wait(until.elementIsEnabled(elThree), 5000);
            elThree.click();
            driver.sleep(500);
        });
    }
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

var authorize = function (testEnv, login, password) {
    
    driver.get(testEnv);
    driver.wait(until.elementLocated(By.name('UserName'))); 
    driver.findElement(By.name('UserName')).sendKeys(login);
    driver.findElement(By.name('Password')).sendKeys(password);
    driver.findElement(By.xpath("//button[@value='Register']")).click();
    driver.wait(until.elementLocated(By.className("title title_cropped")), 2000).then(function() { // Check for presence of popup by title availability
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//button[@data-pe-id='confirm']"))), 10000);
        driver.sleep(500);
        driver.findElement(By.xpath("//button[@data-pe-id='confirm']")).click();
    }, function(){
        //no popup
    });
    
    if (login == 'host') {
        driver.wait(until.elementLocated(By.xpath("//input[@id='FirmGuid' and following-sibling::span[text()='Sprint']]")), 5000).then(function() {
            driver.findElement(By.xpath("//input[@id='FirmGuid' and following-sibling::span[text()='Sprint']]")).click();
            driver.findElement(By.xpath("//*[@id='loginForm']//button[@type='submit']")).click();
            driver.wait(until.elementLocated(By.className("title")), 2000).then(function() { // Check for presence of popup by title availability
                driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//button[@data-pe-id='confirm']"))));
                driver.sleep(500);
                driver.findElement(By.xpath("//button[@data-pe-id='confirm']")).click();
            }, function() {
                
            });
        }, function() {
            //do nothing
        });
    };
    switch (testEnv) {
        case 'sprint3':
            driver.wait(until.titleIs('Sprint - StratusBK'), 10000);
            break;
    
        case 'dev':
            driver.wait(until.titleIs('Dev - StratusBK'), 10000);
            break;
            
        case 'trunk':
            driver.wait(until.titleIs('Trunk - StratusBK'), 10000);
            break;
    }
    driver.wait(until.elementLocated(By.xpath("//div[@id='Events_Tab']/div/div/div")));
    driver.wait(until.elementLocated(By.xpath("//div[@id='Tasks_Tab']/div/div/div")));
    driver.wait(until.elementLocated(By.xpath("//div[@id='Messages_Tab']/div/div/div")));
    driver.wait(until.elementLocated(By.xpath("//div[@id='Contacts_Tab']/div/div/div")));
    driver.wait(until.elementLocated(By.xpath("//div[@id='Docs_Tab']/div/div/div")));
    driver.wait(until.elementLocated(By.xpath("//div[@id='Cases_Tab']/div/div/div")));
    driver.sleep(1000);
   
};

var closeTabs = function() {
    
    driver.wait(until.elementIsEnabled(driver.findElement(By.className('closeAllTabsBtn'))), 15000);
    driver.wait(until.elementLocated(By.xpath("//*[@id='AppTabs']/ul/li")));
    driver.findElements(By.xpath("//*[@id='AppTabs']/ul/li")).then(function(initElemCount) {
        if (initElemCount.length > 1) {
            driver.sleep(500);
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
    
    switch (location) {
        
        case 'navBarNew':
            navigateTo(nav.navBar.navNew.self);
        
            new webdriver.ActionSequence(driver).
                mouseMove(driver.findElement(nav.navBar.navNew.contact.self)).
                perform();
                
            if (contactType == 'company') {
                driver.wait(until.elementIsEnabled(driver.findElement(nav.navBar.navNew.contact.company)), 15000);
                driver.sleep(500);
                driver.findElement(nav.navBar.navNew.contact.company).click();
            } else {
                driver.wait(until.elementIsEnabled(driver.findElement(nav.navBar.navNew.contact.person)), 15000);
                driver.sleep(500);
                driver.findElement(nav.navBar.navNew.contact.person).click();
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

var createPerson = function (contact) {

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
        driver.wait(until.elementIsNotVisible(confirmCreateNewContact), 2500).thenCatch(function() {
            confirmCreateNewContact.click()
        });
    });

    //CONTACT CREATION
    driver.wait(until.elementLocated(By.id('Model_Phones_0__Type')), 20000).thenCatch(function() {
        confirmCreateNewContact.click();
    });
    driver.wait(until.elementLocated(By.xpath("//select[@id='Model_Phones_0__Type']/option[@selected='selected']")), 10000);
    driver.wait(until.elementLocated(By.xpath("//select[@id='Model_Person_Name_Prefix']/option[@value='1']")), 10000);
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
    var createBtn = By.xpath("//div[@id='createNavigation']/div/button[@type='submit']");
    waitForLoadingBar();
    driver.findElement(createBtn).click();
    driver.sleep(2000);
    
    var firstPhone = By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXDataRow0')]"),
        firstEmail = By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXDataRow0')]"),
        firstAddress = By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//tr[contains(@id, 'DXDataRow0')]");
        
    driver.wait(until.elementLocated(firstPhone), 20000).then(function() {
        driver.wait(until.elementLocated(firstEmail), 5000).thenCatch(function() {
            console.log('Email not transferred FAIL');
            saveScreenshot('EmailNotTransferred.png')
            });
        driver.wait(until.elementLocated(firstAddress), 5000).thenCatch(function() {
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
    driver.findElement(By.id('Name')).sendKeys(company.displayName);
    driver.findElement(By.id('RankEmail')).sendKeys(company.email());
    driver.findElement(By.id('RankPhone')).sendKeys(company.phone);
    driver.findElement(By.id('RankZip')).sendKeys(company.zip);
    driver.sleep(1000);
    driver.findElement(By.id('searchBtn')).click();
    driver.sleep(1000);
    driver.findElement(By.xpath("//button[starts-with(@id, 'nextBtnCreateContactTabs')]")).click();

    //CONTACT CREATION
    driver.wait(until.elementLocated(By.id('Model_Phones_0__Type')), 10000).thenCatch(function() {
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
    driver.findElement(By.xpath("//*[text()='Processing...']")).then(function() {
        driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath("//*[text()='Processing...']"))));
    }, function(err) {
        
    });
    driver.findElement(By.xpath("//div[contains(@class, 'contacts-gridview')]//*[contains(@id, 'DXDataRow0')]/td[2]")).getText().then(function(foundContact) {
        assert.equal(foundContact, displayName)
    });
    
};



var selectMatter = function (type, chapter) {
    
    var matterNameInput = By.xpath("//input[contains(@id, '_DXFREditorcol1_I')]"),
        chapterInput = By.xpath("//input[contains(@id, '_DXFREditorcol8_I')]"),
        typeInput = By.xpath("//input[contains(@id, '_DXFREditorcol10_I')]");
    
    
    driver.wait(until.elementLocated(nav.navBar.matters));
    driver.findElement(nav.navBar.matters).click();
    driver.wait(until.elementLocated(By.xpath("//td[2]/input[contains(@id, '_DXFREditorcol9')]")), 15000);
    
    driver.findElement(By.xpath("//select[@id='mattersFilter']/option[@value='3']")).click();
    driver.sleep(1000);
    waitForLoadingBar();
    driver.findElement(chapterInput).sendKeys(chapter);
    driver.findElement(chapterInput).sendKeys(webdriver.Key.ENTER);
    driver.sleep(1500);
    waitForLoadingBar();
    
    driver.findElement(matterNameInput).sendKeys(type); //';' - joint, '' - individual
    driver.findElement(matterNameInput).sendKeys(webdriver.Key.ENTER);
    driver.sleep(1500);
    waitForLoadingBar();
    
    /*
    driver.findElement(By.xpath("//td[1]/input[contains(@id, '_DXFREditorcol13')]")).sendKeys(jurisdiction);
    driver.findElement(By.xpath("//td[1]/input[contains(@id, '_DXFREditorcol13')]")).sendKeys(webdriver.Key.ENTER);
    driver.sleep(1500);
    */
    
    driver.findElement(typeInput).sendKeys('bankruptcy');
    driver.findElement(typeInput).sendKeys(webdriver.Key.ENTER);

    driver.sleep(1000);
    waitForLoadingBar();
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
    
    navigateTo(nav.navContact.matters.self);
    driver.wait(until.elementLocated(By.xpath("//*[@data-pe-navigationtitle='Create']")));
    driver.findElement(By.xpath("//*[@data-pe-navigationtitle='Create']")).click();
    driver.wait(until.elementLocated(By.xpath("//div[@data-ajax-text='Bankruptcy' and @preselected='true']"))).thenCatch(function(err) {
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
        if (matter.type == test.joint) {
            driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='case_client2']/div[2]/span/button"))), 10000);
            driver.sleep(500);
            driver.findElement(By.xpath("//div[@id='case_client2']/div[2]/span/button")).click();
            driver.sleep(2000);
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
            driver.findElement(nav.dvxprsPopupFirstRow).click();
            driver.sleep(1000);
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
    driver.findElement(By.xpath("//form[starts-with(@id, 'CreateCase_')]//button[@type='submit']")).click();
    driver.wait(until.elementLocated(nav.navMatter.events.self), 15000);
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewParties')]/div/div[2]/table/tbody")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewTasks')]/div/div[2]")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewAppointments')]/div/div[2]")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewActivityHistory')]/div/div[2]")));
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
    navigateTo(nav.navMenu.self, nav.navMenu.logOff);
    driver.wait(until.titleIs('Log In - StratusBK'), 10000).then(function() {
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
};