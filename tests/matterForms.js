var req = require('../src/functions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
    test = require('../src/testdata.js');

var driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;

var arrChapters = ['chapter 7', 'chapter 13'];

req.catchUncaughtExceptions();

driver.manage().window().maximize();
driver.manage().timeouts().implicitlyWait(2000);


req.authorize(test.env, test.login, test.password);
req.closeTabs();
req.selectMatter(test.selMatterType, test.selChapter, test.selJurisdiction);


driver.wait(until.elementLocated(nav.navBarManage));
driver.findElement(nav.navBarManage).click();
driver.findElement(nav.navBarManageMatterForms).click();
driver.wait(until.elementLocated(By.xpath("//tr[@data-pe-action='B101_1215']")));

//OFFICIAL FORMS
driver.findElements(By.xpath("//article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')]")).then(function(formsCount) {
    console.log('There are ' + formsCount.length + ' official forms');
    for (var i = 1; i <= formsCount.length; i++) {
        var formNumber = driver.findElement(By.xpath("//div[starts-with(@id, 'officialCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')][" + i + "]")).getAttribute('data-pe-action').then(function(fnum) {
            formNumber = fnum
        });
        driver.findElement(By.xpath("//div[starts-with(@id, 'officialCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')][" + i + "]/td/a")).click();
        driver.wait(until.elementLocated(By.xpath("//div[@class='metro window-overlay']//section/div/iframe")), 10000);
        driver.switchTo().frame(0);

        driver.wait(until.elementLocated(By.xpath("//html/body/section/article")), 10000).then(function() {
            console.log('Official form ' + formNumber + ' OK')
        }, function(err) {
            driver.findElement(By.xpath("//html/body/span/h1")).getText().then(function(failMsg) {
                if (failMsg == "Server Error in '/' Application.") {
                    console.log('Official form ' + formNumber + ' FAIL');
                    req.saveScreenshot('Official form_' + formNumber + '_failed_' + req.currentDate().replace(/\//g, '') + '.png' );
                }
            }, function(err) {
                console.log(err)
            })
        });

        driver.switchTo().defaultContent();
        driver.findElement(By.xpath("//section[contains(@id, 'container_dialogContent-Form')]/div[2]/button")).click();
        driver.sleep(1000);
    };
}, function(err) {
    console.log(err)
});


//LOCAL FORMS
driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'localCaseFormsForms_')]/a")).click();
driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'localCaseFormsForms_')]/div/article/table/tbody/tr/td/div[1]")));

driver.findElements(By.xpath("//div[starts-with(@id, 'localCaseFormsForms_')]//div[2]//tr[starts-with(@id, 'grid_')][not(contains(@id, '_DXEmptyRow'))]")).then(function(formsCount) {
    console.log('There are ' + formsCount.length + ' local forms');
    for (var i = 1; i <= formsCount.length; i++) {
        var formNumber = driver.findElement(By.xpath("//div[starts-with(@id, 'localCaseFormsForms_')]//div[2]//tr[starts-with(@id, 'grid_')][" + i + "]")).getAttribute('data-pe-action').then(function(fnum) {
            formNumber = fnum
        });
        driver.findElement(By.xpath("//div[starts-with(@id, 'localCaseFormsForms_')]//div[2]//tr[starts-with(@id, 'grid_')][" + i + "]/td/a")).click();
        driver.wait(until.elementLocated(By.xpath("//div[@class='metro window-overlay']//section/div/iframe")), 10000);
        driver.switchTo().frame(1);

        driver.wait(until.elementLocated(By.xpath("//html/body/section/article")), 10000).then(function() {
            console.log('Local form ' + formNumber + ' OK')
        }, function(err) {
            driver.findElement(By.xpath("//html/body/span/h1")).getText().then(function(failMsg) {
                if (failMsg == "Server Error in '/' Application.") {
                    console.log('Local form ' + formNumber + ' FAIL');
                    req.saveScreenshot('Local form_' + formNumber + '_failed_' + req.currentDate().replace(/\//g, '') + '.png' );
                }
            }, function(err) {
                console.log(err)
            })
        });

        driver.switchTo().defaultContent();
        driver.findElement(By.xpath("//div[2]/section[contains(@id, 'container_dialogContent-Form')]/div[2]/button")).click();
        driver.sleep(1000);
    };
}, function(err) {
    console.log(err)
});


//PLANS
driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'plansCaseFormsForms_')]/a")).click().then(function() {
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'plansCaseFormsForms_')]/div/article/table/tbody/tr/td/div[1]")));
    
    driver.findElements(By.xpath("//div[starts-with(@id, 'plansCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')][not(contains(@id, '_DXEmptyRow'))]")).then(function(formsCount) {
        console.log('There are ' + formsCount.length + ' plan forms');
        for (var i = 1; i <= formsCount.length; i++) {
            var formNumber = driver.findElement(By.xpath("//div[starts-with(@id, 'plansCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')][" + i + "]")).getAttribute('data-pe-action').then(function(fnum) {
                formNumber = fnum
            });
            driver.findElement(By.xpath("//div[starts-with(@id, 'plansCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')][" + i + "]/td/a")).click();
            driver.wait(until.elementLocated(By.xpath("//div[@class='metro window-overlay']//section/div/iframe")), 10000);
            driver.switchTo().frame(2);

            driver.wait(until.elementLocated(By.xpath("//html/body/section/article")), 10000).then(function() {
                console.log('Plan form ' + formNumber + ' OK')
            }, function(err) {
                driver.findElement(By.xpath("//html/body/span/h1")).getText().then(function(failMsg) {
                    if (failMsg == "Server Error in '/' Application.") {
                        console.log('Plan form ' + formNumber + ' FAIL');
                        req.saveScreenshot('Plan form_' + formNumber + '_failed_' + req.currentDate().replace(/\//g, '') + '.png' );
                    }
                }, function(err) {
                    console.log(err.name + ' ' + err.message)
                })
            });

            driver.switchTo().defaultContent();
            driver.findElement(By.xpath("//div[2]/section[contains(@id, 'container_dialogContent-Form')]/div[2]/button")).click();
            driver.sleep(1000);
        };
        
    }, function(err) {
        console.log(err)
    });
    
}, function(noPlan) {
    console.log('Chapter 7: No plans')
});

req.logOut();