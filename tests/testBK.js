var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
    test = require('../src/testdata.js');


var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var mocha = require('mocha');

var webdriverio = require('webdriverio');
//var options = { desiredCapabilities: { browserName: 'firefox' }};
var client = webdriverio.remote();

var assert = req.assert,
    fs = req.fs;

//req.catchUncaughtExceptions();
/*
client
    .init()
    .url(test.sprint3)
    .waitForExist("name='UserName'")
    .setValue("name='UserName'", test.login)
    .setValue("name='Password'", test.password)
    .end();


describe('LOGIN AND LOGOUT', function() {
    this.timeout(0);
    it('should authorize and log out', function(done) {
        
        req.authorize(test.env, test.login, test.password);
        req.logOut(done);
    });
});
*/

        driver.manage().timeouts().implicitlyWait(2000);
        req.catchUncaughtExceptions();
        
        req.authorize(test.env, test.login, test.password);
        req.closeTabs();
        req.selectMatter('ForNat, Test', 'Chapter 7');
        
        driver.wait(until.elementLocated(nav.navMatter.petition.self), 15000);
        driver.findElement(nav.navMatter.petition.self).click();
        driver.wait(until.elementLocated(By.id('stateId')), 15000);
        driver.wait(until.elementLocated(By.id('Case_CountyId')), 15000);
        driver.wait(until.elementLocated(By.id('District_Id')), 15000);
        driver.wait(until.elementLocated(By.id('Case_DivisionId')), 15000);
        driver.wait(until.elementLocated(By.id('Case_CaseStatus')), 15000);
        
var securedCreditor = function() {
    
    var emptyRow = By.xpath("//div[starts-with(@id, 'secured')]//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//div[starts-with(@id, 'secured')]//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//div[starts-with(@id, 'secured')]//tr[contains(@id, 'DXDataRow1')]"),
        newBtn = By.xpath("//div[starts-with(@id, 'secured')]//a[@id='newDebtAnchor']"),
        totalSaveBtn = By.xpath("//div[starts-with(@id, 'secured')]//*[@id='totalSave']//button[@type='submit']");
        
    var creditorSearchBtn = By.xpath("//article[starts-with(@id, 'SecuredDebtEditor_')]//div[@class='row'][1]//button[contains(@class, 'btn-search') and contains(@class, 'fg-stratusOrange')]"),
        securedByNew = By.xpath("//article[starts-with(@id, 'SecuredDebtEditor_')]//div[contains(@class, 'span420')]//button[@data-add-entity='']"),
        realProperty = By.xpath("//li[1]/a[@data-pe-navigationtitle='Create New Property']"),
        personalProperty = By.xpath("//li[2]/a[@data-pe-navigationtitle='Create New Property']");
        
    var otherDescr = By.id('NatureOfLien'),
        remarks = By.id('Remarks'),
        paymentAmount = By.xpath("//input[@id='Debt_PaymentAmount' and @placeholder='Enter Payment Amount']"),
        interestRate = By.xpath("//input[@placeholder='Enter Rate']"),
        dateIncurred = By.id("Debt_AcquiredOn"),
        accountNumber = By.id("Debt_AccNo"),
        claimAmount = By.xpath("//input[@id='Debt_Value' and @placeholder='Enter Claim Amount']"),
        //unknownDates = By.id('IsDateUnknown'),
        //claimUnknown = By.id('IsValueUnknown'),
        proofOfClaim = By.id('ProofOfClaim_IsFiled'),
        dateFiled = By.id('ProofOfClaim_FiledOn'),
        claimIdentifier = By.id('ProofOfClaim_ClaimId'),
        courtClaimIdentifier = By.id('ProofOfClaim_CourtClaimNumber');
        
    var contingent = By.id('Debt_IsContingent'),
        unliquidated = By.id('Debt_IsUnliquidated'),
        disputed = By.id('Debt_IsDisputed');
    
    //var includeOnMatrix = By.id('IsIncludedOnMatrix'),
        //includeInTotal = By.id('IsIncludedOnSchedule');
    
    
    driver.wait(until.elementLocated(nav.navMatter.petition.creditors.self));
    driver.findElement(nav.navMatter.petition.creditors.self).click();
    driver.wait(until.elementLocated(nav.navMatter.petition.creditors.secured));
    driver.findElement(nav.navMatter.petition.creditors.secured).click();
    
    driver.wait(until.elementLocated(firstRow), 10000).then(function() {
        
    for (i = 1; i <= 51; i++) {
        //add personal property
        driver.findElement(newBtn).click();
        
        driver.wait(until.elementLocated(remarks), 10000);
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
                driver.wait(until.elementIsVisible(driver.findElement(By.id('creditor_Id_client_name'))));
                
                //driver.findElement(By.xpath("//form[@id='debtForm']/div/div/button[@data-role-action='close']")).click(); //force the magn glass to be in viewport
                driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(creditorSearchBtn));
                driver.wait(until.elementIsVisible(driver.findElement(creditorSearchBtn)));
                driver.findElement(creditorSearchBtn).click();
                driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
                driver.sleep(1500);
                driver.findElement(nav.dvxprsPopupFirstRow).click();
                driver.sleep(1000);
                
                driver.findElement(totalSaveBtn).click();
                driver.wait(until.elementLocated(firstRow), 10000).then(function() {
                    driver.sleep(2000);
                    //console.log('Creditor ' + i + ' with personal property created OK');
                });
            });
            
        });
    }
    });
    
};
securedCreditor();        
req.logOut();
