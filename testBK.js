var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
    login = "mikhail.terentiev@waveaccess.ru",
    password = "Rwq78qvf99a",
    sprint3 = 'http://192.168.2.77:100/';

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

//Logging in test

driver.get(sprint3);
driver.wait(until.elementLocated(By.name('UserName')));
	
driver.findElement(By.name('UserName')).sendKeys(login);
driver.findElement(By.name('Password')).sendKeys(password);
driver.findElement(By.className('saveButton')).click();
driver.sleep(2000);
driver.wait(until.elementLocated(By.className("title")), 2000).then(function(element) {
 driver.findElement(By.xpath("//button[@data-pe-id='confirm']")).click();
  }, function(){
    console.log("Was not logged in");
});
 
driver.wait(until.titleIs('Home Page - StratusBK'), 4000).then(function(){
 console.log("Test passed")
});
driver.quit();