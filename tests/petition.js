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
    
var totalSaveBtn = By.xpath("//*[@id='totalSave']/div/button");

driver.manage().window().maximize();
driver.manage().timeouts().implicitlyWait(2000);

req.catchUncaughtExceptions();


req.authorize(test.env, test.login, test.password);

req.closeTabs();
/*
req.openCreateContact('dashboard', 'person');
req.createPerson(test.firstName, test.lastName);
req.createBKmatter(efp.chapter, efp.matterType, efp.state, efp.district);
*/
req.selectMatter('', 'chapter 7');
driver.wait(until.elementLocated(nav.navMatter.petition.self), 15000);
driver.findElement(nav.navMatter.petition.self).click();
driver.wait(until.elementLocated(By.id('stateId')), 15000);
driver.wait(until.elementLocated(By.id('Case_CountyId')), 15000);
driver.wait(until.elementLocated(By.id('District_Id')), 15000);
driver.wait(until.elementLocated(By.id('Case_DivisionId')), 15000);
driver.wait(until.elementLocated(By.id('Case_CaseStatus')), 15000);

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

};


var gi_Fees = function() {
    
    //Filing fees
    driver.findElement(nav.navMatter.petition.generalInformation.fees).click();
    driver.wait(until.elementLocated(By.xpath("//input[@value='Installments']")));
    driver.findElement(By.xpath("//input[@value='Installments']")).click();
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
    driver.findElement(By.xpath("//textarea[@id='modelObject_LegalServicesFee']")).sendKeys('Collision sensor beep Decepticons robot ohm. Order feelings wheel recall serve and protect. Machine charging reach automation simulation laser beams magnet recall rotary remote error limiting device wheel interlock arm. Dexterity LaGrange multipliers no disassemble system jitter ohm. $500 USD');
    driver.findElement(By.xpath("//textarea[@id='modelObject_SharingOfCompensation']")).sendKeys('Laser beams performance velocity parallel oil trigger point industrial camera yaw feelings pulley beep arm engine. Gort charging driver HCR-328 WALL-E jitter motion axis order. Light emitting diode trigger point linear register jerk system worm gear bolt camera Otis axle redundancy LaGrange multipliers. WALL-E direct numerical control joint motion parallel robot degrees of freedom dynamics screw Z-2 wires solar Metal Man device. Performance singularity microchip operator ID-10T joint motion save chain realtime kawasaki KITT power.')
    driver.findElement(By.xpath("//input[@id='modelObject_RepresentationForProceedingsIncluded']")).click();
    driver.findElement(By.xpath("//input[@id='modelObject_OtherIncluded']")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//textarea[@id='modelObject_Other']"))));
    driver.findElement(By.xpath("//textarea[@id='modelObject_Other']")).sendKeys('Jerk gear wheel screw titanium magnet injection mold Metal Man. Dexterity charging 4LOM pneumatic pulley solar Z-2 system rotary iron linear redundancy. Hydraulic reliability laser beams camera motor lithium ion Emma-2 interlock feelings dexterity cam programmable logic controller serve and protect joint motion.');
    driver.findElement(By.xpath("//textarea[@id='modelObject_NotIncluded']")).sendKeys('Oil gear mechanical jerk solenoid recall reliability iteration simulation aluminum kinematics hose interlock reach. Normalize Ro-Man three laws of robotics injection mold bolt exponential assembly save. Trigger point wood charging iteration bolt ball joint power mechanical injection mold no disassemble. Realtime energy source autonomous EVE axle wires drive power automation interlock limiting device gear singularity saw.');
    driver.findElement(totalSaveBtn).click();
    req.waitForSuccessMsg();
};


var gi_PendingBankruptcies = function() {
    
    //add
    var judgeName = undefined;
    driver.findElement(nav.navMatter.petition.generalInformation.pendingBankrupties).click();
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
        driver.sleep(1000);
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
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//input[@value='DebtorHasCure']"))));
    driver.findElement(By.xpath("//input[@value='DebtorHasCure']")).click();
    driver.findElement(totalSaveBtn).click();
    req.waitForSuccessMsg();
    
};


var gi_HazardousProperty = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.generalInformation.hazardousProperty));
    driver.findElement(nav.navMatter.petition.generalInformation.hazardousProperty).click();
    driver.wait(until.elementLocated(By.id('modelObject_Question3')));
    driver.findElement(By.id('modelObject_Question3')).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.id('modelObject_Question4'))));
    driver.findElement(By.id('modelObject_Question4')).sendKeys('Yaw machine optimization singularity no disassemble repair recall system lithium ion destroy three laws of robotics end-effector feelings solar pulley.');
    driver.findElement(By.id('modelObject_Question5')).sendKeys('Ohm save three laws of robotics recall interlock energy source robot automation driver light emitting diode redundancy gripper order feelings.');
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
    
};

/*
gi_Details();
gi_Fees();
gi_PendingBankruptcies();
gi_CreditCounseling();
gi_Tenant();
gi_HazardousProperty();
gi_Additional();
*/
gi_Security();


req.logOut();