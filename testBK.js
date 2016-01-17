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


driver.manage().window().maximize();
driver.manage().timeouts().implicitlyWait(10000);
//Logging in test

req.authorize(sprint3, login, password);
req.closeTabs();

driver.findElement(req.navBarMatters).click();
driver.wait(until.elementLocated(By.xpath("//td[2]/input[contains(@id, '_DXFREditorcol8')]")), 10000);
driver.sleep(2000);
driver.wait(until.elementLocated(By.xpath("//span[contains(@id, '_DXPagerBottom_')]/span[contains(@class, 'dropDownButton')]")), 10000);

new webdriver.ActionSequence(driver).
    mouseMove(driver.findElement(By.xpath("//table[contains(@id, '_DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow')][3]"))).
    click(driver.findElement(By.xpath("//table[contains(@id, '_DXMainTable')]/tbody/tr[contains(@id, '_DXDataRow')][3]"))).
    perform();


driver.findElement(req.navBarViewExpenses).click();

driver.sleep(2000);



    


req.logOut();