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
//var totalSaveBtn = By.xpath("//*[@id='totalSave']//button[@type='submit']");

var securedCreditor = function() {
    
    var emptyRow = By.xpath("//div[starts-with(@id, 'secured')]//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//div[starts-with(@id, 'secured')]//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//div[starts-with(@id, 'secured')]//tr[contains(@id, 'DXDataRow1')]"),
        newBtn = By.xpath("//div[starts-with(@id, 'secured')]//a[@id='newDebtAnchor']"),
        totalSaveBtn = By.xpath("//div[starts-with(@id, 'secured')]//*[@id='totalSave']//button[@type='button' and @data-role-action='close']");
        
    var creditorSearchBtn = By.xpath("//article[starts-with(@id, 'SecuredDebtEditor_')]//div[@class='row'][1]//button[contains(@class, 'btn-search') and contains(@class, 'fg-stratusOrange')]"),
        securedByNew = By.xpath("//article[starts-with(@id, 'SecuredDebtEditor_')]//button[@data-add-entity='']"),
        realProperty = By.xpath("//li[1]/a[@data-pe-navigationtitle='Create New Property']"),
        personalProperty = By.xpath("//li[2]/a[@data-pe-navigationtitle='Create New Property']");

    var otherDescr = By.xpath("//article[starts-with(@id, 'SecuredDebtEditor')]//input[@id='NatureOfLien']"),
        description = By.xpath("//article[starts-with(@id, 'SecuredDebtEditor')]//textarea[@id='Debt_Description']"),
        dateIncurred = By.xpath("//article[starts-with(@id, 'SecuredDebtEditor')]//input[@id='Debt_AcquiredOn']"),
        accountNumber = By.xpath("//article[starts-with(@id, 'SecuredDebtEditor')]//input[@id='Debt_AccNo']"),
        claimAmount = By.xpath("//article[starts-with(@id, 'SecuredDebtEditor')]//input[@id='Debt_Value' and @placeholder='Enter claim amount']");
        
    var contingent = By.id('Debt_IsContingent'),
        unliquidated = By.id('Debt_IsUnliquidated'),
        disputed = By.id('Debt_IsDisputed');
    
    util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.creditors.self, nav.navMatter.petition.creditors.secured);
    
    driver.wait(until.elementLocated(emptyRow), 20000);
    
    driver.findElement(newBtn).click();
    
    //add real property
    driver.wait(until.elementLocated(claimAmount), 20000);
    driver.wait(until.elementLocated(securedByNew), 20000);
        
        
        driver.findElement(securedByNew).click();
        driver.wait(until.elementIsEnabled(driver.findElement(realProperty)));
        driver.findElement(realProperty).click();
        
        driver.wait(until.elementLocated(By.id('NatureOfInterest')), 20000).then(function() {
            
            var saveBtn = By.xpath("//form[@id='assetForm']/div/div/button[@type='submit']");
            
            driver.sleep(1500);
            driver.findElement(By.xpath("//input[@id='Asset_IsPrincipalResidence'][@value='True']")).click();
            util.waitForAddressZip();
            driver.sleep(1000);
            driver.wait(until.elementLocated(saveBtn));
            driver.findElement(saveBtn).click();
            driver.wait(until.elementIsVisible(driver.findElement(By.id('creditor_Id_client_name')))).catch(function(err) {
                console.log('Real Property created: FAIL');
                util.saveScreenshot('RealPropertyNotCreated.png')
            });
            
            driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(creditorSearchBtn));
            //driver.findElement(By.xpath("//form[@id='debtForm']/div/div/button[@data-role-action='close']")).click(); //force the magn glass to be in viewport
            driver.wait(until.elementIsVisible(driver.findElement(creditorSearchBtn)));
            driver.findElement(creditorSearchBtn).click();
            util.selectDvxprsFirstRow();
            
            driver.findElements(By.xpath("//*[@id='addressId']/option")).then(function(creditorAddress) {
                if (creditorAddress.length == 1) {
                    driver.findElement(By.xpath("//*[@id='newAddressBtn']")).click();
                    driver.wait(until.elementLocated(By.xpath("//*[@id='newAddress_Zip']")), 3000);
                    driver.findElement(By.xpath("//*[@id='newAddress_Zip']")).sendKeys('60007');
                    driver.findElement(By.xpath("//button[@class='btn btn-search'][preceding-sibling::input[@id='newAddress_Zip']]")).click();
                    util.waitForAddressZip();
                    driver.findElement(By.id('newAddress_Street1')).sendKeys('Neotech street');
                    driver.findElement(By.xpath("//select[@id='newAddress_Type']/option[@value='2']")).click();
                } else if (creditorAddress.length > 1) {
                    driver.findElement(By.xpath("//*[@id='addressId']")).getText().then(function(address) {
                        if (address.search('Select One') != -1) {
                            driver.findElement(By.xpath("//*[@id='addressId']/option[2]")).click();
                        }
                    })
                }
            });

            driver.findElement(By.xpath("//article[starts-with(@id, 'SecuredDebtEditor_')]//input[@value='8']")).click();
            driver.wait(until.elementIsEnabled(driver.findElement(otherDescr)));
            driver.findElement(otherDescr).sendKeys('Nice nature of lien');
            
            driver.findElement(dateIncurred).sendKeys('Sep 02, 2015');
            driver.findElement(accountNumber).sendKeys('6325521496588547');
            driver.findElement(claimAmount).sendKeys('20000');
            
            driver.findElement(contingent).click();
            driver.findElement(unliquidated).click();
            driver.findElement(disputed).click();
            
            driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(totalSaveBtn));
            driver.findElement(totalSaveBtn).click();
            driver.wait(until.elementLocated(firstRow), 20000).then(function() {
                driver.sleep(1000);
            }, function(err) {
                console.log('Creditor with real property not created FAIL');
                util.saveScreenshot('CreditorWithRealPropertyNotCreated.png')
            });
            
        }, function() {
            console.log('Real Property form was not loaded FAIL');
            util.saveScreenshot('RealPropertyFormNotLoaded.png');
        });
        
        //add personal property
        driver.findElement(newBtn).click();
        
        driver.wait(until.elementLocated(claimAmount), 20000);
        driver.wait(until.elementLocated(securedByNew), 20000);
            
        driver.findElement(securedByNew).click();
        driver.wait(until.elementIsEnabled(driver.findElement(personalProperty)), 15000);
        driver.findElement(personalProperty).click();
        
        driver.wait(until.elementLocated(By.xpath("//a[@data-value='38']")), 20000);
            
        var saveBtn = By.xpath("//form[@id='assetForm']/div/div/button[@type='submit']");
        
        driver.sleep(1000);
        driver.findElement(By.xpath("//a[@data-value='38']")).click();
        driver.findElement(By.id('Asset_Description')).sendKeys('Nice description');
        driver.findElement(saveBtn).click();
        driver.wait(until.elementIsVisible(driver.findElement(By.id('creditor_Id_client_name')))).catch(function() {
            console.log('Personal Property created: FAIL');
            util.saveScreenshot('PersonalPropertyNotCreated.png')
        });
        
        //driver.findElement(By.xpath("//form[@id='debtForm']/div/div/button[@data-role-action='close']")).click(); //force the magn glass to be in viewport
        driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(creditorSearchBtn));
        driver.wait(until.elementIsVisible(driver.findElement(creditorSearchBtn)));
        driver.findElement(creditorSearchBtn).click();
        driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 20000);
        driver.sleep(1500);
        driver.findElement(nav.dvxprsPopupFirstRow).click();
        driver.sleep(1000);
        
        driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(totalSaveBtn));
        driver.findElement(totalSaveBtn).click();
        driver.wait(until.elementLocated(secondRow), 20000);
        driver.sleep(1500);        
    
    //update second row
    var secondRowElement = driver.findElement(secondRow);
    secondRowElement.click();
    driver.wait(until.elementLocated(claimAmount), 20000);
    driver.sleep(1000);
    var claimAmountElement = driver.findElement(claimAmount);
    claimAmountElement.sendKeys('100');
    driver.findElement(totalSaveBtn).click();
    driver.wait(until.stalenessOf(claimAmountElement), 20000);
    driver.sleep(2500);
    
    //delete
    var deleteBtn = By.xpath("//div[starts-with(@id, 'secured')]//tr[contains(@id, 'DXDataRow1')]//a");
    driver.wait(until.elementLocated(deleteBtn), 20000);
    var btnDeleteSecondRow = driver.findElement(deleteBtn);
    btnDeleteSecondRow.click();
    util.confirmDelete();
    driver.wait(until.stalenessOf(btnDeleteSecondRow), 20000);    
    
};





var priorityCreditor = function() {
    
    var emptyRow = By.xpath("//div[starts-with(@id, 'priority')]//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//div[starts-with(@id, 'priority')]//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//div[starts-with(@id, 'priority')]//tr[contains(@id, 'DXDataRow1')]"),
        newBtn = By.xpath("//div[starts-with(@id, 'priority')]//a[@id='newDebtAnchor']"),
        totalSaveBtn = By.xpath("//div[starts-with(@id, 'priority')]//*[@id='totalSave']//button[@type='button' and @data-role-action='close']");
        
    var creditorSearchBtn = By.xpath("//article[starts-with(@id, 'PriorityAssetEditor')]//div[@class='row'][1]//button[contains(@class, 'btn-search') and contains(@class, 'fg-stratusOrange')]"),
        description = By.xpath("//article[starts-with(@id, 'PriorityAssetEditor')]//input[@id='Debt_Description']"),
        dateIncurred = By.xpath("//article[starts-with(@id, 'PriorityAssetEditor')]//input[@id='Debt_AcquiredOn']"),
        accountNumber = By.xpath("//article[starts-with(@id, 'PriorityAssetEditor')]//input[@id='Debt_AccNo']"),
        claimAmount = By.xpath("//article[starts-with(@id, 'PriorityAssetEditor')]//input[@id='Debt_Value' and @placeholder='Enter claim amount']");

    util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.creditors.self, nav.navMatter.petition.creditors.priority);
    
    driver.wait(until.elementLocated(emptyRow), 20000);
    driver.sleep(1000);
    driver.findElement(newBtn).click();
    
    //add the first creditor
    driver.wait(until.elementLocated(description), 20000);
    
            
            driver.findElement(creditorSearchBtn).click();
            util.selectDvxprsFirstRow();
            
            driver.findElement(By.xpath("//select[@id='Debt_PriorityType']/option[@value='1']")).click();
            driver.findElement(description).sendKeys('Nice remark');
            driver.findElement(dateIncurred).sendKeys('Sep 02, 2013');
            driver.findElement(accountNumber).sendKeys('6325521496588599');
            driver.findElement(claimAmount).sendKeys('10000');
            
            driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(totalSaveBtn));
            driver.findElement(totalSaveBtn).click();
            driver.wait(until.elementLocated(firstRow), 20000);
            driver.sleep(1500);
            
            //add the second creditor
            driver.findElement(newBtn).click();
            driver.wait(until.elementLocated(description), 20000);
            driver.findElement(creditorSearchBtn).click();
            util.selectDvxprsFirstRow();
            
            driver.findElement(By.xpath("//select[@id='Debt_PriorityType']/option[@value='7']")).click();
            driver.findElement(description).sendKeys('Nice description');
            
            driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(totalSaveBtn));
            driver.findElement(totalSaveBtn).click();
            driver.wait(until.elementLocated(secondRow), 20000);
            driver.sleep(1000);
            
            //update
            var secondRowElement = driver.findElement(secondRow);
            secondRowElement.click();
            driver.wait(until.elementLocated(description), 20000);
            var saveBtn = By.xpath("//div[starts-with(@id, 'priority')]//div[@id='totalSave']//button[@type='button' and @data-role-action='close']");
            
            driver.findElement(By.xpath("//select[@id='Debt_PriorityType']/option[@value='9']")).click();
            driver.findElement(saveBtn).click();
            driver.wait(until.elementLocated(secondRow), 20000);
            driver.sleep(1000);

            
            //delete
            btnDeleteSecondRow = driver.findElement(By.xpath("//div[starts-with(@id, 'priority')]//tr[contains(@id, 'DXDataRow1')]//a"));
            btnDeleteSecondRow.click();
            util.confirmDelete();
            driver.wait(until.stalenessOf(btnDeleteSecondRow), 20000);
            driver.sleep(1000);
    
};

var unsecuredCreditor = function() {
    
    var emptyRow = By.xpath("//div[starts-with(@id, 'unsecured')]//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//div[starts-with(@id, 'unsecured')]//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//div[starts-with(@id, 'unsecured')]//tr[contains(@id, 'DXDataRow1')]"),
        newBtn = By.xpath("//div[starts-with(@id, 'unsecured')]//a[@id='newDebtAnchor']"),
        totalSaveBtn = By.xpath("//div[starts-with(@id, 'unsecured')]//*[@id='totalSave']//button[@type='button' and @data-role-action='close']");
        
    var creditorSearchBtn = By.xpath("//article[starts-with(@id, 'UnsecuredAssetEditor')]//div[@class='row'][1]//button[contains(@class, 'btn-search') and contains(@class, 'fg-stratusOrange')]"),
        description = By.xpath("//article[starts-with(@id, 'UnsecuredAssetEditor')]//input[@id='Debt_Description']"),
        dateIncurred = By.xpath("//article[starts-with(@id, 'UnsecuredAssetEditor')]//input[@id='Debt_AcquiredOn']"),
        accountNumber = By.xpath("//article[starts-with(@id, 'UnsecuredAssetEditor')]//input[@id='Debt_AccNo']"),
        claimAmount = By.xpath("//article[starts-with(@id, 'UnsecuredAssetEditor')]//input[@id='Debt_Value' and @placeholder='Enter claim amount']");
    
    var contingent = By.id('Debt_IsContingent'),
        setOff = By.id('Debt_IsSetOff'),
        unliquidated = By.id('Debt_IsUnliquidated'),
        disputed = By.id('Debt_IsDisputed');
    
    util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.creditors.self, nav.navMatter.petition.creditors.unsecured);
    
    driver.wait(until.elementLocated(emptyRow), 20000);
    driver.sleep(1000);
    driver.findElement(newBtn).click();
    
    //add the first creditor
    driver.wait(until.elementLocated(claimAmount), 20000);
    
            
        driver.findElement(creditorSearchBtn).click();
        util.selectDvxprsFirstRow();
        
        driver.findElement(By.xpath("//select[@id='Debt_PriorityType']/option[@value='12']")).click();
        driver.findElement(description).sendKeys('Nice consideration');
        driver.findElement(dateIncurred).sendKeys('Sep 02, 2013');
        driver.findElement(accountNumber).sendKeys('6325521496588599');
        driver.findElement(claimAmount).sendKeys('10000');
        
        //driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(totalSaveBtn));
        driver.findElement(totalSaveBtn).click();
        driver.wait(until.elementLocated(firstRow), 20000);
        driver.sleep(1000);
        
        //add the second creditor
        driver.findElement(newBtn).click();
        driver.wait(until.elementLocated(claimAmount), 20000);
        driver.findElement(creditorSearchBtn).click();
        util.selectDvxprsFirstRow();
        driver.findElement(By.xpath("//select[@id='Debt_PriorityType']/option[@value='13']")).click();
        driver.findElement(description).sendKeys('Very nice consideration');
        //driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(totalSaveBtn));
        driver.findElement(totalSaveBtn).click();
        driver.wait(until.elementLocated(firstRow), 20000);
        driver.sleep(1000);
        
        //update
        driver.findElement(secondRow).click();
        driver.wait(until.elementLocated(claimAmount), 20000);
        var saveBtn = By.xpath("//div[starts-with(@id, 'unsecured')]//div[@id='totalSave']//button[@type='button' and @data-role-action='close']");
        driver.findElement(By.xpath("//select[@id='Debt_PriorityType']/option[@value='14']")).click();
        driver.findElement(saveBtn).click();
        driver.wait(until.elementLocated(secondRow), 20000);
        driver.sleep(1000);
        
        //delete
        var btnDeleteSecondRow = driver.findElement(By.xpath("//div[starts-with(@id, 'unsecured')]//tr[contains(@id, 'DXDataRow1')]//a"));
        btnDeleteSecondRow.click();
        util.confirmDelete();
        driver.wait(until.stalenessOf(btnDeleteSecondRow), 20000);
    
};

var codebtors = function() {
    
    var lastEightYearsYes = By.xpath("//*[@id='CommunityProperty8Years' and @value='True']"),
        lastEightYearsNo = By.xpath("//*[@id='CommunityProperty8Years' and @value='False']"),
        liveWithSpouseYes = By.xpath("//*[@id='LiveWithSpouse' and @value='True']"),
        searchBtn = By.xpath("//div[starts-with(@id, 'EntityIdWithPreferredAddress_')]//button[contains(@class, 'btn-search')]"),
        saveBtn = By.xpath("//section[starts-with(@id, 'Codebtors_')]//button[@type='submit']");
    
    util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.creditors.self, nav.navMatter.petition.creditors.codebtors);
    
    driver.wait(until.elementLocated(lastEightYearsNo), 20000);
    driver.sleep(1000);
    driver.findElement(lastEightYearsYes).click();
    driver.wait(until.elementIsEnabled(driver.findElement(liveWithSpouseYes)), 5000);
    driver.sleep(500);
    driver.findElement(liveWithSpouseYes).click();
    driver.wait(until.elementIsEnabled(driver.findElement(searchBtn)), 5000);
    driver.sleep(500);
    driver.findElement(searchBtn).click();
    util.selectDvxprsFirstRow();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//select[@id='CommunityPropertyStateId']"))), 5000);
    driver.findElement(By.xpath("//select[@id='CommunityPropertyStateId']/option[@value='19']")).click();

    //check for address presence and adding an address if nothing found
    driver.findElement(By.xpath("//div[@id='addressField']/div[@class='clickable posrel']")).catch(function() {
        driver.findElement(By.xpath("//div[@id='addressField']/div[@class='addAddress-link posrel']")).click();
        var zip = By.xpath("//input[@id='address_Zip']");
        driver.wait(until.elementLocated(zip), 20000);
        driver.findElement(zip).sendKeys('60007');
        driver.findElement(By.xpath("//button[preceding-sibling::input[@id='address_Zip']]")).click();
        util.waitForAddressZip();
        driver.findElement(By.xpath("//input[@id='address_Street1']")).sendKeys('19 Big Marine Street');
        driver.findElement(By.xpath("//select[@id='address_Type']/option[2]")).click();
        var saveBtn = driver.findElement(By.xpath("//form[@id='addressForm']//button[@data-role-action='save']"));
        saveBtn.click();
        driver.wait(until.stalenessOf(saveBtn), 5000);
    });
    
    driver.findElement(By.xpath("//section[starts-with(@id, 'Codebtors_')]//tr[1]//button[@class='btn-search']")).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 20000);
    driver.sleep(1500);
    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.findElement(nav.dvxprsSaveAndCloseBtn).click();
    driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//select[@id='CommunityPropertyStateId']"))), 5000);
    driver.sleep(1000);
    driver.findElement(saveBtn).click();
    util.waitForSuccessMsg();
    
    driver.findElement(lastEightYearsNo).click();
    driver.wait(until.elementIsNotVisible(driver.findElement(liveWithSpouseYes)), 5000);
    //driver.findElement(By.xpath("//section[starts-with(@id, 'Codebtors_')]//div[starts-with(@id, 'EntitySelector_')][2]//div[@class='display multiSeletedItem']//i[@data-pe-remove='true']")).click();
    driver.findElement(saveBtn).click();
    util.waitForSuccessMsg();    
    
};

module.exports = {
    securedCreditor: securedCreditor,
    priorityCreditor: priorityCreditor,
    unsecuredCreditor: unsecuredCreditor,
    codebtors: codebtors
};