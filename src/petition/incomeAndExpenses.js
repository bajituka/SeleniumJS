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

var totalSaveBtn = By.xpath("//div[starts-with(@id, 'budgetTabs_')]//div[@id='totalSave']//button[@class='saveButton']");

req.catchUncaughtExceptions();

var incomeBudget = function() {
  
    var budgetTab = By.xpath("//a[text()='Budget']"),
        plusWagesBtn = By.xpath("//div[starts-with(@id, 'Budget')]//tr[@data-budgetitem-type='Employment']//a[contains(@class, 'brandAddBtn')]"),
        plusBusinessBtn = By.xpath("//div[starts-with(@id, 'Budget')]//tr[@data-budgetitem-type='Business']//a[contains(@class, 'brandAddBtn')]"),
        plusRealEstateBtn = By.xpath("//div[starts-with(@id, 'Budget')]//tr[@data-budgetitem-type='RealProperty']//a[contains(@class, 'brandAddBtn')]"),
        plusOtherBtn = By.xpath("//div[starts-with(@id, 'Budget')]//tr[@data-budgetitem-type='Other']//a[contains(@class, 'brandAddBtn')]");
    
    req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.incomeAndExpenses.self, nav.navMatter.petition.incomeAndExpenses.income);
    
    driver.wait(until.elementLocated(budgetTab), 10000);
    driver.findElement(budgetTab).click();
    var isJoint = undefined;
    driver.wait(until.elementLocated(plusWagesBtn), 10000);
    driver.findElements(By.xpath("//li[@data-role='create-jointdebtor-paycheck']")).then(function () {
        isJoint = true
    }, function() {
        isJoint = false
    });
    
    
    
    var cancelBtn = By.xpath("//div[starts-with(@id, 'IncomeSummary_')]//button[@data-role-action='close']");
    //cancel Btn check
    /*
    driver.findElement(plusWagesBtn).click();
    driver.wait(until.elementLocated(cancelBtn));
    driver.findElement(cancelBtn).click();
    driver.wait(until.elementIsNotVisible(driver.findElement(cancelBtn)), 5000);
    */
    
    //add wages
    driver.findElement(plusWagesBtn).click().then(function() {
        if (isJoint == true) {
            var debtor = driver.findElement(By.xpath("//tr[@data-budgetitem-type='Employment']//li[@data-role='create-debtor-paycheck']/a"));
            driver.wait(until.elementIsEnabled(debtor), 5000);
            debtor.click();
        }
    });
    

    driver.wait(until.elementLocated(By.xpath("//select[@id='ModelObject_EmploymentDetailsId']")), 15000);
    driver.findElements(By.xpath("//select[@id='ModelObject_EmploymentDetailsId']/option")).then(function (amount) {
        if (amount.length == 1) {
            driver.findElement(By.xpath("//small[@data-role='new-employmentdetails-button']")).click();
            var searchBtn = By.xpath("//div[@id='employerDropdown']//button[@class='btn-search fg-stratusOrange']"),
                occupation = By.id('modelObject_Title'),
                startDate = By.id('modelObject_EmploymentDates_ValidFrom'),
                endDate = By.id('modelObject_EmploymentDates_ValidTo');
            driver.wait(until.elementIsEnabled(driver.findElement(searchBtn)));
            driver.findElement(searchBtn).click();
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
            driver.sleep(1000);
            driver.findElement(nav.dvxprsPopupFirstRow).click();
            driver.sleep(1000);
            driver.findElement(occupation).sendKeys('Translator');
            driver.findElement(startDate).sendKeys('Oct 11, 2008');
            driver.findElement(endDate).sendKeys('Sep 18, 2013');
        } else {
            driver.findElement(By.xpath("//select[@id='ModelObject_EmploymentDetailsId']/option[2]")).click();
        }
    });
    driver.findElement(By.xpath("//select[@id='modelObject_Frequency']/option[@value='5'][1]")).click();
    driver.findElement(By.xpath("//input[@id='modelObject_Amount' and not(@type='hidden')]")).sendKeys("1000");
    driver.findElement(By.xpath("//input[@id='modelObject_Overtime' and not(@type='hidden')]")).sendKeys("150");
    driver.findElement(By.xpath("//input[@id='deductions_0__Amount' and not(@type='hidden')]")).sendKeys("10");
    driver.findElement(By.xpath("//input[@id='deductions_1__Amount' and not(@type='hidden')]")).sendKeys("20");
    driver.findElement(By.xpath("//input[@id='deductions_2__Amount' and not(@type='hidden')]")).sendKeys("30");
    driver.findElement(By.xpath("//input[@id='deductions_3__Amount' and not(@type='hidden')]")).sendKeys("40");
    
    driver.findElement(By.xpath("//div[@id='deductions']//small[@data-role='add-other-deduction']")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//select[@id='otherDeductions_0__Type']"))), 5000);
    driver.findElement(By.xpath("//select[@id='otherDeductions_0__Type']/option[@value='99'][1]")).click();
    driver.findElement(By.xpath("//input[@id='otherDeductions_0__Other' and not(@type='hidden')]")).sendKeys("Nice description");
    driver.findElement(By.xpath("//input[@id='otherDeductions_0__Amount' and not(@type='hidden')]")).sendKeys("50");
    
    //add business and self employment
    driver.findElement(plusBusinessBtn).click();
    if (isJoint == true) {
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//tr[@data-budgetitem-type='Business']//li[@data-role='create-debtor-paycheck']/a"))), 5000);
        driver.findElement(By.xpath("//tr[@data-budgetitem-type='Business']//li[@data-role='create-debtor-paycheck']/a")).click();
    }
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//tr[@data-budgetitem-type='Business']//input[@id='incomes_0__Amount' and not(@type='hidden')]"))), 5000);
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='Business']//input[@id='incomes_0__Amount' and not(@type='hidden')]")).clear();
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='Business']//input[@id='incomes_0__Amount' and not(@type='hidden')]")).sendKeys("100");
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='Business']//input[@id='incomes_0__BusinessExpenses_0__CurrentMonthAmount' and not(@type='hidden')]")).clear();
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='Business']//input[@id='incomes_0__BusinessExpenses_0__CurrentMonthAmount' and not(@type='hidden')]")).sendKeys("90");
    
    //add real estate
    driver.findElement(plusRealEstateBtn).click();
    if (isJoint == true) {
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//tr[@data-budgetitem-type='RealProperty']//li[@data-role='create-debtor-paycheck']/a"))), 5000);
        driver.findElement(By.xpath("//tr[@data-budgetitem-type='RealProperty']//li[@data-role='create-debtor-paycheck']/a")).click();
    }
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//tr[@data-budgetitem-type='RealProperty']//input[@id='incomes_0__Amount' and not(@type='hidden')]"))), 5000);
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='RealProperty']//input[@id='incomes_0__Amount' and not(@type='hidden')]")).clear();
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='RealProperty']//input[@id='incomes_0__Amount' and not(@type='hidden')]")).sendKeys("200");
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='RealProperty']//input[@id='incomes_0__RealPropertyExpenses_0__CurrentMonthAmount' and not(@type='hidden')]")).clear();
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='RealProperty']//input[@id='incomes_0__RealPropertyExpenses_0__CurrentMonthAmount' and not(@type='hidden')]")).sendKeys("190");

    //add other
    driver.findElement(plusOtherBtn).click();
    if (isJoint == true) {
        driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//tr[@data-budgetitem-type='Other']//li[@data-role='create-debtor-paycheck']/a"))), 5000);
        driver.findElement(By.xpath("//tr[@data-budgetitem-type='Other']//li[@data-role='create-debtor-paycheck']/a")).click();
    }
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//tr[@data-budgetitem-type='Other']//input[@id='incomes_0__Amount' and not(@type='hidden')]"))), 5000);
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='Other']//input[@id='incomes_0__Amount' and not(@type='hidden')]")).clear();
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='Other']//input[@id='incomes_0__Amount' and not(@type='hidden')]")).sendKeys("300");
    
    //add interest
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='Interest']//input[@id='Debtor1Average' and not(@type='hidden')]")).sendKeys("50");
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='Royalties']//input[@id='Debtor1Average' and not(@type='hidden')]")).sendKeys("51");
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='Dividends']//input[@id='Debtor1Average' and not(@type='hidden')]")).sendKeys("52");
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='Alimony']//input[@id='Debtor1Average' and not(@type='hidden')]")).sendKeys("53");
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='ChildSupport']//input[@id='Debtor1Average' and not(@type='hidden')]")).sendKeys("54");
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='Unemployment']//input[@id='Debtor1Average' and not(@type='hidden')]")).sendKeys("55");
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='OtherGovAssistance']//input[@id='Debtor1Average' and not(@type='hidden')]")).sendKeys("56");
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='FoodAssistancePrograms']//input[@id='Debtor1Average' and not(@type='hidden')]")).sendKeys("57");
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='PensionOrRetirement']//input[@id='Debtor1Average' and not(@type='hidden')]")).sendKeys("58");
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='Annuity']//input[@id='Debtor1Average' and not(@type='hidden')]")).sendKeys("59");
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='SSI']//input[@id='Debtor1Average' and not(@type='hidden')]")).sendKeys("60");
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='ShortTermDisability']//input[@id='Debtor1Average' and not(@type='hidden')]")).sendKeys("61");
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='LongTermDisability']//input[@id='Debtor1Average' and not(@type='hidden')]")).sendKeys("62");
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='WorkersCompensation']//input[@id='Debtor1Average' and not(@type='hidden')]")).sendKeys("63");
    driver.findElement(By.xpath("//tr[@data-budgetitem-type='VoluntaryHouseholdContributions']//input[@id='Debtor1Average' and not(@type='hidden')]")).sendKeys("64");
    
    driver.findElement(totalSaveBtn).click();
    req.waitForSuccessMsg();
};
















var incomeAndExpenses = function() {
    
    var employmentDetails = By.xpath("//a[text()='Employment Details']"),
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
    
    req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.incomeAndExpenses.self);
    
    //INCOME
    
    
    //employment details
    driver.wait(until.elementLocated(employmentDetails));
    driver.findElement(employmentDetails).click();
    driver.wait(until.elementLocated(By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow0') or contains(@id, 'DXEmptyRow')]")));
    
    driver.wait(until.elementLocated(incomeChanges));
    driver.findElement(incomeChanges).click();
    driver.wait(until.elementLocated(By.xpath("//input[@id='incomeChanges']")));
    
    //expenses
    req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.incomeAndExpenses.self, nav.navMatter.petition.incomeAndExpenses.expenses);
    driver.wait(until.elementLocated(By.id("assetIdForMortgagePayment")));
    //driver.wait(until.elementLocated(By.xpath("//*[@id='expenseChanges' and @value='True']")));
    
    //MEANS TEST
    //details
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
    
    req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.incomeAndExpenses.self, nav.navMatter.petition.incomeAndExpenses.meansTest);
    
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
  
    //income
    driver.findElement(income).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'meansTest')]//tr[@data-budgetitem-type='Employment']")));
    
    //driver.findElement(By.xpath("//div[starts-with(@id, 'meansTest')]//tr[@data-budgetitem-type='Employment']//small[@data-role='create-debtor-paycheck']")).click();
    
};

module.exports.incomeAndExpenses = incomeAndExpenses;
module.exports.incomeBudget = incomeBudget;