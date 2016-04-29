var req = require('../commonFunctions.js'),
    nav = require('../navigation.js'),
    efp = require('../efilingparams.js'),
    test = require('../testdata.js');

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs;
    
var newBtn = By.xpath("//section[starts-with(@id, 'SOFA_')]//a[@id='newAssetAnchor']"),
    emptyRow = By.xpath("//section[starts-with(@id, 'SOFA_')]//tr[contains(@id, 'DXEmptyRow')]"),
    firstRow = By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow0')]");

var sofa2 = function () {
        /*
        var saveBtn = By.xpath("//section[starts-with(@id, 'SOFA_')]//button[@type='submit']");
            
        var zipInput = By.id('modelObject_Zip'),
            searchBtn = By.xpath("//div[@id='sofaAddress']//div[@class='row'][1]//div[@id='zipCode']//button[contains(@class, 'btn-search')]"),
            streetInput = By.id('modelObject_Street1'),
            lineInput = By.id('modelObject_Street2'),
            fromInput = By.id('modelObject_ResidedOn_ValidFrom'),
            toInput = By.id('modelObject_ResidedOn_ValidTo');
        */
        driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
        driver.findElement(nav.navMatter.petition.sofa).click();
        driver.wait(until.elementLocated(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[2]")), 10000);
        driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[2]")).click();
        driver.wait(until.elementLocated(emptyRow), 10000);
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
        driver.sleep(1000);
        
        /*
        driver.wait(until.elementLocated(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")), 2000).then(function() {
            driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
            driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[2]"))));
        }, function() {
            
        });
        
        driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[2]")).click();
        driver.wait(until.elementLocated(newBtn));
       
        driver.wait(until.elementLocated(emptyRow), 5000).thenCatch(function() {
            console.log('Sofa 2 had some entries!')
            driver.findElements(By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')]")).then(function(entries) {
                for (var i = 1; i <= entries.length; i++) {
                    new req.webdriver.ActionSequence(driver).
                        mouseMove(driver.findElement(By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')][" + i + "]"))).
                        click(driver.findElement(By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')][1]//a[2]"))).
                        perform();
                    req.confirmDelete();
                    driver.sleep(1000);  
                }
            })
        });
        
        //add
        driver.findElement(newBtn).click();
        driver.wait(until.elementLocated(By.id('modelObject_DebtorType')));
        driver.findElement(zipInput).sendKeys('90220');
        driver.findElement(searchBtn).click();
        req.waitForAddressZip();
        driver.findElement(streetInput).sendKeys('Grove St');
        driver.findElement(lineInput).sendKeys('Line 2');
        driver.findElement(fromInput).sendKeys('Sep 02, 1988');
        driver.findElement(toInput).sendKeys('Sep 01, 2010');
        driver.findElement(saveBtn).click();
       
        
        //update
        
        driver.wait(until.elementIsVisible(driver.findElement(firstRow)), 10000).then(function() {
            driver.sleep(1000);
            
            var entryArr = ['Debtor 1', 'From 9/2/1988 To 9/1/2010'];
            entryArr.forEach(function(item, i, arr) {
                driver.findElement(By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow0')]/td[" + (i + 2) + "]")).getText().then(function(data) {
                    assert.equal(data, entryArr[i])
                });
            });
            
            driver.findElement(firstRow).click();
            driver.wait(until.elementLocated(zipInput));
            driver.findElement(zipInput).clear();
            driver.findElement(zipInput).sendKeys('60007');
            driver.findElement(searchBtn).click();
            req.waitForAddressZip();
            driver.findElement(streetInput).clear();
            driver.findElement(lineInput).clear();
            driver.findElement(fromInput).clear();
            driver.findElement(toInput).clear();
            driver.findElement(streetInput).sendKeys('Mystreet');
            driver.findElement(lineInput).sendKeys('Line 5');
            driver.findElement(fromInput).sendKeys('Aug 5, 2010');
            driver.findElement(toInput).sendKeys('May 30, 2015');
            driver.findElement(saveBtn).click();
            
            driver.wait(until.elementIsVisible(driver.findElement(firstRow)), 10000).then(function() {
                driver.sleep(1000);
            
                var changedEntryArr = ['Debtor 1', 'From 8/5/2010 To 5/30/2015'];
                changedEntryArr.forEach(function(item, i, arr) {
                    driver.findElement(By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow0')]/td[" + (i + 2) + "]")).getText().then(function(data) {
                        assert.equal(data, changedEntryArr[i])
                    });
                });
                
                //delete
                driver.findElement(By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')][1]//a[2]")).click();
                req.confirmDelete();
                driver.wait(until.elementLocated(emptyRow)).then(function() {
                    console.log('Sofa 2 OK')
                });
                
            }, function(err) {
                console.log('Sofa 2 entry did not appear after update FAIL ' + err.message)
            })
            
            
            
        }, function(err) {
            console.log('Sofa 2 entry did not appear after creation FAIL ' + err.message)
        });
        
        */
        
};




var sofa3 = function () {
        /*
        var newBtn = By.xpath("//section[starts-with(@id, 'SOFA_')]//a[@id='newAssetAnchor']"),
            emptyRow = By.xpath("//section[starts-with(@id, 'SOFA_')]//tr[contains(@id, 'DXEmptyRow')]"),
            firstRow = By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow0')]"),
            saveBtn = By.xpath("//section[starts-with(@id, 'SOFA_')]//button[@type='submit']");
        */    
        
        driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
        driver.findElement(nav.navMatter.petition.sofa).click();
        
        driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[3]")).click();
        driver.wait(until.elementLocated(By.xpath("//*[@id='IsLiveWithSpouce' and @value='True']")));
        driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
        driver.sleep(1000);
        
        /*
        driver.wait(until.elementLocated(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")), 2000).then(function() {
            driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
            driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[2]"))));
        }, function() {
            
        });
        
        driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[3]")).click();
        driver.wait(until.elementLocated(newBtn));
       
        driver.wait(until.elementLocated(emptyRow), 5000).thenCatch(function() {
            console.log('Sofa 2 had some entries!')
            driver.findElements(By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')]")).then(function(entries) {
                for (var i = 1; i <= entries.length; i++) {
                    new req.webdriver.ActionSequence(driver).
                        mouseMove(driver.findElement(By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')][" + i + "]"))).
                        click(driver.findElement(By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')][1]//a[2]"))).
                        perform();
                    req.confirmDelete();
                    driver.sleep(1000);  
                }
            })
        });
        
        
        //add
        driver.findElement(newBtn).click();
        driver.wait(until.elementLocated());
        
       
        
        //update
        
        driver.wait(until.elementIsVisible(driver.findElement(firstRow)), 10000).then(function() {
            driver.sleep(1000);
            
            var entryArr = [];
            entryArr.forEach(function(item, i, arr) {
                driver.findElement(By.xpath()).getText().then(function(data) {
                    assert.equal(data, entryArr[i])
                });
            });
            
            driver.findElement(firstRow).click();
            driver.wait(until.elementLocated());
            
            driver.findElement(saveBtn).click();
            
            driver.wait(until.elementIsVisible(driver.findElement(firstRow)), 10000).then(function() {
                driver.sleep(1000);
            
                var changedEntryArr = [];
                changedEntryArr.forEach(function(item, i, arr) {
                    driver.findElement(By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow0')]/td[" + (i + 2) + "]")).getText().then(function(data) {
                        assert.equal(data, changedEntryArr[i])
                    });
                });
                
                //delete
                driver.findElement(By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')][1]//a[2]")).click();
                req.confirmDelete();
                driver.wait(until.elementLocated(emptyRow)).then(function() {
                    console.log('Sofa 2 OK')
                });
                
            }, function(err) {
                console.log('Sofa 2 entry did not appear after update FAIL ' + err.message)
            })
            
            
            
        }, function(err) {
            console.log('Sofa 2 entry did not appear after creation FAIL ' + err.message)
        });
        */
};

var sofa4 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();
    
    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[4]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
    
    
};

var sofa5 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();
    
    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[5]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa6 = function() {
    /*
    var newBtn = By.xpath("//section[starts-with(@id, 'SOFA_')]//a[@id='newAssetAnchor']"),
        emptyRow = By.xpath("//section[starts-with(@id, 'SOFA_')]//tr[contains(@id, 'DXEmptyRow')]"),
        firstRow = By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow0')]"),
        saveBtn = By.xpath("//section[starts-with(@id, 'SOFA_')]//button[@type='submit']");
    */        
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[6]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
        
        
        /*
        driver.wait(until.elementLocated(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")), 2000).then(function() {
            driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
            driver.wait(until.elementIsEnabled(driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[2]"))));
        }, function() {
            
        });
        
        driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[6]")).click();
        driver.wait(until.elementLocated(newBtn));
       
        driver.wait(until.elementLocated(emptyRow), 5000).thenCatch(function() {
            console.log('Sofa 6 had some entries!')
            driver.findElements(By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')]")).then(function(entries) {
                for (var i = 1; i <= entries.length; i++) {
                    new req.webdriver.ActionSequence(driver).
                        mouseMove(driver.findElement(By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')][" + i + "]"))).
                        click(driver.findElement(By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')][1]//a[2]"))).
                        perform();
                    req.confirmDelete();
                    driver.sleep(1000);  
                }
            })
        });
        
        //add
        driver.findElement(newBtn).click();
        driver.wait(until.elementLocated(By.xpath("//*[@id='modelObject_Recipient_Id']")));
        driver.findElement(By.xpath("//*[@id='modelObject_Recipient_Id']/option[not(@value='')][1]")).click();
        
        
       
        
        //update
        
        driver.wait(until.elementIsVisible(driver.findElement(firstRow)), 10000).then(function() {
            driver.sleep(1000);
            
            var entryArr = [];
            entryArr.forEach(function(item, i, arr) {
                driver.findElement(By.xpath()).getText().then(function(data) {
                    assert.equal(data, entryArr[i])
                });
            });
            
            driver.findElement(firstRow).click();
            driver.wait(until.elementLocated());
            
            driver.findElement(saveBtn).click();
            
            driver.wait(until.elementIsVisible(driver.findElement(firstRow)), 10000).then(function() {
                driver.sleep(1000);
            
                var changedEntryArr = [];
                changedEntryArr.forEach(function(item, i, arr) {
                    driver.findElement(By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow0')]/td[" + (i + 2) + "]")).getText().then(function(data) {
                        assert.equal(data, changedEntryArr[i])
                    });
                });
                
                //delete
                driver.findElement(By.xpath("//section[starts-with(@id, 'SOFA_')]//table[contains(@id, 'DXMainTable')]//tr[contains(@id, 'DXDataRow')][1]//a[2]")).click();
                req.confirmDelete();
                driver.wait(until.elementLocated(emptyRow)).then(function() {
                    console.log('Sofa 2 OK')
                });
                
            }, function(err) {
                console.log('Sofa 2 entry did not appear after update FAIL ' + err.message)
            })
            
            
            
        }, function(err) {
            console.log('Sofa 2 entry did not appear after creation FAIL ' + err.message)
        });
    */
};

var sofa7 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[7]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa8 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[8]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa9 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[9]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa10 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[10]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa11 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[11]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa12 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[12]")).click();
    driver.wait(until.elementLocated(By.xpath("//*[@name='propertyInPossession' and @value='True']")));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa13 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[13]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa14 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[14]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa15 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[15]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa16 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[16]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa16 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[16]")).click();
    driver.wait(until.elementLocated(By.xpath("//section[starts-with(@id, 'SOFA_')]//tr[contains(@id, 'DXEmptyRow') or contains(@id, 'DXDataRow0')]")));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa17 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[17]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa18 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[18]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa19 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[19]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa20 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[20]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa21 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[21]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa22 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[22]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa23 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[23]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa24 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[24]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa25 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[25]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa26 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[26]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa27 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[27]")).click();
    driver.wait(until.elementLocated(emptyRow));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofa28 = function() {
    
    driver.wait(until.elementLocated(nav.navMatter.petition.sofa));
    driver.findElement(nav.navMatter.petition.sofa).click();

    driver.findElement(By.xpath("//table[starts-with(@id, 'SOFA_')]/tbody/tr[28]")).click();
    driver.wait(until.elementLocated(By.xpath("//div[starts-with(@id, 'CaseSofa_')]//tr[contains(@id, 'DXEmptyRow')]")));
    driver.findElement(By.xpath("//div[@class='breadCrumb']/a[text()='SOFA']")).click();
    driver.sleep(1000);
    
};

var sofaArr = [sofa2, sofa3, sofa4, sofa5, sofa6, sofa7, sofa8, sofa9, sofa10, sofa11, sofa12, sofa13, sofa14, sofa15, sofa16, sofa17, sofa18, sofa19, sofa20, sofa21, sofa22, sofa23, sofa24, sofa25, sofa26, sofa27, sofa28];


module.exports.sofaArr = sofaArr;