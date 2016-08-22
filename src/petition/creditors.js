var req = require('../commonFunctions.js'),
    nav = require('../navigation.js'),
    jur = require('../jurisdictions.js'),
    test = require('../testdata.js');

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;

req.catchUncaughtExceptions();
//var totalSaveBtn = By.xpath("//*[@id='totalSave']//button[@type='submit']");

var securedCreditor = function() {
    
    var emptyRow = By.xpath("//div[starts-with(@id, 'secured')]//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//div[starts-with(@id, 'secured')]//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//div[starts-with(@id, 'secured')]//tr[contains(@id, 'DXDataRow1')]"),
        newBtn = By.xpath("//div[starts-with(@id, 'secured')]//a[@id='newDebtAnchor']"),
        totalSaveBtn = By.xpath("//div[starts-with(@id, 'secured')]//*[@id='totalSave']//button[@type='button' and @data-role-action='close']");
        
    var creditorSearchBtn = By.xpath("//article[starts-with(@id, 'SecuredDebtEditor_')]//div[@class='row'][1]//button[contains(@class, 'btn-search') and contains(@class, 'fg-stratusOrange')]"),
        securedByNew = By.xpath("//article[starts-with(@id, 'SecuredDebtEditor_')]//div[contains(@class, 'span420')]//button[@data-add-entity='']"),
        realProperty = By.xpath("//li[1]/a[@data-pe-navigationtitle='Create New Property']"),
        personalProperty = By.xpath("//li[2]/a[@data-pe-navigationtitle='Create New Property']");
        
    var otherDescr = By.id('NatureOfLien'),
        description = By.id('Debt_Description'),
        //paymentAmount = By.xpath("//input[@id='Debt_PaymentAmount' and @placeholder='Enter Payment Amount']"),
        dateIncurred = By.id("Debt_AcquiredOn"),
        accountNumber = By.id("Debt_AccNo"),
        claimAmount = By.xpath("//input[@id='Debt_Value' and @placeholder='Enter claim amount']"),
        //unknownDates = By.id('IsDateUnknown'),
        //claimUnknown = By.id('IsValueUnknown'),
        proofOfClaim = By.id('ProofOfClaim_IsFiled'),
        dateFiled = By.id('ProofOfClaim_FiledOn'),
        claimIdentifier = By.id('ProofOfClaim_ClaimId'),
        courtClaimIdentifier = By.id('ProofOfClaim_CourtClaimNumber');
        
    var contingent = By.id('Debt_IsContingent'),
        unliquidated = By.id('Debt_IsUnliquidated'),
        disputed = By.id('Debt_IsDisputed');
    
    req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.creditors.self, nav.navMatter.petition.creditors.secured);
    
    driver.wait(until.elementLocated(emptyRow), 10000);
    
    driver.findElement(newBtn).click();
    
    //add real property
    driver.wait(until.elementLocated(claimAmount), 10000);
    driver.wait(until.elementLocated(securedByNew), 10000).then(function() {
        
        
        driver.findElement(securedByNew).click();
        driver.wait(until.elementIsEnabled(driver.findElement(realProperty)));
        driver.findElement(realProperty).click();
        
        driver.wait(until.elementLocated(By.id('NatureOfInterest')), 10000).then(function() {
            
            var saveBtn = By.xpath("//form[@id='assetForm']/div/div/button[@type='submit']");
            
            driver.sleep(1000);
            driver.findElement(By.xpath("//input[@id='Asset_IsPrincipalResidence'][@value='True']")).click();
            req.waitForAddressZip();
            driver.sleep(1000);
            driver.wait(until.elementLocated(saveBtn));
            driver.findElement(saveBtn).click();
            driver.wait(until.elementIsVisible(driver.findElement(By.id('creditor_Id_client_name')))).thenCatch(function(err) {
                console.log('Real Property created: FAIL');
                req.saveScreenshot('RealPropertyNotCreated.png')
            });
            
            driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(creditorSearchBtn));
            //driver.findElement(By.xpath("//form[@id='debtForm']/div/div/button[@data-role-action='close']")).click(); //force the magn glass to be in viewport
            driver.wait(until.elementIsVisible(driver.findElement(creditorSearchBtn)));
            driver.findElement(creditorSearchBtn).click();
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
            driver.sleep(1500);
            driver.findElement(nav.dvxprsPopupFirstRow).click();
            driver.sleep(1000);
            
            driver.findElement(By.xpath("//article[starts-with(@id, 'SecuredDebtEditor_')]//input[@value='8']")).click();
            driver.wait(until.elementIsEnabled(driver.findElement(otherDescr)));
            driver.findElement(otherDescr).sendKeys('Nice nature of lien');
            //driver.findElement(paymentAmount).sendKeys('40000');
            driver.findElement(dateIncurred).sendKeys('Sep 02, 2015');
            driver.findElement(accountNumber).sendKeys('6325521496588547');
            driver.findElement(claimAmount).sendKeys('20000');
            driver.findElement(proofOfClaim).click();
            driver.wait(until.elementIsEnabled(driver.findElement(dateFiled)));
            driver.findElement(dateFiled).sendKeys('Sep 02, 2014');
            driver.findElement(claimIdentifier).sendKeys('987456321');
            driver.findElement(courtClaimIdentifier).sendKeys('123564789');
            
            driver.findElement(contingent).click();
            driver.findElement(unliquidated).click();
            driver.findElement(disputed).click();
            
            driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(totalSaveBtn));
            driver.findElement(totalSaveBtn).click();
            driver.wait(until.elementLocated(firstRow), 10000).then(function() {
                driver.sleep(1000);
            }, function(err) {
                console.log('Creditor with real property not created FAIL');
                req.saveScreenshot('CreditorWithRealPropertyNotCreated.png')
            });
            
        }, function() {
            console.log('Real Property form was not loaded FAIL');
            req.saveScreenshot('RealPropertyFormNotLoaded.png');
        });
        
        //add personal property
        driver.findElement(newBtn).click();
        
        driver.wait(until.elementLocated(claimAmount), 10000);
        driver.wait(until.elementLocated(securedByNew), 10000).then(function() {
            
            driver.findElement(securedByNew).click();
            driver.wait(until.elementIsEnabled(driver.findElement(personalProperty)));
            driver.findElement(personalProperty).click();
            
            driver.wait(until.elementLocated(By.xpath("//a[@data-value='38']")), 10000).then(function() {
                
                var saveBtn = By.xpath("//form[@id='assetForm']/div/div/button[@type='submit']");
                
                driver.sleep(1000);
                driver.findElement(By.xpath("//a[@data-value='38']")).click();
                driver.findElement(By.id('Asset_Description')).sendKeys('Nice description');
                driver.findElement(saveBtn).click();
                driver.wait(until.elementIsVisible(driver.findElement(By.id('creditor_Id_client_name')))).thenCatch(function() {
                    console.log('Personal Property created: FAIL');
                    req.saveScreenshot('PersonalPropertyNotCreated.png')
                });
                
                //driver.findElement(By.xpath("//form[@id='debtForm']/div/div/button[@data-role-action='close']")).click(); //force the magn glass to be in viewport
                driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(creditorSearchBtn));
                driver.wait(until.elementIsVisible(driver.findElement(creditorSearchBtn)));
                driver.findElement(creditorSearchBtn).click();
                driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
                driver.sleep(1500);
                driver.findElement(nav.dvxprsPopupFirstRow).click();
                driver.sleep(1000);
                
                driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(totalSaveBtn));
                driver.findElement(totalSaveBtn).click();
                driver.wait(until.elementLocated(secondRow), 10000).then(function() {
                    driver.sleep(1500);
                }, function(err) {
                    console.log('Creditor with personal property not created FAIL');
                    req.saveScreenshot('CreditorWithPersonalPropertyNotCreated.png')
                });
                
            }, function() {
                console.log('Personal Property form was not loaded FAIL');
                req.saveScreenshot('PersonalPropertyFormNotLoaded.png');
            });
        
        
        
        }, function() {
            console.log('Secured creditor form not loaded FAIL');
            req.saveScreenshot('SecuredCreditorFormNotLoaded.png')
        });
    
    }, function() {
        console.log('Secured creditor form not loaded FAIL');
        req.saveScreenshot('SecuredCreditorFormNotLoaded.png')
    });
    
    //update second row
    var secondRowElement = driver.findElement(secondRow);
    secondRowElement.click();
    driver.wait(until.elementLocated(claimAmount), 10000).then(function() {
        
        driver.findElement(description).sendKeys('Updated');
        driver.findElement(totalSaveBtn).click();
        driver.wait(until.elementLocated(secondRow), 10000);
        driver.sleep(2500);
        
        
        //delete
        driver.findElement(By.xpath("//div[starts-with(@id, 'secured')]//tr[contains(@id, 'DXDataRow1')]//a")).click();
        req.confirmDelete();
        //driver.sleep(2000);
        driver.wait(until.stalenessOf(secondRowElement), 10000);
        
    }, function() {
        console.log('Secured Creditor was not opened for updating FAIL');
        req.saveScreenshot('SecuredCreditorNotUpdated.png')
    });
    
    
};





var priorityCreditor = function() {
    
    var emptyRow = By.xpath("//div[starts-with(@id, 'priority')]//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//div[starts-with(@id, 'priority')]//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//div[starts-with(@id, 'priority')]//tr[contains(@id, 'DXDataRow1')]"),
        newBtn = By.xpath("//div[starts-with(@id, 'priority')]//a[@id='newDebtAnchor']"),
        totalSaveBtn = By.xpath("//div[starts-with(@id, 'priority')]//*[@id='totalSave']//button[@type='button' and @data-role-action='close']");
        
    var creditorSearchBtn = By.xpath("//article[starts-with(@id, 'PriorityAssetEditor')]//div[@class='row'][1]//button[contains(@class, 'btn-search') and contains(@class, 'fg-stratusOrange')]"),
        description = By.id('Debt_Description'),
        dateIncurred = By.id("Debt_AcquiredOn"),
        accountNumber = By.id("Debt_AccNo"),
        claimAmount = By.xpath("//input[@id='Debt_Value' and @placeholder='Enter claim amount']"),
        proofOfClaim = By.id('ProofOfClaim_IsFiled'),
        dateFiled = By.id('ProofOfClaim_FiledOn'),
        claimIdentifier = By.id('ProofOfClaim_ClaimId'),
        courtClaimIdentifier = By.id('ProofOfClaim_CourtClaimNumber');
    
    var contingent = By.id('Debt_IsContingent'),
        setOff = By.id('Debt_IsSetOff'),
        unliquidated = By.id('Debt_IsUnliquidated'),
        disputed = By.id('Debt_IsDisputed');
    
    req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.creditors.self, nav.navMatter.petition.creditors.priority);
    
    driver.wait(until.elementLocated(emptyRow), 10000);
    driver.sleep(1000);
    driver.findElement(newBtn).click();
    
    //add the first creditor
    driver.wait(until.elementLocated(description), 10000).then(function() {
    
            
            driver.findElement(creditorSearchBtn).click();
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
            driver.sleep(1500);
            driver.findElement(nav.dvxprsPopupFirstRow).click();
            driver.sleep(1000);
            
            driver.findElement(By.xpath("//select[@id='Debt_PriorityType']/option[@value='1']")).click();
            driver.findElement(description).sendKeys('Nice remark');
            driver.findElement(dateIncurred).sendKeys('Sep 02, 2013');
            driver.findElement(accountNumber).sendKeys('6325521496588599');
            driver.findElement(claimAmount).sendKeys('10000');
            driver.findElement(proofOfClaim).click();
            driver.wait(until.elementIsEnabled(driver.findElement(dateFiled)));
            driver.findElement(dateFiled).sendKeys('Sep 02, 2012');
            driver.findElement(claimIdentifier).sendKeys('987456377');
            driver.findElement(courtClaimIdentifier).sendKeys('123564745');
            
            driver.findElement(contingent).click();
            driver.findElement(setOff).click();
            driver.findElement(unliquidated).click();
            driver.findElement(disputed).click();
            
            driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(totalSaveBtn));
            driver.findElement(totalSaveBtn).click();
            driver.wait(until.elementLocated(firstRow), 10000).then(function() {
                driver.sleep(1000);
            }, function(err) {
                console.log('Priority creditor not created FAIL');
                req.saveScreenshot('PriorityCreditorNotCreated.png')
            });
            
            //add the second creditor
            driver.findElement(newBtn).click();
            driver.wait(until.elementLocated(description), 10000);
            driver.findElement(creditorSearchBtn).click();
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
            driver.sleep(1500);
            driver.findElement(nav.dvxprsPopupFirstRow).click();
            driver.sleep(1000);
            
            driver.findElement(By.xpath("//select[@id='Debt_PriorityType']/option[@value='7']")).click();
            driver.findElement(description).sendKeys('Nice description');
            
            driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(totalSaveBtn));
            driver.findElement(totalSaveBtn).click();
            driver.wait(until.elementLocated(secondRow), 10000).then(function() {
                driver.sleep(1000);
            }, function(err) {
                console.log('Second Priority creditor not created FAIL');
                req.saveScreenshot('SecondPriorityCreditorNotCreated.png')
            });
            
            //update
            var secondRowElement = driver.findElement(secondRow);
            secondRowElement.click();
            driver.wait(until.elementLocated(description), 10000).then(function() {
                var saveBtn = By.xpath("//div[starts-with(@id, 'priority')]//div[@id='totalSave']//button[@type='button' and @data-role-action='close']");
                
                driver.findElement(By.xpath("//select[@id='Debt_PriorityType']/option[@value='9']"));
                driver.findElement(saveBtn).click();
                driver.wait(until.elementLocated(secondRow), 10000);
                driver.sleep(2000);
            }, function() {
                console.log('Priority creditor was not opened for updating FAIL');
                req.saveScreenshot('PriorityCreditorNotOpened.png')
            });
            
            //delete
            driver.findElement(By.xpath("//div[starts-with(@id, 'priority')]//tr[contains(@id, 'DXDataRow1')]//a")).click();
            req.confirmDelete();
            //driver.sleep(2000);
            driver.wait(until.stalenessOf(secondRowElement), 10000);
            
            
            
    }, function() {
        console.log('Priority creditor form was not opened FAIL');
        req.saveScreenshot('PriorityCreditorFormNotOpened.png')
    });
    
};

var unsecuredCreditor = function() {
    
    var emptyRow = By.xpath("//div[starts-with(@id, 'unsecured')]//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//div[starts-with(@id, 'unsecured')]//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//div[starts-with(@id, 'unsecured')]//tr[contains(@id, 'DXDataRow1')]"),
        newBtn = By.xpath("//div[starts-with(@id, 'unsecured')]//a[@id='newDebtAnchor']"),
        totalSaveBtn = By.xpath("//div[starts-with(@id, 'unsecured')]//*[@id='totalSave']//button[@type='button' and @data-role-action='close']");
        
    var creditorSearchBtn = By.xpath("//article[starts-with(@id, 'UnsecuredAssetEditor')]//div[@class='row'][1]//button[contains(@class, 'btn-search') and contains(@class, 'fg-stratusOrange')]"),
        description = By.id('Debt_Description'),
        //paymentAmount = By.xpath("//input[@id='Debt_PaymentAmount' and @placeholder='Enter Amount']"),
        dateIncurred = By.id("Debt_AcquiredOn"),
        accountNumber = By.id("Debt_AccNo"),
        claimAmount = By.xpath("//input[@id='Debt_Value' and @placeholder='Enter claim amount']"),
        //unknownDates = By.id('IsDateUnknown'),
        //claimUnknown = By.id('IsValueUnknown'),
        proofOfClaim = By.id('ProofOfClaim_IsFiled'),
        dateFiled = By.id('ProofOfClaim_FiledOn'),
        claimIdentifier = By.id('ProofOfClaim_ClaimId'),
        courtClaimIdentifier = By.id('ProofOfClaim_CourtClaimNumber');
    
    var contingent = By.id('Debt_IsContingent'),
        setOff = By.id('Debt_IsSetOff'),
        unliquidated = By.id('Debt_IsUnliquidated'),
        disputed = By.id('Debt_IsDisputed');
    
    //var includeOnMatrix = By.id('IsIncludedOnMatrix'),
        //includeInTotal = By.id('IsIncludedOnSchedule');
    
    req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.creditors.self, nav.navMatter.petition.creditors.unsecured);
    
    driver.wait(until.elementLocated(emptyRow), 10000);
    driver.sleep(1000);
    driver.findElement(newBtn).click();
    
    //add the first creditor
    driver.wait(until.elementLocated(claimAmount), 10000).then(function() {
    
            
        driver.findElement(creditorSearchBtn).click();
        driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
        driver.sleep(1500);
        driver.findElement(nav.dvxprsPopupFirstRow).click();
        driver.sleep(1000);
        
        driver.findElement(By.xpath("//select[@id='Debt_PriorityType']/option[@value='12']")).click();
        driver.findElement(description).sendKeys('Nice consideration');
        driver.findElement(dateIncurred).sendKeys('Sep 02, 2013');
        driver.findElement(accountNumber).sendKeys('6325521496588599');
        driver.findElement(claimAmount).sendKeys('10000');
        driver.findElement(proofOfClaim).click();
        driver.wait(until.elementIsEnabled(driver.findElement(dateFiled)));
        driver.findElement(dateFiled).sendKeys('Sep 02, 2012');
        driver.findElement(claimIdentifier).sendKeys('987456377');
        driver.findElement(courtClaimIdentifier).sendKeys('123564745');
        
        driver.findElement(contingent).click();
        driver.findElement(setOff).click();
        driver.findElement(unliquidated).click();
        driver.findElement(disputed).click();
        
        driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(totalSaveBtn));
        driver.findElement(totalSaveBtn).click();
        driver.wait(until.elementLocated(firstRow), 10000);
        
        //add the second creditor
        driver.findElement(newBtn).click();
        driver.wait(until.elementLocated(claimAmount), 10000);
        driver.findElement(creditorSearchBtn).click();
        driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
        driver.sleep(1500);
        driver.findElement(nav.dvxprsPopupFirstRow).click();
        driver.sleep(1000);
        
        driver.findElement(By.xpath("//select[@id='Debt_PriorityType']/option[@value='13']")).click();
        driver.findElement(description).sendKeys('Very nice consideration');
        
        driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(totalSaveBtn));
        driver.findElement(totalSaveBtn).click();
        driver.wait(until.elementLocated(firstRow), 10000);
        driver.sleep(1000);
        
        //update
        var secondRowElement = driver.findElement(secondRow);
        secondRowElement.click();
        driver.wait(until.elementLocated(claimAmount), 10000).then(function() {
            var saveBtn = By.xpath("//div[starts-with(@id, 'unsecured')]//div[@id='totalSave']//button[@type='button' and @data-role-action='close']");
            
            driver.findElement(By.xpath("//select[@id='Debt_PriorityType']/option[@value='14']"));
            driver.findElement(saveBtn).click();
            driver.wait(until.elementLocated(secondRow), 10000);
            driver.sleep(2000);
        }, function() {
            console.log('Unsecured creditor was not opened for updating FAIL');
            req.saveScreenshot('UnsecuredCreditorNotOpened.png')
        });
        
        //delete
        driver.findElement(By.xpath("//div[starts-with(@id, 'unsecured')]//tr[contains(@id, 'DXDataRow1')]//a")).click();
        req.confirmDelete();
        //driver.sleep(2000);
        driver.wait(until.stalenessOf(secondRowElement), 10000);
            
            
            
    }, function() {
        console.log('Unsecured creditor form was not opened FAIL');
        req.saveScreenshot('UnsecuredCreditorFormNotOpened.png')
    });
    
};

var codebtors = function() {
    
    var lastEightYearsYes = By.xpath("//*[@id='CommunityProperty8Years' and @value='True']"),
        lastEightYearsNo = By.xpath("//*[@id='CommunityProperty8Years' and @value='False']"),
        liveWithSpouseYes = By.xpath("//*[@id='LiveWithSpouse' and @value='True']"),
        searchBtn = By.xpath("//div[starts-with(@id, 'EntityIdWithPreferredAddress_')]//button[contains(@class, 'btn-search')]"),
        saveBtn = By.xpath("//section[starts-with(@id, 'Codebtors_')]//button[@type='submit']");
    
    req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.creditors.self, nav.navMatter.petition.creditors.codebtors);
    
    driver.wait(until.elementLocated(lastEightYearsNo), 10000);
    driver.sleep(1000);
    driver.findElement(lastEightYearsYes).click();
    driver.wait(until.elementIsEnabled(driver.findElement(liveWithSpouseYes)), 5000);
    driver.sleep(500);
    driver.findElement(liveWithSpouseYes).click();
    driver.wait(until.elementIsEnabled(driver.findElement(searchBtn)), 5000);
    driver.sleep(500);
    driver.findElement(searchBtn).click();
    req.selectDvxprsFirstRow();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//select[@id='CommunityPropertyStateId']"))), 5000);
    driver.findElement(By.xpath("//select[@id='CommunityPropertyStateId']/option[@value='19']")).click();
    
    driver.findElement(By.xpath("//section[starts-with(@id, 'Codebtors_')]//tr[1]//button[@class='btn-search']")).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow));
    driver.sleep(1500);
    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.findElement(nav.dvxprsSaveAndCloseBtn).click();
    driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//select[@id='CommunityPropertyStateId']"))), 5000);
    driver.sleep(1000);
    driver.findElement(saveBtn).click();
    req.waitForSuccessMsg();
    
    driver.findElement(lastEightYearsNo).click();
    driver.wait(until.elementIsNotVisible(driver.findElement(liveWithSpouseYes)), 5000);
    //driver.findElement(By.xpath("//section[starts-with(@id, 'Codebtors_')]//div[starts-with(@id, 'EntitySelector_')][2]//div[@class='display multiSeletedItem']//i[@data-pe-remove='true']")).click();
    driver.findElement(saveBtn).click();
    req.waitForSuccessMsg();    
    
};

module.exports = {
    securedCreditor: securedCreditor,
    priorityCreditor: priorityCreditor,
    unsecuredCreditor: unsecuredCreditor,
    codebtors: codebtors
};