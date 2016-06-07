var req = require('../commonFunctions.js'),
    nav = require('../navigation.js'),
    efp = require('../efilingparams.js'),
    test = require('../testdata.js');

var driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;

req.catchUncaughtExceptions();

var matterForms = function() {

    req.navigateTo(nav.navMatter.manage.self, nav.navMatter.manage.matterForms.self);
    driver.wait(until.elementLocated(By.xpath("//tr[@data-pe-action='B101_1215']")), 15000);

    //OFFICIAL FORMS
    driver.findElements(By.xpath("//article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')]")).then(function(formsCount) {
        console.log('There are ' + formsCount.length + ' official forms');
        for (var i = 1; i <= formsCount.length; i++) {
            var formNumber = driver.findElement(By.xpath("//div[starts-with(@id, 'officialCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')][" + i + "]")).getAttribute('data-pe-action').then(function(fnum) {
                formNumber = fnum
            });
            driver.findElement(By.xpath("//div[starts-with(@id, 'officialCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')][" + i + "]/td/a")).click();
            driver.wait(until.elementLocated(By.xpath("//div[@class='metro window-overlay']//section/div/iframe")), 10000);
            driver.switchTo().frame(1);

            driver.wait(until.elementLocated(By.xpath("//html/body/section/article")), 10000).thenCatch(function() {
                driver.findElement(By.xpath("//html/body/span/h1")).getText().then(function(failMsg) {
                    if (failMsg == "Server Error in '/' Application.") {
                        console.log('Official form ' + formNumber + ' FAIL');
                        req.saveScreenshot('Official form_' + formNumber + '_failed_' + req.currentDate().replace(/\//g, '') + '.png' );
                    }
                });
            });
            driver.switchTo().defaultContent();
            driver.findElement(By.xpath("//section[contains(@id, 'container_dialogContent-Form')]/div[2]/button")).click();
            driver.sleep(500);
        }
    });


    //LOCAL FORMS
    driver.findElement(nav.navMatter.manage.matterForms.localForms).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'localCaseFormsForms_')]/div/article/table/tbody/tr/td/div[1]")), 15000);

    driver.findElements(By.xpath("//div[starts-with(@id, 'localCaseFormsForms_')]//div[2]//tr[starts-with(@id, 'grid_')][not(contains(@id, '_DXEmptyRow'))]")).then(function(formsCount) {
        
        for (var i = 1; i <= formsCount.length; i++) {
            var formNumber = driver.findElement(By.xpath("//div[starts-with(@id, 'localCaseFormsForms_')]//div[2]//tr[starts-with(@id, 'grid_')][" + i + "]")).getAttribute('data-pe-action').then(function(fnum) {
                formNumber = fnum
            });
            driver.findElement(By.xpath("//div[starts-with(@id, 'localCaseFormsForms_')]//div[2]//tr[starts-with(@id, 'grid_')][" + i + "]/td/a")).click();
            driver.wait(until.elementLocated(By.xpath("//div[@class='metro window-overlay']//section/div/iframe")), 10000);
            driver.switchTo().frame(3);

            driver.wait(until.elementLocated(By.xpath("//html/body/section/article")), 10000).thenCatch(function() {
                driver.findElement(By.xpath("//html/body/span/h1")).getText().then(function(failMsg) {
                    if (failMsg == "Server Error in '/' Application.") {
                        console.log('Local form ' + formNumber + ' FAIL');
                        req.saveScreenshot('Local form_' + formNumber + '_failed_' + req.currentDate().replace(/\//g, '') + '.png' );
                    }
                }, function() {
                    console.log('Error message was not found, please check the frame number or route to the document')
                });
            });
            driver.switchTo().defaultContent();
            driver.findElement(By.xpath("//div[2]/section[contains(@id, 'container_dialogContent-Form')]/div[2]/button")).click();
            driver.sleep(500);
        }
    });


    //PLANS
    driver.findElement(nav.navMatter.manage.matterForms.plans).click().then(function() {
        driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'plansCaseFormsForms_')]/div/article/table/tbody/tr/td/div[1]")), 15000);
        
        driver.findElements(By.xpath("//div[starts-with(@id, 'plansCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')][not(contains(@id, '_DXEmptyRow'))]")).then(function(formsCount) {
            console.log('There are ' + formsCount.length + ' plan forms');
            for (var i = 1; i <= formsCount.length; i++) {
                var formNumber = driver.findElement(By.xpath("//div[starts-with(@id, 'plansCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')][" + i + "]")).getAttribute('data-pe-action').then(function(fnum) {
                    formNumber = fnum
                });
                driver.findElement(By.xpath("//div[starts-with(@id, 'plansCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')][" + i + "]/td/a")).click();
                driver.wait(until.elementLocated(By.xpath("//div[@class='metro window-overlay']//section/div/iframe")), 10000);
                driver.switchTo().frame(5);

                driver.wait(until.elementLocated(By.xpath("//html/body/section/article")), 10000).thenCatch(function() {
                    driver.findElement(By.xpath("//html/body/span/h1")).getText().then(function(failMsg) {
                        if (failMsg == "Server Error in '/' Application.") {
                            console.log('Plan form ' + formNumber + ' FAIL');
                            req.saveScreenshot('Plan form_' + formNumber + '_failed_' + req.currentDate().replace(/\//g, '') + '.png' );
                        }
                    });
                });
                
                driver.switchTo().defaultContent();
                driver.findElement(By.xpath("//div[2]/section[contains(@id, 'container_dialogContent-Form')]/div[2]/button")).click();
                driver.sleep(1000);
            }
        });
    
        
    }, function(noPlan) {
        console.log('Chapter 7: No plans')
    });
    
    driver.switchTo().defaultContent();
};

module.exports.matterForms = matterForms;