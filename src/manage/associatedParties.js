var req = require('../commonFunctions.js'),
    nav = require('../navigation.js'),
    test = require('../testdata.js');

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;

driver.manage().timeouts().implicitlyWait(2000);
req.catchUncaughtExceptions();

var associatedParties = {
    
    waitForPartiesLoaded: function() {
        driver.findElements(By.xpath("//div[starts-with(@id, 'CaseParties')]/div[@class='posrel']")).then(function(elementsNumber) {
            for (var index = 1; index <= elementsNumber.length; index++) {
                driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseParties')]/div[@class='posrel'][" + index + "]//table")), 10000);
            }
        });
    },

    checkOverviewLink: function() {
        req.navigateTo(nav.navMatter.overview);
        driver.wait(until.elementLocated(By.id('viewParties')), 15000);
        driver.findElement(By.id('viewParties')).click();
        this.waitForPartiesLoaded();
        driver.sleep(1000);
    },

    clients: function() {
    
        //check Exchange button
        new req.webdriver.ActionSequence(driver).
                mouseMove(driver.findElement(By.xpath("//div[starts-with(@id, 'CaseParties')]/div[@class='posrel'][1]//tr[@class='hoverContainer']"))).
                click(driver.findElement(By.xpath("//div[starts-with(@id, 'CaseParties')]/div[@class='posrel'][1]//tr[@class='hoverContainer']//a[@title='Exchange']"))).
                perform();
        
        var saveBtn = By.xpath("//section[starts-with(@id, 'Exchange_')]//form[@id='relationshipForm']//button[@type='submit']");      
        driver.wait(until.elementLocated(saveBtn), 15000);
        driver.findElement(saveBtn).click();
        
    },

    attorneys: function() {

        //add
        driver.sleep(1000);
        driver.findElement(By.xpath("//small[contains(@data-pe-add, '_attorney')]")).click();
        var attorneySearchBtn = By.xpath("//div[@class='posrel'][2]//button[contains(@class, 'btn-search')]");
        driver.wait(until.elementIsEnabled(driver.findElement(attorneySearchBtn)), 5000);
        driver.sleep(500);
        driver.findElement(attorneySearchBtn).click();
        driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 15000);
        driver.sleep(1500);
        driver.findElement(nav.dvxprsPopupFirstRow).click();
        driver.sleep(1000);
        driver.findElement(By.xpath("//div[@class='posrel'][2]//button[@type='submit']")).click();
        driver.sleep(500);
        this.waitForPartiesLoaded();
        var firstRow = By.xpath("//div[@class='posrel'][2]//tbody//tr[1]");
        driver.wait(until.elementLocated(firstRow), 15000);

        //delete
        var firstRowEl = driver.findElement(firstRow);
        new req.webdriver.ActionSequence(driver).
                mouseMove(firstRowEl).
                click(driver.findElement(By.xpath("//div[@class='posrel'][2]//tr[1]//a[@title='Delete']"))).
                perform();
        req.confirmDelete();
        driver.wait(until.stalenessOf(firstRowEl), 10000);
    },

    staff: function() {
        driver.findElement(By.xpath("//small[contains(@data-pe-add, '_staff')]")).click();
        var staffSearchBtn = By.xpath("//div[@class='posrel'][3]//button[contains(@class, 'btn-search')]");
        driver.wait(until.elementIsEnabled(driver.findElement(staffSearchBtn)), 5000);
        driver.sleep(500);
        driver.findElement(staffSearchBtn).click();
        driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 15000);
        driver.sleep(1500);
        driver.findElement(nav.dvxprsPopupFirstRow).click();
        driver.sleep(1000);
        driver.findElement(By.xpath("//div[@class='posrel'][3]//button[@type='submit']")).click();
        driver.sleep(500);
        this.waitForPartiesLoaded();
        var firstRow = By.xpath("//div[@class='posrel'][3]//tbody//tr[1]");
        driver.wait(until.elementLocated(firstRow), 15000);

        //delete
        var firstRowEl = driver.findElement(firstRow);
        new req.webdriver.ActionSequence(driver).
                mouseMove(firstRowEl).
                click(driver.findElement(By.xpath("//div[@class='posrel'][3]//tr[1]//a[@title='Delete']"))).
                perform();
        req.confirmDelete();
        driver.wait(until.stalenessOf(firstRowEl), 10000);
    },

    courtPersonnel: function() {
        driver.findElement(By.xpath("//small[contains(@data-pe-add, '_legal')]")).click();
        var courtSearchBtn = By.xpath("//div[@class='posrel'][4]//button[contains(@class, 'btn-search')]");
        driver.wait(until.elementIsEnabled(driver.findElement(courtSearchBtn)), 5000);
        driver.sleep(500);
        driver.findElement(courtSearchBtn).click();
        driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 15000);
        driver.sleep(1500);
        driver.findElement(nav.dvxprsPopupFirstRow).click();
        driver.sleep(1000);
        driver.findElement(By.xpath("//div[@class='posrel'][4]//button[@type='submit']")).click();
        driver.sleep(500);
        this.waitForPartiesLoaded();
        var firstRow = By.xpath("//div[@class='posrel'][4]//tbody//tr[1]");
        driver.wait(until.elementLocated(firstRow), 15000);

        //delete
        var firstRowEl = driver.findElement(firstRow);
        new req.webdriver.ActionSequence(driver).
                mouseMove(firstRowEl).
                click(driver.findElement(By.xpath("//div[@class='posrel'][4]//tr[1]//a[@title='Delete']"))).
                perform();
        req.confirmDelete();
        driver.wait(until.stalenessOf(firstRowEl), 10000);
    },
    
    other: function() {
        driver.findElement(By.xpath("//small[contains(@data-pe-add, '_other')]")).click();
        var otherSearchBtn = By.xpath("//div[@class='posrel'][5]//button[contains(@class, 'btn-search')]");
        driver.wait(until.elementIsEnabled(driver.findElement(otherSearchBtn)), 5000);
        driver.sleep(500);
        driver.findElement(otherSearchBtn).click();
        driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 15000);
        driver.sleep(1500);
        driver.findElement(nav.dvxprsPopupFirstRow).click();
        driver.sleep(1000);
        driver.findElement(By.xpath("//div[@class='posrel'][5]//button[@type='submit']")).click();
        driver.sleep(500);
        this.waitForPartiesLoaded();
        var firstRow = By.xpath("//div[@class='posrel'][5]//tbody//tr[1]");
        driver.wait(until.elementLocated(firstRow), 15000);

        //delete
        var firstRowEl = driver.findElement(firstRow);
        new req.webdriver.ActionSequence(driver).
                mouseMove(firstRowEl).
                click(driver.findElement(By.xpath("//div[@class='posrel'][5]//tr[1]//a[@title='Delete']"))).
                perform();
        req.confirmDelete();
        driver.wait(until.stalenessOf(firstRowEl), 10000);
    }

};



module.exports.associatedParties = associatedParties;