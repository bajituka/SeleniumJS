var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
    test = require('../src/testdata.js'),
    sofa = require('../src/petition/sofa.js');

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;

var name = By.id('modelObject_Title');
    
req.catchUncaughtExceptions();

var createTask = function(date) {
    
    var dueDate = By.id('modelObject_DueDate'),
        //completed = By.id('modelObject_Completed'),
        description = By.id('modelObject_Description');
        
    var assocMatterBtn = By.xpath("//div[@id='cases_list']//button"),
        assocContactBtn = By.xpath("//div[@id='contacts_list']//button");
    
    var saveBtnNoCancel = By.xpath("//form[@id='taskForm']//button[@class='saveButton']"),
        saveBtnCancel = By.xpath("//section[starts-with(@id, 'Task_')]//div[@name='task_saveCancelButtons']//button[@data-role-action='save']");
    
    var cancelBtn = By.xpath("//section[starts-with(@id, 'Task_')]//div[@name='task_saveCancelButtons']//button[@data-role-action='close']");
    
    var hasCancelBtn = undefined;
    
    driver.wait(until.elementLocated(name), 10000).then(function() {
        
        driver.sleep(1000);
        
        driver.findElement(cancelBtn).then(function() {
            hasCancelBtn = true 
        }, function() {
            hasCancelBtn = false
        });
        
        driver.findElement(dueDate).sendKeys(date);
        driver.findElement(name).sendKeys('Z in the front');
        driver.findElement(description).sendKeys('Let your feet stomp');
        driver.findElement(assocMatterBtn).then(function() {
            driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(assocMatterBtn));
            driver.findElement(assocMatterBtn).click();
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 10000);
            driver.sleep(1500);
            driver.findElement(nav.dvxprsPopupFirstRow).click();
            driver.wait(until.elementIsVisible(driver.findElement(assocMatterBtn)), 5000);
            driver.sleep(1000);
        }, function() {
            
        });
        driver.findElement(assocContactBtn).then(function() {
            driver.findElement(assocContactBtn).click();
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 5000);
            driver.sleep(1500);
            driver.findElement(nav.dvxprsPopupFirstRow).click();
            driver.wait(until.elementIsVisible(driver.findElement(assocContactBtn)), 5000);
            driver.sleep(1000);
        }, function() {
            
        });
        
        
        driver.findElement(name).then(function() {
            if (hasCancelBtn == false) {
                driver.findElement(saveBtnNoCancel).click();
            } else {
                driver.findElement(saveBtnCancel).click();
            }
        });
        
    }, function(err) {
        console.log('Tasks form did not appear FAIL ' + err);
        req.saveScreenshot('TasksFormNotAppeared.png')
    });

};


var dashboardTasks = function() {
    
    var newBtn = By.id('btnCreateTask');
    var saveBtn = By.xpath("//form[@id='taskForm']//button[@class='saveButton']");
    
    var firstRow = "//div[contains(@class, 'list-group')][1]//div[contains(@class, 'hoverContainer')][1]";
    
    //'see all' button check
    driver.findElement(By.id('btnSeeAllTasks')).click();
    driver.wait(until.elementLocated(By.xpath("//tr[contains(@id, 'tasksGrid_') and contains(@id, 'DXDataRow0')]")), 10000).then(function() {
        req.closeTabs();
    }, function(err) {
        console.log('See all button doesnt work ' + err);
        req.saveScreenshot('SeeAllBtnNotWorking.png')
    });
  
    //add
    driver.findElement(newBtn).click();
    createTask(req.currentDate());
    driver.wait(until.elementLocated(By.xpath(firstRow + "//div[@class='task-title']")), 5000).thenCatch(function() {
        console.log('Task from dashboard not added FAIL');
        req.saveScreenshot('TaskFromDashboardNotAdded.png')
    });
    driver.sleep(1000);
    
    //update
    new req.webdriver.ActionSequence(driver).
            mouseMove(driver.findElement(By.xpath(firstRow))).
            click(driver.findElement(By.xpath(firstRow + "//a[@data-hint='Edit']"))).
            perform();
    driver.wait(until.elementLocated(name), 10000).then(function() {
        driver.sleep(1000);
        driver.findElement(By.xpath("//div[@class='caption']//div[contains(@class, 'title')]")).getText().then(function(title) {
            assert.equal(title, 'Update Task')
        });
        driver.findElement(name).clear();
        driver.findElement(name).sendKeys('Updated');
        driver.findElement(saveBtn).click();
        driver.sleep(1000);
        driver.wait(until.elementIsVisible(driver.findElement(By.xpath(firstRow))), 5000).then(function() {
            driver.sleep(1000);
            driver.findElement(By.xpath(firstRow + "//div[@class='task-title']")).getText().then(function(title) {
                assert.equal(title, 'Updated')
            });
        }, function(err) {
            console.log('Tasks form not closed after updating FAIL ' + err);
            req.saveScreenshot('TasksFormNotClosedAfterUpdating.png')
        });
        
        //delete
        new req.webdriver.ActionSequence(driver).
            mouseMove(driver.findElement(By.xpath(firstRow))).
            click(driver.findElement(By.xpath(firstRow + "//a[@data-hint='Remove']"))).
            perform();
        req.confirmDelete();
        driver.wait(until.elementLocated(By.xpath("//div[@id='Tasks_Tab']//div[contains(@class, 'list-group')][1]//td[@class='dataTables_empty']")), 5000).thenCatch(function(err) {
            console.log('Task not deleted FAIL ' + err);
            req.saveScreenshot('TasksFormNotDeleted.png')
        });
        
    }, function(err) {
        console.log('Tasks form not opened for updating FAIL');
        req.saveScreenshot('TasksNotOpenedForUpdating.png')
    });
    
};



var contactTasks = function() {
  
    var tasksTab = By.xpath("//div[starts-with(@id, 'entityEventTabs')]//a[text()='Tasks']"),
        newBtn = By.xpath("//div[starts-with(@id, 'tasks_entityEventTabs')]//a[contains(@class, 'gridBtn-new')]"),
        emptyRow = By.xpath("//div[starts-with(@id, 'tasks_entityEventTabs')]//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//div[starts-with(@id, 'tasks_entityEventTabs')]//tr[contains(@id, 'DXDataRow0')]");
        
    var cancelBtn = By.xpath("//section[starts-with(@id, 'Task_')]//div[@name='task_saveCancelButtons']//button[@data-role-action='close']"),
        saveBtn = By.xpath("//section[starts-with(@id, 'Task_')]//div[@name='task_saveCancelButtons']//button[@data-role-action='save']");
    
    driver.wait(until.elementLocated(nav.navContact.profile.events));
    driver.findElement(nav.navContact.profile.events).click();
    driver.wait(until.elementLocated(tasksTab), 5000);
    driver.findElement(tasksTab).click();
    driver.wait(until.elementLocated(newBtn), 5000);
    
    //cancel button check
    driver.findElement(newBtn).click();
    
    driver.wait(until.elementLocated(name), 5000);
    driver.findElement(cancelBtn).click();
    driver.sleep(1000);
    driver.findElement(cancelBtn).thenCatch(function() {
        //check for element not located
    });
    
    //add
    driver.findElement(newBtn).click();
    createTask(req.currentDate());
    
    driver.wait(until.elementLocated(firstRow), 5000).then(function() {
        driver.sleep(1000);
        
        //update
        driver.findElement(firstRow).click();
        driver.wait(until.elementLocated(name), 5000).then(function() {
            driver.sleep(1000);
            driver.findElement(name).clear();
            driver.findElement(name).sendKeys('Updated');
            driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(saveBtn));
            driver.findElement(saveBtn).click();
            
            driver.sleep(2000);
            
            //delete
            driver.findElement(By.xpath("//div[starts-with(@id, 'tasks_entityEventTabs')]//tr[contains(@id, 'DXDataRow0')]//a")).click();
            req.confirmDelete();
            driver.wait(until.elementLocated(emptyRow), 5000).thenCatch(function(err) {
                console.log('Task from contact not deleted FAIL');
                req.saveScreenshot('TaskFromContactNotDeleted.png')
            });
            
        }, function() {
            console.log('Tasks form was not opened for updating FAIL');
            req.saveScreenshot('TaskFormNotOpenedForUpdating.png')
        });
        
        
    }, function(err) {
        console.log('Task from contact not added FAIL ' + err)
    });
    
};


var overviewTasks = function() {
    
    var viewAllBtn = By.id('viewTasks'),
        addBtn = By.xpath("//div[starts-with(@id, 'CaseOverviewTasks')]//a[@id='addTask']");
    
    //viewAllBtn check
    driver.wait(until.elementLocated(viewAllBtn), 15000);
    driver.findElement(viewAllBtn).click();
    
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseViewTasks')]//tr[contains(@class, 'EmptyDataRow')]")), 15000);
    driver.sleep(1000);
    driver.findElement(nav.navMatter.overview).click();
    driver.wait(until.elementLocated(addBtn), 15000);
    
    //add task
    driver.sleep(1500);
    driver.findElement(addBtn).click();
    createTask(req.currentDate());
    var taskOverviewName = By.xpath("//div[starts-with(@id, 'CaseOverviewTasks')]//tbody[@id='dataView']/tr/td[2]");
    driver.wait(until.elementLocated(taskOverviewName), 15000);
    var taskOverviewNameEl = driver.findElement(By.xpath("//div[starts-with(@id, 'CaseOverviewTasks')]//tbody[@id='dataView']/tr/td[2]"));
    taskOverviewNameEl.getText().then(function (name) {
        assert.equal(name, 'Z in the front')
    });
    driver.findElement(By.xpath("//div[starts-with(@id, 'CaseOverviewTasks')]//tbody[@id='dataView']//div[@data-pe-done='false']")).click();
    driver.wait(until.stalenessOf(taskOverviewNameEl), 15000);
};


var matterTasks = function() {
    
    driver.findElement(nav.navMatter.events.self).click();
    driver.wait(until.elementLocated(nav.navMatter.events.tasks), 15000);
    driver.findElement(nav.navMatter.events.tasks).click();
    var firstRow = By.xpath("//div[starts-with(@id, 'CaseViewTasks')]//tr[contains(@id, '_DXDataRow0')]");
    driver.wait(until.elementLocated(firstRow), 15000);
    
    //canceBtn check
    driver.findElement(By.xpath("//div[starts-with(@id, 'tasksGrid')]//a[contains(@class, 'gridBtn-new')]")).click();
    var cancelBtn = By.xpath("//div[starts-with(@id, 'CaseViewTasks_')]//div[@name='task_saveCancelButtons']//button[contains(@class, 'closeButton')]");
    driver.wait(until.elementLocated(cancelBtn), 15000);
    driver.findElement(cancelBtn).click();
    
    //update existing entry
    driver.sleep(2000);
    driver.findElement(firstRow).click();
    driver.wait(until.elementLocated(cancelBtn), 15000);
    driver.findElement(By.id('modelObject_Title')).clear();
    driver.findElement(By.id('modelObject_Title')).sendKeys('Updated');
    driver.findElement(By.xpath("//div[starts-with(@id, 'CaseViewTasks_')]//div[@name='task_saveCancelButtons']//button[@type='submit']")).click();
    driver.wait(until.elementLocated(firstRow), 15000);
    
    //delete
    driver.findElement(By.xpath("//div[starts-with(@id, 'CaseViewTasks')]//tr[contains(@id, '_DXDataRow0')]//a")).click();
    req.confirmDelete();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseViewTasks')]//tr[contains(@id, '_DXEmptyRow')]")), 15000);
};

module.exports = {
    dashboardTasks: dashboardTasks,
    contactTasks: contactTasks,
    overviewTasks: overviewTasks,
    matterTasks: matterTasks
};