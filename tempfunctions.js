var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
    
var assert = require('assert');

var fs = require('fs');

var login = "edge@gmail.com",
    password = "Password1",
    dev = 'http://192.168.2.77:98/',
    sprint3 = 'http://192.168.2.77:100/',
    trunk = 'http://192.168.2.77:90/';

var testMiddleName = 'Van',
    testPhone = '1231231231',
    testEmail = 'b.cumberbacth@gmail.co.uk',
    testSSN = '123123123';

webdriver.WebDriver.prototype.saveScreenshot = function(filename) {
    return driver.takeScreenshot().then(function(data) {
        fs.writeFile(filename, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
            if(err) throw err;
        });
    })
};

var currentDate = function currentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    };
    if(mm<10) {
    mm='0'+mm
    };
    today = mm+'/'+dd+'/'+yyyy;
    return today;
};





var authorize = function authorize(testEnv) {
    driver.get(testEnv);
    driver.wait(until.elementLocated(By.name('UserName'))); 
    driver.findElement(By.name('UserName')).sendKeys(login);
    driver.findElement(By.name('Password')).sendKeys(password);
    driver.findElement(By.className('saveButton')).click();
    driver.wait(until.elementLocated(By.className("title")), 2000).then(function() { // Check for presence of popup by title availability
        driver.manage().timeouts().implicitlyWait(2000);
        driver.findElement(By.xpath("//button[@data-pe-id='confirm']")).click();
        console.log("Was logged in: yes");
    }, function(){
        console.log("Was logged in: no");
    });
    driver.wait(until.titleIs('Home Page - StratusBK'), 5000).then(function(){
       console.log("Authorization: successful");
       driver.wait(until.elementLocated(By.xpath("//div[@id='Events_Tab']/div/div/div")));
       driver.wait(until.elementLocated(By.xpath("//div[@id='Tasks_Tab']/div/div/div")));
       driver.wait(until.elementLocated(By.xpath("//div[@id='Messages_Tab']/div/div/div")));
       driver.wait(until.elementLocated(By.xpath("//div[@id='Contacts_Tab']/div/div/div")));
       driver.wait(until.elementLocated(By.xpath("//div[@id='Docs_Tab']/div/div/div")));
       driver.wait(until.elementLocated(By.xpath("//div[@id='Cases_Tab']/div/div/div")));
       driver.sleep(1000);
   }, function(err) {
        console.log("Authorization: failed: - " + err);
        driver.quit();
    });
};






var closeTabs = function closeTabs() {
 driver.wait(until.elementIsEnabled(driver.findElement(By.className('closeAllTabsBtn'))));
 driver.findElements(By.xpath("//*[@id='AppTabs']/ul/li"))
 .then(function(initElemCount) {
    if (initElemCount.length > 1) {
        driver.manage().timeouts().implicitlyWait(2000);
        driver.findElement(By.className('closeAllTabsBtn')).click();
        driver.sleep(1500);
        driver.findElements(By.xpath("//*[@id='AppTabs']/ul/li"))
        .then(function(finElemCount) {
            assert.equal(finElemCount.length, 1)
        }).then(console.log('Tabs have been opened'));
    } else {
        console.log('No tabs have been opened');
    }
}, function(error) {
    console.log(error);
});
 driver.sleep(1000);
};








var createPerson = function createPerson(firstName, lastName) {
    //SEARCH SCREEN OPENING BEGIN
    driver.findElement(By.id('btnCreateClient')).click();    
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='btnCreateClient']/ul/li[1]/a"))), 1000);
    driver.findElement(By.xpath("//*[@id='btnCreateClient']/ul/li[1]/a")).click();
    driver.wait(until.elementLocated(By.id('searchBtn')));
    //SEARCH SCREEN OPENING END

    //SEARCH SCREEN BEGIN
    driver.findElement(By.id('searchBtn')).getAttribute('disabled') //checking for search button disabled
    .then(function(disabled) {
        assert.equal(disabled, 'true');
        console.log('Default ContactCreationButton is disabled: ' + disabled);
    });
    driver.findElement(By.id('FirstName')).sendKeys(firstName);
    driver.findElement(By.id('MiddleName')).sendKeys(testMiddleName);
    driver.findElement(By.id('LastName')).sendKeys(lastName);
    driver.findElement(By.id('TaxPayerId')).sendKeys(testSSN);
    driver.findElement(By.id('Email')).sendKeys(testEmail);
    driver.findElement(By.id('Phone')).sendKeys(testPhone);
    driver.findElement(By.id('Zip')).sendKeys('60007');
    driver.sleep(1000);
    driver.findElement(By.xpath("//button[starts-with(@id, 'nextBtnCreateContactTabs')]")).click();
    //SEARCH SCREEN END

    //CONTACT CREATION BEGIN
    driver.wait(until.elementLocated(By.id('Model_Phones_0__Type')));

    driver.findElement(By.xpath("//select[@id='Model_Phones_0__Type']/option[@selected='selected']")).getText() //Check for default phone type selected
    .then(function(phoneSelected) {
        assert.equal(phoneSelected, 'Home mobile');
        console.log('Phone type is correct: ' + phoneSelected + ' OK');
    }, function(err) {
        console.log('Phone type is wrong: ' + err + ' FAIL');
        driver.findElement(By.xpath("//select[@id='Model_Phones_0__Type']/option[@value='3']")).click();
        driver.findElement(By.xpath("//section[starts-with(@id, 'PhoneNumber_')]/div/div[4]/div/a")).click();
        driver.wait(until.elementIsEnabled(driver.findElement(By.id('Model_Phones_0__UseForNotifications'))));
        driver.findElement(By.id('Model_Phones_0__UseForNotifications')).click();
    });

    driver.findElement(By.xpath("//select[@id='Model_Emails_0__Type']/option[@selected='selected']")).getText() //Check for default email type selected
    .then(function(emailSelected) {
        assert.equal(emailSelected, 'Personal');
        console.log('Email type is correct: ' + emailSelected + ' OK');
    }, function(err) {
        console.log('Email type is wrong: ' + err + ' FAIL');
        driver.findElement(By.xpath("//select[@id='Model_Emails_0__Type']/option[@value='1']")).click();
    });

    driver.findElement(By.xpath("//select[@id='Model_SSNs_0__Type']/option[@selected='selected']")).getText() //Check for default Social Security type selected
    .then(function(socialSelected) {
        assert.equal(socialSelected, 'Social Security');
        console.log('Social Security type is correct: ' + socialSelected + ' OK');
    }, function(err) {
        console.log('Social Security type is wrong: ' + err + ' FAIL');
        driver.findElement(By.xpath("//select[@id='Model_SSNs_0__Type']/option[@value='1']")).click();
    });

    driver.findElement(By.id('Model_Person_Name_FirstName')).getAttribute('value') //Check for first name carried on
    .then(function(firstNameInput) {
        assert.equal(firstNameInput, firstName);
        console.log('FirstName is correct: ' + firstNameInput + ' OK');
    }, function(err) {
        console.log('FirstName is wrong: ' + err + ' FAIL');
    });

    driver.findElement(By.id('Model_Person_Name_MiddleName')).getAttribute('value') //Check for middle name carried over
    .then(function(middleNameInput) {
        assert.equal(middleNameInput, testMiddleName);
        console.log('MiddleName is correct: ' + middleNameInput + ' OK');
    }, function(err) {
        console.log('MiddleName is wrong: ' + err + ' FAIL');
    });

    driver.findElement(By.id('Model_Person_Name_LastName')).getAttribute('value') //Check for last name carried over
    .then(function(lastNameInput) {
        assert.equal(lastNameInput, lastName);
        console.log('LastName is correct: ' + lastNameInput + ' OK');
    }, function(err) {
        console.log('LastName is wrong: ' + err + ' FAIL');
    });

    driver.findElement(By.id('Model_SSNs_0__Value')).getAttribute('value') //Check for SSN carried over
    .then(function(ssnInput) {
        assert.equal(ssnInput, testSSN);
        console.log('SSN is correct: ' + ssnInput + ' OK');
    }, function(err) {
        console.log('SSN is wrong: ' + err + ' FAIL');
    });

    driver.findElement(By.xpath("//select[@id='Model_Person_Name_Prefix']/option[@value='1']")).click();
    driver.findElement(By.xpath("//select[@id='Model_Person_PrimaryRoleGroupId']/option[@value='2']")).click();
    driver.findElement(By.xpath("//select[@id='Model_Person_PrimaryRoleId']/option[@value='1']")).click();
    driver.findElement(By.xpath("//select[@id='Model_Addresses_0__Type']/option[@value='1']")).click();
    driver.findElement(By.id('Model_Addresses_0__Street1')).sendKeys('Lindstrom Dr');
    driver.findElement(By.id('Model_Addresses_0__Title')).sendKeys('My home address');
    driver.findElement(By.id('Model_Phones_0__Ext')).sendKeys('365');
    driver.findElement(By.id('Model_Person_ClientId')).sendKeys('785412');
    //driver.findElement(By.xpath("//select[@id='Model_SSNs_0__Type']/option[@value='3']")).click();
    driver.sleep(500);
    driver.findElement(By.xpath("//div[@id='createNavigation']/div/button[@type='submit']")).click();
    //CONTACT CREATION END
};




//EFILING VARIABLES BEGIN

var chapter7 = By.xpath("//select[@id='Case_Chapter']/option[@value='1']"),
    chapter13 = By.xpath("//select[@id='Case_Chapter']/option[@value='4']"),
    individual = By.xpath("//select[@id='Case_Ownership']/option[@value='1']"),
    joint = By.xpath("//select[@id='Case_Ownership']/option[@value='2']"),
    illinois = By.xpath("//select[@id='stateId']/option[@value='14']"),
    georgia = By.xpath("//select[@id='stateId']/option[@value='11']"),
    county = By.xpath("//select[@id='Case_CountyId']/option[not(@disabled)][not(@value='')]"), //random county
    ilnb = By.xpath("//select[@id='District_Id']/option[@value='28']"),
    ilcb = By.xpath("//select[@id='District_Id']/option[@value='29']"),
    ilsb = By.xpath("//select[@id='District_Id']/option[@value='30']"),
    ganb = By.xpath("//select[@id='District_Id']/option[@value='66']"),
    gamb = By.xpath("//select[@id='District_Id']/option[@value='67']"),
    gasb = By.xpath("//select[@id='District_Id']/option[@value='68']"),
    
    //ILNB BEGIN
    chicDivEast = By.xpath("//select[@id='Case_DivisionId']/option[@value='159']"),
    eastDivChic = By.xpath("//select[@id='Case_DivisionId']/option[@value='402']"),
    rockDivWest = By.xpath("//select[@id='Case_DivisionId']/option[@value='158']"),
    westDivRock = By.xpath("//select[@id='Case_DivisionId']/option[@value='401']"),
    //ILNB END

    //ILCB BEGIN
    danville = By.xpath("//select[@id='Case_DivisionId']/option[@value='161']"),
    peoria = By.xpath("//select[@id='Case_DivisionId']/option[@value='160']"),
    springfield = By.xpath("//select[@id='Case_DivisionId']/option[@value='162']"),
    urbana = By.xpath("//select[@id='Case_DivisionId']/option[@value='447']"),
    //ILCB END

    //ILSB BEGIN
    alton = By.xpath("//select[@id='Case_DivisionId']/option[@value='314']"),
    benton = By.xpath("//select[@id='Case_DivisionId']/option[@value='315']"),
    eastStLouis = By.xpath("//select[@id='Case_DivisionId']/option[@value='163']"),
    effingham = By.xpath("//select[@id='Case_DivisionId']/option[@value='426']"),
    //ILSB END

    //GANB BEGIN
    atlanta = By.xpath("//select[@id='Case_DivisionId']/option[@value='228']"),
    gainesville = By.xpath("//select[@id='Case_DivisionId']/option[@value='446']"),
    newnan = By.xpath("//select[@id='Case_DivisionId']/option[@value='229']"),
    rome = By.xpath("//select[@id='Case_DivisionId']/option[@value='227']"),
    //GANB END

    //GAMB BEGIN
    albany = By.xpath("//select[@id='Case_DivisionId']/option[@value='443']"),
    americus = By.xpath("//select[@id='Case_DivisionId']/option[@value='444']"),
    athens = By.xpath("//select[@id='Case_DivisionId']/option[@value='300']"),
    columbus = By.xpath("//select[@id='Case_DivisionId']/option[@value='445']"),
    macon = By.xpath("//select[@id='Case_DivisionId']/option[@value='230']"),
    thomasville = By.xpath("//select[@id='Case_DivisionId']/option[@value='301']"),
    valdosta = By.xpath("//select[@id='Case_DivisionId']/option[@value='302']"),
    //GAMB END

    //GASB BEGIN
    augusta = By.xpath("//select[@id='Case_DivisionId']/option[@value='443']"),
    brunswick = By.xpath("//select[@id='Case_DivisionId']/option[@value='444']"),
    dublin = By.xpath("//select[@id='Case_DivisionId']/option[@value='300']"),
    savannah = By.xpath("//select[@id='Case_DivisionId']/option[@value='445']"),
    statesboro = By.xpath("//select[@id='Case_DivisionId']/option[@value='230']"),
    waycross = By.xpath("//select[@id='Case_DivisionId']/option[@value='301']");
    //GASB END

//EFILING VARIABLES END







var selectMatter = function selectMatter (type, chapter) {
    driver.wait(until.elementLocated(By.xpath("//div[@id='mainNavBar']/a[@data-pe-tab='Matters']")));
    driver.findElement(By.xpath("//div[@id='mainNavBar']/a[@data-pe-tab='Matters']")).click();
    driver.wait(until.elementLocated(By.xpath("//td[2]/input[contains(@id, '_DXFREditorcol7')]")), 10000);
    driver.sleep(1000);
    driver.findElement(By.xpath("//td[2]/input[contains(@id, '_DXFREditorcol7')]")).sendKeys(chapter);
    driver.findElement(By.xpath("//td[2]/input[contains(@id, '_DXFREditorcol7')]")).sendKeys(webdriver.Key.ENTER);
    driver.sleep(1000);
    /*
    driver.findElement(By.xpath("//td[2]/input[contains(@id, '_DXFREditorcol8')]")).sendKeys(isFiled);
    driver.findElement(By.xpath("//td[2]/input[contains(@id, '_DXFREditorcol8')]")).sendKeys(webdriver.Key.ENTER);
    driver.sleep(1000);
    */
    driver.findElement(By.xpath("//td[2]/input[contains(@id, '_DXFREditorcol9')]")).sendKeys(type);
    driver.findElement(By.xpath("//td[2]/input[contains(@id, '_DXFREditorcol9')]")).sendKeys(webdriver.Key.ENTER);
    driver.sleep(1000);
    driver.findElement(By.xpath("//*[contains(@id, 'DXDataRow0')]")).click();
    driver.wait(until.elementLocated(By.xpath("//ul[@id='schedulesView']/li[2]//a")));
    driver.wait(until.elementLocated(By.xpath("//ul[@id='schedulesView']/li[3]//a")));
    driver.wait(until.elementLocated(By.xpath("//ul[@id='schedulesView']/li[4]//a")));
    driver.wait(until.elementLocated(By.xpath("//ul[@id='schedulesView']/li[5]//a")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewParties')]/div/div[2]/table/tbody")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewTasks')]/div/div[2]")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewAppointments')]/div/div[2]")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewActivityHistory')]/div/div[2]")))
    .then(function() {
        console.log('Matter opened')
    });
}







var createBKmatter = function createBKmatter(chapter, matterType, state, district, division) {
    driver.wait(until.elementLocated(By.xpath("//nav[starts-with(@id, 'EntitySideBar_')]/ul/li[2]/a")), 15000);
    driver.manage().timeouts().implicitlyWait(2000);
    driver.findElement(By.xpath("//nav[starts-with(@id, 'EntitySideBar_')]/ul/li[2]/a")).click();
    driver.manage().timeouts().implicitlyWait(2000);
    driver.wait(until.elementLocated(By.xpath("//*[@data-pe-navigationtitle='Matters']")));
    driver.manage().timeouts().implicitlyWait(2000);
    driver.findElement(By.xpath("//*[@data-pe-navigationtitle='Matters']")).click();
    driver.wait(until.elementLocated(By.xpath("//div[@data-ajax-text='Bankruptcy' and @preselected='true']"))).then(function() {
        console.log('BK is defaulted: OK')
    }, function(err) {
        console.log('BK is defaulted: FAIL');
        driver.findElement(By.xpath("//div[@data-ajax-text='Bankruptcy']")).click();
    });
    driver.wait(until.elementLocated(By.id('Case_Chapter')));
    driver.wait(until.elementLocated(By.id('Case_DivisionId')));
    driver.wait(until.elementLocated(By.id('District_Id')));
    driver.manage().timeouts().implicitlyWait(2000);
    driver.findElement(chapter).click();
    driver.manage().timeouts().implicitlyWait(2000);
    driver.findElement(matterType).click().then(function() {
        if (matterType == joint) {
            driver.manage().timeouts().implicitlyWait(2000);
            driver.findElement(By.xpath("//div[@id='case_client2']/div[2]/span/button")).click();
            driver.sleep(2000);
            driver.wait(until.elementLocated(By.xpath("//section/div/table/tbody/tr/td/div[2]/table/tbody/tr[2]")));
            driver.findElement(By.xpath("//section/div/table/tbody/tr/td/div[2]/table/tbody/tr[2]")).click();
            driver.sleep(1000);
        };
    });
    driver.findElement(state).click();
    driver.sleep(1000);
    driver.findElement(county).click();
    driver.sleep(500);
    driver.findElement(district).click();
    driver.sleep(500);
    driver.findElement(division).click();
    driver.sleep(500);
    driver.findElement(By.xpath("//form[starts-with(@id, 'CreateCase_')]/div[@class='button-set']/button[@type='submit']")).click();
    driver.wait(until.elementLocated(By.xpath("//ul[@id='schedulesView']/li[2]//a")));
    driver.wait(until.elementLocated(By.xpath("//ul[@id='schedulesView']/li[3]//a")));
    driver.wait(until.elementLocated(By.xpath("//ul[@id='schedulesView']/li[4]//a")));
    driver.wait(until.elementLocated(By.xpath("//ul[@id='schedulesView']/li[5]//a")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewParties')]/div/div[2]/table/tbody")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewTasks')]/div/div[2]")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewAppointments')]/div/div[2]")));
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseOverviewActivityHistory')]/div/div[2]")))
    .then(function() {
        console.log('Matter created')
    });
};






var logOut = function logOut() {
    driver.wait(until.elementLocated(By.xpath("//*[@id='mainNavBar']/ul[2]/li/a")));
    driver.findElement(By.xpath("//*[@id='mainNavBar']/ul[2]/li/a")).click();
    driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//*[@id='logoutForm']/a"))));
    driver.findElement(By.xpath("//*[@id='logoutForm']/a")).click();
    driver.wait(until.titleIs('Log In - StratusBK'), 5000).then(function() {
       console.log("Logout: successful");
       driver.quit();
   }, function(err) {
    console.log("Logout: failed:\n" + err);
    driver.quit();
    });
};






module.exports.authorize = authorize;
module.exports.closeTabs = closeTabs;
module.exports.createPerson = createPerson;
module.exports.selectMatter = selectMatter;
module.exports.createBKmatter = createBKmatter;
module.exports.logOut = logOut;

module.exports.currentDate = currentDate;

module.exports.webdriver = webdriver;
module.exports.driver = driver;
module.exports.By = By;
module.exports.until = until;

module.exports.assert = assert;

module.exports.fs = fs;

//module.exports.saveScreenshot = saveScreenshot;

module.exports.login = login;
module.exports.password = password;
module.exports.dev = dev;
module.exports.sprint3 = sprint3;
module.exports.trunk = trunk;

module.exports.testMiddleName = testMiddleName;
module.exports.testSSN = testSSN;
module.exports.testEmail = testEmail;
module.exports.testPhone = testPhone;


module.exports.chapter7 = chapter7;
module.exports.chapter13 = chapter13;
module.exports.individual = individual;
module.exports.joint = joint;
module.exports.illinois = illinois;
module.exports.georgia = georgia;

module.exports.ilnb = ilnb;
module.exports.ilcb = ilcb;
module.exports.ilsb = ilsb;
module.exports.ganb = ganb;
module.exports.gamb = gamb;
module.exports.gasb = gasb;

module.exports.chicDivEast = chicDivEast;
module.exports.eastDivChic = eastDivChic;
module.exports.rockDivWest = rockDivWest;
module.exports.westDivRock = westDivRock;


module.exports.atlanta = atlanta;
module.exports.gainesville = gainesville;
module.exports.newnan = newnan;
module.exports.rome = rome;