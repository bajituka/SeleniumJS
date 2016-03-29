var req = require('../commonFunctions.js'),
    nav = require('../navigation.js'),
    efp = require('../efilingparams.js'),
    test = require('../testdata.js');

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;

var incomeAndExpenses = function() {
    
    var budget = By.xpath("//a[text()='Budget']"),
        employmentDetails = By.xpath("//a[text()='Employment Details']"),
        incomeChanges = By.xpath("//a[text()='Income Changes']");
    /*    
    var household = By.xpath("//a[text()='Household']"),
        utilities = By.xpath("//a[text()='Utilities']"),
        personal = By.xpath("//a[text()='Personal']"),
        vehicleExpenses = By.xpath("//a[text()='Vehicle Expenses']"),
        installmentExpenses = By.xpath("//a[text()='Installment Expenses']"),
        otherRealPropExpenses = By.xpath("//a[text()='Other Real Property Expenses']"),
        otherExpenses = By.xpath("//a[text()='Other Expenses']"),
        additional = By.xpath("//div[starts-with(@id, 'expenses')]//a[text()='Additional']");
    */
    var details = By.xpath("//div[starts-with(@id, 'meansTest')]//a[text()='Details']"),
        income = By.xpath("//div[starts-with(@id, 'meansTest')]//a[text()='Income']");
    
    var saveBtn = By.xpath("//form[starts-with(@id, 'meansTestForm')]//button[@type='submit']");
    
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
    var projectedPlanPayment = By.xpath("//input[@id='modelObject_ProjectedPlanPayment' and not(@type='hidden')]"),
        addBtn = By.xpath("//div[@id='btnMaritalAdjustments']//div[contains(@class, 'add-adjustment-button')]"),
        description = By.xpath("//input[@id='maritalExclusions_0__Description']"),
        percentage = By.xpath("//input[@id='maritalExclusions_0__Amount' and not(@type='hidden')]"),
        comments = By.xpath("//textarea[@id='modelObject_Comment']"),
        militaryService = By.xpath("//div[starts-with(@id, 'MeansTest_')]//div[contains(@class, 'panel-header')]"),
        disabledVeteran = By.xpath("//input[@id='modelObject_DisabledVeteran']"),
        reservist = By.xpath("//input[@id='modelObject_ReservistOrNationalGuard']"),
        activeDuty = By.xpath("//input[@id='active-duty-check']"),
        homelandDefense = By.xpath("//input[@id='homeland-check']");
    
    driver.wait(until.elementLocated(nav.navMatter.petition.incomeAndExpenses.meansTest));
    driver.findElement(nav.navMatter.petition.incomeAndExpenses.meansTest).click();
    
    driver.wait(until.elementLocated(details));
    driver.findElement(details).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'meansTest')]//input[@id='Zip']")));
    
    driver.findElement(projectedPlanPayment).clear();
    driver.findElement(projectedPlanPayment).sendKeys('40.6');
    
    driver.findElement(addBtn).click();
    driver.wait(until.elementIsVisible(driver.findElement(description)));
    driver.findElement(description).sendKeys('Marital description');
    driver.findElement(percentage).clear();
    driver.findElement(percentage).sendKeys('50.4');
    
    driver.findElement(comments).sendKeys('These are some nice comments for Means Test');
    
    driver.findElement(militaryService).click();
    
    driver.wait(until.elementIsEnabled(driver.findElement(disabledVeteran)), 5000);
    driver.findElement(disabledVeteran).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//input[@id='modelObject_DisabledVeteranActivity' and @value='True']"))), 5000);
    driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(By.xpath("//input[@id='modelObject_DisabledVeteranActivity' and @value='True']")));
    driver.findElement(By.xpath("//input[@id='modelObject_DisabledVeteranActivity' and @value='True']")).click();
    
    driver.findElement(reservist).click();
    driver.wait(until.elementIsEnabled(driver.findElement(activeDuty)), 5000);
    driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(activeDuty));
    driver.findElement(activeDuty).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//input[@id='modelObject_RemainOnActiveDuty']"))), 5000);
    driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(By.xpath("//input[@id='modelObject_RemainOnActiveDuty']")));
    driver.findElement(By.xpath("//input[@id='modelObject_RemainOnActiveDuty' and @value='False']")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//input[@id='modelObject_ActiveDutyTo']"))), 5000);
    driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(By.xpath("//input[@id='modelObject_ActiveDutyTo']")));
    driver.findElement(By.xpath("//input[@id='modelObject_ActiveDutyTo']")).sendKeys("Sep 02, 2007");
    driver.sleep(500);
    /*
    driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(homelandDefense));
    driver.findElement(homelandDefense).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//input[@id='modelObject_RemainOnHomelandDefense' and @value='False']"))), 5000);
    driver.sleep(500);
    driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(By.xpath("//input[@id='modelObject_RemainOnHomelandDefense' and @value='False']")));
    driver.findElement(By.xpath("//input[@id='modelObject_RemainOnHomelandDefense' and @value='False']")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//input[@id='modelObject_HomelandDefenseTo']"))), 5000);
    driver.findElement(By.xpath("//input[@id='modelObject_HomelandDefenseTo']")).sendKeys("Sep 02, 2008");
    */
    driver.findElement(saveBtn).click();
    //req.waitForSuccessMsg();
    driver.sleep(2000);
    driver.findElement(income).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'meansTest')]//tr[@data-budgetitem-type='Employment']")));
    
};

module.exports.incomeAndExpenses = incomeAndExpenses;