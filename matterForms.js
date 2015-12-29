var req = require('./functions.js');

var driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert;

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var fs = req.fs;

var currentDate = req.currentDate;

webdriver.WebDriver.prototype.saveScreenshot = function(filename) {
    return driver.takeScreenshot().then(function(data) {
        fs.writeFile(filename, data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
            if(err) throw err;
        });
    })
};

var login = req.login,
    password = req.password,
    dev = req.dev,
    sprint3 = req.sprint3,
    trunk = req.trunk;

var testMiddleName = req.testMiddleName,
    testSSN = req.testSSN,
    testEmail = req.testEmail,
    testPhone = req.testPhone;

var chapter7 = req.chapter7,
    chapter13 = req.chapter13,
    individual = req.individual,
    joint = req.joint,
    illinois = req.illinois,
    georgia = req.georgia,
    ilnb = req.ilnb,
    ilcb = req.ilcb,
    ilsb = req.ilsb,
    ganb = req.ganb,
    gamb = req.gamb,
    gasb = req.gasb;

driver.manage().window().maximize();




req.authorize(sprint3);
req.closeTabs();
req.selectMatter('Bankruptcy', 'Chapter 7'); //args are (string): Bankruptcy or General, Chapter 7 or 13

//OFFICIAL FORMS BEGIN
driver.wait(until.elementLocated(By.xpath("//ul[@id='schedulesView']/li[3]/a")));
driver.findElement(By.xpath("//ul[@id='schedulesView']/li[3]/a")).click();
driver.manage().timeouts().implicitlyWait(2000);
driver.findElement(By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]/div/ul/li[starts-with(@aria-controls, 'CaseForms_')]/a")).click();
driver.wait(until.elementLocated(By.xpath("//tr[@data-pe-action='B101_1215']")));

driver.findElements(By.xpath("//article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')]")).then(function(formsCount) {
    console.log('There are ' + formsCount.length + ' official forms');
    for (var i = 1; i <= formsCount.length; i++) {
        var formNumber = driver.findElement(By.xpath("//div[starts-with(@id, 'officialCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')][" + i + "]")).getAttribute('data-pe-action')
        .then(function(fnum) {
            formNumber = fnum
        });
        driver.findElement(By.xpath("//div[starts-with(@id, 'officialCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')][" + i + "]/td/a")).click();
        driver.wait(until.elementLocated(By.xpath("//section/div/iframe")), 10000);
        driver.switchTo().frame(0);

        driver.wait(until.elementLocated(By.xpath("//html/body/section/article")), 10000)
            .then(function() {
                console.log('Official form ' + formNumber + ' OK')
            }, function(err) {
                driver.findElement(By.xpath("//html/body/span/h1")).getText()
                    .then(function(failMsg) {
                        if (failMsg == "Server Error in '/' Application.") {
                            console.log('Official form ' + formNumber + ' FAIL');
                            driver.saveScreenshot('Official form_' + formNumber + '_failed_' + currentDate().replace(/\//g, '') + '.png' );
                        }
                    }, function(err) {
                        console.log(err)
                    })
        });

        driver.switchTo().defaultContent();
        driver.manage().timeouts().implicitlyWait(2000);
        driver.findElement(By.xpath("//section[contains(@id, 'container_dialogContent-Form')]/div[2]/button")).click();
        driver.sleep(1000);
    };
}, function(err) {
    console.log(err)
});
//OFFICIAL FORMS END

//LOCAL FORMS BEGIN
driver.manage().timeouts().implicitlyWait(2000);
driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'localCaseFormsForms_')]/a")).click();
driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'localCaseFormsForms_')]/div/article/table/tbody/tr/td/div[1]")));

driver.findElements(By.xpath("//div[starts-with(@id, 'localCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')]")).then(function(formsCount) {
    console.log('There are ' + formsCount.length + ' local forms');
    for (var i = 1; i <= formsCount.length; i++) {
        var formNumber = driver.findElement(By.xpath("//div[starts-with(@id, 'localCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')][" + i + "]")).getAttribute('data-pe-action')
        .then(function(fnum) {
            formNumber = fnum
        });
        driver.findElement(By.xpath("//div[starts-with(@id, 'localCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')][" + i + "]/td/a")).click();
        driver.wait(until.elementLocated(By.xpath("//section/div/iframe")), 10000);
        driver.switchTo().frame(0);

        driver.wait(until.elementLocated(By.xpath("//html/body/section/article")), 10000)
        .then(function() {
            console.log('Local form ' + formNumber + ' OK')
        }, function(err) {
            driver.findElement(By.xpath("//html/body/span/h1")).getText()
            .then(function(failMsg) {
                if (failMsg == "Server Error in '/' Application.") {
                    console.log('Local form ' + formNumber + ' FAIL');
                    driver.saveScreenshot('Local form_' + formNumber + '_failed_' + currentDate().replace(/\//g, '') + '.png' );
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
//LOCAL FORMS END

//PLANS BEGIN
driver.manage().timeouts().implicitlyWait(2000);
driver.findElement(By.xpath("//li[starts-with(@aria-controls, 'plansCaseFormsForms_')]/a")).click()
.then(function() {

    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'plansCaseFormsForms_')]/div/article/table/tbody/tr/td/div[1]")));

    driver.findElements(By.xpath("//div[starts-with(@id, 'plansCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')]")).then(function(formsCount) {
        console.log('There are ' + formsCount.length + ' plan forms');
        for (var i = 1; i <= formsCount.length; i++) {
            var formNumber = driver.findElement(By.xpath("//div[starts-with(@id, 'plansCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')][" + i + "]")).getAttribute('data-pe-action')
            .then(function(fnum) {
                formNumber = fnum
            });
            driver.findElement(By.xpath("//div[starts-with(@id, 'plansCaseFormsForms_')]/div/article/table/tbody/tr/td/div[2]/table/tbody/tr[starts-with(@id, 'grid_')][" + i + "]/td/a")).click();
            driver.wait(until.elementLocated(By.xpath("//section/div/iframe")), 10000);
            driver.switchTo().frame(0);

            driver.wait(until.elementLocated(By.xpath("//html/body/section/article")), 10000)
            .then(function() {
                console.log('Plan form ' + formNumber + ' OK')
            }, function(err) {
                driver.findElement(By.xpath("//html/body/span/h1")).getText()
                .then(function(failMsg) {
                    if (failMsg == "Server Error in '/' Application.") {
                        console.log('Plan form ' + formNumber + ' FAIL');
                        driver.saveScreenshot('Plan form_' + formNumber + '_failed_' + currentDate().replace(/\//g, '') + '.png' );
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
}, function(noPlan) {
    console.log('Chapter 7: No plans')
});
//PLANS END

req.logOut();