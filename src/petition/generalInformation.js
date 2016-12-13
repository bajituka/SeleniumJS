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
    
driver.manage().timeouts().implicitlyWait(2000);
util.catchUncaughtExceptions();
    
var totalSaveBtn = By.xpath("//*[@id='totalSave']//button[@type='submit']");

var generalInformation = {
    
    details: function() {
        
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.generalInformation.self, nav.navMatter.petition.generalInformation.details);
        
        //change chapter to 13, type to joint, jurisdiction
        driver.findElement(By.xpath("//div[@class='radioButtonGroup']//input[@value='Chapter13']")).click();
        
        //accept chapter dialog
        var btnChapterYes = By.xpath("//section[@data-pe-id='confirmPopup']//button[@data-pe-id='confirm']");
        driver.wait(until.elementLocated(btnChapterYes), 10000);
        driver.findElement(btnChapterYes).click();
        driver.sleep(1500);

        driver.findElement(By.xpath("//select[@id='Case_Ownership']/option[@value='2']")).click();
        driver.findElement(By.id('Zip')).sendKeys('90220');
        driver.findElement(By.xpath("//div[@id='zipCode']//button")).click();

        //accept zip dialog
        var btnZipYes = By.xpath("//div[@class='content']//button[@class='saveButton']");
        driver.wait(until.elementLocated(btnZipYes), 5000);
        driver.findElement(btnZipYes).click();
        driver.sleep(2000);

        //ensure that the jurisdiciton has changed successfully
        var jurisdictionValues = ['California', 'Los Angeles', 'Central District of California', 'Los Angeles Division'];

        jurisdictionValues.forEach(function(item, i, arr) {
            var jurisdictionHTMLIds = ['stateId', 'Case_CountyId', 'District_Id', 'Case_DivisionId'];
            driver.findElement(By.xpath("//select[@id='" + jurisdictionHTMLIds[i] + "']/option[@selected='selected']")).getText().then(function(data) {
                assert.equal(data, jurisdictionValues[i])
            });
        });

        driver.findElement(totalSaveBtn).click();
        driver.wait(until.elementLocated(By.xpath("//div[@id='jointdebtor']//button[contains(@class, 'btn-search')]")), 10000);
        driver.findElement(By.xpath("//div[@id='jointdebtor']//button[contains(@class, 'btn-search')]")).click();
        util.selectDvxprsFirstRow();
        var btnSaveJointDebtor = driver.findElement(By.xpath("//form[starts-with(@id, 'BeforeUpdate_')]//button[@type='submit']"));
        btnSaveJointDebtor.click();
        util.waitForSuccessMsg();
        driver.wait(until.stalenessOf(btnSaveJointDebtor), 10000);
        driver.sleep(3000);
        
        //change chapter to 7, type to individual
        driver.wait(until.elementLocated(By.xpath("//div[@class='radioButtonGroup']//input[@value='Chapter7']")), 10000);
        driver.findElement(By.xpath("//div[@class='radioButtonGroup']//input[@value='Chapter7']")).click();
        
        //accept chapter dialog
        var btnChapterYes = By.xpath("//section[@data-pe-id='confirmPopup']//button[@data-pe-id='confirm']");
        driver.wait(until.elementLocated(btnChapterYes), 10000);
        driver.findElement(btnChapterYes).click();
        driver.sleep(1500);

        driver.findElement(By.xpath("//select[@id='Case_Ownership']/option[@value='1']")).click();
        driver.findElement(totalSaveBtn).click();
        driver.wait(until.elementLocated(By.xpath("//tbody[@id='listView']/tr[1]//input")));
        driver.findElement(By.xpath("//tbody[@id='listView']/tr[1]//input")).click();
        driver.findElement(By.xpath("//form[starts-with(@id, 'BeforeUpdate_')]//button[@type='submit']")).click();
        util.waitForSuccessMsg();
        
        //change back to joint for later test purposes, try  to catch '500' when switching to efiling and back
        driver.wait(until.elementLocated(By.id('Zip')), 10000);
        
        util.navigateTo(nav.navMatter.court.self, nav.navMatter.court.filing.self);
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]//div[@data-pe-role='case-documents']/article/table")), 20000);
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.generalInformation.self);
        
        driver.wait(until.elementLocated(By.id('Zip')), 10000);
        driver.findElement(By.id('Zip')).sendKeys('60007');
        driver.findElement(By.xpath("//div[@id='zipCode']//button")).click();
        
        //accept zip dialog
        var btnZipYes = By.xpath("//div[@class='content']//button[@class='saveButton']");
        driver.wait(until.elementLocated(btnZipYes), 5000);
        driver.findElement(btnZipYes).click();
        driver.sleep(2000);

        driver.findElement(By.xpath("//select[@id='Case_Ownership']/option[@value='2']")).click();
        driver.findElement(totalSaveBtn).click();
        driver.wait(until.elementLocated(By.xpath("//div[@id='jointdebtor']//button[contains(@class, 'btn-search')]")), 10000);
        driver.findElement(By.xpath("//div[@id='jointdebtor']//button[contains(@class, 'btn-search')]")).click();
        util.selectDvxprsFirstRow();
        driver.findElement(By.xpath("//form[starts-with(@id, 'BeforeUpdate_')]//button[@type='submit']")).click();
        util.waitForSuccessMsg();
        driver.sleep(1000);
        
    },
    
    fees: function() {
        
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.generalInformation.self, nav.navMatter.petition.generalInformation.fees);
        //Filing fees
        var installments = By.xpath("//input[@value='Installments']");
        driver.wait(until.elementLocated(installments), 10000);
        driver.sleep(1500);
        driver.findElement(installments).click();
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'payments_filingFee_')]/div[2]")), 10000);
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
        driver.wait(until.elementLocated(By.xpath("//input[@id='modelObject_TotalFees'][not(@type='hidden')]")), 10000);
        driver.findElement(By.xpath("//input[@id='modelObject_TotalFees'][not(@type='hidden')]")).sendKeys('500');
        driver.findElement(By.xpath("//input[@id='modelObject_AmountPaid'][not(@type='hidden')]")).sendKeys('250');
        driver.findElement(By.xpath("//input[@id='modelObject_SourceOfPaid'][@value='Debtor']")).click();
        driver.findElement(By.xpath("//input[@id='modelObject_SourceToBePaid'][@value='Other']")).click();
        driver.findElement(By.xpath("//h3[@data-pe-id='balance']")).getText().then(function(balanceDue) {
            assert.equal(balanceDue, '$250.00')
        });
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//input[@id='modelObject_SourceToBePaidOther']"))), 10000);
        driver.findElement(By.xpath("//input[@id='modelObject_SourceToBePaidOther']")).sendKeys('Relatives');
        var text1 = 'Collision sensor ohm. $500 USD';
        var text2 = 'Laser beams performance velocity';
        driver.findElement(By.xpath("//textarea[@id='modelObject_LegalServicesFee']")).sendKeys(text1);
        driver.findElement(By.xpath("//textarea[@id='modelObject_SharingOfCompensation']")).sendKeys(text2)
        driver.findElement(By.xpath("//input[@id='modelObject_RepresentationForProceedingsIncluded']")).click();
        driver.findElement(By.xpath("//input[@id='modelObject_OtherIncluded']")).click();
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//textarea[@id='modelObject_Other']"))), 10000);
        driver.findElement(By.xpath("//textarea[@id='modelObject_Other']")).sendKeys('Jerk gear wheel screw.');
        driver.findElement(By.xpath("//textarea[@id='modelObject_NotIncluded']")).sendKeys('Oil gear mechanical automation interlock limiting device gear singularity saw.');
        driver.findElement(totalSaveBtn).click();
        util.waitForSuccessMsg();
        driver.sleep(1000);

    },
    
    pendingBankruptcies: function() {
        
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.generalInformation.self, nav.navMatter.petition.generalInformation.pendingBankrupties);
        
        var emptyRow = By.xpath("//table[starts-with(@id, 'EntityBankruptciesGrid_')]//tr[contains(@id, 'DXEmptyRow')]"),
            firstRow = By.xpath("//div[starts-with(@id, 'debtor_Debtors_')]//tr[contains(@id, 'DXDataRow0')]"),
            secondRow = By.xpath("//div[starts-with(@id, 'debtor_Debtors_')]//tr[contains(@id, 'DXDataRow1')]");
    
        //add
        
        //check for presense of any entries and delete them if any
        driver.wait(until.elementLocated(emptyRow), 5000).catch(function() { //detect if the grid contains entries
            driver.findElements(By.xpath("//table[starts-with(@id, 'EntityBankruptciesGrid_')]//tr[contains(@id, 'DXDataRow')]")).then(function(entries) { //get the count of elements in the grid
                for (var i = 1; i <= entries.length; i++) {
                    let btnDeleteEntry = driver.findElement(By.xpath("//table[starts-with(@id, 'EntityBankruptciesGrid_')]//tr[contains(@id, 'DXDataRow')][" + i + "]//a")); //locate delete button of the element
                    new util.webdriver.ActionSequence(driver). //hover over the delete button and click
                        mouseMove(btnDeleteEntry).
                        click(btnDeleteEntry).
                        perform();
                    util.confirmDelete();
                    driver.wait(until.stalenessOf(btnDeleteEntry), 10000); //wait till entry disappears
                }
            })
        });
        
        for (var i = 1; i < 3; i++) {
            driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'EntityBankruptciesGrid_')]//span[text()='NEW']")), 15000);
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
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 15000);
            driver.sleep(1500);
            driver.findElement(nav.dvxprsPopupFirstRow).click();
            driver.sleep(1000);
            driver.findElement(totalSaveBtn).click();
            util.waitForSuccessMsg();
            driver.sleep(1000);
            driver.wait(until.elementIsVisible(driver.findElement(firstRow)));    
        };
        var compareList = ['Pending', '16-12342', '9/2/2012', 'Hawk, Tony', 'Northern District of Illinois'];
        compareList.forEach(function(item, i, arr) {
                driver.findElement(By.xpath("//div[starts-with(@id, 'debtor_Debtors_')]//tr[contains(@id, 'DXDataRow1')]/td[" + (i+2) + "]")).getText().then(function(data) {
                    assert.equal(data, compareList[i])
                });
        });
        //update
        
        driver.findElement(secondRow).click();
        driver.wait(until.elementLocated(By.id('Type')), 15000);
        driver.findElement(By.xpath("//select[@id='Type']/option[@value='1']")).click();
        driver.findElement(By.id('CaseNumber')).clear();
        driver.findElement(By.id('CaseNumber')).sendKeys('16-12349');
        driver.findElement(By.id('FiledOn')).clear();
        driver.findElement(By.id('FiledOn')).sendKeys('Sep 02, 2019');
        driver.findElement(By.xpath("//article[starts-with(@id, 'EntityBankruptcy_')]//button[contains(@class, 'fg-stratusOrange')]")).click();
        driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow));
        driver.sleep(1500);
        driver.findElement(By.xpath("//section/div/table/tbody/tr/td/div[2]/table/tbody/tr[3]")).click();
        driver.sleep(1000);
        var cancelBtnEl = driver.findElement(By.xpath("//article[contains(@id, 'EntityBankruptcy_')]//button[@data-role-action='close']"));
        driver.findElement(totalSaveBtn).click();
        driver.wait(until.stalenessOf(cancelBtnEl), 10000);
        driver.wait(until.elementLocated(secondRow), 10000);
        var secondRowEl = driver.findElement(secondRow);
        
        //delete
        driver.findElement(By.xpath("//div[starts-with(@id, 'debtor_Debtors_')]//tr[contains(@id, 'DXDataRow1')]/td[8]/a")).click();
        util.confirmDelete();
        driver.wait(until.stalenessOf(secondRowEl), 10000);      
    },
    
    creditCounseling: function() {
        
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.generalInformation.self, nav.navMatter.petition.generalInformation.creditCounseling);
        driver.wait(until.elementLocated(By.xpath("//input[@value='ReceivedAndAttached']")));
        driver.findElement(By.xpath("//input[@value='ReceivedAndAttached']")).click();
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='modelObject_DateOfCourse']"))));
        driver.findElement(By.id('modelObject_DateOfCourse')).sendKeys('Sep 02, 1987');
        driver.findElement(By.id('modelObject_ApprovedProvider')).sendKeys('Government');
        driver.findElement(By.id('modelObject_CertificateNumber')).sendKeys('0000365821423652');
        driver.findElement(totalSaveBtn).click();
        util.waitForSuccessMsg();
        
    },
    
    tenant: function() {
        
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.generalInformation.self, nav.navMatter.petition.generalInformation.tenant);
        driver.wait(until.elementLocated(By.id('modelObject_DebtorRentTheirResidence')), 10000);
        driver.sleep(500);
        driver.findElement(By.id('modelObject_DebtorRentTheirResidence')).click();
        driver.wait(until.elementIsEnabled(driver.findElement(By.id('modelObject_LandlordHasJudgement'))), 10000);
        driver.findElement(By.id('modelObject_LandlordHasJudgement')).click();
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//div[starts-with(@id, 'Tenant')]//button[contains(@class, 'btn-search fg-stratusOrange')]"))), 10000);
        driver.findElement(By.xpath("//div[starts-with(@id, 'Tenant')]//button[contains(@class, 'btn-search fg-stratusOrange')]")).click();
        driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow));
        driver.sleep(1500);
        driver.findElement(nav.dvxprsPopupFirstRow).click();
        driver.sleep(1000);
        driver.findElement(By.id('modelObject_DebtorStaysInTheirResidence')).click();
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//input[@id='modelObject_DebtorHasCure']"))), 10000);
        driver.findElement(By.xpath("//input[@id='modelObject_DebtorHasCure']")).click();
        driver.findElement(totalSaveBtn).click();
        util.waitForSuccessMsg();
        
    },
    
    hazardousProperty: function() {
    
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.generalInformation.self, nav.navMatter.petition.generalInformation.hazardousProperty);
        driver.wait(until.elementLocated(By.id('modelObject_Question3')), 15000);
        driver.sleep(500);
        driver.findElement(By.id('modelObject_Question3')).click();
        driver.wait(until.elementIsEnabled(driver.findElement(By.id('modelObject_Question4'))), 10000);
        driver.findElement(By.id('modelObject_Question4')).sendKeys('Yaw machine optimization');
        driver.findElement(By.id('modelObject_Question5')).sendKeys('Ohm save three laws of robotics');
        driver.findElement(By.id('modelObject_Address_Zip')).sendKeys('90210');
        driver.findElement(By.xpath("//form[starts-with(@id, 'ExhibitCSection_')]//button[contains(@class, 'btn-search')]")).click();
        util.waitForAddressZip();
        driver.findElement(By.id('modelObject_Address_Street1')).sendKeys('558 Friends St');
        driver.findElement(By.id('modelObject_Address_Street2')).sendKeys('Line 2');
        driver.findElement(totalSaveBtn).click();
        util.waitForSuccessMsg();
    },
    
    additional: function() {
    
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.generalInformation.self, nav.navMatter.petition.generalInformation.additional);
        driver.wait(until.elementLocated(By.xpath("//input[@value='LivedInDistrictLast180Days']")));
        driver.findElement(By.xpath("//input[@value='LivedInDistrictLast180Days']")).click();
        driver.findElement(By.xpath("//input[@value='Business']")).click();
        driver.findElement(By.xpath("//input[@value='AreAvailable']")).click();
        /*
        driver.findElement(By.xpath("//input[@id='modelObject_SeparateHouseholds']")).click().catch(function() {
            console.log('Individual matter: no separate households')
        });
        */
        driver.findElement(totalSaveBtn).click();
        util.waitForSuccessMsg();
    },
    
    security: function() {
    
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.generalInformation.self, nav.navMatter.petition.generalInformation.security);
        driver.wait(until.elementLocated(By.id('isPrivate')), 10000);
        driver.sleep(500);
        driver.findElement(By.xpath("//input[@id='isPrivate']")).click();
        driver.sleep(500);
        var searchBtn = By.xpath("//form[@id='relationshipForm']//button[contains(@class, 'fg-stratusOrange')]");
        driver.findElement(searchBtn).click();
        util.selectDvxprsFirstRow();

        driver.findElement(By.xpath("//form[@id='relationshipForm']//button[@type='submit']")).click();
        driver.wait(until.elementLocated(By.xpath("//div[@id='securityList']//tbody/tr/td[2]")), 10000);
        var firstRow = driver.findElement(By.xpath("//div[@id='securityList']//tbody/tr/td[2]"));
        
        //delete party
        new util.webdriver.ActionSequence(driver).
                            mouseMove(firstRow).
                            click(driver.findElement(By.xpath("//div[@id='securityList']//tbody/tr/td[@class='options']/span/a[@title='Delete']"))).
                            perform();
                            
        util.confirmDelete();
        driver.wait(until.stalenessOf(firstRow), 5000);
        
        //return the case to be visible
        driver.sleep(500);
        driver.findElement(By.xpath("//input[@id='isPrivate']")).click();
        driver.sleep(500);
        driver.findElement(totalSaveBtn).click();
        util.waitForSuccessMsg();
    }
};

module.exports.generalInformation = generalInformation;