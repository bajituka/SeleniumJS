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




var crudEvents = function() {
  
    var activities = By.xpath("//div[starts-with(@id, 'entityEventTabs')]//a[text()='Activities']"),
        appointments = By.xpath("//div[starts-with(@id, 'entityEventTabs')]//a[text()='Appointments']"),
        tasks = By.xpath("//div[starts-with(@id, 'entityEventTabs')]//a[text()='Tasks']"),
        emails = By.xpath("//div[starts-with(@id, 'entityEventTabs')]//a[text()='Emails']");
        
    var activitesNewBtn = By.xpath("//div[starts-with(@id, 'activities_entityEventTabs')]//a[contains(@class, 'gridBtn-new')]"),
        appointmentsNewBtn = By.xpath("//div[starts-with(@id, 'appointments_entityEventTabs')]//a[contains(@class, 'gridBtn-new')]"),
        tasksNewBtn = By.xpath("//div[starts-with(@id, 'tasks_entityEventTabs')]//a[contains(@class, 'gridBtn-new')]"),
        emailsNewBtn = By.xpath("//div[starts-with(@id, 'emails_entityEventTabs')]//a[contains(@class, 'gridBtn-new')]");
        
    var activitiesEmptyRow = By.xpath("//div[starts-with(@id, 'activities_entityEventTabs')]//tr[contains(@id, 'DXEmptyRow')]"),
        appointmentsEmptyRow = By.xpath("//div[starts-with(@id, 'appointments_entityEventTabs')]//tr[contains(@id, 'DXEmptyRow')]"),
        tasksEmptyRow = By.xpath("//div[starts-with(@id, 'tasks_entityEventTabs')]//tr[contains(@id, 'DXEmptyRow')]"),
        emailsEmptyRow = By.xpath("//div[starts-with(@id, 'emails_entityEventTabs')]//tr[contains(@id, 'DXEmptyRow')]");
    
    driver.wait(until.elementLocated(nav.navContact.profile.events));
    driver.findElement(nav.navContact.profile.events).click();
    
    
    
};