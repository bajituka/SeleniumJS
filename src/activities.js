var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    test = require('../src/testdata.js');

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;
    
var totalSaveBtn = By.xpath("//*[@id='totalSave']/div/button");

driver.manage().timeouts().implicitlyWait(2000);
req.catchUncaughtExceptions();

var createActivity = function() {
    
    driver.wait(until.elementLocated(By.xpath("//select[@id='modelObject_ListTypeId']")), 10000);
    var saveBtn = driver.findElement(By.xpath("//section[starts-with(@id, 'Activity_')]//button[@type='submit']"));
    
    driver.findElement(By.xpath("//select[@id='modelObject_ListTypeId']/option[@value='19']")).click();
    driver.findElement(By.id('modelObject_Duration_days')).sendKeys('2');
    driver.findElement(By.id('modelObject_Duration_hours')).sendKeys('4');
    driver.findElement(By.id('modelObject_Duration_minutes')).sendKeys('6');
    driver.findElement(By.id('modelObject_Description')).sendKeys('This is some nice activity description');
    driver.findElement(By.xpath("//div[starts-with(@id, 'cases_listActivity_View_')]//button[contains(@class, 'btn-search')]")).click();
    driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
    driver.sleep(1500);
    driver.findElement(nav.dvxprsPopupFirstRow).click();
    driver.sleep(1500);
    driver.findElement(By.xpath("//div[starts-with(@id, 'contacts_listActivity_View_')]//button[contains(@class, 'btn-search')]")).click().then(function() {
        driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
        driver.sleep(1500);
        driver.findElement(nav.dvxprsPopupFirstRow).click();
        driver.sleep(1500);
    }, function(err) {
        //in a contact, the acitivity is already associated
    });
    
    saveBtn.click();
    driver.wait(until.stalenessOf(saveBtn), 5000);
    
};

var dashboardActivities = function() {
    
    var emptyRow = By.xpath("//div[@data-pe-gridviewtabletype='activitiesGridView']//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//div[@data-pe-gridviewtabletype='activitiesGridView']//tr[contains(@id, 'DXDataRow0')]"),
        newBtn = By.xpath("//div[@data-pe-gridviewtabletype='activitiesGridView']//a[contains(@class, 'gridBtn-new')]");
        
    driver.wait(until.elementLocated(nav.navBar.view.self), 5000);
    driver.findElement(nav.navBar.view.self).click();
    driver.wait(until.elementIsEnabled(driver.findElement(nav.navBar.view.activities)), 5000);
    driver.findElement(nav.navBar.view.activities).click();
    
    driver.wait(until.elementLocated(firstRow), 10000);
    driver.wait(until.elementLocated(newBtn), 10000);
    
    //add
    driver.findElement(newBtn).click();
    
    createActivity();
    
    //update
    driver.findElement(By.xpath("//table[contains(@id, 'DXHeaderTable')]//input[contains(@id, 'DXFREditorcol2_I')]")).sendKeys('This is some nice activity description');
    driver.sleep(3000);
    driver.findElement(firstRow).click();
    
    driver.wait(until.elementLocated(By.id('modelObject_Description')), 10000);
    driver.findElement(By.id('modelObject_Description')).clear();
    driver.findElement(By.id('modelObject_Description')).sendKeys('Updated');
    driver.findElement(By.xpath("//section[starts-with(@id, 'Activity_')]//button[@type='submit']")).click();
    driver.sleep(3000);
    driver.findElement(By.xpath("//table[contains(@id, 'DXHeaderTable')]//input[contains(@id, 'DXFREditorcol2_I')]")).clear();
    driver.findElement(By.xpath("//table[contains(@id, 'DXHeaderTable')]//input[contains(@id, 'DXFREditorcol2_I')]")).sendKeys('Updated');
    driver.sleep(3000);
    driver.findElement(By.xpath("//div[@data-pe-gridviewtabletype='activitiesGridView']//tr[contains(@id, 'DXDataRow0')]//td[6]/a")).click();
    req.confirmDelete();
    driver.wait(until.elementLocated(emptyRow), 10000);
    
};



var contactActivities = function() {
  
    var activitiesTab = By.xpath("//div[starts-with(@id, 'entityEventTabs')]//a[text()='Activities']");
    
    var newBtn = By.xpath("//div[@data-pe-gridviewtabletype='activitiesGridView']//a[contains(@class, 'gridBtn-new')]"),
        firstRow = By.xpath("//div[@data-pe-gridviewtabletype='activitiesGridView']//tr[contains(@id, 'DXDataRow0')]"),
        emptyRow = By.xpath("//div[@data-pe-gridviewtabletype='activitiesGridView']//tr[contains(@id, 'DXEmptyRow')]");
        
        
    var activitiesEmptyRow = By.xpath("//div[starts-with(@id, 'activities_entityEventTabs')]//tr[contains(@id, 'DXEmptyRow')]");
    
    driver.wait(until.elementLocated(nav.navContact.profile.events));
    driver.findElement(nav.navContact.profile.events).click();
    driver.wait(until.elementLocated(activitiesTab), 5000);
    driver.findElement(activitiesTab).click();
    driver.wait(until.elementLocated(newBtn), 5000);
    
    //add
    driver.findElement(newBtn).click();
    
    createActivity();
    
    //update
    driver.findElement(firstRow).click();
    
    driver.wait(until.elementLocated(By.id('modelObject_Description')), 10000);
    driver.findElement(By.id('modelObject_Description')).clear();
    driver.findElement(By.id('modelObject_Description')).sendKeys('Updated');
    driver.findElement(By.xpath("//section[starts-with(@id, 'Activity_')]//button[@type='submit']")).click();
    driver.sleep(2000);
    driver.findElement(By.xpath("//div[@data-pe-gridviewtabletype='activitiesGridView']//tr[contains(@id, 'DXDataRow0')]//td[6]/a")).click();
    req.confirmDelete();
    driver.wait(until.elementLocated(emptyRow), 10000);
};

module.exports = {
    dashboardActivities: dashboardActivities,
    contactActivities: contactActivities
};