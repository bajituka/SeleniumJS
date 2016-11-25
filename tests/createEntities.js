var util = require('../src/utilities.js'),
    nav = require('../src/navigation.js'),
    jur = require('../src/jurisdictions.js'),
    test = require('../src/testdata.js'),
    cred = require('../src/petition/creditors.js'),
    test = require('../src/testdata.js');


var webdriver = util.webdriver,
    driver = util.driver,
    By = util.By,
    until = util.until;

var mocha = require('mocha');

var webdriverio = require('webdriverio');
//var options = { desiredCapabilities: { browserName: 'firefox' }};
var client = webdriverio.remote();

var assert = util.assert,
    fs = util.fs;

var emptyRow = By.xpath("//div[starts-with(@id, 'unsecured')]//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//div[starts-with(@id, 'unsecured')]//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//div[starts-with(@id, 'unsecured')]//tr[contains(@id, 'DXDataRow1')]"),
        newBtn = By.xpath("//div[starts-with(@id, 'unsecured')]//a[@id='newDebtAnchor']"),
        totalSaveBtn = By.xpath("//div[starts-with(@id, 'unsecured')]//*[@id='totalSave']//button[@type='button' and @data-role-action='close']");

 var creditorSearchBtn = By.xpath("//article[starts-with(@id, 'UnsecuredAssetEditor')]//div[@class='row'][1]//button[contains(@class, 'btn-search') and contains(@class, 'fg-stratusOrange')]"),
        description = By.id('Debt_Description'),
        dateIncurred = By.id("Debt_AcquiredOn"),
        accountNumber = By.id("Debt_AccNo"),
        claimAmount = By.xpath("//input[@id='Debt_Value' and @placeholder='Enter claim amount']"),
        proofOfClaim = By.id('ProofOfClaim_IsFiled'),
        dateFiled = By.id('ProofOfClaim_FiledOn'),
        claimIdentifier = By.id('ProofOfClaim_ClaimId'),
        courtClaimIdentifier = By.id('ProofOfClaim_CourtClaimNumber');


var entityType = 'creditor', //creditor, property
    entitiesAmount = 3,
    isNewContact = true,
    isNewMatter = true,
    matterId = 6845;


var createEntities = function (entityType, entitiesAmount, isNewContact, isNewMatter) {

    if (isNewContact == true) {
        isNewMatter = true;
        util.openCreateContact('dashboard', 'person');
        util.createPerson(test.person);
        util.createBKmatter(test.matter);
    } else {
        util.selectMatter(matterId);
    }




}







driver.manage().timeouts().implicitlyWait(2000);
util.catchUncaughtExceptions();
driver.manage().window().maximize();

util.authorize(test.env, test.login, test.password);
util.closeTabs();





util.openCreateContact('dashboard', 'person');
util.createPerson(test.person);
util.createBKmatter(test.matter);
util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.creditors.self, nav.navMatter.petition.creditors.unsecured);

for (var i = 0; i < 10; i++) {

    if (i == 0) {
        driver.wait(until.elementLocated(emptyRow), 10000);
    } else {
        driver.wait(until.elementLocated(firstRow), 10000);
    }
    
    driver.sleep(1000);
    driver.findElement(newBtn).click();

    //add the first creditor
    driver.wait(until.elementLocated(claimAmount), 10000).then(function() {

        driver.findElement(creditorSearchBtn).click();
        driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
        driver.sleep(1500);
        driver.findElement(nav.dvxprsPopupFirstRow).click();
        driver.sleep(1000);

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

        driver.findElement(By.xpath("//select[@id='Debt_PriorityType']/option[@value='12']")).click();
        driver.findElement(description).sendKeys('Nice consideration');

        driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(totalSaveBtn));
        driver.findElement(totalSaveBtn).click();
        driver.wait(until.elementLocated(firstRow), 10000);

    });
};


util.logOut();