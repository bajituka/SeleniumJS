var util = require('../utilities.js'),
    nav = require('../navigation.js'),
    jur = require('../jurisdictions.js'),
    test = require('../testdata.js');

var webdriver = util.webdriver,
    driver = util.driver,
    By = util.By,
    until = util.until;

var assert = util.assert,
    fs = util.fs;

util.catchUncaughtExceptions();

var fileJurisdiction = function() {

    //check matter state and statuses
    util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.generalInformation.self);

    driver.wait(until.elementLocated(By.xpath("//select[@id='Case_CaseStatus']/option[@selected='selected']")), 15000);
    driver.findElement(By.xpath("//select[@id='Case_CaseStatus']/option[@selected='selected']")).getText().then(function(matterStatus) {
        assert.equal(matterStatus, 'Draft');
    });
    driver.findElement(By.xpath("//div[@id='clients']/div[4]/div[2]/div[2]/span")).getText().then(function(matterState) {
        assert.equal(matterState, 'Draft');
    });
    driver.findElement(By.id('Case_DocketNumber')).getAttribute('value').then(function(docketNumber) {
        assert.equal(docketNumber, '');
    });

    // add a secured creditor
    require('../petition/creditors.js').securedCreditor();
        
    // statement of intent
    require('../petition/statementOfIntent.js').statementOfIntent();

    //EFILING
    util.navigateTo(nav.navMatter.court.self, nav.navMatter.court.filing.self);
    driver.wait(until.elementLocated(By.xpath("//table[@id='filingAttorneyTable']/tbody/tr/td[2]")), 15000);
    driver.findElement(By.xpath("//table[@id='filingAttorneyTable']/tbody/tr/td[2]")).getText().then(function(filingAttorney) {
        assert.equal(filingAttorney, 'Filing Attorney')
    });


    //ISSUES DETERMINATION

    var creditCounceling = {
            name: 'Credit Counseling (Combined): Selected but file is empty',
            event: By.xpath("//tr[@data-docname='Credit Counseling (Combined).pdf']"),
            document: By.xpath("//div[@data-pe-name='Schedule H: Your Codebtors - Individuals']")
    };
    
    var plan = {
            name: 'Plan: Selected but file is empty',
            event: By.xpath("//tr[@data-docname='Plan.pdf']"),
            document: By.xpath("//div[@data-pe-name='Chapter 13 Plan (Recommended Form)']")
    };
    
    var cmi = {
            name: 'Chapter 13 Statement of Current Monthly Income and Calculation of Commitment Period Form 22C-1: Selected but file is empty',
            event: By.xpath("//tr[@data-docname='Chapter 13 Statement of Current Monthly Income and Calculation of Commitment Period Form 22C-1.pdf']"),
            document: By.xpath("//div[@data-pe-name='Chapter 13 Statement of Your Current Monthly Income and Calculation of Commitment Period']")
    };
    
    var monthlyIncome = {
            name: 'Chapter 7 Statement of Monthly Income Form 122A-1/122A-1Supp: Selected but file is empty',
            event: By.xpath("//tr[@data-docname='Chapter 7 Statement of Monthly Income Form 122A-1/122A-1Supp.pdf']"),
            document: By.xpath("//div[@data-pe-name='Chapter 7 Statement of Your Current Monthly Income and Means-Test Calculation']")
    };
    
    var meansTest = {
            name: 'Chapter 7 Means Test Calculation Form 122A-2: Selected but file is empty',
            event: By.xpath("//tr[@data-docname='Chapter 7 Means Test Calculation Form 122A-2.pdf']"),
            document: By.xpath("//div[@data-pe-name='Chapter 7 Means Test Calculation']")
    };
    
    var socialSecurity = {
        name: 'Statement Of Social Security: Selected but file is empty',
        event: By.xpath("//tr[@data-docname='Statement Of Social Security.pdf']"),
        document: By.xpath("//div[@data-pe-name='Your Statement About Your Social Security Numbers']")
    };
    
    var paymentAdvices = {
        name: 'Payment Advices: Selected but file is empty',
        event: By.xpath("//tr[@data-documenttype='3083']"),
        document: By.xpath("//div[@data-pe-name='Schedule J: Your Expenses']")
    };

    var eventsArr = [creditCounceling, plan, cmi, monthlyIncome, meansTest, socialSecurity, paymentAdvices];
    
    
    var mainDebtor = {
        name: 'Debtor: Missing social security/tax ID.',
        location: By.xpath("//span[@data-pe-id='navItem']/span[2]")
        
    };
    
    var jointDebtor = {
        name: 'Joint Debtor: Missing social security/tax ID.',
        location: By.xpath("//span[@data-pe-id='navItem']/span[3]")
    };

    var debtorsArr = [mainDebtor, jointDebtor];

    driver.findElements(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div/div[9][contains(@class, 'grid')]/div")).then(function(issuesCount) {
        
        for (var i = 1; i <= issuesCount.length; i++) {
            
            driver.findElement(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div/div[9][contains(@class, 'grid')]/div[" + i + "]")).getText().then(function(caseIssue) {
                
                if (caseIssue.match(/Selected but file is empty/g) == 'Selected but file is empty') {
                    
                    function filterEvents(arr) {
                        if (caseIssue == arr.name) {
                            return true
                        }
                    };
                    
                    var foundEvent = eventsArr.filter(filterEvents);
                    
                    driver.findElement(foundEvent[0].event).click();
                    driver.wait(until.elementLocated(foundEvent[0].document), 20000);
                    driver.findElement(foundEvent[0].document).click();
                    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']"))), 20000);
                    driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']")).click();
                    driver.sleep(1000);
                    driver.findElement(By.xpath("//div[starts-with(@id, 'saveButtons_FileForms_')]/div/button[@type='submit']")).click();
                    driver.sleep(1500);
                    
                    
                } else if (caseIssue.match(/Missing social security/g) == 'Missing social security') {
                    
                    function filterDebtors(arr) {
                        if (caseIssue == arr.name) {
                            return true
                        }
                    };
                    
                    var foundDebtor = debtorsArr.filter(filterDebtors);
                    
                    driver.findElement(foundDebtor[0].location).click();
                    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'contactPhones_TabContact_')]//tr[contains(@id, 'DXHeadersRow0')]")));
                    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'contactEmails_TabContact_')]//tr[contains(@id, 'DXHeadersRow0')]")));
                    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'contactAdddreses_TabContact_')]//tr[contains(@id, 'DXHeadersRow0')]")));
                    driver.findElement(By.xpath("//ul[@class='tabs']/li/a[text()='Details']")).click();
                    driver.wait(until.elementLocated(By.id('details_MartialStatus')));
                    driver.wait(until.elementLocated(By.id('taxpayerIDs')));
                    driver.wait(until.elementLocated(By.id('IDs')));
                    driver.findElement(By.xpath("//*[starts-with(@id, 'taxpayerIDsSection_')]/div[3]")).click(); //Adding an ITIN
                    driver.wait(until.elementIsEnabled(driver.findElement(By.id('taxpayerIDForm'))));
                    driver.findElement(By.xpath("//*[@id='taxpayerIDForm']/div[2]/div/div[2]/select/option[@value='2']")).click();
                    driver.findElement(By.xpath("//*[@id='taxpayerIDForm']/div[2]/div[2]/div[2]/input")).sendKeys('64219873');
                    driver.findElement(By.xpath("//*[@id='taxpayerIDForm']/div[2]/div[4]/div/button[@type='submit']")).click();
                    driver.wait(until.elementLocated(By.xpath("//div[@id='taxpayerIDs']/table/tbody/tr/td/div/div/span")));
                    driver.findElement(By.xpath("//div[@id='taxpayerIDs']/table/tbody/tr/td/div/div/span")).getText().then(function(itin) {
                        assert.equal(itin, 'xxx-xx-9873');
                    });
                    util.navigateTo(By.xpath("//li[@aria-controls='tab1']/a"), nav.navMatter.court.filing.settings, nav.navMatter.court.filing.overview);
                    driver.sleep(2000);
                    
                    
                } else if (caseIssue.match(/Credit Counseling is not selected for/g) == 'Credit Counseling is not selected for') {
                    
                    util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.generalInformation.self, nav.navMatter.petition.generalInformation.creditCounseling);

                    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'client')][1]//input[@value='ReceivedAndAttached']")), 20000).then(function() {
                        driver.findElement(By.xpath("//div[starts-with(@id, 'client')][1]//input[@value='ReceivedAndAttached']")).click();
                        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CreditCounselingSection_')]/ul[@class='tabs']/li[2]/a")), 2000).then(function() {
                            driver.findElement(By.xpath("//div[starts-with(@id, 'CreditCounselingSection_')]/ul[@class='tabs']/li[2]/a")).click();
                            driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[starts-with(@id, 'client')][2]//input[@value='ReceivedAndAttached']"))));
                            driver.findElement(By.xpath("//div[starts-with(@id, 'client')][2]//input[@value='ReceivedAndAttached']")).click();
                        }, function() {
                            
                        });
                        
                    }, function() {
                        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CreditCounseling_')]//input[@value='ReceivedAndAttached']")));
                        driver.findElement(By.xpath("//div[starts-with(@id, 'CreditCounseling_')]//input[@value='ReceivedAndAttached']")).click();
                    });
                    driver.findElement(By.xpath("//*[@id='totalSave']/div/button")).click();
                    util.waitForSuccessMsg();
                    util.navigateTo(nav.navMatter.court.self, nav.navMatter.court.filing.self, nav.navMatter.court.filing.overview);
                    
                    
                } else if (caseIssue.match(/creditor/g) == 'creditor') {
                    driver.findElement(nav.navMatter.petition.self).click();
                    driver.wait(until.elementLocated(nav.navMatter.petition.creditors.self));
                    driver.findElement(nav.navMatter.petition.creditors.self).click();
                    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'secured')]//tr[contains(@id, '_DXDataRow0')]")));
                    driver.findElement(By.xpath("//div[starts-with(@id, 'secured')]//tr[contains(@id, '_DXDataRow0')]")).click();
                    driver.wait(until.elementLocated(By.id('Remarks')));
                    driver.findElement(By.xpath("//a[text()='Means Test']")).click();
                    driver.wait(until.elementLocated(By.xpath("//input[@id='MeansTestTreatment'][@value='Exclude']")));
                    driver.findElement(By.xpath("//input[@id='MeansTestTreatment'][@value='Exclude']")).click();
                    driver.findElement(By.xpath("//div[starts-with(@id, 'secured')]//div[@id='totalSave']//button[@type='submit']")).click();
                    driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'messageBox')][contains(@class, 'success')]")), 5000).then(function() {
                            driver.wait(until.stalenessOf(driver.findElement(By.xpath("//div[contains(@class, 'messageBox')][contains(@class, 'success')]"))));
                            util.navigateTo(nav.navMatter.court.self, nav.navMatter.court.filing.self);
                            driver.sleep(1000);
                        }, function(err) {
                            console.log('Creditor means test saving FAIL ' + err);
                            util.saveScreenshot('creditor means test.png');
                            driver.quit();
                        });
                }
            });
        }
        
    });

    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div[@class='button-set']/button[@id='confirmBtn']")), 20000);
    driver.findElement(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div[@class='button-set']/button[@id='confirmBtn']")).click();


    driver.wait(until.elementLocated(By.xpath("//form[@id='fileCaseForm']/div[2]/div[2]/div/label/span[@class='check']")), 20000);
    driver.findElement(By.xpath("//form[@id='fileCaseForm']/div[2]/div[2]/div/label/span[@class='check']")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//form[@id='fileCaseForm']/div[@class='button-set']/button[@type='submit']"))), 20000);
    driver.findElement(By.xpath("//form[@id='fileCaseForm']/div[@class='button-set']/button[@type='submit']")).click();
    driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 20000);
    driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 360000);
    driver.wait(until.elementLocated(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/h2")), 20000).then(function() {
        console.log('ECF Summary appeared');
        driver.sleep(500);
        driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/h2")).getText().then(function(isSuccessfulEfiling) {
            assert.equal(isSuccessfulEfiling, 'Successfully submitted');
        });
        driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/div[2]/div[1]")).getText().then(function(hasCaseNumber) {
            assert.equal(hasCaseNumber.length, 20);
        });
        driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/div[2]/div[2]")).getText().then(function(hasDateFiled) {
            assert.equal(hasDateFiled, 'Date Filed\n' + util.currentDate())
        });
        driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/div[3]/div[2]/div[2]/div/span")).getText().then(function(hasDocketNumber) {
            assert.equal(hasDocketNumber.search('bk'), 5 || 6);
        });
        driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/div[@class='button-set']/button")).click();
        driver.sleep(1000);
        driver.findElement(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div[1]/div[2]/div[1]/div[@class='value']")).getText().then(function(isFiled) {
            assert.equal(isFiled, 'Filed');
        });
        driver.findElement(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div/div[3]/div[2]/div[2]/div/span")).getText().then(function(hasDocketNumberAtOverview) {
            assert.equal(hasDocketNumberAtOverview.search('bk'), 5 || 6)
        });
    });
};

    var additionalDocuments = function () {

        driver.findElement(By.id('otherBtn')).click();
        driver.wait(until.elementLocated(By.xpath("//*[starts-with(@id, 'CheckBoxForSelectList_')]/table/tbody/tr[1]/td[1]/label/input[@name='formsIDs']")), 20000).then(function() {
            driver.findElement(By.xpath("//form[@id='fileOther']/div/div[starts-with(@id, 'CheckBox_')]/div/label/input[@id='constent']")).click();
            driver.findElements(By.xpath("//*[starts-with(@id, 'CheckBoxForSelectList_')]/table/tbody/tr")).then(function(additDocsToBeFiled) {
                for (var i = 1; i <= additDocsToBeFiled.length; i++) {
                    var element = driver.findElement(By.xpath("//*[starts-with(@id, 'CheckBoxForSelectList_')]/table/tbody/tr[" + i + "]/td[1]/label/input[@name='formsIDs']"));
                    driver.executeScript("arguments[0].scrollIntoView(true);", element);
                    element.click();
                }
            }, function(err) {
                console.log(err)
            });
            driver.findElement(By.xpath("//form[@id='fileOther']/div[5]/button[@type='submit']")).click();
            driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 20000);
            driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 360000);
            driver.wait(until.elementLocated(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/h2")), 20000).then(function() {
                console.log('ECF Summary for other documents filed appeared: OK')
            }, function(err) {
                console.log('ECF Summary for other documents filed appeared: FAIL ' + err)
            });
            driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/h2")).getText().then(function(isSuccessfulEfiling) {
                assert.equal(isSuccessfulEfiling, 'Successfully submitted');
                console.log('Additional Efiling: Division ' + i + ' ' + isSuccessfulEfiling + ' OK')
            }, function(err) {
                console.log('Additional Efiling: FAIL ' + err)
            });
            driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/div[@class='button-set']/button")).click();
            driver.sleep(1000);

        }, function(err) {
            console.log('There have been no additional documents for filing');
            driver.findElement(By.xpath("//form[@id='fileOther']/div[5]/button[@data-role-action='close']")).click();
            driver.sleep(1000);
        });
    };

/*
        //FILE AMENDED DOCUMENTS
        driver.findElement(By.id('otherBtn')).click();
        driver.wait(until.elementLocated(By.xpath("//input[@id='eFilingUploadType' and @value='FileAmendedDocument']")));
        driver.findElement(By.xpath("//input[@id='eFilingUploadType' and @value='FileAmendedDocument']")).click();
        driver.findElement(By.xpath("//form[@id='fileOther']/div/div[starts-with(@id, 'CheckBox_')]/div/label/input[@id='constent']")).click();
        driver.findElements(By.xpath("//*[starts-with(@id, 'CheckBoxForSelectList_')]/table/tbody/tr")).then(function(amendedDocsToBeFiled) {
            for (var i = 1; i <= amendedDocsToBeFiled.length; i++) {
                var element = driver.findElement(By.xpath("//*[starts-with(@id, 'CheckBoxForSelectList_')]/table/tbody/tr[" + i + "]/td[1]/label/input[@name='formsIDs']"));
                driver.executeScript("arguments[0].scrollIntoView(true);", element);
                element.click();
            }
        }, function(err) {
            console.log(err)
        });
        
        driver.findElement(By.xpath("//form[@id='fileOther']/div[5]/button[@type='submit']")).click();
        driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 20000);
        driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 360000);
        driver.wait(until.elementLocated(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/h2")), 20000).then(function() {
            console.log('ECF Summary for amended documents filed appeared: OK')
        }, function(err) {
            console.log('ECF Summary for amended documents filed appeared: FAIL ' + err)
        });
        driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/h2")).getText().then(function(isSuccessfulEfiling) {
            assert.equal(isSuccessfulEfiling, 'Successfully submitted');
            console.log('Amended Efiling: Division ' + i + ' ' + isSuccessfulEfiling + ' OK')
        }, function(err) {
            console.log('Amended Efiling: FAIL ' + err)
        });
        driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/div[@class='button-set']/button")).click();
        driver.sleep(1000);
 
        //STATUSES CHECKS
        driver.findElement(nav.navMatter.petition.self).click();
        driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'fees_')]/a")).click();
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'filingFee_')]")));
        driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'details_')]/a")).click();
        driver.sleep(1000);

        driver.findElement(By.xpath("//select[@id='Case_CaseStatus']/option[@selected='selected']")).getText().then(function(matterStatusNew) {
            driver.findElement(By.xpath("//input[@id='Case_Chapter' and @value='Chapter13']")).getAttribute('checked').then(function(isChapter13) {
                if (isChapter13 == 'true') {
                    assert.equal(matterStatusNew, 'Pre-Confirmation');
                    console.log('Matter status new: ' + matterStatusNew + ' OK')
                } else {
                    assert.equal(matterStatusNew, 'Open');
                    console.log('Matter status new: ' + matterStatusNew + ' OK')
                }
            }, function(err) {
                console.log('Matter status new: FAIL ' + err)
            });
        });

        driver.findElement(By.xpath("//div[@id='clients']/div[4]/div[2]/div[2]/span")).getText().then(function(matterStateNew) {
            assert.equal(matterStateNew, 'Original');
            console.log('Matter state new: ' + matterStateNew + ' OK')
        }, function(err) {
            console.log('Matter state new: FAIL ' + err)
        });
       
    }, function(err) {
        driver.findElement(By.xpath("//div[contains(@class, 'messageBox')][contains(@class, 'error')]/article")).getText().then(function(efilingErrorText) {
            console.log('Efiling FAILED: ' + efilingErrorText);
            util.saveScreenshot('Division ' + item + ' efiling error.png');
            driver.findElement(By.xpath("//form[@id='fileCaseForm']/div[5]/button[contains(@class, 'closeButton')]")).click();
            driver.sleep(1000);
        }, function(err) {
            console.log(err)
        });
    */
   



module.exports = {
    fileJurisdiction: fileJurisdiction,
    additionalDocuments: additionalDocuments
};