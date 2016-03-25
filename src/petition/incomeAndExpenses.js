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

module.exports.incomeAndExpenses = incomeAndExpenses;