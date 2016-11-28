var util = require('../src/utilities.js'),
    nav = require('../src/navigation.js'),
    jur = require('../src/jurisdictions.js'),
    test = require('../src/testdata.js'),
    sofa = require('../src/petition/sofa.js');

var webdriver = util.webdriver,
    driver = util.driver,
    By = util.By,
    until = util.until;

var assert = util.assert,
    fs = util.fs;

var name = By.id('modelObject_Title');

var nameText = 'Z in the front',
    descriptionText = 'Let your feet stomp';

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
    
    driver.wait(until.elementLocated(name), 10000);
        
        driver.sleep(3000);
        
        driver.findElement(cancelBtn).then(function() {
            hasCancelBtn = true 
        }, function() {
            hasCancelBtn = false
        });
        
        driver.findElement(name).sendKeys(nameText);
        driver.findElement(description).sendKeys(descriptionText);
        driver.findElement(dueDate).sendKeys(date);

        driver.findElement(By.xpath("//input[@id='cases_list_case_name']")).getAttribute("value").then(function(value) {
            if (value == '') {
                driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(assocMatterBtn));
                driver.findElement(assocMatterBtn).click();
                util.selectDvxprsFirstRow();
                driver.wait(until.elementIsVisible(driver.findElement(assocMatterBtn)), 5000);
                driver.sleep(1000);
            }
        }, function() {
            //do nothing
        });

        driver.findElement(By.xpath("//input[@id='modelObject_ContactId_client_name']")).getAttribute("value").then(function(value) {
            if (value == '') {
                driver.findElement(assocContactBtn).click();
                util.selectDvxprsFirstRow();
                driver.wait(until.elementIsVisible(driver.findElement(assocContactBtn)), 5000);
                driver.sleep(1000);
                driver.findElement(By.xpath("//select[@id='modelObject_TaskGroupId']/option[2]")).click();
            }
        }, function() {
            //do nothing
        });
        
        var nameField = driver.findElement(name);
        
        driver.findElement(name).then(function() {
            if (hasCancelBtn == false) {
                driver.findElement(saveBtnNoCancel).click();
            } else {
                driver.findElement(saveBtnCancel).click();
            }
        });

        driver.wait(until.stalenessOf(nameField), 10000);
};


var dashboardTasks = function() {
    
    var newBtn = By.id('btnCreateTask');
    var saveBtn = By.xpath("//form[@id='taskForm']//button[@class='saveButton']");
    var firstRow = "//div[@id='Tasks_Tab']//div[contains(@class, 'list-group')][1]//div[contains(@class, 'hoverContainer')][1]";
    
    
    var map = webdriver.promise.map;

    var findCreatedTask = function() {
        var elems = driver.findElements(By.xpath("//div[@id='Tasks_Tab']//div[contains(@class, 'list-group')][1]//div[contains(@class, 'hoverContainer')]//div[@class='task-title']"));
        return map(elems, elem => elem.getText()).then(titles => {
            var position = titles.indexOf(nameText) + 1;
            return "//div[@id='Tasks_Tab']//div[contains(@class, 'list-group')][1]//div[contains(@class, 'hoverContainer')][" + position + "]";
        });
    };
    
    //'see all' button check
    driver.findElement(By.id('btnSeeAllTasks')).click();
    driver.wait(until.elementLocated(By.xpath("//tr[contains(@id, 'tasksGrid_') and contains(@id, 'DXDataRow0')]")), 10000);
    util.closeTabs();

    //add
    driver.findElement(newBtn).click();
    createTask(util.currentDate());
    var createdTask;
    findCreatedTask().then(function(locator) {createdTask = locator});
    driver.wait(until.elementLocated(By.xpath(firstRow + "//div[@class='task-title']")), 10000);
    driver.sleep(1000);
    
    
    //update
    new util.webdriver.ActionSequence(driver).
            mouseMove(driver.findElement(By.xpath(firstRow))).
            click(driver.findElement(By.xpath(firstRow + "//a[@data-hint='Edit']"))).
            perform();
    driver.wait(until.elementLocated(name), 10000);
    driver.sleep(1000);
    driver.findElement(By.xpath("//div[@class='caption']//div[contains(@class, 'title')]")).getText().then(function(title) {
        assert.equal(title, 'Update Task')
    });
    driver.findElement(name).clear();
    driver.findElement(name).sendKeys('Updated');
    var saveBtnElem = driver.findElement(saveBtn);
    saveBtnElem.click();
    driver.wait(until.stalenessOf(saveBtnElem), 5000);
    driver.findElement(By.xpath(firstRow + "//div[@class='task-title']")).getText().then(function(title) {
        assert.equal(title, 'Updated')
    });
    
    //delete
    var element = driver.findElement(By.xpath(firstRow));

    new util.webdriver.ActionSequence(driver).
        mouseMove(element).
        click(driver.findElement(By.xpath(firstRow + "//a[@data-hint='Remove']"))).
        perform();
    util.confirmDelete();
    driver.wait(until.stalenessOf(element), 5000);
    
};



var contactTasks = function() {
  
    var tasksTab = By.xpath("//div[starts-with(@id, 'entityEventTabs')]//a[text()='Tasks']"),
        newBtn = By.xpath("//div[starts-with(@id, 'tasks_entityEventTabs')]//a[contains(@class, 'gridBtn-new')]"),
        emptyRow = By.xpath("//div[starts-with(@id, 'tasks_entityEventTabs')]//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//div[starts-with(@id, 'tasks_entityEventTabs')]//tr[contains(@id, 'DXDataRow0')]");
        
    var cancelBtn = By.xpath("//section[starts-with(@id, 'Task_')]//div[@name='task_saveCancelButtons']//button[@data-role-action='close']"),
        saveBtn = By.xpath("//section[starts-with(@id, 'Task_')]//div[@name='task_saveCancelButtons']//button[@data-role-action='save']");
    
    util.navigateTo(nav.navContact.profile.self, nav.navContact.profile.events);

    driver.wait(until.elementLocated(tasksTab), 5000);
    driver.findElement(tasksTab).click();
    driver.wait(until.elementLocated(newBtn), 5000);
    
    //cancel button check
    driver.findElement(newBtn).click();
    
    driver.wait(until.elementLocated(name), 5000);
    driver.findElement(cancelBtn).click();
    driver.sleep(1000);
    driver.findElement(cancelBtn).catch(function() {
        //check for element not located
    });
    
    //add
    driver.findElement(newBtn).click();
    createTask(util.currentDate());
    
    driver.wait(until.elementLocated(firstRow), 10000);
    driver.sleep(1000);
    
    //update
    driver.findElement(firstRow).click();
    driver.wait(until.elementLocated(name), 10000);
    driver.sleep(1000);
    driver.findElement(name).clear();
    driver.findElement(name).sendKeys('Updated');
    driver.executeScript("arguments[0].scrollIntoView(true);", driver.findElement(saveBtn));
    driver.findElement(saveBtn).click();
    
    //delete
    driver.wait(until.elementLocated(firstRow), 10000);
    driver.sleep(500);
    driver.findElement(By.xpath("//div[starts-with(@id, 'tasks_entityEventTabs')]//tr[contains(@id, 'DXDataRow0')]//a")).click();
    util.confirmDelete();
    driver.wait(until.elementLocated(emptyRow), 10000);
    
};


var overviewTasks = function() {
    
    var viewAllBtn = By.xpath("//a[@id='viewTasks']"),
        addBtn = By.xpath("//div[starts-with(@id, 'CaseOverviewTasks')]//a[@id='addTask']");
    
    //viewAllBtn check
    driver.sleep(1000);
    driver.wait(until.elementLocated(viewAllBtn), 15000);
    driver.findElement(viewAllBtn).click();
    
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseViewTasks')]//tr[contains(@class, 'EmptyDataRow')]")), 15000);
    driver.sleep(1000);
    driver.findElement(nav.navMatter.overview).click();
    driver.wait(until.elementLocated(addBtn), 15000);
    
    //add task
    driver.sleep(1500);
    driver.findElement(addBtn).click();
    createTask(util.currentDate());
    var taskOverviewName = By.xpath("//div[starts-with(@id, 'CaseOverviewTasks')]//tbody[@id='dataView']/tr/td[2]");
    driver.wait(until.elementLocated(taskOverviewName), 15000);
    var taskOverviewNameEl = driver.findElement(By.xpath("//div[starts-with(@id, 'CaseOverviewTasks')]//tbody[@id='dataView']/tr/td[2]"));
    taskOverviewNameEl.getText().then(function (name) {
        assert.equal(name, 'Z in the front')
    });
    driver.findElement(By.xpath("//div[starts-with(@id, 'CaseOverviewTasks')]//tbody[@id='dataView']//div[@data-pe-done='false']")).click();
    driver.wait(until.stalenessOf(taskOverviewNameEl), 15000);
    driver.sleep(1000);
};


var matterTasks = function() {
    
    util.navigateTo(nav.navMatter.events.self, nav.navMatter.events.tasks);
    var firstRow = By.xpath("//div[starts-with(@id, 'CaseViewTasks')]//tr[contains(@id, '_DXDataRow0')]");
    driver.wait(until.elementLocated(firstRow), 15000);
    
    //canceBtn check
    driver.findElement(By.xpath("//div[starts-with(@id, 'tasksGrid')]//a[contains(@class, 'gridBtn-new')]")).click();
    var cancelBtn = By.xpath("//div[starts-with(@id, 'CaseViewTasks_')]//div[@name='task_saveCancelButtons']//button[contains(@class, 'closeButton')]");
    driver.wait(until.elementLocated(cancelBtn), 15000);
    var cancelBtnElem = driver.findElement(By.xpath("//div[starts-with(@id, 'CaseViewTasks_')]//div[@name='task_saveCancelButtons']//button[contains(@class, 'closeButton')]"));
    driver.sleep(2000);
    cancelBtnElem.click();
    driver.wait(until.stalenessOf(cancelBtnElem), 10000);
    
    //update existing entry
    driver.findElement(firstRow).click();
    driver.wait(until.elementLocated(cancelBtn), 15000);
    driver.findElement(By.id('modelObject_Title')).clear();
    driver.findElement(By.id('modelObject_Title')).sendKeys('Updated');
    driver.sleep(1000);
    driver.findElement(By.xpath("//div[starts-with(@id, 'CaseViewTasks_')]//div[@name='task_saveCancelButtons']//button[@type='submit']")).click();
    
    
    //delete
    driver.wait(until.elementLocated(firstRow), 10000);
    driver.findElement(By.xpath("//div[starts-with(@id, 'CaseViewTasks')]//tr[contains(@id, '_DXDataRow0')]//a")).click();
    util.confirmDelete();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseViewTasks')]//tr[contains(@id, '_DXEmptyRow')]")), 15000);
};

module.exports = {
    dashboardTasks: dashboardTasks,
    contactTasks: contactTasks,
    overviewTasks: overviewTasks,
    matterTasks: matterTasks
};