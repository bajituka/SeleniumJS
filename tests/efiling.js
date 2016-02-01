var req = require('../src/functions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
    test = require('../src/testdata.js');

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;
    
req.catchUncaughtExceptions();

driver.manage().window().maximize();
driver.manage().timeouts().implicitlyWait(2000);


req.authorize(test.env, test.login, test.password);

efp.distArr.forEach(function(item, i, arr){
        var division = By.xpath("//select[@id='Case_DivisionId']/option[@value="+item+"]");

        req.closeTabs();
        req.openCreateContact('dashboard', 'person');
        req.createPerson(test.firstName + i, test.lastName + i);
        req.createBKmatter(efp.chapter, efp.matterType, efp.state, efp.district, division);

        driver.wait(until.elementLocated(nav.navMatter.petition.self), 15000);
        driver.findElement(nav.navMatter.petition.self).click();
        driver.wait(until.elementLocated(By.id('stateId')), 15000);
        driver.wait(until.elementLocated(By.id('Case_CountyId')), 15000);
        driver.wait(until.elementLocated(By.id('District_Id')), 15000);
        driver.wait(until.elementLocated(By.id('Case_DivisionId')), 15000);
        driver.wait(until.elementLocated(By.id('Case_CaseStatus')), 15000);
        driver.findElement(By.xpath("//select[@id='Case_CaseStatus']/option[@selected='selected']")).getText().then(function(matterStatus) {
            assert.equal(matterStatus, 'Draft');
            console.log('Matter status: ' + matterStatus + ' OK')
        }, function(err) {
            console.log('Matter status: FAIL ' + err)
        });
        driver.findElement(By.xpath("//div[@id='clients']/div[4]/div[2]/div[2]/span")).getText().then(function(matterState) {
            assert.equal(matterState, 'Draft');
            console.log('Matter state: ' + matterState + ' OK')
        }, function(err) {
            console.log('Matter state: FAIL ' + err)
        });
        driver.findElement(By.id('Case_DocketNumber')).getAttribute('value').then(function(docketNumber) {
            assert.equal(docketNumber, '');
            console.log('Docket number: OK')
        }, function(err) {
            console.log('Docket number: FAIL ' + err)
        });

        //CREDITORS
        driver.findElement(By.xpath("//li[contains(@class, 'creditors')]/a")).click();
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'secured')]/div/header/nav/div/a")));
        driver.findElement(By.xpath("//div[starts-with(@id, 'secured')]/div/header/nav/div/a")).click();
        driver.wait(until.elementLocated(By.id('Remarks')));
        driver.wait(until.elementLocated(By.xpath("//button[@type='button' and contains(@class, 'dropdown-toggle_noArrow')]")));
        driver.findElement(By.xpath("//button[@type='button' and contains(@class, 'dropdown-toggle_noArrow')]")).click();
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Create New Property']"))));
        driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Create New Property']")).click();
        driver.wait(until.elementLocated(By.id('NatureOfInterest')));
        driver.sleep(1000);
        driver.findElement(By.xpath("//input[@id='IsPrincipalResidence'][@value='True']")).click();
        driver.sleep(1000);
        driver.wait(until.elementLocated(By.xpath("//form[@id='assetForm']/div/div/button[@type='submit']")));
        driver.findElement(By.xpath("//form[@id='assetForm']/div/div/button[@type='submit']")).click();
        driver.wait(until.elementIsVisible(driver.findElement(By.id('creditor_Id_client_name')))).then(function() {
            console.log('Property created: OK')
        }, function(err) {
            console.log('Property created: FAIL ' + err);
            throw err
        });
        driver.findElement(By.xpath("//form[@id='debtForm']/div/div/button[@data-role-action='close']")).click(); //force the magn glass to be in viewport
        driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//article[starts-with(@id, 'SecuredDebtEditor_')]/div/div/div/div[2]/span/button"))));
        driver.findElement(By.xpath("//article[starts-with(@id, 'SecuredDebtEditor_')]/div/div/div/div[2]/span/button[@type='button']")).click();
        driver.sleep(2000);
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//section/div/table/tbody/tr/td/div[2]/table/tbody/tr[2]"))), 10000);
        driver.findElement(By.xpath("//section/div/table/tbody/tr/td/div[2]/table/tbody/tr[2]")).click();
        driver.sleep(1000);
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//form[@id='debtForm']/div/div/button[@data-role-action='close']"))));
        driver.findElement(By.xpath("//form[@id='debtForm']/div/div/button[@data-role-action='close']")).click();
        driver.sleep(2000);
        driver.wait(until.elementLocated(By.className('icon-home')), 10000).then(function() {
            console.log('Creditor created: OK')
        }, function(err) {
            console.log('Creditor created: FAIL ' + err);
            throw err
        });


        //STATEMENT OF INTENT
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'CaseStatementOfIntent_')]/a"))));
        driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'CaseStatementOfIntent_')]/a")).click().then(function() {
            driver.wait(until.elementLocated(By.id('planOptions_PlanIntentionsRadio')), 10000);
            driver.wait(until.elementLocated(By.id('planOptions_ExemptStatus')), 10000);
            driver.findElement(By.id('planOptions_PlanIntentionsRadio')).click();
            driver.findElement(By.id('planOptions_ExemptStatus')).click();
            driver.sleep(500);
            driver.findElement(By.xpath("//div[starts-with(@id, 'statementOfIntent_')]/div[@class='button-set']/button")).click().then(function() {
                console.log('Statement of Intent saved OK')
            });
            driver.sleep(2000);
        }, function(notFound) {
            driver.isElementPresent(By.xpath("//li[starts-with(@aria-controls, 'CasePlans_')]/a"))
        });


    //EFILING
    driver.findElement(nav.navMatter.court.self).click();
    driver.wait(until.elementLocated(nav.navMatter.court.filing), 10000);
    driver.findElement(nav.navMatter.court.filing).click();
    driver.wait(until.elementLocated(By.xpath("//table[@id='filingAttorneyTable']/tbody/tr/td[2]")), 15000);
    driver.findElement(By.xpath("//table[@id='filingAttorneyTable']/tbody/tr/td[2]")).getText().then(function(filingAttorney) {
        assert.equal(filingAttorney, 'Filing Attorney')
        console.log('Filing attorney is set OK')
    }, function(err) {
        console.log('Filing attorney is not set FAIL ' + err)
    });

    driver.findElements(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div/div[8]/div")).then(function(issuesCount) {
        for (var i = 0; i < issuesCount.length; i++) {
            driver.findElement(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div/div[8]/div")).getText().then(function(caseIssue) {
                if (caseIssue == 'Credit Counseling (Combined): Selected but file is empty') {
                    driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'casedocsCaseFile_')]/a")).click();
                    driver.wait(until.elementLocated(By.xpath("//tr[@data-docname='Credit Counseling (Combined).pdf']")), 10000);
                    driver.findElement(By.xpath("//tr[@data-docname='Credit Counseling (Combined).pdf']")).click();
                    driver.wait(until.elementLocated(By.xpath("//div[@data-pe-name='Schedule H: Your Codebtors - Individuals']")), 10000);
                    driver.findElement(By.xpath("//div[@data-pe-name='Schedule H: Your Codebtors - Individuals']")).click();
                    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']"))), 10000);
                    driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']")).click();
                    driver.sleep(1000);
                    driver.findElement(By.xpath("//div[starts-with(@id, 'saveButtons_FileForms_')]/div/button[@type='submit']")).click();
                    driver.sleep(1500);
                    driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'summaryCaseFile_')]/a")).click();
                    driver.sleep(1000);

                } else if (caseIssue == 'Plan: Selected but file is empty') {
                    driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'casedocsCaseFile_')]/a")).click();
                    driver.wait(until.elementLocated(By.xpath("//tr[@data-docname='Plan.pdf']")), 10000);
                    driver.findElement(By.xpath("//tr[@data-docname='Plan.pdf']")).click();
                    driver.wait(until.elementLocated(By.xpath("//div[@data-pe-name='Chapter 13 Plan (Recommended Form)']")), 10000);
                    driver.findElement(By.xpath("//div[@data-pe-name='Chapter 13 Plan (Recommended Form)']")).click();
                    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']"))), 10000);
                    driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']")).click();
                    driver.sleep(1000);
                    driver.findElement(By.xpath("//div[starts-with(@id, 'saveButtons_FileForms_')]/div/button[@type='submit']")).click();
                    driver.sleep(1500);
                    driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'summaryCaseFile_')]/a")).click();
                    driver.sleep(1000);

                } else if (caseIssue == 'Joint Debtor: Missing social security/tax ID.') {
                    driver.findElement(By.xpath("//span[@data-pe-id='navItem']/span[3]")).click();
                    driver.wait(until.elementLocated(By.xpath("//div[@id='tab2']//ul[@class='tabs']/li/a[text()='Details']")));
                    driver.wait(until.elementLocated(By.xpath("//div[@id='tab2']//div[starts-with(@id, 'phonesSection_')]")));
                    driver.wait(until.elementLocated(By.xpath("//div[@id='tab2']//div[starts-with(@id, 'emailsSection_')]")));
                    driver.findElement(By.xpath("//div[@id='tab2']//ul[@class='tabs']/li/a[text()='Details']")).click();
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
                    }, function(err) {
                        console.log('Joint Debtors ITIN is wrong:' + err)
                    });
                    driver.findElement(By.xpath("//li[@aria-controls='tab1']/a")).click();
                    driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'casedocsCaseFile_')]/a")).click();
                    driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'summaryCaseFile_')]/a")).click();
                    driver.sleep(1000);

                } else if (caseIssue == 'Chapter 13 Statement of Current Monthly Income and Calculation of Commitment Period Form 22C-1: Selected but file is empty') {
                    driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'casedocsCaseFile_')]/a")).click();
                    driver.wait(until.elementLocated(By.xpath("//tr[@data-docname='Chapter 13 Statement of Current Monthly Income and Calculation of Commitment Period Form 22C-1.pdf']")), 10000);
                    driver.findElement(By.xpath("//tr[@data-docname='Chapter 13 Statement of Current Monthly Income and Calculation of Commitment Period Form 22C-1.pdf']")).click();
                    driver.wait(until.elementLocated(By.xpath("//div[@data-pe-name='Chapter 13 Statement of Your Current Monthly Income and Calculation of Commitment Period']")), 10000);
                    driver.findElement(By.xpath("//div[@data-pe-name='Chapter 13 Statement of Your Current Monthly Income and Calculation of Commitment Period']")).click();
                    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']"))), 10000);
                    driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']")).click();
                    driver.sleep(1000);
                    driver.findElement(By.xpath("//div[starts-with(@id, 'saveButtons_FileForms_')]/div/button[@type='submit']")).click();
                    driver.sleep(1500);
                    driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'summaryCaseFile_')]/a")).click();
                    driver.sleep(1000);

                } else if (caseIssue == 'Chapter 7 Statement of Monthly Income Form 122A-1/122A-1Supp: Selected but file is empty') {
                    driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'casedocsCaseFile_')]/a")).click();
                    driver.wait(until.elementLocated(By.xpath("//tr[@data-docname='Chapter 7 Statement of Monthly Income Form 122A-1/122A-1Supp.pdf']")), 10000);
                    driver.findElement(By.xpath("//tr[@data-docname='Chapter 7 Statement of Monthly Income Form 122A-1/122A-1Supp.pdf']")).click();
                    driver.wait(until.elementLocated(By.xpath("//div[@data-pe-name='Chapter 7 Statement of Your Current Monthly Income and Means-Test Calculation']")), 10000);
                    driver.findElement(By.xpath("//div[@data-pe-name='Chapter 7 Statement of Your Current Monthly Income and Means-Test Calculation']")).click();
                    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']"))), 10000);
                    driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']")).click();
                    driver.sleep(1000);
                    driver.findElement(By.xpath("//div[starts-with(@id, 'saveButtons_FileForms_')]/div/button[@type='submit']")).click();
                    driver.sleep(1500);
                    driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'summaryCaseFile_')]/a")).click();
                    driver.sleep(1000);

                } else if (caseIssue == 'Chapter 7 Means Test Calculation Form 122A-2: Selected but file is empty') {
                    driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'casedocsCaseFile_')]/a")).click();
                    driver.wait(until.elementLocated(By.xpath("//tr[@data-docname='Chapter 7 Means Test Calculation Form 122A-2.pdf']")), 10000);
                    driver.findElement(By.xpath("//tr[@data-docname='Chapter 7 Means Test Calculation Form 122A-2.pdf']")).click();
                    driver.wait(until.elementLocated(By.xpath("//div[@data-pe-name='Chapter 7 Means Test Calculation']")), 10000);
                    driver.findElement(By.xpath("//div[@data-pe-name='Chapter 7 Means Test Calculation']")).click();
                    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']"))), 10000);
                    driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']")).click();
                    driver.sleep(1000);
                    driver.findElement(By.xpath("//div[starts-with(@id, 'saveButtons_FileForms_')]/div/button[@type='submit']")).click();
                    driver.sleep(1500);
                    driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'summaryCaseFile_')]/a")).click();
                    driver.sleep(1000);

                } else if (caseIssue == 'Statement Of Social Security: Selected but file is empty') {
                    driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'casedocsCaseFile_')]/a")).click();
                    driver.wait(until.elementLocated(By.xpath("//tr[@data-docname='Statement Of Social Security.pdf']")), 10000);
                    driver.findElement(By.xpath("//tr[@data-docname='Statement Of Social Security.pdf']")).click();
                    driver.wait(until.elementLocated(By.xpath("//div[@data-pe-name='Your Statement About Your Social Security Numbers']")), 10000);
                    driver.findElement(By.xpath("//div[@data-pe-name='Your Statement About Your Social Security Numbers']")).click();
                    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']"))), 10000);
                    driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']")).click();
                    driver.sleep(1000);
                    driver.findElement(By.xpath("//div[starts-with(@id, 'saveButtons_FileForms_')]/div/button[@type='submit']")).click();
                    driver.sleep(1500);
                    driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'summaryCaseFile_')]/a")).click();
                    driver.sleep(1000);

                } else if (caseIssue == 'Payment Advices: Selected but file is empty') {
                    driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'casedocsCaseFile_')]/a")).click();
                    driver.wait(until.elementLocated(By.xpath("//tr[@data-documenttype='9564']")), 10000);
                    driver.findElement(By.xpath("//tr[@data-documenttype='9564']")).click();
                    driver.wait(until.elementLocated(By.xpath("//div[@data-pe-name='Chapter 7 Means Test Calculation']")), 10000);
                    driver.findElement(By.xpath("//div[@data-pe-name='Chapter 7 Means Test Calculation']")).click();
                    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']"))), 10000);
                    driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']")).click();
                    driver.sleep(1000);
                    driver.findElement(By.xpath("//div[starts-with(@id, 'saveButtons_FileForms_')]/div/button[@type='submit']")).click();
                    driver.sleep(1500);
                    driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'summaryCaseFile_')]/a")).click();
                    driver.sleep(1000);
                    
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
                            driver.findElement(nav.navMatter.court.self).click();
                            driver.wait(until.elementLocated(nav.navMatter.court.filing.self));
                            driver.findElement(nav.navMatter.court.filing.self).click();
                            driver.sleep(1000);
                        }, function(err) {
                            console.log('Creditor means test saving FAIL ' + err);
                            req.saveScreenshot('creditor means test.png');
                            driver.quit();
                        });
                    
                    

                }
            }, function(err) {
                console.log('FOR loop went wrong')
            });
        }
        
    });

    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div[@class='button-set']/button[@id='confirmBtn']")), 10000);
    driver.findElement(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div[@class='button-set']/button[@id='confirmBtn']")).click();


    driver.wait(until.elementLocated(By.xpath("//form[@id='fileCaseForm']/div[2]/div[2]/div/label/span[@class='check']")), 10000);
    driver.findElement(By.xpath("//form[@id='fileCaseForm']/div[2]/div[2]/div/label/span[@class='check']")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//form[@id='fileCaseForm']/div[@class='button-set']/button[@type='submit']"))), 10000);
    driver.findElement(By.xpath("//form[@id='fileCaseForm']/div[@class='button-set']/button[@type='submit']")).click();
    driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 10000).then(function() {
        console.log('Notify Container appeared');
    }, function(err) {
        console.log('Efiling: FAIL Notify Container did not appear! ' + err.name + err.message);
    });
    driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 360000);
    driver.wait(until.elementLocated(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/h2")), 10000).then(function() {
        console.log('ECF Summary appeared');
        driver.sleep(500);
        driver.findElement(By.xpath("")).then(function() {
            req.saveScreenshot('Efiling error_' + req.currentDate() + '.png')
        }, function() {
            
        });
        driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/h2")).getText().then(function(isSuccessfulEfiling) {
            assert.equal(isSuccessfulEfiling, 'Successfully submitted');
            console.log('Efiling: Division ' + i + ' ' + isSuccessfulEfiling + ' OK')
        }, function(err) {
            console.log('Efiling: FAIL ' + err)
        });

        driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/div[2]/div[1]")).getText().then(function(hasCaseNumber) {
            assert.equal(hasCaseNumber.length, 20);
            console.log('Assigned ' + hasCaseNumber + ' OK')
        }, function(err) {
            console.log('Case number not assigned: FAIL ' + err)
        });

        driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/div[2]/div[2]")).getText().then(function(hasDateFiled) {
            assert.equal(hasDateFiled, 'Date Filed\n' + req.currentDate())
            }).then(function(hasDateFiled) {
                console.log('Date filed OK')
            }, function(wrongDateFiled) {
            console.log('Date filed is wrong FAIL')
        });

        driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/div[3]/div[2]/div[2]/div/span")).getText().then(function(hasDocketNumber) {
            assert.equal(hasDocketNumber.length, 11 || 8 || 13);
            console.log('Docket number assigned ' + hasDocketNumber + ' OK')
        }, function(err) {
            console.log('Docket number not assigned: FAIL ' + err)
        });

        driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/div[@class='button-set']/button")).click();
        driver.sleep(1000);

        driver.findElement(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div[1]/div[2]/div[1]/div[@class='value']")).getText().then(function(isFiled) {
            assert.equal(isFiled, 'Filed');
            console.log('Overview / is filed: ' + isFiled + ' OK')
        }, function(err) {
            console.log('Overview / is filed: FAIL ' + err)
        });

        driver.findElement(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div/div[3]/div[2]/div[2]/div/span")).getText().then(function(hasDocketNumberAtOverview) {
            assert.equal(hasDocketNumberAtOverview.length, 11 || 8 || 13);
            console.log('Docket number at Overview ' + hasDocketNumberAtOverview + ' OK')
        }, function(err) {
            console.log('Docket number at Overview: FAIL ' + err)
        });

        // FILE ADDITIONAL DOCUMENTS
        driver.findElement(By.id('otherBtn')).click();
        driver.wait(until.elementLocated(By.xpath("//*[starts-with(@id, 'CheckBoxForSelectList_')]/table/tbody/tr[1]/td[1]/label/input[@name='formsIDs']")), 10000).then(function() {
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
            driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 10000);
            driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 360000);
            driver.wait(until.elementLocated(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/h2")), 10000).then(function() {
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
        driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 10000);
        driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 360000);
        driver.wait(until.elementLocated(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/h2")), 10000).then(function() {
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
*/        
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
        /*
        driver.findElement(By.id('Case_DocketNumber')).getAttribute('value').then(function(docketNumberNew) {
            assert.equal(docketNumberNew.length, 8);
            console.log('Docket number new: ' + docketNumberNew + ' OK')
        }, function(err) {
            console.log('Docket number new: FAIL ' + err)
        });
        */
    }, function(err) {
        driver.findElement(By.xpath("//div[contains(@class, 'messageBox')][contains(@class, 'error')]/article")).getText().then(function(efilingErrorText) {
            console.log('Efiling FAILED: ' + efilingErrorText);
            req.saveScreenshot('Division ' + item + ' efiling error.png');
            driver.findElement(By.xpath("//form[@id='fileCaseForm']/div[5]/button[contains(@class, 'closeButton')]")).click();
            driver.sleep(1000);
        }, function(err) {
            console.log(err)
        });
    });

});

req.logOut();

