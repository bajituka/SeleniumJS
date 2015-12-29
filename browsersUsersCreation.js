var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until,
    login = "mikhail.terentiev@waveaccess.ru",
    password = "Rwq78qvf99a",
    dev = 'http://192.168.2.77:98/',
    sprint3 = 'http://192.168.2.77:100/',
    trunk = 'http://192.168.2.77:90/';

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var assert = require('assert');

var chromeFirstName = 'Chrome',
    chromeLastName = 'Chromov',
    chromeUsername = 'chrome@gmail.com',
    edgeFirstName = 'Edge',
    edgeLastName = 'Edgov',
    edgeUsername = 'edge@gmail.com',
    ieFirstName = 'Internet',
    ieLastName = 'Explorer',
    ieUsername = 'ie11@gmail.com',
    testPassword = 'Password1';
    

//Authorization begin
driver.get(sprint3);
driver.wait(until.elementLocated(By.name('UserName')));
driver.findElement(By.name('UserName')).sendKeys(login);
driver.findElement(By.name('Password')).sendKeys(password);
driver.findElement(By.className('saveButton')).click();
driver.wait(until.elementLocated(By.className("title")), 2000).then(function(element) {
 driver.findElement(By.xpath("//button[@data-pe-id='confirm']")).click();
 console.log("Was logged in: yes");
  }, function(){
    console.log("Was logged in: no");
});
driver.wait(until.titleIs('Home Page - StratusBK'), 4000).then(function(){
 console.log("Authorization: successful")
}, function(err) {
    console.log("Authorization: failed:\n" + err);
    driver.quit();
});
//Authorization end

//Chrome
var closeAllTabsBtn = driver.findElement(By.className('closeAllTabsBtn'));
closeAllTabsBtn.click();
driver.sleep(2000);
driver.findElement(By.xpath("//*[@id='mainNavBar']/ul[2]/li/a")).click();
driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='mainNavBar']/ul[2]/li/ul/li[3]/a"))));
driver.findElement(By.xpath("//*[@id='mainNavBar']/ul[2]/li/ul/li[3]/a")).click();
driver.wait(until.elementLocated(By.xpath("//*[@data-pe-navigationtitle='Users']")));
driver.findElement(By.xpath("//*[@data-pe-navigationtitle='Users']")).click();
driver.sleep(1000);
driver.wait(until.elementLocated(By.id('Model_UserName')));
driver.findElement(By.id('Model_UserName')).sendKeys(chromeUsername);
driver.findElement(By.id('Model_Password')).sendKeys(testPassword);
driver.findElement(By.id('Model_ConfirmPassword')).sendKeys(testPassword);
driver.findElement(By.xpath("//*[@id='Model_Person_Name_Prefix']/option[@value='1']")).click();
driver.findElement(By.id('Model_Person_Name_FirstName')).sendKeys(chromeFirstName);
driver.findElement(By.id('Model_Person_Name_LastName')).sendKeys(chromeLastName);
driver.findElement(By.id('Model_PersonEmail_Value')).sendKeys(chromeUsername);
driver.findElement(By.xpath("//*[@id='CreateUserSection']/form/div[9]/button[2]")).click();
driver.sleep(2000);

//Edge
driver.findElement(By.xpath("//*[@data-pe-navigationtitle='Users']")).click();
driver.sleep(1000);
driver.wait(until.elementLocated(By.id('Model_UserName')));
driver.findElement(By.id('Model_UserName')).sendKeys(edgeUsername);
driver.findElement(By.id('Model_Password')).sendKeys(testPassword);
driver.findElement(By.id('Model_ConfirmPassword')).sendKeys(testPassword);
driver.findElement(By.xpath("//*[@id='Model_Person_Name_Prefix']/option[@value='1']")).click();
driver.findElement(By.id('Model_Person_Name_FirstName')).sendKeys(edgeFirstName);
driver.findElement(By.id('Model_Person_Name_LastName')).sendKeys(edgeLastName);
driver.findElement(By.id('Model_PersonEmail_Value')).sendKeys(edgeUsername);
driver.findElement(By.xpath("//*[@id='CreateUserSection']/form/div[9]/button[2]")).click();
driver.sleep(2000);

//IE
driver.findElement(By.xpath("//*[@data-pe-navigationtitle='Users']")).click();
driver.sleep(1000);
driver.wait(until.elementLocated(By.id('Model_UserName')));
driver.findElement(By.id('Model_UserName')).sendKeys(ieUsername);
driver.findElement(By.id('Model_Password')).sendKeys(testPassword);
driver.findElement(By.id('Model_ConfirmPassword')).sendKeys(testPassword);
driver.findElement(By.xpath("//*[@id='Model_Person_Name_Prefix']/option[@value='1']")).click();
driver.findElement(By.id('Model_Person_Name_FirstName')).sendKeys(ieFirstName);
driver.findElement(By.id('Model_Person_Name_LastName')).sendKeys(ieLastName);
driver.findElement(By.id('Model_PersonEmail_Value')).sendKeys(ieUsername);
driver.findElement(By.xpath("//*[@id='CreateUserSection']/form/div[9]/button[2]")).click();
driver.sleep(2000);
driver.quit();