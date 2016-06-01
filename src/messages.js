var req = require('./commonFunctions.js'),
    nav = require('./navigation.js'),
    test = require('./testdata.js'),
    adm = require('./admin.js');

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;

driver.manage().timeouts().implicitlyWait(2000);
req.catchUncaughtExceptions();

var emails = {
    
    newBtn: By.xpath("//div[starts-with(@id, 'Emails_')]//a[contains (@class, 'gridBtn-new')]"),
    
    createEmail: function() {
        var self = this;
        var account = By.xpath("//select[starts-with(@id, 'EmailAccountsSelectBoxId_')]");
        driver.wait(until.elementLocated(account), 15000);
        driver.findElements(By.xpath("//select[starts-with(@id, 'EmailAccountsSelectBoxId_')]/option")).then(function(emailAccts) {
            if (emailAccts.length == 1) { //'Choose email account'
                driver.findElement(nav.navMenu.self).click();
                driver.wait(until.elementIsEnabled(driver.findElement(nav.navMenu.manageMyAccount)), 5000);
                driver.findElement(nav.navMenu.manageMyAccount).click();
                var emailAccountsTab = By.xpath("//div[starts-with(@id, 'usercontainer_')]//a[text()='Email Accounts']");
                driver.wait(until.elementLocated(emailAccountsTab), 15000);
                driver.findElement(emailAccountsTab).click();
                adm.manageMyAccount.emailAccounts.addEmailAcct();
                driver.findElement(By.xpath("//ul[@role='tablist' and starts-with(@class, 'singlePageAppWrap-nav')]//li[3]/a")).click();
                driver.sleep(1000);
                driver.findElement(By.xpath("//section[starts-with(@id, 'CreateUpdateInlineEmailMessage')]//button[@data-role-action='close']")).click();
                driver.sleep(1500);
                driver.findElement(self.newBtn).click();
                driver.wait(until.elementLocated(account), 15000);
            }
        });
        driver.findElement(By.xpath("//select[starts-with(@id, 'EmailAccountsSelectBoxId_')]/option[@selected='selected']")).getText().then(function(account) {
            assert.equal(account.match(/.com/i), '.com')
        });
        driver.findElement(By.id('RecipientEmail')).click();
        driver.wait(until.elementLocated(nav.dvxprsEmailFirstRow), 15000);
        driver.sleep(1500);
        driver.findElement(nav.dvxprsEmailFirstRow).click();
        driver.findElement(nav.dvxprsEmailSaveBtn).click();
        driver.sleep(1500);
        driver.findElement(By.id('Subject')).sendKeys('Test subject, do not reply');
        driver.findElement(By.id('filesNames')).click();
        driver.wait(until.elementLocated(nav.dvxprsEmailFirstRow));
        driver.sleep(1500);
        driver.findElement(By.xpath("//div[@data-role='dialogBox']//button[@class='btn-close']")).click();
        driver.sleep(1000);
        
        driver.switchTo().frame(0);
        driver.findElement(By.className('dxheDesignViewArea_StratusBK dxheViewArea_StratusBK')).sendKeys('test');
        driver.switchTo().defaultContent();
        
        var matterAssocBtn = By.xpath("//div[starts-with(@id, 'cases_listEmailMessage_Editor')]//button"),
            contactAssocBtn = By.xpath("//div[starts-with(@id, 'contacts_listEmailMessage_Editor')]//button");
            
        driver.findElement(matterAssocBtn).click().then(function() {
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 15000);
            driver.sleep(1500);
            driver.findElement(nav.dvxprsPopupFirstRow).click();
            driver.sleep(1000);
        }, function() {
            //matter association already exists
        });
        
        driver.findElement(contactAssocBtn).click().then(function() {
            driver.wait(until.elementLocated(nav.dvxprsPopupFirstRow), 15000);
            driver.sleep(1500);
            driver.findElement(nav.dvxprsPopupFirstRow).click();
            driver.sleep(1000);
        }, function() {
            //contact association already exists
        });
        
        var sendBtn = By.xpath("//section[starts-with(@id, 'CreateUpdateInlineEmailMessage_')]//button[@data-role-action='save']");
        driver.findElement(sendBtn).click();
    },
    
    emailManage: function() {
        driver.wait(until.elementLocated(nav.navMatter.manage.self), 15000);
        driver.findElement(nav.navMatter.manage.self).click();
        driver.wait(until.elementLocated(nav.navMatter.manage.messages.self), 15000);
        driver.findElement(nav.navMatter.manage.messages.self).click();
        driver.wait(until.elementLocated(nav.navMatter.manage.messages.emailMessages), 15000);
        driver.findElement(nav.navMatter.manage.messages.emailMessages).click();
        driver.wait(until.elementLocated(this.newBtn), 15000);
        driver.findElement(this.newBtn).click();
        this.createEmail();
        var firstRow = By.xpath("//div[starts-with(@id, 'Emails')]//tr[contains(@id, 'DXDataRow0')]");
        driver.wait(until.elementLocated(firstRow), 15000);
        driver.sleep(1000);
        driver.findElement(firstRow).click();
        var cancelBtn = By.xpath("//section[starts-with(@id, 'ViewInlineEmailMessage_')]//button[@data-role-action='close']");
        driver.wait(until.elementLocated(cancelBtn), 15000);
        driver.findElement(cancelBtn).click();
        driver.wait(until.elementLocated(firstRow), 5000);
    },
    
    emailNavbar: function() {
        
    }
    
};

module.exports.emails = emails;
    
    


