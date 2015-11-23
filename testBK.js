var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
    login = "mikhail.terentiev@waveaccess.ru",
    password = "Rwq78qvf99a";

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

driver.get('http://192.168.2.77:100/');
driver.wait(until.elementLocated(By.name('UserName')));
driver.findElement(By.name('UserName')).sendKeys(login);
driver.findElement(By.name('Password')).sendKeys(password);
driver.findElement(By.className('saveButton')).click();
driver.wait(until.titleIs('Home Page - StratusBK'), 1000);
driver.quit();