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



var income = {

    budget: function () {

       var budgetTab = By.xpath("//a[text()='Budget']"),
            plusWagesBtn = By.xpath("//div[starts-with(@id, 'Budget')]//tr[@data-budgetitem-type='Employment']//a[contains(@class, 'brandAddBtn')]"),
            saveBtn = By.xpath("//div[contains(@id, 'budgetsTab')]//button[@class='saveButton']");

        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.incomeAndExpenses.self, nav.navMatter.petition.incomeAndExpenses.income);
    
        driver.wait(until.elementLocated(budgetTab), 10000);
        driver.findElement(budgetTab).click();
        driver.wait(until.elementLocated(plusWagesBtn), 10000);
        
        driver.findElement(By.xpath("(//form[@action='/Budgets/Budgets']//input[@id='Debtor1Average'][not(@type='hidden')])[1]")).sendKeys("100");
        driver.findElement(saveBtn).click();
        util.waitForSuccessMsg();

    },


    employmentDetails: function() {

        var saveBtn = By.xpath("//div[contains(@id, 'employmentDetailsDebtor1Tab')]//button[@class='saveButton']"),
            employmentDetails = By.xpath("//a[text()='Employment Details']"),
            newBtn = By.xpath("//div[contains(@id, 'employmentDetailsDebtor1Tab')]//a[@class='element brand gridBtn-new']");

        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.incomeAndExpenses.self, nav.navMatter.petition.incomeAndExpenses.income);

        driver.wait(until.elementLocated(employmentDetails), 15000);
        driver.findElement(employmentDetails).click();

        var emptyRow = By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXEmptyRow')]");
        driver.wait(until.elementLocated(emptyRow), 15000);
        
        //add employer
        driver.findElement(newBtn).click();
        var searchBtn = By.xpath("//section[starts-with(@id, 'EmploymentDetail')]//button[@class='btn-search fg-stratusOrange right-0']");
        driver.wait(until.elementLocated(searchBtn), 15000);
        driver.sleep(1000);
        driver.findElement(searchBtn).click();
        util.selectDvxprsFirstRow();
        driver.sleep(1000);
        driver.findElement(saveBtn).click();
        var firstRow = By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow0')]");
        driver.wait(until.elementLocated(firstRow), 15000);

        //update employer
        driver.findElement(firstRow).click();
        var inputOccupation = By.xpath("//input[@id='modelObject_Title']");
        driver.wait(until.elementLocated(inputOccupation), 10000);
        var inputOccupationEl = driver.findElement(inputOccupation);
        driver.sleep(500);
        inputOccupationEl.sendKeys('QA Engineer');
        driver.findElement(saveBtn).click();
        driver.wait(until.stalenessOf(inputOccupationEl), 15000);
        driver.sleep(1000);

        //delete employer
        var firstRowEl = driver.findElement(firstRow);
        driver.findElement(By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow0')]//a")).click();
        util.confirmDelete();
        driver.wait(until.stalenessOf(firstRowEl), 15000);

    },


    incomeChanges: function() {

        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.incomeAndExpenses.self, nav.navMatter.petition.incomeAndExpenses.income);

        var incomeChanges = By.xpath("//a[text()='Income Changes']"),
            saveBtn = By.xpath("//div[contains(@id, 'IncomeChanges')]//button[@class='saveButton']");

        driver.wait(until.elementLocated(incomeChanges), 10000);
        driver.findElement(incomeChanges).click();
        var radioYes = By.xpath("//input[@id='incomeChanges'][@value='True']");
        driver.wait(until.elementLocated(radioYes), 10000);
        driver.findElement(radioYes).click();
        driver.sleep(500);
        var inputChanges = driver.findElement(By.xpath("//input[@id='IncomeAnticipatedChanges']"));
        driver.wait(until.elementIsEnabled(inputChanges), 2000);
        inputChanges.sendKeys('There are some anticipated changes');
        driver.findElement(saveBtn).click();
        util.waitForSuccessMsg();

    }

};


var expenses = {

    debtorOne: function() {

        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.incomeAndExpenses.self, nav.navMatter.petition.incomeAndExpenses.expenses);

        var saveBtn = By.xpath("//div[starts-with(@id, 'expenses')]//button[@type='submit']");
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'expenses')]//ul[@class='tabs']")), 15000);
        driver.findElements(By.xpath("//div[starts-with(@id, 'expenses')]//ul[@class='tabs']/li")).then(function(tabs) { //get amount of tabs
            for(let index = 1; index <= tabs.length; index++) {
                driver.findElement(By.xpath("//div[starts-with(@id, 'expenses')]//ul[@class='tabs']/li[" + index + "]/a")).click(); //click through all tabs
                driver.sleep(500);
                driver.findElement(By.xpath("(//div[starts-with(@id, 'expenses')]//div[contains(@id, 'IncomeSummary')][contains(@class, 'frame')][@style='display: block;']//input[not(@type='hidden')])[1]")).sendKeys('10'); //populate the first input of every tab
            }
        });
        driver.findElement(saveBtn).click();

    },

    debtorTwo: function() {

        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.incomeAndExpenses.self, nav.navMatter.petition.incomeAndExpenses.codebtorExpenses);

        var saveBtn = By.xpath("//div[starts-with(@id, 'codebtor-expenses')]//button[@type='submit']");
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'codebtor-expenses')]//ul[@class='tabs']")), 15000);
        driver.findElements(By.xpath("//div[starts-with(@id, 'codebtor-expenses')]//ul[@class='tabs']/li")).then(function(tabs) { //get amount of tabs
            for(let index = 1; index <= tabs.length; index++) {
                driver.findElement(By.xpath("//div[starts-with(@id, 'codebtor-expenses')]//ul[@class='tabs']/li[" + index + "]/a")).click(); //click through all tabs
                driver.sleep(500);
                driver.findElement(By.xpath("(//div[starts-with(@id, 'codebtor-expenses')]//div[contains(@id, 'IncomeSummary')][contains(@class, 'frame')][@style='display: block;']//input[not(@type='hidden')])[1]")).sendKeys('10'); //populate the first input of every tab
            }
        });
        driver.findElement(saveBtn).click();

    }

};


var meansTest = {

    detailsTab: By.xpath("//div[starts-with(@id, 'meansTestTabs')]//a[text()='Details']"),
    incomeTab: By.xpath("//div[starts-with(@id, 'meansTestTabs')]//a[text()='Income']"),
    incomeDeductionsTab: By.xpath("//div[starts-with(@id, 'meansTestTabs')]//a[text()='Income Deductions']"),
    deductionsTab: By.xpath("//div[starts-with(@id, 'meansTestTabs')]//a[text()='Deductions']"),
    changesTab: By.xpath("//div[starts-with(@id, 'meansTestTabs')]//a[text()='Changes in Income or Expenses']"),

    details: function() {
        
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.incomeAndExpenses.self, nav.navMatter.petition.incomeAndExpenses.meansTest);
        util.navigateTo(this.detailsTab);

        var saveBtn = By.xpath("//div[starts-with(@id, 'detailsmeansTest')]//button[@type='submit']");

        var addBtn = By.xpath("//div[@id='btnMaritalAdjustments']//div[contains(@class, 'add-adjustment-button')]"),
        description = By.xpath("//input[@id='maritalExclusions_0__Description']"),
        percentage = By.xpath("//input[@id='maritalExclusions_0__Amount' and not(@type='hidden')]"),
        comments = By.xpath("//textarea[@id='modelObject_Comment']"),
        militaryService = By.xpath("//div[starts-with(@id, 'MeansTest_')]//div[contains(@class, 'panel-header')]"),
        disabledVeteran = By.xpath("//input[@id='modelObject_DisabledVeteran']"),
        reservist = By.xpath("//input[@id='modelObject_ReservistOrNationalGuard']"),
        activeDuty = By.xpath("//input[@id='active-duty-check']"),
        homelandDefense = By.xpath("//input[@id='homeland-check']");

        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'meansTest')]//input[@id='Zip']")), 10000);
        driver.sleep(1500);
        
        driver.findElement(addBtn).click();
        driver.wait(until.elementLocated(description), 5000);
        driver.findElement(description).sendKeys('Marital description');
        driver.findElement(percentage).clear();
        driver.findElement(percentage).sendKeys('50.4');
        
        driver.findElement(comments).sendKeys('These are some nice comments for Means Test');
        
        driver.findElement(militaryService).click().then(function() {
        
            driver.wait(until.elementIsEnabled(driver.findElement(disabledVeteran)), 5000);
            driver.findElement(disabledVeteran).click();
            driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//input[@id='modelObject_DisabledVeteranActivity' and @value='True']"))), 5000);
            driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(By.xpath("//input[@id='modelObject_DisabledVeteranActivity' and @value='True']")));
            driver.findElement(By.xpath("//input[@id='modelObject_DisabledVeteranActivity' and @value='True']")).click();
            /*
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
            */
        });

        driver.findElement(saveBtn).click();
        util.waitForSuccessMsg();

    },


    income: function() {

        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.incomeAndExpenses.self, nav.navMatter.petition.incomeAndExpenses.meansTest);
        driver.wait(until.elementLocated(this.incomeTab), 15000);
        driver.findElement(this.incomeTab).click();

        var saveBtn = By.xpath("//div[starts-with(@id, 'incomenewmeansTest')]//button[@type='submit']");
        var interestInput = By.xpath("//td[@class='means-test-single-entry'][@data-pe-type='Interest']//input[@id='Debtor1Average'][not(@type='hidden')]");
        driver.wait(until.elementLocated(interestInput), 15000);
        driver.findElement(interestInput).sendKeys('10000');
        driver.findElement(saveBtn).click();
        util.waitForSuccessMsg();

    },

    incomeDeductions: function() {

        var standardsAndExpensesTab = By.xpath("//a[text()='Standards & Expenses']"),
            additionalExpensesTab = By.xpath("//a[text()='Additional Expenses']"),
            specialCircumstanceExpensesTab = By.xpath("//a[text()='Special Circumstance Expenses']");

        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.incomeAndExpenses.self, nav.navMatter.petition.incomeAndExpenses.meansTest);

        //Standard and Expenses
        util.navigateTo(this.incomeDeductionsTab, standardsAndExpensesTab);
        driver.wait(until.elementLocated(By.xpath("//div[@data-title='National Food, Apparel & Services']")), 15000);

        driver.findElements(By.xpath("//div[starts-with(@data-action, '/MeansTest/StandardsExpensesDialogs')]")).then(function(entries) { //click through Standards and Expenses subtab
            for(let index = 1; index <= entries.length; index++) {
                driver.findElement(By.xpath("(//div[starts-with(@data-action, '/MeansTest/StandardsExpensesDialogs')])[" + index + "]")).click();
                driver.wait(until.elementLocated(By.xpath("//button[@type='submit'][@data-role-action='close']")), 15000);
                var saveBtn = driver.findElement(By.xpath("//button[@type='submit'][@data-role-action='close']"));
                saveBtn.click();
                driver.wait(until.stalenessOf(saveBtn), 10000);
                driver.sleep(3000); //it takes much time for the page to refresh
            }
        });

        //Additional Expenses
        util.navigateTo(additionalExpensesTab);
        driver.wait(until.elementLocated(By.xpath("//*[@id='btnIncomeDeductions']/h4")), 15000);

        driver.findElements(By.xpath("//div[@data-title='IRS Standards']")).then(function(entries) { //click through Additional Expenses subtab
            for(let index = 1; index <= entries.length; index++) {
                driver.findElement(By.xpath("(//div[@data-title='IRS Standards'])[" + index + "]")).click();
                driver.wait(until.elementLocated(By.xpath("//button[@type='submit'][@data-role-action='close']")), 15000);
                var saveBtn = driver.findElement(By.xpath("//button[@type='submit'][@data-role-action='close']"));
                saveBtn.click();
                driver.wait(until.stalenessOf(saveBtn), 10000);
                driver.sleep(3000); //it takes much time for the page to refresh
            }
        });

        //Special Circumstance Expenses
        util.navigateTo(specialCircumstanceExpensesTab);
        driver.wait(until.elementLocated(By.xpath("//select[starts-with(@id, 'MeansTestSpecialCircumstances')]")), 15000);
        driver.findElement(By.xpath("//select[starts-with(@id, 'MeansTestSpecialCircumstances')]/option[@value='2']")).click();
        driver.findElement(By.xpath("//textarea[starts-with(@id, 'MeansTestSpecialCircumstances')]")).sendKeys("Sell medications");
        driver.findElement(By.xpath("//input[starts-with(@id, 'MeansTestSpecialCircumstances')][not(@type='hidden')]")).sendKeys("10");
        driver.findElement(By.xpath("//div[starts-with(@id, 'specialexpenses')]//button[@type='submit']")).click();
        util.waitForSuccessMsg();

    },

    deductions: function() {

        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.incomeAndExpenses.self, nav.navMatter.petition.incomeAndExpenses.meansTest);
        util.navigateTo(this.deductionsTab);
        driver.wait(until.elementLocated(By.xpath("//*[starts-with(@id, 'deductionsmeansTestTabs')]//button[@type='submit']")), 15000);
        driver.findElement(By.xpath("//*[starts-with(@id, 'deductionsmeansTestTabs')]//button[@type='submit']")).click();
        util.waitForSuccessMsg();

    },

    changesInIncomeOrExpenses: function() {

        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.incomeAndExpenses.self, nav.navMatter.petition.incomeAndExpenses.meansTest);
        util.navigateTo(this.changesTab);
        driver.wait(until.elementLocated(By.xpath("//a[@title='Add Change']")), 10000);
        driver.findElement(By.xpath("//a[@title='Add Change']")).click();
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'MeansTestChanges')]//select")), 10000);
        driver.findElement(By.xpath("//*[starts-with(@id, 'meansTestChangesInIncomeOrExpensesTabs')]//button[@type='submit']")).click();
        util.waitForSuccessMsg();
    }

};

module.exports = {
    income: income,
    expenses: expenses,
    meansTest: meansTest
};

/*
var crudEmployment = function() {
    
    var emplDetailsNewBtn = By.xpath("//div[starts-with(@id, 'details_employmentIncomesTabs_')]//a[@data-pe-navigationtitle='Create']"),
        emplDetailsSrchBtn = By.xpath("//section[starts-with(@id, 'EmploymentDetail_')]//button[contains(@class, 'btn-search fg-stratusOrange')]"),
        emplDetailsSaveBtn = By.xpath("//article[@id='employmentDetailsList']//button[@type='submit']"),
        emplDetailsSaveAndCloseBtn = By.xpath("//article[@id='employmentDetailsList']//button[@type='submit']"),
        occupation = By.id('modelObject_Title'),
        startDate = By.id('modelObject_EmploymentDates_ValidFrom'),
        endDate = By.id('modelObject_EmploymentDates_ValidTo'),
        currentJob = By.id('modelObject_IsCurrent'),
        emptyRow = By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow0')]"),
        secondRow = By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow1')]");
    
    
    driver.findElement(nav.navContact.profile.income.self).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'paychecks_employmentIncomesTabs_')]//tr[contains(@id, 'DXEmptyRow')]")), 10000);
        
        
        
        driver.findElement(nav.navContact.profile.income.employmentDetails).click();
        driver.wait(until.elementLocated(emptyRow), 10000);
        
            //ADD THE FIRST JOB
            driver.findElement(emplDetailsNewBtn).click();
            driver.wait(until.elementLocated(emplDetailsSrchBtn), 10000);
            driver.sleep(1000);
            driver.findElement(emplDetailsSrchBtn).click();
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
            driver.sleep(1500);
            var employer = undefined;
            driver.findElement(nav.dvxprsPopupFirstRow).getText().then(function(employerName) {
                employer = employerName.trim()
            });
            driver.findElement(nav.dvxprsPopupFirstRow).click();
            driver.sleep(1000);
            driver.findElement(By.id('modelObject_EmployerId_client_name')).getAttribute('value').then(function (employerNameInInput) {
                assert.equal(employerNameInInput.trim(), employer)
            });
            driver.findElement(occupation).sendKeys('Translator');
            driver.findElement(startDate).sendKeys('Oct 11, 2008');
            driver.findElement(endDate).sendKeys('Sep 18, 2013');
            driver.findElement(emplDetailsSaveBtn).click();
            //util.waitForSuccessMsg();
            driver.wait(until.elementLocated(firstRow), 10000).then(function() {
                //console.log('First job added OK')
                driver.sleep(1000);
                var firstJob = [employer, 'Translator', '10/11/2008', '9/18/2013', ''];
                firstJob.forEach(function(item, i, arr) {
                    
                    driver.findElement(By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow0')]/td[" + (i + 2) + "]")).getText().then(function(data) {
                        assert.equal(data, firstJob[i])
                    });
                });
            });
            
            //ADD THE SECOND JOB
            driver.findElement(emplDetailsNewBtn).click();
            driver.wait(until.elementLocated(emplDetailsSrchBtn), 10000);
            driver.sleep(500);
            driver.findElement(emplDetailsSrchBtn).click();
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
            driver.sleep(1500);
            driver.findElement(nav.dvxprsPopupFirstRow).click();
            driver.sleep(1000);
            driver.findElement(occupation).sendKeys('QA Engineer');
            driver.findElement(startDate).sendKeys('May 19, 2015');
            driver.findElement(currentJob).click();
            driver.findElement(emplDetailsSaveBtn).click();
            //util.waitForSuccessMsg();
            
            driver.wait(until.elementLocated(secondRow), 10000).then(function() {
                //console.log('Second job added OK')
                driver.sleep(1000);
                var secondJob = [employer, 'QA Engineer', '5/19/2015', 'n/a', ''];
                secondJob.forEach(function(item, i, arr) {
                    driver.findElement(By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow1')]/td[" + (i + 2) + "]")).getText().then(function(data) {
                        assert.equal(data, secondJob[i])
                    });
                });
            });
            
            driver.findElement(By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow1')]/td[6]/i")).catch(function(err) {
                console.log('Current Job is not set FAIL')
            });
            
            //UPDATE THE SECOND JOB
            driver.findElement(secondRow).click();
            driver.wait(until.elementLocated(emplDetailsSrchBtn), 10000);
            driver.findElement(emplDetailsSrchBtn).click();
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
            driver.sleep(1500);
            driver.findElement(nav.dvxprsPopupSecondRow).getText().then(function(employerName) {
                employer = employerName.trim()
            });
            driver.findElement(nav.dvxprsPopupSecondRow).click();
            driver.sleep(1500);
            driver.findElement(By.id('modelObject_EmployerId_client_name')).getAttribute('value').then(function (employerNameInInput) {
                assert.equal(employerNameInInput.trim(), employer)
            });
            driver.findElement(occupation).clear();
            driver.findElement(startDate).clear();
            driver.findElement(currentJob).click();
            driver.findElement(occupation).sendKeys('President');
            driver.findElement(startDate).sendKeys('May 07, 2000');
            driver.findElement(endDate).sendKeys('May 19, 2012');
            driver.findElement(emplDetailsSaveAndCloseBtn).click();
            //util.waitForSuccessMsg();
            driver.wait(until.elementIsVisible(driver.findElement(secondRow)), 10000).then(function() {
                
                //console.log('Second job updated OK');
                driver.sleep(1000);
                var changedSecondJob = [employer, 'President', '5/7/2000', '5/19/2012', ''];
                changedSecondJob.forEach(function(item, i, arr) {
                    driver.findElement(By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow1')]/td[" + (i + 2) + "]")).getText().then(function(data) {
                        assert.equal(data, changedSecondJob[i])
                    });
                });
                
                //DELETE THE SECOND JOB
                new util.webdriver.ActionSequence(driver).
                    mouseMove(driver.findElement(secondRow)).
                    click(driver.findElement(By.xpath("//article[@id='employmentDetailsList']//tr[contains(@id, 'DXDataRow1')]//a"))).
                    perform();

                util.confirmDelete();
                driver.sleep(2000);
                driver.findElement(secondRow).then(function() {
                    console.log('Second job was not deleted FAIL');
                }, function() {
                    //console.log('Second job was deleted OK');
                });
                    
            }, function(err) {
                console.log('Updated row did not appear FAIL ' + err.name)
            });
    
};
*/