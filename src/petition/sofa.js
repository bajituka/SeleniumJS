var req = require('../commonFunctions.js'),
    nav = require('../navigation.js'),
    jur = require('../jurisdictions.js'),
    test = require('../testdata.js');

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;
    
req.catchUncaughtExceptions();

var sofa = {
    
    newBtn: By.xpath("//section[starts-with(@id, 'SOFA_')]//a[@id='newAssetAnchor']"),
    emptyRow: By.xpath("//section[starts-with(@id, 'SOFA_')]//tr[contains(@id, 'DXEmptyRow')]"),
    firstRow: By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow0')]"),
    
    sofa2: function () {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[2]")), 10000);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[2]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa3: function () {  
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[3]")).click();
        driver.wait(until.elementLocated(By.xpath("//*[@id='IsLiveWithSpouce' or text()='No data to display']")), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa4: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[4]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa5: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[5]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa6: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[6]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa7: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[7]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa8: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[8]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa9: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[9]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa10: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[10]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa11: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[11]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa12: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[12]")).click();
        driver.wait(until.elementLocated(By.xpath("//*[@name='propertyInPossession' and @value='True']")));
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa13: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[13]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa14: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[14]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa15: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[15]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa16: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[16]")).click();
        driver.wait(until.elementLocated(By.xpath("//tr[contains(@id, 'DXDataRow0')]")));
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa17: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[17]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa18: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[18]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa19: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[19]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa20: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[20]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa21: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[21]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa22: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[22]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa23: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[23]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa24: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[24]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa25: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[25]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa26: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[26]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa27: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[27]")).click();
        driver.wait(until.elementLocated(this.emptyRow), 15000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    },
    
    sofa28: function() {
        req.navigateTo(nav.navMatter.petition.self, nav.navMatter.petition.sofa);
        driver.findElement(By.xpath("//div[starts-with(@id, 'SOFA_')]//tbody/tr[28]")).click();
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseSofa_')]//tr[contains(@id, 'DXEmptyRow')]")));
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    }
};


module.exports.sofa = sofa;