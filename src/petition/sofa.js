var util = require('../utilities.js'),
    nav = require('../navigation.js'),
    jur = require('../jurisdictions.js'),
    test = require('../testdata.js');

var webdriver = util.webdriver,
    driver = util.driver,
    By = util.By,
    until = util.until;

var assert = util.assert,
    fs = util.fs;
    
util.catchUncaughtExceptions();


var sofa = {
    
    newBtn: By.xpath("//section[starts-with(@id, 'SOFA_')]//a[@id='newAssetAnchor']"),
    emptyRow: By.xpath("//section[starts-with(@id, 'SOFA_')]//tr[contains(@id, 'DXEmptyRow')]"),
    firstRow: By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow0')]"),
    sofaBreadcrumb: By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']"),
    
    sofa2: function () {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[2]")), 20000);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[2]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa3: function () {  
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[3]")).click();
        driver.wait(until.elementLocated(By.xpath("//*[@id='IsLiveWithSpouce' or text()='No data to display']")), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa4: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[4]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa5: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[5]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa6: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[6]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa7: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[7]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa8: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[8]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa9: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[9]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa10: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[10]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa11: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[11]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa12: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[12]")).click();
        driver.wait(until.elementLocated(By.xpath("//*[@name='propertyInPossession' and @value='True']")));
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa13: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[13]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa14: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[14]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa15: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[15]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa16: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[16]")).click();
        driver.wait(until.elementLocated(By.xpath("//tr[contains(@id, 'DXDataRow0')]")), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa17: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[17]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa18: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[18]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa19: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[19]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa20: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[20]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa21: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[21]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa22: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[22]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa23: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[23]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa24: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[24]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa25: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[25]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa26: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[26]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa27: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[27]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(this.sofaBreadcrumb).click();
    },
    
    sofa28: function() {
        util.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[28]")).click();
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseSofa_')]//tr[contains(@id, 'DXEmptyRow')]")));
        driver.findElement(this.sofaBreadcrumb).click();
    }
};


module.exports.sofa = sofa;