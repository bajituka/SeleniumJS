var req = require('./functions.js');

var driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert;
    
var currentDate = req.currentDate;

var login = req.login,
    password = req.password,
    dev = req.dev,
    sprint3 = req.sprint3,
    trunk = req.trunk;

var testMiddleName = req.testMiddleName,
    testSSN = req.testSSN,
    testEmail = req.testEmail,
    testPhone = req.testPhone;

var chapter7 = req.chapter7,
    chapter13 = req.chapter13,
    individual = req.individual,
    joint = req.joint,
    illinois = req.illinois,
    georgia = req.georgia,
    ilnb = req.ilnb,
    ilcb = req.ilcb,
    ilsb = req.ilsb,
    ganb = req.ganb,
    gamb = req.gamb,
    gasb = req.gasb;





driver.manage().window().maximize();
driver.manage().timeouts().setScriptTimeout(15000);



req.authorize(sprint3);

ilnbArr.forEach(function(item, i, arr){
        var path = By.xpath("//select[@id='Case_DivisionId']/option[@value="+item+"]");
            



req.closeTabs();
req.createPerson('Travis' + i, 'Filing' + i);
req.createBKmatter(chapter13, individual, illinois, ilnb, path);




driver.wait(until.elementLocated(By.xpath("//ul[@id='schedulesView']/li[4]/a")));
driver.findElement(By.xpath("//ul[@id='schedulesView']/li[4]/a")).click();
driver.wait(until.elementLocated(By.id('stateId')));
driver.wait(until.elementLocated(By.id('Case_CountyId')));
driver.wait(until.elementLocated(By.id('District_Id')));
driver.wait(until.elementLocated(By.id('Case_DivisionId')));
driver.wait(until.elementLocated(By.id('Case_CaseStatus')));
driver.findElement(By.xpath("//select[@id='Case_CaseStatus']/option[@selected='selected']")).getText()
.then(function(matterStatus) {
    assert.equal(matterStatus, 'Draft');
    console.log('Matter status: ' + matterStatus + ' OK')
}, function(err) {
    console.log('Matter status: FAIL ' + err)
});
driver.findElement(By.xpath("//div[@id='clients']/div[4]/div[2]/div[2]/span")).getText()
.then(function(matterState) {
    assert.equal(matterState, 'Draft');
    console.log('Matter state: ' + matterState + ' OK')
}, function(err) {
    console.log('Matter state: FAIL ' + err)
});
driver.findElement(By.id('Case_DocketNumber')).getAttribute('value')
.then(function(docketNumber) {
    assert.equal(docketNumber, '');
    console.log('Docket number: OK')
}, function(err) {
    console.log('Docket number: FAIL ' + err)
});

//CREDITORS BEGIN
driver.findElement(By.xpath("//li[contains(@class, 'creditors')]/a")).click();
driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'secured')]/div/header/nav/div/a")));
driver.findElement(By.xpath("//div[starts-with(@id, 'secured')]/div/header/nav/div/a")).click();
driver.wait(until.elementLocated(By.id('Remarks')));
driver.wait(until.elementLocated(By.xpath("//button[@type='button' and contains(@class, 'dropdown-toggle_noArrow')]")));
driver.findElement(By.xpath("//button[@type='button' and contains(@class, 'dropdown-toggle_noArrow')]")).click();
driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Create New Property']"))));
driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Create New Property']")).click();
driver.wait(until.elementLocated(By.id('NatureOfInterest')));
driver.wait(until.elementLocated(By.xpath("//form[@id='assetForm']/div/div/button[@type='submit']")));
driver.findElement(By.xpath("//form[@id='assetForm']/div/div/button[@type='submit']")).click()
.then(function() {
    console.log('Property created: OK')
}, function(err) {
    console.log('Property created: FAIL ' +err)
})
driver.wait(until.elementIsVisible(driver.findElement(By.id('creditor_Id_client_name'))));
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
    console.log('Creditor created: FAIL ' + err)
});
//CREDITORS END

//STATEMENT OF INTENT BEGIN
driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'CaseStatementOfIntent_')]/a")).click()
.then(function() {
    driver.wait(until.elementLocated(By.id('planOptions_PlanIntentionsRadio')), 10000);
    driver.wait(until.elementLocated(By.id('planOptions_ExemptStatus')), 10000);
    driver.findElement(By.id('planOptions_PlanIntentionsRadio')).click();
    driver.findElement(By.id('planOptions_ExemptStatus')).click();
    driver.sleep(500);
    driver.findElement(By.xpath("//div[starts-with(@id, 'statementOfIntent_')]/div[@class='button-set']/button")).click();
    driver.sleep(2000);
}, function(notFound) {
    driver.isElementPresent(By.xpath("//li[starts-with(@aria-controls, 'CasePlans_')]/a"))
});

//STATEMENT OF INTENT END

//EFILING BEGIN
driver.findElement(By.xpath("//ul[@id='schedulesView']/li[5]/a")).click();
driver.wait(until.elementLocated(By.xpath("//li[starts-with(@aria-controls, 'CaseViewEfiling_')]")), 10000);
driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'CaseViewEfiling_')]")).click();
driver.wait(until.elementLocated(By.xpath("//table[@id='filingAttorneyTable']/tbody/tr/td[2]")), 15000);
driver.findElement(By.xpath("//table[@id='filingAttorneyTable']/tbody/tr/td[2]")).getText()
    .then(function(filingAttorney) {
        assert.equal(filingAttorney, 'Filing Attorney')
        console.log('Filing attorney is set OK')
    }, function(err) {
        console.log('Filing attorney is not set FAIL ' + err)
    });

driver.findElements(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div/div[8]/div")).then(function(issuesCount) {
    for (var i = 0; i < issuesCount.length; i++) {
        driver.findElement(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div/div[8]/div")).getText()
        .then(function(caseIssue) {
            if (caseIssue == 'Credit Counseling (Combined): Selected but file is empty') {
                driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'casedocsCaseFile_')]/a")).click();
                driver.wait(until.elementLocated(By.xpath("//tr[@data-documenttype='3336'or @data-documenttype='3039']")), 10000);
                driver.findElement(By.xpath("//tr[@data-documenttype='3336' or @data-documenttype='3039']")).click();
                driver.wait(until.elementLocated(By.xpath("//div[@data-pe-name='Schedule H: Your Codebtors - Individuals']")), 10000);
                driver.findElement(By.xpath("//div[@data-pe-name='Schedule H: Your Codebtors - Individuals']")).click();
                driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']"))), 10000);
                driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']")).click();
                driver.sleep(500);
                driver.findElement(By.xpath("//div[starts-with(@id, 'saveButtons_FileForms_')]/div/button[@type='submit']")).click();
                driver.sleep(1000);
                driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'summaryCaseFile_')]/a")).click();
                driver.sleep(1000);
                
            } else if (caseIssue == 'Plan: Selected but file is empty') {
                driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'casedocsCaseFile_')]/a")).click();
                driver.wait(until.elementLocated(By.xpath("//tr[@data-documenttype='3036' or @data-documenttype='3347']")), 10000);
                driver.findElement(By.xpath("//tr[@data-documenttype='3036' or @data-documenttype='3347']")).click();
                driver.wait(until.elementLocated(By.xpath("//div[@data-pe-name='Chapter 13 Plan (Recommended Form)']")), 10000);
                driver.findElement(By.xpath("//div[@data-pe-name='Chapter 13 Plan (Recommended Form)']")).click();
                driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']"))), 10000);
                driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']")).click();
                driver.sleep(500);
                driver.findElement(By.xpath("//div[starts-with(@id, 'saveButtons_FileForms_')]/div/button[@type='submit']")).click();
                driver.sleep(1000);
                driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'summaryCaseFile_')]/a")).click();
                driver.sleep(1000);

            } else if (caseIssue == 'Joint Debtor: Missing social security/tax ID.') {
                

            } else if (caseIssue == 'Payment Advices: Selected but file is empty') {
                driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'casedocsCaseFile_')]/a")).click();
                driver.wait(until.elementLocated(By.xpath("//tr[@data-documenttype='9564']")), 10000);
                driver.findElement(By.xpath("//tr[@data-documenttype='9564']")).click();
                driver.wait(until.elementLocated(By.xpath("//div[@data-pe-name='Chapter 7 Means Test Calculation']")), 10000);
                driver.findElement(By.xpath("//div[@data-pe-name='Chapter 7 Means Test Calculation']")).click();
                driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']"))), 10000);
                driver.findElement(By.xpath("//div[@id='actionBtnsAdd']/button[@id='btnAdd']")).click();
                driver.sleep(500);
                driver.findElement(By.xpath("//div[starts-with(@id, 'saveButtons_FileForms_')]/div/button[@type='submit']")).click();
                driver.sleep(1000);
                driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'summaryCaseFile_')]/a")).click();
                driver.sleep(1000);

            //} else if (caseIssue == 'Assets: This case was filed prior to Dec. 1st 2015. All Real Property addresses must be re-entered under the Real Property - Address section.') {

            };
        }, function(err) {
            console.log('FOR loop went wrong')
        });
    };
});

driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div[@class='button-set']/button[@id='confirmBtn']")), 10000);
driver.findElement(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div[@class='button-set']/button[@id='confirmBtn']")).click();


driver.wait(until.elementLocated(By.xpath("//form[@id='fileCaseForm']/div[2]/div[2]/div/label/span[@class='check']")), 10000);
driver.findElement(By.xpath("//form[@id='fileCaseForm']/div[2]/div[2]/div/label/span[@class='check']")).click();
driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//form[@id='fileCaseForm']/div[@class='button-set']/button[@type='submit']"))), 10000);
driver.findElement(By.xpath("//form[@id='fileCaseForm']/div[@class='button-set']/button[@type='submit']")).click();
driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 10000);
driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 360000);
driver.wait(until.elementLocated(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/h2")), 10000)
.then(function() {
    console.log('ECF Summary appeared')
}, function(err) {
    console.log(err)
});

driver.sleep(500);

driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/h2")).getText()
.then(function(isSuccessfulEfiling) {
    assert.equal(isSuccessfulEfiling, 'Successfully submitted');
    console.log('Efiling: ' + isSuccessfulEfiling + ' OK')
}, function(err) {
    console.log('Efiling: FAIL ' + err)
});

driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/div[2]/div[1]")).getText()
.then(function(hasCaseNumber) {
    assert.equal(hasCaseNumber.length, 20);
    console.log('Assigned ' + hasCaseNumber + ' OK')
}, function(err) {
    console.log('Case number not assigned: FAIL ' + err)
});

driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/div[2]/div[2]")).getText()
.then(function(hasDateFiled) {
    assert.equal(hasDateFiled, 'Date Filed\n' + currentDate());
    console.log(hasDateFiled + ' OK')
}, function(wrongDateFiled) {
        console.log('Date filed is: FAIL ' + wrongDateFiled)
});

driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/div[3]/div[2]/div[2]/div/span")).getText()
.then(function(hasDocketNumber) {
    assert.equal(hasDocketNumber.length, 13);
    console.log('Docket number assigned ' + hasDocketNumber + ' OK')
}, function(err) {
    console.log('Docket number not assigned: FAIL ' + err)
});

driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/div[@class='button-set']/button")).click();
driver.sleep(1000);

driver.findElement(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div[1]/div[2]/div[1]/div[@class='value']")).getText()
.then(function(isFiled) {
    assert.equal(isFiled, 'Filed');
    console.log('Overview / is filed: ' + isFiled + ' OK')
}, function(err) {
    console.log('Overview / is filed: FAIL ' + err)
});

driver.findElement(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div/div[3]/div[2]/div[2]/div/span")).getText()
.then(function(hasDocketNumberAtOverview) {
    assert.equal(hasDocketNumberAtOverview.length, 13);
    console.log('Docket number at Overview ' + hasDocketNumberAtOverview + ' OK')
}, function(err) {
    console.log('Docket number at Overview: FAIL ' + err)
});

// FILE OTHER DOCUMENTS BEGIN
driver.manage().timeouts().implicitlyWait(2000);
driver.findElement(By.id('otherBtn')).click();
driver.wait(until.elementLocated(By.xpath("//*[starts-with(@id, 'CheckBoxForSelectList_')]/table/tbody/tr[1]/td[1]/label/input[@name='formsIDs']")));
driver.findElements(By.xpath("//*[starts-with(@id, 'CheckBoxForSelectList_')]/table/tbody/tr"))
    .then(function(additDocsToBeFiled) {
        for (var i = 1; i <= additDocsToBeFiled.length; i++) {
            var element = driver.findElement(By.xpath("//*[starts-with(@id, 'CheckBoxForSelectList_')]/table/tbody/tr[" + i + "]/td[1]/label/input[@name='formsIDs']"));
            driver.executeScript("arguments[0].scrollIntoView(true);", element);
            element.click();
        };
    }, function(err) {
        console.log(err)
    });
driver.findElement(By.xpath("//form[@id='fileOther']/div/div[starts-with(@id, 'CheckBox_')]/div/label/input[@id='constent']")).click();
driver.manage().timeouts().implicitlyWait(2000);
driver.findElement(By.xpath("//form[@id='fileOther']/div[5]/button[@type='submit']")).click();
driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 10000);
driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 360000);
driver.wait(until.elementLocated(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/h2")), 10000)
.then(function() {
    console.log('ECF Summary for other documents filed appeared: OK')
}, function(err) {
    console.log('ECF Summary for other documents filed appeared: FAIL ' + err)
});
driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/h2")).getText()
.then(function(isSuccessfulEfiling) {
    assert.equal(isSuccessfulEfiling, 'Successfully submitted');
    console.log('Additional Efiling: ' + isSuccessfulEfiling + ' OK')
}, function(err) {
    console.log('Additional Efiling: FAIL ' + err)
});
driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/div[@class='button-set']/button")).click();
driver.sleep(1000);
// FILE OTHER DOCUMENTS END


//FILE AMENDED DOCUMENTS BEGIN
driver.manage().timeouts().implicitlyWait(2000);
driver.findElement(By.id('otherBtn')).click();
driver.wait(until.elementLocated(By.xpath("//input[@id='eFilingUploadType' and @value='FileAmendedDocument']")));
driver.findElement(By.xpath("//input[@id='eFilingUploadType' and @value='FileAmendedDocument']")).click();
driver.findElements(By.xpath("//*[starts-with(@id, 'CheckBoxForSelectList_')]/table/tbody/tr"))
    .then(function(amendedDocsToBeFiled) {
        for (var i = 1; i <= amendedDocsToBeFiled.length; i++) {
            var element = driver.findElement(By.xpath("//*[starts-with(@id, 'CheckBoxForSelectList_')]/table/tbody/tr[" + i + "]/td[1]/label/input[@name='formsIDs']"));
            driver.executeScript("arguments[0].scrollIntoView(true);", element);
            element.click();
        };
    }, function(err) {
        console.log(err)
    });
driver.findElement(By.xpath("//form[@id='fileOther']/div/div[starts-with(@id, 'CheckBox_')]/div/label/input[@id='constent']")).click();
driver.manage().timeouts().implicitlyWait(2000);
driver.findElement(By.xpath("//form[@id='fileOther']/div[5]/button[@type='submit']")).click();
driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 10000);
driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath("//div[contains(@class, 'notify-container')]"))), 360000);
driver.wait(until.elementLocated(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/h2")), 10000)
.then(function() {
    console.log('ECF Summary for amended documents filed appeared: OK')
}, function(err) {
    console.log('ECF Summary for amended documents filed appeared: FAIL ' + err)
});
driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/h2")).getText()
.then(function(isSuccessfulEfiling) {
    assert.equal(isSuccessfulEfiling, 'Successfully submitted');
    console.log('Amended Efiling: ' + isSuccessfulEfiling + ' OK')
}, function(err) {
    console.log('Amended Efiling: FAIL ' + err)
});
driver.findElement(By.xpath("//section[starts-with(@id, 'ECFSummaryPage_')]/div[@class='button-set']/button")).click();
driver.sleep(1000);
//FILE AMENDED DOCUMENTS END


driver.manage().timeouts().implicitlyWait(2000);
driver.findElement(By.xpath("//ul[@id='schedulesView']/li[4]/a")).click();
driver.manage().timeouts().implicitlyWait(2000);
driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'fees_')]/a")).click();
driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'filingFee_')]")));
driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'details_')]/a")).click();
driver.sleep(1000);

driver.findElement(By.xpath("//select[@id='Case_CaseStatus']/option[@selected='selected']")).getText()
.then(function(matterStatusNew) {
    driver.findElement(By.xpath("//input[@id='Case_Chapter' and @value='Chapter13']")).getAttribute('checked')
    .then(function(isChapter13) {
        if (isChapter13 == 'true') {
            assert.equal(matterStatusNew, 'Pre-Confirmation');
            console.log('Matter status new: ' + matterStatusNew + ' OK')
        } else{
            assert.equal(matterStatusNew, 'Open');
            console.log('Matter status new: ' + matterStatusNew + ' OK')
        };
    }, function(err) {
        console.log('Matter status new: FAIL ' + err)
    });
});

driver.findElement(By.xpath("//div[@id='clients']/div[4]/div[2]/div[2]/span")).getText()
.then(function(matterStateNew) {
    assert.equal(matterStateNew, 'Original');
    console.log('Matter state new: ' + matterStateNew + ' OK')
}, function(err) {
    console.log('Matter state new: FAIL ' + err)
});
driver.findElement(By.id('Case_DocketNumber')).getAttribute('value')
.then(function(docketNumberNew) {
    assert.equal(docketNumberNew.length, 13);
    console.log('Docket number new: ' + docketNumberNew + ' OK')
}, function(err) {
    console.log('Docket number new: FAIL ' + err)
});
//EFILING END
});

req.logOut();

