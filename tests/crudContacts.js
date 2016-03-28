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
        driver.findElement(By.xpath("//div[@id='Contacts_Tab']//a[contains(@class, 'seeAllBtn')]")).click();
        driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'contacts-gridview')]//tr[contains(@id, '_DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
        req.closeTabs();
    });

    mocha.it('Create person', function() {
        req.openCreateContact('dashboard', 'person');
        req.createPerson(test.testPerson);
    });
    
    mocha.it('Contact information (person)', function() {
        cont.crudPhone();
        cont.crudEmail();
        cont.crudAddress(); 
    });
    
    mocha.it('Details', function() {  
        cont.addSpouse();
        cont.crudSSN();
        cont.crudIDs(); 
    });
    
    mocha.it('Employment', function() {   
        cont.crudEmployment();   
    });

    mocha.it('Dependents', function() {  
        cont.crudDependents();  
    });

    mocha.it('Marketing', function() {   
        cont.marketing(); 
    });

    mocha.it('Other names', function() {
        cont.crudOtherNames();
    });

    mocha.it('Delete from dashboard', function() { 
        cont.deletePersonFromDashboard();
    });

    mocha.it('Contact name change and delete from Contacts grid', function() {
        cont.crudContactName();
    });

});

mocha.describe('CRUD COMPANY', function() {
    
    this.timeout(0);
    
    mocha.before(function() {
        
        req.closeTabs();
    });
    
    mocha.it('Create company', function() {
        req.openCreateContact('navBarContacts', 'company');
        req.createCompany(test.testCompany);
    });
    
    mocha.it('Contact information', function() {
        cont.crudPhone();
        cont.crudEmail();
        cont.crudAddress(); 
    });
    
    mocha.it('Details', function() {
        cont.companyDetails(); 
    });
    
    mocha.it('Marketing', function() {
        cont.marketing(); 
    });
    
    mocha.it('Other names', function() {
        cont.companyOtherNames(); 
    });
    
    mocha.it('Delete from dashboard', function() {
        cont.deleteCompFromDashboard(); 
    });
    
});