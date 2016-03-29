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
    

var createTask = function(date) {
    /*
    var blackFlag = By.xpath("//i[contains(@class, 'fg-black')]"),
        blueFlag = By.xpath("//i[contains(@class, 'fg-blue')]"),
        redFlag = By.xpath("//i[contains(@class, 'fg-red')]"),
        yellowFlag = By.xpath("//i[contains(@class, 'fg-yellow')]");
    */    
    var dueDate = By.id('modelObject_DueDate'),
        //completed = By.id('modelObject_Completed'),
        description = By.id('modelObject_Description');
        
    var assocMatter = By.id('cases_list_case_name'),
        assocContactBtn = By.xpath("//div[@id='contacts_list']//button");
    
    var saveBtnDashboard = By.xpath("//form[@id='taskForm']//button[@class='saveButton']"),
        saveBtnOther = By.xpath("//section[starts-with(@id, 'Task_')]//div[@name='task_saveCancelButtons']//button[@data-role-action='save']");
    
    var isDashboard = true;
    
    driver.wait(until.elementLocated(name), 10000).then(function() {
        
        driver.sleep(1000);
        
        driver.findElement(By.xpath("//div[@class='caption']//div[@class='title']")).then(function() {
        
            driver.findElement(By.xpath("//div[@class='caption']//div[@class='title']")).getText().then(function(title) {
                assert.equal(title, 'Create Task')
            });
            
        }, function() {
            isDashboard = false
        });
        //driver.findElement(blackFlag).click();
        driver.findElement(dueDate).sendKeys(date);
        driver.findElement(name).sendKeys('Z in the front');
        driver.findElement(description).sendKeys('Let your feet stomp');
        driver.findElement(assocMatter).then(function() {
            driver.findElement(assocMatter).click();
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow));
            driver.sleep(1500);
            driver.findElement(nav.dvxprsPopupFirstRow).click();
            driver.wait(until.elementIsVisible(driver.findElement(assocMatter)), 5000);
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
            if (isDashboard == false) {
                driver.findElement(saveBtnOther).click();
            } else {
                driver.findElement(saveBtnDashboard).click();
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
    driver.wait(until.elementLocated(By.xpath("//div[@id='Tasks_Tab']//div[@class='list-group'][1]//div[@class='task-title']")), 5000).then(function() {
        driver.sleep(1000);
        console.log('Task from dashboard added OK')
    }, function() {
        console.log('Task from dashboard not added FAIL');
        req.saveScreenshot('TaskFromDashboardNotAdded.png')
    });
    
    //update
    new req.webdriver.ActionSequence(driver).
            mouseMove(driver.findElement(By.xpath("//div[@id='Tasks_Tab']//div[@class='list-group'][1]/div"))).
            click(driver.findElement(By.xpath("//div[@id='Tasks_Tab']//div[@class='list-group'][1]//a[@data-hint='Edit']"))).
            perform();
    driver.wait(until.elementLocated(name), 10000).then(function() {
        driver.sleep(1000);
        driver.findElement(By.xpath("//div[@class='caption']//div[@class='title']")).getText().then(function(title) {
            assert.equal(title, 'Update Task')
        });
        driver.findElement(name).clear();
        driver.findElement(name).sendKeys('Updated');
        driver.findElement(saveBtn).click();
        driver.sleep(1000);
        driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@id='Tasks_Tab']//div[@class='list-group'][1]/div"))), 5000).then(function() {
            driver.sleep(1000);
            driver.findElement(By.xpath("//div[@id='Tasks_Tab']//div[@class='list-group'][1]//div[@class='task-title']")).getText().then(function(title) {
                assert.equal(title, 'Updated')
            });
            console.log('Task updated OK')
        }, function(err) {
            console.log('Tasks form not closed after updating FAIL ' + err);
            req.saveScreenshot('TasksFormNotClosedAfterUpdating.png')
        });
        
        //delete
        new req.webdriver.ActionSequence(driver).
            mouseMove(driver.findElement(By.xpath("//div[@id='Tasks_Tab']//div[@class='list-group'][1]/div"))).
            click(driver.findElement(By.xpath("//div[@id='Tasks_Tab']//div[@class='list-group'][1]//a[@data-hint='Remove']"))).
            perform();
        req.confirmDelete();
        driver.wait(until.elementLocated(By.xpath("//div[@id='Tasks_Tab']//div[@class='list-group'][1]//td[@class='dataTables_empty']")), 5000).then(function() {
            console.log('Task deleted OK')
        }, function(err) {
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
        console.log('Task from contact added OK');
        
        //update
        driver.findElement(firstRow).click();
        driver.wait(until.elementLocated(name), 5000).then(function() {
            driver.sleep(1000);
            driver.findElement(name).clear();
            driver.findElement(name).sendKeys('Updated');
            driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(saveBtn));
            driver.findElement(saveBtn).click();
            
            driver.wait(until.elementIsVisible(driver.findElement(firstRow)), 5000);
            driver.sleep(1000);
            
            //delete
            driver.findElement(By.xpath("//div[starts-with(@id, 'tasks_entityEventTabs')]//tr[contains(@id, 'DXDataRow0')]//a")).click();
            req.confirmDelete();
            driver.wait(until.elementLocated(emptyRow), 5000).then(function() {
                console.log('Task from contact deleted OK')
            }, function(err) {
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

module.exports.dashboardTasks = dashboardTasks;
module.exports.contactTasks = contactTasks;