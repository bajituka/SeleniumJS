var req = require('../src/functions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
    test = require('../src/testdata.js'),
    sofa = require('./sofa.js');

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;
    
var totalSaveBtn = By.xpath("//*[@id='totalSave']/div/button");

driver.manage().window().maximize();
driver.manage().timeouts().implicitlyWait(2000);

req.catchUncaughtExceptions();




var gi_Details = function() {

    //change chapter to 13, type to joint, jurisdiction
    driver.findElement(By.xpath("//div[@class='radioButtonGroup']//input[@value='Chapter13']")).click();
    driver.wait(until.elementLocated(By.xpath("//section[@data-pe-id='confirmPopup']//span[@data-pe-id='message']")));
    driver.findElement(By.xpath("//section[@data-pe-id='confirmPopup']//button[@data-pe-id='confirm']")).click();
    driver.sleep(1000);
    driver.findElement(By.xpath("//select[@id='Case_Ownership']/option[@value='2']")).click();
    driver.findElement(By.id('Zip')).sendKeys('90220');
    driver.findElement(By.xpath("//div[@id='zipCode']//button")).click();
    driver.sleep(2000);
    driver.findElement(By.xpath("//select[@id='stateId']/option[@selected='selected']")).getText().then(function(state) {
        assert.equal(state, 'California')
    });
    driver.findElement(By.xpath("//select[@id='Case_CountyId']/option[@selected='selected']")).getText().then(function(county) {
        assert.equal(county, 'Los Angeles')
    });
    driver.findElement(By.xpath("//select[@id='District_Id']/option[@selected='selected']")).getText().then(function(district) {
        assert.equal(district, 'Central District of California')
    });
    driver.findElement(By.xpath("//select[@id='Case_DivisionId']/option[@selected='selected']")).getText().then(function(district) {
        assert.equal(district, 'Los Angeles Division')
    });
    driver.findElement(totalSaveBtn).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='jointdebtor']//button[contains(@class, 'btn-search')]")));
    driver.findElement(By.xpath("//div[@id='jointdebtor']//button[contains(@class, 'btn-search')]")).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
    driver.sleep(2000);
    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.sleep(1000);
    driver.findElement(By.xpath("//form[starts-with(@id, 'BeforeUpdate_')]//button[@type='submit']")).click();
    req.waitForSuccessMsg();
    
    //change chapter to 7, type to individual
    driver.wait(until.elementLocated(By.xpath("//div[@class='radioButtonGroup']//input[@value='Chapter7']")));
    driver.findElement(By.xpath("//div[@class='radioButtonGroup']//input[@value='Chapter7']")).click();
    driver.wait(until.elementLocated(By.xpath("//section[@data-pe-id='confirmPopup']//span[@data-pe-id='message']")));
    driver.findElement(By.xpath("//section[@data-pe-id='confirmPopup']//button[@data-pe-id='confirm']")).click();
    driver.sleep(1000);
    driver.findElement(By.xpath("//select[@id='Case_Ownership']/option[@value='1']")).click();
    driver.findElement(totalSaveBtn).click();
    driver.wait(until.elementLocated(By.xpath("//tbody[@id='listView']/tr[1]//input")));
    driver.findElement(By.xpath("//tbody[@id='listView']/tr[1]//input")).click();
    driver.findElement(By.xpath("//form[starts-with(@id, 'BeforeUpdate_')]//button[@type='submit']")).click();
    req.waitForSuccessMsg();
    
    //change back to joint for later test purposes
    driver.findElement(By.id('Zip')).sendKeys('60007');
    driver.findElement(By.xpath("//div[@id='zipCode']//button")).click();
    driver.sleep(2000);
    driver.findElement(By.xpath("//select[@id='Case_Ownership']/option[@value='2']")).click();
    driver.findElement(totalSaveBtn).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='jointdebtor']//button[contains(@class, 'btn-search')]")));
    driver.findElement(By.xpath("//div[@id='jointdebtor']//button[contains(@class, 'btn-search')]")).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
    driver.sleep(2000);
    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.sleep(1000);
    driver.findElement(By.xpath("//form[starts-with(@id, 'BeforeUpdate_')]//button[@type='submit']")).click();
    req.waitForSuccessMsg();
};


var gi_Fees = function() {
    
    var installments = By.xpath("//input[@value='Installments']");
    
    //Filing fees
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navMatter.petition.generalInformation.fees)));
    driver.findElement(nav.navMatter.petition.generalInformation.fees).click();
    driver.wait(until.elementLocated(installments));
    driver.sleep(1000);
    driver.findElement(installments).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'payments_filingFee_')]/div[2]")));
    driver.findElement(By.xpath("//div[starts-with(@id, 'payments_filingFee_')]/div[2]//div[contains(@class, 'currency')]//input[@id='modelObject_Payments_1__Amount']")).sendKeys('30');
    driver.findElement(By.xpath("//div[starts-with(@id, 'payments_filingFee_')]/div[3]//div[contains(@class, 'currency')]//input[@id='modelObject_Payments_2__Amount']")).sendKeys('20');
    driver.findElement(By.xpath("//div[starts-with(@id, 'payments_filingFee_')]/div[4]//div[contains(@class, 'currency')]//input[@id='modelObject_Payments_3__Amount']")).sendKeys('10');
    driver.findElement(By.xpath("//input[@id='modelObject_Payments_0__Type'][@value='OnOrBefore']")).click();
    driver.findElement(By.xpath("//div[starts-with(@id, 'payments_filingFee_')]/div[1]//input[@id='modelObject_Payments_0__PaymentDate']")).sendKeys('Sep 02, 1999');
    driver.findElement(By.xpath("//div[starts-with(@id, 'payments_filingFee_')]/div[2]//input[@id='modelObject_Payments_1__PaymentDate']")).sendKeys('Sep 02, 2000');
    driver.findElement(By.xpath("//div[starts-with(@id, 'payments_filingFee_')]/div[3]//input[@id='modelObject_Payments_2__PaymentDate']")).sendKeys('Sep 02, 2001');
    driver.findElement(By.xpath("//div[starts-with(@id, 'payments_filingFee_')]/div[4]//input[@id='modelObject_Payments_3__PaymentDate']")).sendKeys('Sep 02, 2002');
    driver.findElement(By.id('modelObject_PrintAmountOnOrder')).click();
    driver.sleep(500);
    
    //Fee disclosure
    driver.findElement(By.xpath("//a[text()='Fee Disclosure']")).click();
    driver.wait(until.elementLocated(By.xpath("//input[@id='modelObject_TotalFees'][@placeholder='Enter Total Fees']")));
    driver.findElement(By.xpath("//input[@id='modelObject_TotalFees'][@placeholder='Enter Total Fees']")).sendKeys('500');
    driver.findElement(By.xpath("//input[@id='modelObject_AmountPaid'][@placeholder='Enter Amount Paid']")).sendKeys('250');
    driver.findElement(By.xpath("//input[@id='modelObject_SourceOfPaid'][@value='Debtor']")).click();
    driver.findElement(By.xpath("//input[@id='modelObject_SourceToBePaid'][@value='Other']")).click();
    driver.findElement(By.xpath("//h3[@data-pe-id='balance']")).getText().then(function(balanceDue) {
        assert.equal(balanceDue, '$250.00')
    });
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//input[@id='modelObject_SourceToBePaidOther']"))));
    driver.findElement(By.xpath("//input[@id='modelObject_SourceToBePaidOther']")).sendKeys('Relatives');
    var text1 = 'Collision sensor ohm. $500 USD';
    var text2 = 'Laser beams performance velocity';
    driver.findElement(By.xpath("//textarea[@id='modelObject_LegalServicesFee']")).sendKeys(text1);
    driver.findElement(By.xpath("//textarea[@id='modelObject_SharingOfCompensation']")).sendKeys(text2)
    driver.findElement(By.xpath("//input[@id='modelObject_RepresentationForProceedingsIncluded']")).click();
    driver.findElement(By.xpath("//input[@id='modelObject_OtherIncluded']")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//textarea[@id='modelObject_Other']"))));
    driver.findElement(By.xpath("//textarea[@id='modelObject_Other']")).sendKeys('Jerk gear wheel screw.');
    driver.findElement(By.xpath("//textarea[@id='modelObject_NotIncluded']")).sendKeys('Oil gear mechanical automation interlock limiting device gear singularity saw.');
    driver.findElement(totalSaveBtn).click();
    req.waitForSuccessMsg();
};


var gi_PendingBankruptcies = function() {
    
    //add
    var judgeName = undefined;
    driver.findElement(nav.navMatter.petition.generalInformation.pendingBankrupties).click();
    
          
    driver.wait(until.elementLocated(By.xpath("//table[starts-with(@id, 'EntityBankruptciesGrid_')]//tr[contains(@id, 'DXEmptyRow')]")), 5000).thenCatch(function() {
        console.log('Sofa 2 had some entries!')
        driver.findElements(By.xpath("//table[starts-with(@id, 'EntityBankruptciesGrid_')]//tr[contains(@id, 'DXDataRow')]")).then(function(entries) {
            for (var i = 1; i <= entries.length; i++) {
                new req.webdriver.ActionSequence(driver).
                    mouseMove(driver.findElement(By.xpath("//table[starts-with(@id, 'EntityBankruptciesGrid_')]//tr[contains(@id, 'DXDataRow')][" + i + "]"))).
                    click(driver.findElement(By.xpath("//table[starts-with(@id, 'EntityBankruptciesGrid_')]//tr[contains(@id, 'DXDataRow')][1]//a"))).
                    perform();
                req.confirmDelete();
                driver.sleep(1000);  
            }
        })
    });
    
    
    for (var i = 1; i < 3; i++) {
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'EntityBankruptciesGrid_')]//span[text()='NEW']")));
        driver.findElement(By.xpath("//div[starts-with(@id, 'EntityBankruptciesGrid_')]//span[text()='NEW']")).click();
        driver.wait(until.elementLocated(By.id('Type')));
        driver.findElement(By.xpath("//select[@id='Type']/option[@value=" + i + "]")).click();
        driver.findElement(By.id('CaseNumber')).sendKeys('16-1234' + i);
        driver.findElement(By.id('FiledOn')).sendKeys('Sep 02, 201' + i);
        if (i == 2) {
            driver.findElement(By.id('DebtorName')).sendKeys('Hawk, Tony');
            driver.findElement(By.id('Relationship')).sendKeys('Pro-skater');
        }
        driver.findElement(By.xpath("//article[starts-with(@id, 'EntityBankruptcy_')]//button[contains(@class, 'fg-stratusOrange')]")).click();
        driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow));
        driver.sleep(1000);
        driver.findElement(nav.dvxprsPopupFirstRow).click();
        driver.sleep(1000);
        driver.findElement(By.id('JudgeId_client_name')).getAttribute('value').then(function(judgeNameTaken) {
            judgeName = judgeNameTaken
        });
        driver.findElement(By.xpath("//div[starts-with(@id, 'EntityBankruptciesGrid_')]//button[@type='submit'][contains(@class, 'saveButton')]")).click();
        driver.sleep(1500);
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[starts-with(@id, 'debtor_Debtors_')]//tr[contains(@id, 'DXDataRow0')]"))));    
    }
    driver.findElement(By.xpath("//div[starts-with(@id, 'debtor_Debtors_')]//tr[contains(@id, 'DXDataRow1')]/td[2]")).getText().then(function(type) {
        assert.equal(type, 'Pending')
    });
    driver.findElement(By.xpath("//div[starts-with(@id, 'debtor_Debtors_')]//tr[contains(@id, 'DXDataRow1')]/td[3]")).getText().then(function(caseNumber) {
        assert.equal(caseNumber, '16-12342')
    });
    driver.findElement(By.xpath("//div[starts-with(@id, 'debtor_Debtors_')]//tr[contains(@id, 'DXDataRow1')]/td[4]")).getText().then(function(filedOn) {
        assert.equal(filedOn, '9/2/2012')
    });
    driver.findElement(By.xpath("//div[starts-with(@id, 'debtor_Debtors_')]//tr[contains(@id, 'DXDataRow1')]/td[5]")).getText().then(function(debtorsName) {
        assert.equal(debtorsName, 'Hawk, Tony')
    });
    driver.findElement(By.xpath("//div[starts-with(@id, 'debtor_Debtors_')]//tr[contains(@id, 'DXDataRow1')]/td[6]")).getText().then(function(jurisdiction) {
        assert.equal(jurisdiction, 'Northern District of Illinois')
    });
    driver.findElement(By.xpath("//div[starts-with(@id, 'debtor_Debtors_')]//tr[contains(@id, 'DXDataRow1')]/td[7]")).getText().then(function(judgeNameActual) {
        assert.equal(judgeNameActual, judgeName)
    });
    
    //update
    driver.findElement(By.xpath("//div[starts-with(@id, 'debtor_Debtors_')]//tr[contains(@id, 'DXDataRow1')]")).click();
    driver.wait(until.elementLocated(By.id('Type')));
    driver.findElement(By.xpath("//select[@id='Type']/option[@value='1']")).click();
    driver.findElement(By.id('CaseNumber')).clear();
    driver.findElement(By.id('CaseNumber')).sendKeys('16-12349');
    driver.findElement(By.id('FiledOn')).clear();
    driver.findElement(By.id('FiledOn')).sendKeys('Sep 02, 2019');
    driver.findElement(By.xpath("//article[starts-with(@id, 'EntityBankruptcy_')]//button[contains(@class, 'fg-stratusOrange')]")).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow));
    driver.sleep(1000);
    driver.findElement(By.xpath("//section/div/table/tbody/tr/td/div[2]/table/tbody/tr[3]")).click();
    driver.sleep(1000);
    driver.findElement(By.id('JudgeId_client_name')).getAttribute('value').then(function(judgeNameTaken) {
        judgeName = judgeNameTaken
    });
    driver.findElement(By.xpath("//div[starts-with(@id, 'EntityBankruptciesGrid_')]//button[@type='submit'][contains(@class, 'saveButton')]")).click();
    driver.sleep(1000);
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[starts-with(@id, 'debtor_Debtors_')]//tr[contains(@id, 'DXDataRow1')]"))));
    
    //delete
    driver.findElement(By.xpath("//div[starts-with(@id, 'debtor_Debtors_')]//tr[contains(@id, 'DXDataRow1')]/td[8]/a")).click();
    req.confirmDelete();
    driver.sleep(1000);
    driver.findElements(By.xpath("//div[starts-with(@id, 'debtor_Debtors_')]//tr[contains(@id, '_DXDataRow')]")).then(function(entriesCount) {
        assert.equal(entriesCount.length, 1)
    });
    
};


var gi_CreditCounseling = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.generalInformation.creditCounseling));
    driver.findElement(nav.navMatter.petition.generalInformation.creditCounseling).click();
    driver.wait(until.elementLocated(By.xpath("//input[@value='ReceivedAndAttached']")));
    driver.findElement(By.xpath("//input[@value='ReceivedAndAttached']")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='modelObject_DateOfCourse']"))));
    driver.findElement(By.id('modelObject_DateOfCourse')).sendKeys('Sep 02, 1987');
    driver.findElement(By.id('modelObject_ApprovedProvider')).sendKeys('Government');
    driver.findElement(By.id('modelObject_CertificateNumber')).sendKeys('0000365821423652');
    driver.findElement(totalSaveBtn).click();
    req.waitForSuccessMsg();
    
};


var gi_Tenant = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.generalInformation.tenant));
    driver.findElement(nav.navMatter.petition.generalInformation.tenant).click();
    driver.wait(until.elementLocated(By.id('modelObject_DebtorRentTheirResidence')));
    driver.findElement(By.id('modelObject_DebtorRentTheirResidence')).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.id('modelObject_LandlordHasJudgement'))));
    driver.findElement(By.id('modelObject_LandlordHasJudgement')).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[starts-with(@id, 'Tenant')]//button[@class='btn-search fg-stratusOrange']"))));
    driver.findElement(By.xpath("//div[starts-with(@id, 'Tenant')]//button[@class='btn-search fg-stratusOrange']")).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow));
    driver.sleep(1000);
    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.sleep(1000);
    driver.findElement(By.id('modelObject_DebtorStaysInTheirResidence')).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//input[@id='modelObject_DebtorHasCure']"))));
    driver.findElement(By.xpath("//input[@id='modelObject_DebtorHasCure']")).click();
    driver.findElement(totalSaveBtn).click();
    req.waitForSuccessMsg();
    
};


var gi_HazardousProperty = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.generalInformation.hazardousProperty));
    driver.findElement(nav.navMatter.petition.generalInformation.hazardousProperty).click();
    driver.wait(until.elementLocated(By.id('modelObject_Question3')));
    driver.findElement(By.id('modelObject_Question3')).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.id('modelObject_Question4'))));
    driver.findElement(By.id('modelObject_Question4')).sendKeys('Yaw machine optimization');
    driver.findElement(By.id('modelObject_Question5')).sendKeys('Ohm save three laws of robotics');
    driver.findElement(By.id('modelObject_Address_Zip')).sendKeys('90210');
    driver.findElement(By.xpath("//form[starts-with(@id, 'ExhibitCSection_')]//button[contains(@class, 'btn-search')]")).click();
    req.waitForAddressZip();
    driver.findElement(By.id('modelObject_Address_Street1')).sendKeys('558 Friends St');
    driver.findElement(By.id('modelObject_Address_Street2')).sendKeys('Line 2');
    driver.findElement(totalSaveBtn).click();
    req.waitForSuccessMsg();
    
};


var gi_Additional = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.generalInformation.additional));
    driver.findElement(nav.navMatter.petition.generalInformation.additional).click();
    driver.wait(until.elementLocated(By.xpath("//input[@value='LivedInDistrictLast180Days']")));
    driver.findElement(By.xpath("//input[@value='LivedInDistrictLast180Days']")).click();
    driver.findElement(By.xpath("//input[@value='Business']")).click();
    driver.findElement(By.xpath("//input[@value='AreAvailable']")).click();
    driver.findElement(By.xpath("//input[@id='modelObject_SeparateHouseholds']")).click().thenCatch(function() {
        console.log('Individual matter: no separate households')
    });
    driver.findElement(totalSaveBtn).click();
    req.waitForSuccessMsg();
    
};


var gi_Security = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.generalInformation.security));
    driver.findElement(nav.navMatter.petition.generalInformation.security).click();
    driver.wait(until.elementLocated(By.id('isPrivate')));
    driver.findElement(By.id('isPrivate')).click();
    driver.findElement(totalSaveBtn).click();
    req.waitForSuccessMsg();
    driver.findElement(By.xpath("//form[@id='relationshipForm']//button[contains(@class, 'fg-stratusOrange')]")).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow));
    driver.sleep(1000);
    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.sleep(2000);
    var party = undefined;
    driver.findElement(By.xpath("//div[@id='securityList']//input[@id='EntityRelationship_EntityId_client_name']")).getAttribute('value').then(function(partyName) {
        party = partyName
    })
    driver.findElement(By.xpath("//form[@id='relationshipForm']//button[@type='submit']")).click();
    driver.wait(until.elementLocated(By.xpath("//div[@id='securityList']//tbody/tr/td[2]")));
    driver.findElement(By.xpath("//div[@id='securityList']//tbody/tr/td[2]")).getText().then(function(text) {
        assert.equal(text, 'User')
    });
    driver.findElement(By.xpath("//div[@id='securityList']//tbody/tr/td[3]")).getText().then(function(partyInGrid) {
        assert.equal(partyInGrid, party.trim())
    });
    
    //delete party
    new req.webdriver.ActionSequence(driver).
                        mouseMove(driver.findElement(By.xpath("//div[@id='securityList']//tbody/tr"))).
                        click(driver.findElement(By.xpath("//div[@id='securityList']//tbody/tr/td[@class='options']/span/a[@title='Delete']"))).
                        perform();
                        
    req.confirmDelete();
    driver.wait(until.elementLocated(By.xpath("//td[@class='dataTables_empty']")), 5000).thenCatch(function(err) {
        req.saveScreenshot('Security delete failed.png')
    });
    
    //return the case to be visible
    driver.sleep(2000);
    driver.findElement(By.id('isPrivate')).click();
    driver.findElement(totalSaveBtn).click();
    req.waitForSuccessMsg();
    
};


//PROPERTY

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
        preferredCheckbox = By.id('Asset_Address_IsPreferred'),
        doNotMailCheckbox = By.id('Asset_Address_DoNotContact');
        
    var valueInput = By.xpath("//*[@id='Asset_Value' and @data-pe-role='currency']"),
        sourceOfValueInput = By.id('Asset_ValueSource'),
        dateAcquiredInput = By.id('Asset_AcquiredOn'),
        assetSurrCheckbox = By.id('IsSurrendered'),
        ownershipInputOne = By.xpath("//div[@class='row debtor1-row']//input[starts-with(@id, 'TextBox_') and @data-pe-role='percentage']"),
        ownershipInputTwo = By.xpath("//div[@id='debtor2']//input[starts-with(@id, 'TextBox_') and @data-pe-role='percentage']"),
        ownershipValueOne = By.xpath("//div[@class='row debtor1-row']//h2[@data-pe-id='value']"),
        ownershipValueTwo = By.xpath("//div[@id='debtor2']//h2[@data-pe-id='value']"),
        otherOwnerLookup = By.id('debtorsOther_clientsName'),
        stateExemptionsBtn = By.xpath("//button[preceding-sibling::input[@id='lookup']]"),
        stateExemptionsField = By.xpath("//*[starts-with(@id, 'RealPropertyAssetEditor')]//input[@id='lookup']");
        
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
        communPropNoCheckbox = By.xpath("//*[@id='Asset_IsCommunityProperty' and @value='False']"),
        natOfIntInput = By.id('NatureOfInterest'),
        otherInfoInput = By.id('Asset_Description');
        
    
    driver.wait(until.elementLocated(nav.navMatter.petition.property.self));
    driver.findElement(nav.navMatter.petition.property.self).click();
    driver.wait(until.elementLocated(nav.navMatter.petition.property.realProperty));
    driver.findElement(nav.navMatter.petition.property.realProperty).click();
    
    driver.wait(until.elementLocated(emptyRow), 5000).thenCatch(function() {
            console.log('Real property had some entries!')
            driver.findElements(By.xpath("//div[starts-with(@id, 'realproperty')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')]")).then(function(entries) {
                for (var i = 1; i <= entries.length; i++) {
                    new req.webdriver.ActionSequence(driver).
                        mouseMove(driver.findElement(By.xpath("//div[starts-with(@id, 'realproperty')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')][" + i + "]"))).
                        click(driver.findElement(By.xpath("//div[starts-with(@id, 'realproperty')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')][1]//a"))).
                        perform();
                    req.confirmDelete();
                    driver.sleep(1000);  
                }
            })
        });
    
    //ADD THE FIRST ENTRY
    driver.findElement(newBtn).click();
    
    //waiting for three sections
    driver.wait(until.elementLocated(natOfIntInput));
    driver.wait(until.elementLocated(valueInput));
    driver.wait(until.elementLocated(zipInput));
    
    //asset description
    driver.findElement(By.xpath("//input[@id='Asset_IsPrincipalResidence'][@value='True']")).click();
    req.waitForAddressZip();
    
    //asset value
    driver.findElement(valueInput).sendKeys('200000');
    driver.findElement(sourceOfValueInput).sendKeys('Expensive Estimates LTD');
    driver.findElement(dateAcquiredInput).sendKeys('Sep 02, 1996');
    driver.findElement(assetSurrCheckbox).click();
    
    driver.findElement(ownershipValueOne).getText().then(function(data) {
        assert.equal(data, '$100,000.00')
    });
    driver.findElement(ownershipValueTwo).getText().then(function(data) {
        assert.equal(data, '$100,000.00')
    });
    
    driver.findElement(otherOwnerLookup).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow));
    driver.sleep(2000);
    var codebtor = undefined;
    driver.findElement(nav.dvxprsPopupFirstRow).getText().then(function(name) {
        codebtor = name.trim()
    });
    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.findElement(nav.dvxprsSaveAndCloseBtn).click();
    driver.wait(until.elementLocated(By.xpath("//*[starts-with(@id, 'EntitySelector_')]/div/span[@data-name='name']")));
    driver.findElement(By.xpath("//*[starts-with(@id, 'EntitySelector_')]/div/span[@data-name='name']")).getText().then(function(data) {
        assert.equal(data, codebtor)
    });
    driver.sleep(1000);
    driver.wait(until.elementIsVisible(driver.findElement(stateExemptionsBtn)), 10000);
    driver.findElement(stateExemptionsField).getAttribute('disabled').then(function(isDisabled) {
        assert.equal(isDisabled, 'true')
    });
    driver.findElement(assetSurrCheckbox).click();
    driver.wait(until.elementIsEnabled(driver.findElement(stateExemptionsField)));
    driver.findElement(stateExemptionsBtn).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
    driver.sleep(1000);
    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.findElement(nav.dvxprsSaveAndCloseBtn).click();
    
    //asset details
    driver.wait(until.elementIsEnabled(driver.findElement(singleHomeCheckbox)));
    driver.findElement(singleHomeCheckbox).click();
    driver.findElement(communPropYesCheckbox).click();
    driver.findElement(natOfIntInput).sendKeys('Homestead');
    driver.findElement(otherInfoInput).sendKeys('It has a nice lawn');
    driver.findElement(saveAndCloseBtn).click();
    
    driver.wait(until.elementLocated(firstRow)).then(function() {
        console.log('The first real property added OK')
    }, function(err) {
        console.log('The first real property was not added FAIL ' + err.message)
    });
    
    //ADD THE SECOND ENTRY
    driver.findElement(newBtn).click();
    //waiting for three sections
    
    driver.wait(until.elementLocated(natOfIntInput));
    driver.wait(until.elementLocated(valueInput));
    driver.wait(until.elementLocated(zipInput));
    
    //asset description
    driver.findElement(zipInput).sendKeys('90220');
    driver.findElement(zipSrchBtn).click();
    req.waitForAddressZip();
    driver.findElement(streetInput).sendKeys('Street');
    driver.findElement(titleInput).sendKeys('My second home');
    driver.findElement(lineInput).sendKeys('LineLine');
    driver.findElement(preferredCheckbox).click();
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
    driver.findElement(saveAndCloseBtn).click();
    
    driver.wait(until.elementLocated(secondRow)).then(function() {
        console.log('The second real property added OK');
        driver.findElement(secondRow).click();
        
        driver.wait(until.elementLocated(natOfIntInput));
        driver.wait(until.elementLocated(valueInput));
        driver.wait(until.elementLocated(zipInput));
        
        driver.findElement(By.id('Debtor2Selected')).click();
        driver.findElement(saveBtn).click();
        driver.sleep(1000);
        driver.wait(until.elementIsEnabled(driver.findElement(secondRow)));
        
        //delete
        driver.findElement(By.xpath("//div[starts-with(@id, 'realproperty')]//tr[contains(@id, 'DXDataRow1')]//a")).click();
        req.confirmDelete();
        driver.sleep(1000);
        driver.wait(until.elementLocated(secondRow), 1000).then(function() {
            console.log('The second real property was not deleted FAIL ')
        }, function(err) {
            console.log('The second real property was deleted OK')    
        });
        
        
        
        
        
        
        
    }, function(err) {
        console.log('The second real property was not added FAIL ' + err.message)
    });
    
    
};


var personalProperty = function() {
    
    var firstRow = By.xpath("//div[starts-with(@id, 'personalproperty')]//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//div[starts-with(@id, 'personalproperty')]//tr[contains(@id, 'DXDataRow1')]"),
        emptyRow = By.xpath("//div[starts-with(@id, 'personalproperty')]//tr[contains(@id, 'DXEmptyRow')]"),
        newBtn = By.xpath("//div[starts-with(@id, 'personalproperty')]//a[@id='newAssetAnchor']"),
        saveAndCloseBtn = By.xpath("//div[starts-with(@id, 'personalproperty')]//button[@type='submit' and @data-role-action='close']"),
        saveBtn = By.xpath("//div[starts-with(@id, 'personalproperty')]//button[@type='submit' and @data-role-action='save']");
        
    var motorVehicleLink = By.xpath("//a[@data-value='25']"),
        checkingAccountsLink = By.xpath("//a[@data-value='2']"),
        householdGoodsLink = By.xpath("//a[@data-value='4']"),
        clothesLink = By.xpath("//a[@data-value='38']");
        
    var categorySelect = By.id('Asset_CategoryId'),
        descriptionInput = By.id('Asset_Description'),
        makeInput = By.name('vehicle.Make'),
        modelInput = By.name('vehicle.Model'),
        yearInput = By.name('vehicle.Year'),
        mileageInput = By.name('vehicle.Mileage'),
        valueInput = By.xpath("//*[@id='Asset_Value' and @data-pe-role='currency']"),
        sourceOfValueInput = By.id('Asset_ValueSource'),
        dateAcquiredInput = By.id('Asset_AcquiredOn'),
        assetSurrCheckbox = By.id('IsSurrendered'),
        ownershipInputOne = By.xpath("//div[@class='row debtor1-row']//input[starts-with(@id, 'TextBox_') and @data-pe-role='percentage']"),
        ownershipInputTwo = By.xpath("//div[@id='debtor2']//input[starts-with(@id, 'TextBox_') and @data-pe-role='percentage']"),
        ownershipValueOne = By.xpath("//div[@class='row debtor1-row']//h2[@data-pe-id='value']"),
        ownershipValueTwo = By.xpath("//div[@id='debtor2']//h2[@data-pe-id='value']"),
        otherOwnerLookup = By.id('debtorsOther_clientsName'),
        stateExemptionsBtn = By.xpath("//button[preceding-sibling::input[@id='lookup']]"),
        stateExemptionsField = By.xpath("//*[starts-with(@id, 'PersonalPropertyAssetEditor')]//input[@id='lookup']");
    
    driver.wait(until.elementLocated(nav.navMatter.petition.property.self));
    driver.findElement(nav.navMatter.petition.property.self).click();
    driver.wait(until.elementLocated(nav.navMatter.petition.property.personalProperty));
    driver.findElement(nav.navMatter.petition.property.personalProperty).click();
    
    driver.wait(until.elementLocated(emptyRow), 5000).thenCatch(function() {
            console.log('Personal property had some entries!')
            driver.findElements(By.xpath("//div[starts-with(@id, 'personalproperty')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')]")).then(function(entries) {
                for (var i = 1; i <= entries.length; i++) {
                    new req.webdriver.ActionSequence(driver).
                        mouseMove(driver.findElement(By.xpath("//div[starts-with(@id, 'personalproperty')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')][" + i + "]"))).
                        click(driver.findElement(By.xpath("//div[starts-with(@id, 'personalproperty')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')][1]//a"))).
                        perform();
                    req.confirmDelete();
                    driver.sleep(1000);  
                }
            })
        });
    
    //add the first entry
    driver.findElement(newBtn).click();
    driver.wait(until.elementLocated(motorVehicleLink));
    driver.findElement(motorVehicleLink).click();
    driver.wait(until.elementLocated(makeInput));
    
    driver.findElement(descriptionInput).sendKeys('Nice motorcycle');
    driver.findElement(makeInput).sendKeys('Yamaha');
    driver.findElement(modelInput).sendKeys('XTZ660');
    driver.findElement(yearInput).sendKeys('2008');
    driver.findElement(mileageInput).sendKeys('21000');
    
    driver.findElement(valueInput).sendKeys('10000');
    driver.findElement(sourceOfValueInput).sendKeys('Expensive Estimates LTD');
    driver.findElement(dateAcquiredInput).sendKeys('Sep 02, 1996');
    driver.findElement(assetSurrCheckbox).click();
    
    driver.findElement(ownershipValueOne).getText().then(function(data) {
        assert.equal(data, '$5,000.00')
    });
    driver.findElement(ownershipValueTwo).getText().then(function(data) {
        assert.equal(data, '$5,000.00')
    });
    
    driver.findElement(otherOwnerLookup).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow));
    driver.sleep(1000);
    var codebtor = undefined;
    driver.findElement(nav.dvxprsPopupFirstRow).getText().then(function(name) {
        codebtor = name.trim()
    });
    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.findElement(nav.dvxprsSaveAndCloseBtn).click();
    driver.wait(until.elementLocated(By.xpath("//*[starts-with(@id, 'EntitySelector_')]/div/span[@data-name='name']")));
    driver.findElement(By.xpath("//*[starts-with(@id, 'EntitySelector_')]/div/span[@data-name='name']")).getText().then(function(data) {
        assert.equal(data, codebtor)
    });
    driver.wait(until.elementIsVisible(driver.findElement(stateExemptionsBtn)), 10000);
    driver.findElement(stateExemptionsField).getAttribute('disabled').then(function(isDisabled) {
        assert.equal(isDisabled, 'true')
    });
    driver.findElement(assetSurrCheckbox).click();
    driver.wait(until.elementIsEnabled(driver.findElement(stateExemptionsBtn)));
    driver.findElement(stateExemptionsBtn).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
    driver.sleep(1000);
    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.findElement(nav.dvxprsSaveAndCloseBtn).click();
    
    driver.wait(until.elementIsEnabled(driver.findElement(saveAndCloseBtn)));
    driver.sleep(1000);
    driver.findElement(saveAndCloseBtn).click();
    
    driver.wait(until.elementLocated(firstRow), 10000).then(function() {
        console.log('The first personal property added OK')
    }, function(err) {
        console.log('The first personal property was not added FAIL ' + err.message)
    });
    
    //ADD THE SECOND ENTRY
    driver.findElement(newBtn).click();
    driver.wait(until.elementLocated(checkingAccountsLink));
    driver.findElement(checkingAccountsLink).click();
    driver.wait(until.elementLocated(descriptionInput));
    driver.findElement(descriptionInput).sendKeys('Tons of money');
    driver.findElement(saveAndCloseBtn).click();
    
    driver.wait(until.elementLocated(secondRow)).then(function() {
        console.log('The second personal property added OK')
        
        //update the second entry
        driver.findElement(secondRow).click();
        driver.wait(until.elementLocated(checkingAccountsLink));
        driver.findElement(descriptionInput).clear();
        driver.findElement(descriptionInput).sendKeys('Delete me');
        driver.findElement(saveBtn).click();
        
        driver.wait(until.elementIsEnabled(driver.findElement(secondRow)));
        driver.sleep(1000);
            
            //delete
        driver.findElement(By.xpath("//div[starts-with(@id, 'personalproperty')]//tr[contains(@id, 'DXDataRow1')]//a")).click();
        req.confirmDelete();
        driver.sleep(1000);
        driver.wait(until.elementLocated(secondRow), 1000).then(function() {
            console.log('The second personal property was not deleted FAIL ')
        }, function(err) {
            console.log('The second personal property was deleted OK')    
        });
        
        
    }, function(err) {
        console.log('The second personal property was not added FAIL ' + err.message)
    });
    
    
};


var assetExemptions = function() {
    
    var firstRow = By.xpath("//article[@id='assetsWithExemptions']//tr[contains(@id, 'DXDataRow0')]"),
        addExemptionBtn = By.xpath("//article[@id='assetsWithExemptions']//tr[contains(@id, 'DXDataRow0')]//a[@data-hint='Add State Exemptions']"),
        deleteBtn = By.xpath("//article[@id='assetsWithExemptions']//tr[contains(@id, 'DXDataRow0')]//div[starts-with(@class, 'row')][2]//a[@title='Delete']");
    
    driver.wait(until.elementLocated(nav.navMatter.petition.property.self));
    driver.findElement(nav.navMatter.petition.property.self).click();
    driver.wait(until.elementLocated(nav.navMatter.petition.property.assetExemptions));
    driver.findElement(nav.navMatter.petition.property.assetExemptions).click();
    
    driver.wait(until.elementLocated(firstRow));
    driver.findElement(addExemptionBtn).click();
    driver.wait(until.elementLocated(nav.dvxprsExemptionsFirstRow));
    driver.sleep(1000);
    driver.findElement(nav.dvxprsExemptionsFirstRow).click();
    driver.findElement(nav.dvxprsExemptionsAddBtn).click();
    driver.wait(until.elementLocated(deleteBtn), 2000).then(function() {
        console.log('Exemption added OK')
        driver.findElement(deleteBtn).click();
        driver.sleep(1000);
        driver.findElement(deleteBtn).then(function() {
            console.log('Exemption was not deleted FAIL')
        }, function(err) {
            console.log('Exemption was deleted OK')
        });
    
    }, function(err) {
        console.log('Exemption was not added FAI')
    });
    
};



var exemptionCalculator = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.property.self));
    driver.findElement(nav.navMatter.petition.property.self).click();
    driver.wait(until.elementLocated(nav.navMatter.petition.property.exemptionCalculator));
    driver.findElement(nav.navMatter.petition.property.exemptionCalculator).click();
    
    driver.wait(until.elementLocated(By.id('btnStateExemptions')));
    driver.findElement(By.id('btnStateExemptions')).click();
    driver.wait(until.elementLocated(By.className('btn-close')));
    driver.findElement(By.className('btn-close')).click();
    driver.sleep(1000);
    
    driver.findElement(By.id('btnStateAssets')).click();
    driver.wait(until.elementLocated(By.className('btn-close')));
    driver.findElement(By.className('btn-close')).click();
    driver.sleep(1000);
    
    driver.findElement(By.xpath("//a[text()='Settings']")).click();
    driver.wait(until.elementLocated(By.xpath("//*[@id='btnLatestExemptions']/button")));
    driver.findElement(By.xpath("//*[@id='btnLatestExemptions']/button")).click();
    driver.sleep(1000);
    driver.findElement(By.id('messageDialog2')).thenCatch(function() {
        console.log('ExemptionCalc_Settings div not appeared FAIL')
    });
    driver.findElement(By.xpath("//div[starts-with(@id, 'CaseProperty_')]//form[starts-with(@id, 'AdditionalDetailsBankruptcy_')]//button[text()='Save']")).click();
    req.waitForSuccessMsg();
    
};


var securedCreditor = function() {
    
    var emptyRow = By.xpath("//div[starts-with(@id, 'secured')]//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//div[starts-with(@id, 'secured')]//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//div[starts-with(@id, 'secured')]//tr[contains(@id, 'DXDataRow1')]"),
        newBtn = By.xpath("//div[starts-with(@id, 'secured')]//a[@id='newDebtAnchor']");
        
        
    
    
    
    driver.wait(until.elementLocated(nav.navMatter.petition.creditors.self));
    driver.findElement(nav.navMatter.petition.creditors.self).click();
    driver.wait(until.elementLocated(nav.navMatter.petition.creditors.secured));
    driver.findElement(nav.navMatter.petition.creditors.secured).click();
    
    driver.wait(until.elementLocated(emptyRow), 10000);
    
    driver.findElement(newBtn).click();
    
    driver.wait(until.elementLocated(By.id('Remarks')));
    driver.wait(until.elementLocated(By.xpath("//button[@type='button' and contains(@class, 'dropdown-toggle_noArrow')]")));
    driver.findElement(By.xpath("//button[@type='button' and contains(@class, 'dropdown-toggle_noArrow')]")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Create New Property']"))));
    driver.findElement(By.xpath("//a[@data-pe-navigationtitle='Create New Property']")).click();
    driver.wait(until.elementLocated(By.id('NatureOfInterest')));
    driver.sleep(1000);
    driver.findElement(By.xpath("//input[@id='Asset_IsPrincipalResidence'][@value='True']")).click();
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
    driver.wait(until.elementIsEnabled(driver.findElement(nav.dvxprsPopupFirstRow)), 10000);
    driver.findElement(nav.dvxprsPopupFirstRow).click();
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
    
}

var priorityCreditor = function() {
    
    var emptyRow = By.xpath("//div[starts-with(@id, 'priority')]//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//div[starts-with(@id, 'priority')]//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//div[starts-with(@id, 'priority')]//tr[contains(@id, 'DXDataRow1')]"),
        newBtn = By.xpath("//div[starts-with(@id, 'priority')]//a[@id='newDebtAnchor']");
    
    
    driver.wait(until.elementLocated(nav.navMatter.petition.creditors.self));
    driver.findElement(nav.navMatter.petition.creditors.self).click();
    driver.wait(until.elementLocated(nav.navMatter.petition.creditors.priority));
    driver.findElement(nav.navMatter.petition.creditors.priority).click();
    
    driver.wait(until.elementLocated(emptyRow), 10000);
    
};

var unsecuredCreditor = function() {
    
    var emptyRow = By.xpath("//div[starts-with(@id, 'unsecured')]//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//div[starts-with(@id, 'unsecured')]//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//div[starts-with(@id, 'unsecured')]//tr[contains(@id, 'DXDataRow1')]"),
        newBtn = By.xpath("//div[starts-with(@id, 'unsecured')]//a[@id='newDebtAnchor']");
    
    
    driver.wait(until.elementLocated(nav.navMatter.petition.creditors.self));
    driver.findElement(nav.navMatter.petition.creditors.self).click();
    driver.wait(until.elementLocated(nav.navMatter.petition.creditors.unsecured));
    driver.findElement(nav.navMatter.petition.creditors.unsecured).click();
    
    driver.wait(until.elementLocated(emptyRow), 10000);
    
};

var codebtors = function() {
    
    var lastEightYearsYes = By.xpath("//*[@id='CommunityProperty8Years' and @value='True']"),
        lastEightYearsNo = By.xpath("//*[@id='CommunityProperty8Years' and @value='False']");
    
};

var executoryContracts = function() {
    
    var emptyRow = By.xpath("//div[starts-with(@id, 'CaseExecutoryContracts_')]//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//div[starts-with(@id, 'CaseExecutoryContracts_')]//tr[contains(@id, 'DXDataRow0')]"),
        newBtn = By.xpath("//div[starts-with(@id, 'CaseExecutoryContracts_')]//a[contains(@class, 'gridBtn-new')]"),
        saveBtn = By.xpath("//section[starts-with(@id, 'CreateUpdateCaseExecutoryContract_')]//button[@type='submit']"),
        cancelBtn = By.xpath("//section[starts-with(@id, 'CreateUpdateCaseExecutoryContract_')]//button[@data-role-action='close']");
        
    var searchBtn = By.xpath("//div[starts-with(@id, 'CaseExecutoryContracts_')]//button[contains(@class, 'btn-search')]"),
        typeOfContract = By.id("executoryContract_Type"),
        relationship = By.id("executoryContract_DebtorRelationshipToContract"),
        description = By.id("executoryContract_Description"),
        assume = By.xpath("//*[@value='Assume']"),
        reject = By.xpath("//*[@value='Reject']"),
        assign = By.xpath("//*[@value='Assign']"),
        unknown = By.xpath("//*[@value='Unknown']"),
        isInDefault = By.id("executoryContract_IsInDefault"),
        exclude = By.id("executoryContract_ExcludeFromMailingMatrix");
    
    var planOptions = By.xpath("//*[starts-with(@id, 'CreateUpdateCaseExecutoryContract')]//div[@data-role='panel']"),
        planRemarks = By.id("executoryContract_PlanRemarks"),
        includeOnSOI = By.id("executoryContract_IncludeOnStatementOfIntention"),
        regularPayment = By.xpath("//*[@id='executoryContract_RegularPayment' and @placeholder='Enter Payment Amount']"),
        paymentsRemaining = By.id("executoryContract_NoPaymentsRemaining"),
        arrearage = By.xpath("//*[@id='executoryContract_ArrearageAmount' and @placeholder='Enter Amount']"),
        highlightRegPayment = By.id("executoryContract_HighLightRegularPayment"),
        highlightArrearage = By.id("executoryContract_HighLightRegularArrearage");
        
    
    driver.wait(until.elementLocated(nav.navMatter.petition.executoryContracts));
    driver.findElement(nav.navMatter.petition.executoryContracts).click();
    
    driver.wait(until.elementLocated(emptyRow));
    
    
    //add
    driver.findElement(newBtn).click();
    
    var party = undefined;
    driver.wait(until.elementLocated(searchBtn));
    driver.findElement(searchBtn).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow));
    driver.sleep(1000);
    driver.findElement(nav.dvxprsPopupFirstRow).getText().then(function(name) {
       party = name.trim() 
    });
    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.sleep(1000);
    driver.wait(until.elementIsEnabled(driver.findElement(typeOfContract)));
    driver.findElement(By.xpath("//*[@id='executoryContract_Type']/option[@value='4']")).click();
    driver.findElement(By.xpath("//*[@id='executoryContract_DebtorRelationshipToContract']/option[@value='2']")).click();
    driver.findElement(description).sendKeys('Lease of an Yamaha XTZ660');
    driver.findElement(unknown).click();
    driver.findElement(isInDefault).click();
    driver.findElement(exclude).click();
    
    driver.findElement(planOptions).click();
    driver.wait(until.elementIsVisible(driver.findElement(planRemarks)));
    driver.findElement(planRemarks).sendKeys('Yamaha XTZ660 has only one cylinder');
    driver.findElement(includeOnSOI).click();
    driver.findElement(regularPayment).sendKeys('500');
    driver.findElement(paymentsRemaining).sendKeys('4');
    driver.findElement(highlightRegPayment).click();
    driver.findElement(arrearage).sendKeys('1000');
    driver.findElement(highlightArrearage).click();
    
    driver.findElement(saveBtn).click();
    
    driver.wait(until.elementLocated(firstRow)).then(function() {
        driver.sleep(1000);
        var firstRowData = [party, 'Unknown', 'Lease of an Yamaha XTZ660'];
        
        firstRowData.forEach(function(item, i, arr) {
            driver.findElement(By.xpath("//div[starts-with(@id, 'CaseExecutoryContracts_')]//tr[contains(@id, 'DXDataRow0')]/td[" + (i + 2) + "]")).getText().then(function(data) {
                assert.equal(data, firstRowData[i])
            });
        });
    });
    
    
    //update
    driver.findElement(firstRow).click();
    
    driver.wait(until.elementLocated(searchBtn));
    driver.findElement(searchBtn).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupSecondRow));
    driver.sleep(1000);
    driver.findElement(nav.dvxprsPopupSecondRow).getText().then(function(name) {
       party = name.trim() 
    });
    driver.findElement(nav.dvxprsPopupSecondRow).click();
    driver.sleep(1000);
    driver.wait(until.elementIsEnabled(driver.findElement(typeOfContract)));
    driver.findElement(By.xpath("//*[@id='executoryContract_Type']/option[@value='5']")).click();
    driver.findElement(By.xpath("//*[@id='executoryContract_DebtorRelationshipToContract']/option[@value='1']")).click();
    driver.findElement(description).clear();
    driver.findElement(description).sendKeys('My crib');
    driver.findElement(reject).click();
    driver.findElement(isInDefault).click();
    driver.findElement(exclude).click();
    
    driver.findElement(planOptions).click();
    driver.wait(until.elementIsVisible(driver.findElement(planRemarks)));
    driver.findElement(planRemarks).clear();
    driver.findElement(planRemarks).sendKeys('My crib has a yard for 10 cars only');
    driver.findElement(includeOnSOI).click();
    driver.findElement(regularPayment).clear();
    driver.findElement(paymentsRemaining).clear();
    driver.findElement(paymentsRemaining).sendKeys('2');
    driver.findElement(highlightRegPayment).click();
    driver.findElement(arrearage).clear();
    driver.findElement(highlightArrearage).click();
    
    driver.findElement(saveBtn).click();
    
    driver.wait(until.elementLocated(firstRow)).then(function() {
        driver.sleep(1000);
        var firstRowData = [party, 'Reject', 'My crib'];
        
        firstRowData.forEach(function(item, i, arr) {
            driver.findElement(By.xpath("//div[starts-with(@id, 'CaseExecutoryContracts_')]//tr[contains(@id, 'DXDataRow0')]/td[" + (i + 2) + "]")).getText().then(function(data) {
                assert.equal(data, firstRowData[i])
            });
        });
    });
    
    driver.findElement(By.xpath("//div[starts-with(@id, 'CaseExecutoryContracts_')]//tr[contains(@id, 'DXDataRow0')]//a")).click();
    req.confirmDelete();
    driver.wait(until.elementLocated(emptyRow), 10000).then(function() {
        console.log('Executory contract deleted OK')
    }, function(err) {
        console.log('Executory contact not deleted FAIL')
    });
    driver.sleep(1000);
    
};


var incomeAndExpenses = function() {
    
    var budget = By.xpath("//a[text()='Budget']"),
        employmentDetails = By.xpath("//a[text()='Employment Details']"),
        incomeChanges = By.xpath("//a[text()='Income Changes']");
        
    var household = By.xpath("//a[text()='Household']"),
        utilities = By.xpath("//a[text()='Utilities']"),
        personal = By.xpath("//a[text()='Personal']"),
        vehicleExpenses = By.xpath("//a[text()='Vehicle Expenses']"),
        installmentExpenses = By.xpath("//a[text()='Installment Expenses']"),
        otherRealPropExpenses = By.xpath("//a[text()='Other Real Property Expenses']"),
        otherExpenses = By.xpath("//a[text()='Other Expenses']"),
        additional = By.xpath("//div[starts-with(@id, 'expenses')]//a[text()='Additional']");
        
    var details = By.xpath("//div[starts-with(@id, 'meansTest')]//a[text()='Details']"),
        income = By.xpath("//div[starts-with(@id, 'meansTest')]//a[text()='Income']");
    
    driver.wait(until.elementLocated(nav.navMatter.petition.incomeAndExpenses.self));
    driver.findElement(nav.navMatter.petition.incomeAndExpenses.self).click();
    
    //income
    driver.wait(until.elementLocated(nav.navMatter.petition.incomeAndExpenses.income));
    driver.findElement(nav.navMatter.petition.incomeAndExpenses.income).click();
    
    driver.wait(until.elementLocated(budget));
    driver.findElement(budget).click();
    driver.wait(until.elementLocated(By.xpath("//tr[@data-budgetitem-type='Employment'][1]")));
    
    driver.wait(until.elementLocated(employmentDetails));
    driver.findElement(employmentDetails).click();
    driver.wait(until.elementLocated(By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")));
    
    driver.wait(until.elementLocated(incomeChanges));
    driver.findElement(incomeChanges).click();
    driver.wait(until.elementLocated(By.xpath("//input[@id='incomeChanges']")));
    
    //expenses
    driver.wait(until.elementLocated(nav.navMatter.petition.incomeAndExpenses.expenses));
    driver.findElement(nav.navMatter.petition.incomeAndExpenses.expenses).click();
    driver.wait(until.elementLocated(By.id("assetIdForMortgagePayment")));
    //driver.wait(until.elementLocated(By.xpath("//*[@id='expenseChanges' and @value='True']")));
    
    //means test
    driver.wait(until.elementLocated(nav.navMatter.petition.incomeAndExpenses.meansTest));
    driver.findElement(nav.navMatter.petition.incomeAndExpenses.meansTest).click();
    
    driver.wait(until.elementLocated(details));
    driver.findElement(details).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'meansTest')]//input[@id='Zip']")));
    
    driver.findElement(income).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'meansTest')]//tr[@data-budgetitem-type='Employment']")));
    
};



var gi = [gi_Details, gi_Fees, gi_PendingBankruptcies, gi_CreditCounseling, gi_Tenant, gi_HazardousProperty, gi_Additional, gi_Security];

var property = [realProperty, personalProperty, assetExemptions, exemptionCalculator];



req.authorize(test.env, test.login, test.password);
req.closeTabs();

req.openCreateContact('dashboard', 'person');
req.createPerson(test.testPerson);
req.createBKmatter(test.testMatter);
driver.wait(until.elementLocated(nav.navMatter.petition.self), 15000);
        driver.findElement(nav.navMatter.petition.self).click();
        driver.wait(until.elementLocated(By.id('stateId')), 15000);
        driver.wait(until.elementLocated(By.id('Case_CountyId')), 15000);
        driver.wait(until.elementLocated(By.id('District_Id')), 15000);
        driver.wait(until.elementLocated(By.id('Case_DivisionId')), 15000);
        driver.wait(until.elementLocated(By.id('Case_CaseStatus')), 15000);

gi.forEach(function(item, i, arr) {
    item();
});

property.forEach(function(item, i, arr) {
    item();
});

executoryContracts();

incomeAndExpenses();

sofa.sofaArr.forEach(function(item, i, arr){
    return item();
});

req.logOut();