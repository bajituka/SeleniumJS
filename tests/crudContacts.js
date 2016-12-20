var util = require('../src/utilities.js'),
    nav = require('../src/navigation.js'),
    jur = require('../src/jurisdictions.js'),
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
    

var webdriver = util.webdriver,
    driver = util.driver,
    By = util.By,
    until = util.until;

var assert = util.assert,
    fs = util.fs,
    mocha = require('selenium-webdriver/testing');
    


//CRUD CONTACTS
mocha.describe('PERSON AND COMPANY CRUD TEST', function() {
    
    this.timeout(0);

    mocha.before(function() {
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(2000);

        util.authorize(test.env, test.login, test.password);
        util.closeTabs();
    });


    mocha.describe('CRUD PERSON', function() {
        
        mocha.it('See all button', function() { 
            this.slow(6000);
            driver.findElement(By.xpath("//div[@id='Contacts_Tab']//a[contains(@class, 'seeAllBtn')]")).click();
            driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'contacts-gridview')]//tr[contains(@id, '_DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
            util.closeTabs();
        });

        mocha.it('Create person', function() {
            this.slow(50000);
            util.openCreateContact('dashboard', 'person');
            util.createPerson(test.person);
        });
        
        mocha.it('Contact information (person)', function() {
            this.slow(50000);
            cont.contactInformation.crudPhone();
            cont.contactInformation.crudEmail();
            cont.contactInformation.crudAddress();
        });
        
        mocha.it('Details', function() {
            this.slow(40000);
            cont.details.addSpouse();
            cont.details.crudSSN();
            cont.details.crudIDs();
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

        mocha.after(function() {
            util.closeTabs();
        });

    });

    mocha.describe('CRUD COMPANY', function() {
                
        mocha.it('Create company', function() {
            this.slow(15000);
            util.openCreateContact('navBarContacts', 'company');
            util.createCompany(test.company);
        });
        
        mocha.it('Contact information', function() {
            this.slow(50000);
            cont.contactInformation.crudPhone();
            cont.contactInformation.crudEmail();
            cont.contactInformation.crudAddress(); 
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



    mocha.after(function() {
        util.closeTabs();
        util.logOut()
    });

});

