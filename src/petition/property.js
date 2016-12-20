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

var realProperty = function() {
    
    var firstRow = By.xpath("//div[starts-with(@id, 'realproperty')]//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//div[starts-with(@id, 'realproperty')]//tr[contains(@id, 'DXDataRow1')]"),
        emptyRow = By.xpath("//div[starts-with(@id, 'realproperty')]//tr[contains(@id, 'DXEmptyRow')]"),
        newBtn = By.xpath("//div[starts-with(@id, 'realproperty')]//a[@id='newAssetAnchor']"),
        saveAndCloseBtn = By.xpath("//div[starts-with(@id, 'realproperty')]//button[@type='submit' and @data-role-action='close']"),
        saveBtn = By.xpath("//div[starts-with(@id, 'realproperty')]//button[@type='submit' and @data-role-action='save']");
        
    var zipInput = By.id('Asset_Address_Zip'),
        zipSrchBtn = By.xpath("//button[(preceding-sibling::input[@id='Asset_Address_Zip'])]"),
        streetInput = By.id('Asset_Address_Street1'),
        lineInput = By.id('Asset_Address_Street2'),
        titleInput = By.id('Asset_Address_Title'),
        doNotMailCheckbox = By.id('Asset_Address_DoNotContact');
        
    var valueInput = By.xpath("//*[@id='Asset_Value' and @data-pe-role='currency']"),
        sourceOfValueInput = By.id('Asset_ValueSource'),
        dateAcquiredInput = By.id('Asset_AcquiredOn'),
        assetSurrCheckbox = By.id('IsSurrendered'),
        //ownershipInputOne = By.xpath("//div[@class='row debtor1-row']//input[starts-with(@id, 'TextBox_') and @data-pe-role='percentage']"),
        //ownershipInputTwo = By.xpath("//div[@id='debtor2']//input[starts-with(@id, 'TextBox_') and @data-pe-role='percentage']"),
        //ownershipValueOne = By.xpath("//div[@class='row debtor1-row']//h2[@data-pe-id='value']"),
        //ownershipValueTwo = By.xpath("//div[@id='debtor2']//h2[@data-pe-id='value']"),
        otherOwnerLookup = By.xpath("//button[@class='btn-search'][contains(@data-pe-dialog, '/Entity/MultiLookup')]"),
        stateExemptionsBtn = By.xpath("//button[@class='btn-search'][contains(@data-pe-dialog, '/AssetExemptions/MultiLookup')]");
        //stateExemptionsField = By.xpath("//*[starts-with(@id, 'RealPropertyAssetEditor')]//input[@id='lookup']");
        
    var singleHomeCheckbox = By.xpath("//input[(following-sibling::span[@title='Single-family home'])]"),
        condominiumCheckbox = By.xpath("//input[(following-sibling::span[@title='Condominium or cooperative'])]"),
        landCheckbox = By.xpath("//input[(following-sibling::span[@title='Land'])]"),
        timeshareCheckbox = By.xpath("//input[(following-sibling::span[@title='Timeshare'])]"),
        duplexCheckbox = By.xpath("//input[(following-sibling::span[@title='Duplex or multi-unit building'])]"),
        manufMobHomeCheckbox = By.xpath("//input[(following-sibling::span[@title='Manufactured or mobile home'])]"),
        investmentCheckbox = By.xpath("//input[(following-sibling::span[@title='Investment property'])]"),
        otherCheckbox = By.xpath("//input[(following-sibling::span[@title='Other'])]"),
        otherPropTypeInput = By.id('Asset_AdditionalDetails'),
        communPropYesCheckbox = By.xpath("//*[@id='Asset_IsCommunityProperty' and @value='True']"),
        //communPropNoCheckbox = By.xpath("//*[@id='Asset_IsCommunityProperty' and @value='False']"),
        natOfIntInput = By.id('NatureOfInterest'),
        otherInfoInput = By.id('Asset_Description');
        
    util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.property.self, nav.navMatter.petition.property.realProperty);
        
    //ADD THE FIRST ENTRY
    driver.wait(until.elementLocated(newBtn), 15000);
    driver.findElement(newBtn).click();
    
    //waiting for three sections
    driver.wait(until.elementLocated(natOfIntInput), 15000);
    driver.wait(until.elementLocated(valueInput), 15000);
    driver.wait(until.elementLocated(zipInput), 15000);
    
    //asset description section
    driver.findElement(By.xpath("//input[@id='Asset_IsPrincipalResidence'][@value='True']")).click();
    util.waitForAddressZip();
    
    //asset value section
    driver.findElement(valueInput).sendKeys('200000');
    driver.findElement(sourceOfValueInput).sendKeys('Expensive Estimates LTD');
    driver.findElement(dateAcquiredInput).sendKeys('Sep 02, 1996');

    driver.findElement(otherOwnerLookup).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 20000);
    driver.sleep(2000);

    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.findElement(nav.dvxprsSaveAndCloseBtn).click();
    
    driver.sleep(1000);
    driver.wait(until.elementIsVisible(driver.findElement(stateExemptionsBtn)), 20000);

    driver.findElement(stateExemptionsBtn).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 20000);
    driver.sleep(1000);
    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.findElement(nav.dvxprsSaveAndCloseBtn).click();
    
    //asset details section
    driver.wait(until.elementIsEnabled(driver.findElement(singleHomeCheckbox)));
    driver.sleep(1000);
    driver.findElement(singleHomeCheckbox).click();
    driver.findElement(communPropYesCheckbox).click();
    driver.findElement(natOfIntInput).sendKeys('Homestead');
    driver.findElement(otherInfoInput).sendKeys('It has a nice lawn');
    driver.findElement(saveAndCloseBtn).click();
    
    driver.wait(until.elementLocated(firstRow), 20000);
    driver.sleep(1000);
    
    //ADD THE SECOND ENTRY
    driver.findElement(newBtn).click();
    
    driver.wait(until.elementLocated(natOfIntInput));
    driver.wait(until.elementLocated(valueInput));
    driver.wait(until.elementLocated(zipInput));
    
    //asset description
    driver.findElement(zipInput).sendKeys('90220');
    driver.findElement(zipSrchBtn).click();
    util.waitForAddressZip();
    driver.findElement(streetInput).sendKeys('Street');
    driver.findElement(titleInput).sendKeys('My second home');
    driver.findElement(lineInput).sendKeys('LineLine');
    driver.findElement(doNotMailCheckbox).click();
    driver.findElement(natOfIntInput).sendKeys('Fee Simple');
    driver.findElement(condominiumCheckbox).click();
    driver.findElement(landCheckbox).click();
    driver.findElement(timeshareCheckbox).click();
    driver.findElement(duplexCheckbox).click();
    driver.findElement(manufMobHomeCheckbox).click();
    driver.findElement(investmentCheckbox).click();
    driver.findElement(otherCheckbox).click();
    driver.wait(until.elementIsEnabled(driver.findElement(otherPropTypeInput)));
    driver.findElement(otherPropTypeInput).sendKeys('garage');
    var btnSaveAndClose = driver.findElement(saveAndCloseBtn);
    btnSaveAndClose.click();
    driver.wait(until.stalenessOf(btnSaveAndClose), 20000);
    driver.sleep(1000);
    
    //update second row
    driver.wait(until.elementLocated(secondRow), 20000);
    driver.findElement(secondRow).click()
    
    driver.wait(until.elementLocated(natOfIntInput), 20000);
    driver.wait(until.elementLocated(valueInput), 20000);
    driver.wait(until.elementLocated(zipInput), 20000);
    
    driver.findElement(By.id('Debtor2Selected')).click();
    var btnSave = driver.findElement(saveBtn);
    btnSave.click();
    driver.wait(until.stalenessOf(btnSave), 20000);
    driver.sleep(1000);
    
    //delete second row
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'realproperty')]//tr[contains(@id, 'DXDataRow1')]//a")), 20000);
    var btnDeleteSecondRow = driver.findElement(By.xpath("//div[starts-with(@id, 'realproperty')]//tr[contains(@id, 'DXDataRow1')]//a"));
    btnDeleteSecondRow.click();
    util.confirmDelete();
    driver.wait(until.stalenessOf(btnDeleteSecondRow), 20000);
    
};


var personalProperty = function() {
    
    var firstRow = By.xpath("//div[starts-with(@id, 'personalproperty')]//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//div[starts-with(@id, 'personalproperty')]//tr[contains(@id, 'DXDataRow1')]"),
        emptyRow = By.xpath("//div[starts-with(@id, 'personalproperty')]//tr[contains(@id, 'DXEmptyRow')]"),
        newBtn = By.xpath("//div[starts-with(@id, 'personalproperty')]//a[@id='newAssetAnchor']"),
        saveAndCloseBtn = By.xpath("//div[starts-with(@id, 'personalproperty')]//button[@type='submit' and @data-role-action='close']"),
        saveBtn = By.xpath("//div[starts-with(@id, 'personalproperty')]//button[@type='submit' and @data-role-action='save']");
        
    var motorVehicleLink = By.xpath("//a[@data-value='25']"),
        checkingAccountsLink = By.xpath("//a[@data-value='2']");
        
    var descriptionInput = By.id('Asset_Description'),
        makeInput = By.name('vehicle.Make'),
        modelInput = By.name('vehicle.Model'),
        yearInput = By.name('vehicle.Year'),
        mileageInput = By.name('vehicle.Mileage'),
        valueInput = By.xpath("//*[@id='Asset_Value' and @data-pe-role='currency']"),
        sourceOfValueInput = By.id('Asset_ValueSource'),
        dateAcquiredInput = By.id('Asset_AcquiredOn'),
        assetSurrCheckbox = By.id('IsSurrendered'),
        otherOwnerLookup = By.xpath("//article[starts-with(@id, 'PersonalPropertyAssetEditor')]//button[@class='btn-search'][contains(@data-pe-dialog, '/Entity/MultiLookup')]"),
        stateExemptionsBtn = By.xpath("//article[starts-with(@id, 'PersonalPropertyAssetEditor')]//button[@class='btn-search'][contains(@data-pe-dialog, '/AssetExemptions/MultiLookup')]");
        //stateExemptionsField = By.xpath("//*[starts-with(@id, 'PersonalPropertyAssetEditor')]//input[@id='lookup']");
    
    util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.property.self, nav.navMatter.petition.property.personalProperty);
    
    driver.wait(until.elementLocated(emptyRow), 5000);
    driver.wait(until.elementLocated(newBtn), 5000);
    
    //add the first entry
    driver.findElement(newBtn).click();
    driver.wait(until.elementLocated(motorVehicleLink), 20000);
    driver.findElement(motorVehicleLink).click();
    driver.wait(until.elementLocated(makeInput), 20000);
    driver.sleep(500);
    
    driver.findElement(descriptionInput).sendKeys('Nice motorcycle');
    driver.findElement(makeInput).sendKeys('Yamaha');
    driver.findElement(modelInput).sendKeys('XTZ660');
    driver.findElement(yearInput).sendKeys('2008');
    driver.findElement(mileageInput).sendKeys('21000');
    
    driver.findElement(valueInput).sendKeys('10000');
    driver.findElement(sourceOfValueInput).sendKeys('Expensive Estimates LTD');
    driver.findElement(dateAcquiredInput).sendKeys('Sep 02, 1996');

    driver.findElement(otherOwnerLookup).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow));
    driver.sleep(1000);
    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.findElement(nav.dvxprsSaveAndCloseBtn).click();

    driver.wait(until.elementIsVisible(driver.findElement(stateExemptionsBtn)), 20000);

    driver.wait(until.elementIsEnabled(driver.findElement(stateExemptionsBtn)), 20000);
    driver.findElement(stateExemptionsBtn).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 20000);
    driver.sleep(1000);
    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.findElement(nav.dvxprsSaveAndCloseBtn).click();
    
    driver.wait(until.elementIsEnabled(driver.findElement(saveAndCloseBtn)));
    driver.sleep(1000);
    driver.findElement(saveAndCloseBtn).click();
    
    driver.wait(until.elementLocated(firstRow), 20000).catch(function(err) {
        console.log('The first personal property was not added FAIL ' + err.message)
    });
    
    //ADD THE SECOND ENTRY
    driver.findElement(newBtn).click();
    driver.wait(until.elementLocated(checkingAccountsLink));
    driver.findElement(checkingAccountsLink).click();
    driver.wait(until.elementLocated(descriptionInput));
    driver.findElement(descriptionInput).sendKeys('Tons of money');
    driver.findElement(saveAndCloseBtn).click();
    
    driver.wait(until.elementLocated(secondRow));

    driver.findElement(secondRow).click();    
    
    
    driver.wait(until.elementLocated(checkingAccountsLink));
    driver.findElement(descriptionInput).clear();
    driver.findElement(descriptionInput).sendKeys('Delete me');
    var btnSave = driver.findElement(saveBtn);
    btnSave.click();
    driver.wait(until.stalenessOf(btnSave), 20000);        
        
        //delete
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'personalproperty')]//tr[contains(@id, 'DXDataRow1')]//a")), 20000);
    var btnDeleteSecondRow = driver.findElement(By.xpath("//div[starts-with(@id, 'personalproperty')]//tr[contains(@id, 'DXDataRow1')]//a"));
    btnDeleteSecondRow.click();
    util.confirmDelete();
    driver.wait(until.stalenessOf(btnDeleteSecondRow), 20000);
        

    
    
};


var assetExemptions = function() {
    
    var firstRow = By.xpath("//article[@id='assetsWithExemptions']//tr[contains(@id, 'DXDataRow0')]"),
        addExemptionBtn = By.xpath("//article[@id='assetsWithExemptions']//tr[contains(@id, 'DXDataRow0')]//a[@data-hint='Add State Exemptions']"),
        deleteBtn = By.xpath("//article[@id='assetsWithExemptions']//tr[contains(@id, 'DXDataRow0')]//div[starts-with(@class, 'row')][2]//a[@title='Delete']");
    
    util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.property.self, nav.navMatter.petition.property.assetExemptions);
    
    driver.wait(until.elementLocated(firstRow), 20000);
    driver.findElement(addExemptionBtn).click();
    driver.wait(until.elementLocated(nav.dvxprsExemptionsFirstRow), 20000);
    driver.sleep(1000);
    driver.findElement(nav.dvxprsExemptionsFirstRow).click();
    driver.findElement(nav.dvxprsExemptionsAddBtn).click();
    driver.wait(until.elementLocated(deleteBtn), 5000);
    var deleteBtn = driver.findElement(deleteBtn);
    deleteBtn.click();
    driver.wait(until.stalenessOf(deleteBtn), 5000);

};



var exemptionCalculator = function() {
    
    driver.wait(until.elementLocated(By.xpath("//button[@data-pe-role='toggleExemptionCalculator']")), 20000);
    driver.findElement(By.xpath("//button[@data-pe-role='toggleExemptionCalculator']")).click();
    
    driver.wait(until.elementLocated(By.xpath("//input[@id='useStateExemptions']")), 20000);
    driver.findElement(By.xpath("//button[@data-pe-role='toggle-exemption-settings']")).click();

    driver.wait(until.elementLocated(By.xpath("//*[@id='btnLatestExemptions']/button")));
    driver.findElement(By.xpath("//*[@id='btnLatestExemptions']/button")).click();
    var latestExemptionsBtnEl = driver.findElement(By.xpath("//*[@id='btnLatestExemptions']/button"));
    driver.wait(until.elementLocated(By.id('messageDialog2')), 5000);
    driver.findElement(By.xpath("//div[starts-with(@id, 'CaseProperty_')]//form[starts-with(@id, 'AdditionalDetailsBankruptcy_')]//button[text()='Save']")).click();
    driver.wait(until.stalenessOf(latestExemptionsBtnEl), 20000);
    driver.findElement(By.xpath("//span[@data-pe-role='close-exemption-calculator']")).click();
    
};

module.exports = {
    realProperty: realProperty,
    personalProperty: personalProperty,
    assetExemptions: assetExemptions,
    exemptionCalculator: exemptionCalculator
};