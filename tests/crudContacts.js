var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
    test = require('../src/testdata.js'),
    cont = require('../src/contacts.js'),
    gi = require('../src/petition/generalInformation.js'),
    prop = require('../src/petition/property.js'),
    cred = require('../src/petition/creditors.js'),
    exec = require('../src/petition/executoryContracts.js'),
    inc = require('../src/petition/incomeAndExpenses.js'),
    sofa = require('../src/petition/sofa.js'),
    soi = require('../src/petition/statementOfIntent.js'),
    dd = require('../src/petition/dueDiligence.js');
    

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;

var assert = req.assert,
    fs = req.fs,
    mocha = require('selenium-webdriver/testing');
    


//CRUD CONTACTS
mocha.describe('CRUD PERSON', function() {
    this.timeout(0);
    
    mocha.before(function() {
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(2000);
        req.catchUncaughtExceptions();

        req.authorize(test.env, test.login, test.password);
        req.closeTabs();
    });
    
    
    mocha.it('See all button', function() { 
        this.slow(6000);
        driver.findElement(By.xpath("//div[@id='Contacts_Tab']//a[contains(@class, 'seeAllBtn')]")).click();
        driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'contacts-gridview')]//tr[contains(@id, '_DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
        req.closeTabs();
    });

    mocha.it('Create person', function() {
        this.slow(50000);
        req.openCreateContact('dashboard', 'person');
        req.createPerson(test.testPerson);
    });
    
    mocha.it('Contact information (person)', function() {
        this.slow(50000);
        cont.crudPhone();
        cont.crudEmail();
        cont.crudAddress();
    });
    
    mocha.it('Details', function() {
        this.slow(40000);
        cont.addSpouse();
        cont.crudSSN();
        cont.crudIDs();
    });
    
    mocha.it('Employment', function() {   
        this.slow(30000);
        cont.crudEmployment();
    });

    mocha.it('Dependents', function() {  
        this.slow(80000);
        cont.crudDependents();  
    });

    mocha.it('Marketing', function() {   
        this.slow(6000);
        cont.marketing(); 
    });

    mocha.it('Other names', function() {
        this.slow(12000);
        cont.crudOtherNames();
    });

    mocha.it('Delete from dashboard', function() { 
        this.slow(7000);
        cont.deletePersonFromDashboard();
    });

    mocha.it('Contact name change and delete from Contacts grid', function() {
        this.slow(35000);
        cont.crudContactName();
    });

});

mocha.describe('CRUD COMPANY', function() {
    this.timeout(0);
    
    mocha.before(function() {
        
        if (driver.toString().match(/null/g)) { //not working
            driver.manage().window().maximize();
            driver.manage().timeouts().implicitlyWait(2000);
            req.authorize(test.env, test.login, test.password);
            req.closeTabs();
        } else {
            req.closeTabs();
        }
        
        
    });
    
    mocha.it('Create company', function() {
        this.slow(15000);
        req.openCreateContact('navBarContacts', 'company');
        req.createCompany(test.testCompany);
    });
    
    mocha.it('Contact information', function() {
        this.slow(50000);
        cont.crudPhone();
        cont.crudEmail();
        cont.crudAddress(); 
    });
    
    mocha.it('Details', function() {
        this.slow(15000);
        cont.companyDetails(); 
    });
    
    mocha.it('Marketing', function() {
        this.slow(6000);
        cont.marketing(); 
    });
    
    mocha.it('Other names', function() {
        this.slow(40000);
        cont.companyOtherNames(); 
    });
    
    mocha.it('Delete from dashboard', function() {
        this.slow(6000);
        cont.deleteCompFromDashboard(); 
    });
    
});