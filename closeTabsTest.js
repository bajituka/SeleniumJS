var req = require('./functions.js');

var driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert;

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var fs = req.fs;

var currentDate = req.currentDate;

var saveScreenshot = req.saveScreenshot;

var login = req.login,
    password = req.password,
    dev = req.dev,
    sprint3 = req.sprint3,
    trunk = req.trunk;

var testMiddleName = req.testMiddleName,
    testSSN = req.testSSN,
    testEmail = req.testEmail,
    testPhone = req.testPhone;

driver.manage().window().maximize();




req.authorize(sprint3);
req.closeTabs();
driver.findElement(req.navBarMatters).click();
driver.wait(until.elementLocated(By.xpath("//td[2]/input[contains(@id, '_DXFREditorcol7')]")), 10000);
driver.sleep(2000);
driver.wait(until.elementLocated(By.xpath("//span[contains(@id, '_DXPagerBottom_')]/span[contains(@class, 'dropDownButton')]")), 10000);

driver.findElement(By.xpath("//span[contains(@id, '_DXPagerBottom_PSB')]")).click();
driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//span[contains(@id, '_DXPagerBottom_')]/span[contains(@class, 'dropDownButton')]"))), 2000);
driver.findElement(By.xpath("//div[contains(@id, '_DXPagerBottom_')]/span[text()='25']")).click();
driver.sleep(2000);
driver.findElements(By.xpath("//table[contains(@id, '_DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow')]")).then(function(itemsCount) {
    for (var i = 1; i <= itemsCount.length; i++) {
        driver.findElement(By.xpath("//table[contains(@id, '_DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow')][" + i + "]")).click();
        driver.wait(until.elementLocated(req.navBarEvents));
        driver.wait(until.elementLocated(req.navBarManage));
        driver.wait(until.elementLocated(req.navBarPetition));
        driver.wait(until.elementLocated(req.navBarCourt));
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewParties')]/div/div[2]/table/tbody")));
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewTasks')]/div/div[2]")));
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewAppointments')]/div/div[2]")));
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewActivityHistory')]/div/div[2]")));
        driver.findElement(req.navBarCourt).click();
        driver.wait(until.elementLocated(req.navBarCourtFiling));
        driver.findElement(req.navBarCourtFiling).click();
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div/div[7]")), 10000);
        driver.findElement(By.xpath("//div[@id='AppTabs']/ul/li[3]/span")).click();
        driver.sleep(1000);
    }
});

driver.findElement(By.xpath("//div[contains(@id, '_DXPagerBottom')]/a[10]/img[@alt='Next']")).click();
driver.sleep(2000);
driver.findElements(By.xpath("//table[contains(@id, '_DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow')]")).then(function(itemsCount) {
    for (var i = 1; i <= itemsCount.length; i++) {
        driver.findElement(By.xpath("//table[contains(@id, '_DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow')][" + i + "]")).click();
        driver.wait(until.elementLocated(req.navBarEvents));
        driver.wait(until.elementLocated(req.navBarManage));
        driver.wait(until.elementLocated(req.navBarPetition));
        driver.wait(until.elementLocated(req.navBarCourt));
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewParties')]/div/div[2]/table/tbody")));
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewTasks')]/div/div[2]")));
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewAppointments')]/div/div[2]")));
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewActivityHistory')]/div/div[2]")));
        driver.findElement(req.navBarCourt).click();
        driver.wait(until.elementLocated(req.navBarCourtFiling));
        driver.findElement(req.navBarCourtFiling).click();
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'UpdateECFSettingGroup_')]/div/div[7]")), 10000);
        driver.findElement(By.xpath("//div[@id='AppTabs']/ul/li[3]/span")).click();
        driver.sleep(1000);
    }
});

req.logOut();