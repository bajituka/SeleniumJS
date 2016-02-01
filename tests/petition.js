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
driver.manage().timeouts().implicitlyWait(5000);

req.catchUncaughtExceptions();


req.authorize(test.env, test.login, test.password);

req.closeTabs();
/*
req.openCreateContact('dashboard', 'person');
req.createPerson(test.firstName, test.lastName);
req.createBKmatter(efp.chapter, efp.matterType, efp.state, efp.district);
*/
req.selectMatter('', 'chapter 7', 'illinois');
driver.wait(until.elementLocated(nav.navMatter.petition.self), 15000);
driver.findElement(nav.navMatter.petition.self).click();
driver.wait(until.elementLocated(By.id('stateId')), 15000);
driver.wait(until.elementLocated(By.id('Case_CountyId')), 15000);
driver.wait(until.elementLocated(By.id('District_Id')), 15000);
driver.wait(until.elementLocated(By.id('Case_DivisionId')), 15000);
driver.wait(until.elementLocated(By.id('Case_CaseStatus')), 15000);

var generalInformation_Details = function() {

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
    driver.wait(until.elementLocated(By.xpath("//section/div/table/tbody/tr/td/div[2]/table/tbody/tr[2]")), 10000);
    driver.sleep(2000);
    driver.findElement(By.xpath("//section/div/table/tbody/tr/td/div[2]/table/tbody/tr[2]")).click();
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

}


var generalInformation_Fees = function() {
    
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
}

generalInformation_Details();
generalInformation_Fees();
    

req.logOut();