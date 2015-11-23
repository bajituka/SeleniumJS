var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
    login = "mikhail.terentiev@waveaccess.ru",
    password = "Rwq78qvf99a",
    url = 'http://192.168.2.77:100/';

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

//Logging in test

driver.get(url);
driver.wait(until.elementLocated(By.name('UserName')));
	// check for being already authorized
	if (driver.isElementPresent(By.name("UserName")) == false) {
		driver.findElement(By.id('logoutForm')).click();
		driver.wait(until.elementLocated(By.name('UserName')));
			};
driver.findElement(By.name('UserName')).sendKeys(login);
driver.findElement(By.name('Password')).sendKeys(password);
driver.findElement(By.className('saveButton')).click();
	// check for being logged in another browser
	if ((driver.isElementPresent(By.className("title")) == true)) {
		driver.findElement(By.xpath("//button[@data-pe-id='confirm']")).click();
	};
driver.wait(until.titleIs('Home Page - StratusBK'), 4000);
driver.quit();