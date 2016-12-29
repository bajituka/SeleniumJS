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

        mocha.it('Should create a person contact', function() {
            util.openCreateContact('dashboard', 'person');
            util.createPerson(test.person);
        });
        
        
            /*
        //Phone
        mocha.it("Should add a phone number", function() {
            cont.contactInformation.phone.addPhone("Other", "3213213211", "329", ["doNotCall", "doNotText"]);
        });
        mocha.it("Should update a phone number", function() {
            cont.contactInformation.phone.updatePhone("2", "7778889997", "111");
        });
        mocha.it("Should delete a phone number", function() {
            cont.contactInformation.phone.deletePhone("2");
        });

        //Email
        mocha.it("Should add an email", function() {
            cont.contactInformation.email.addEmail("Work", "xjustanotheremail@gmail.com", ["useForNotifications", "doNotSendEmails"]);
        });
        mocha.it("Should update an email", function() {
            cont.contactInformation.email.updateEmail("2", "zchangedemail@gmail.com");
        });
        mocha.it("Should delete an email", function() {
            cont.contactInformation.email.deleteEmail("2");
        });

        //Address
        mocha.it("Should add an address", function() {
            cont.contactInformation.address.addAddress("Work", "90220", "217 E Indigo St");
        });
        mocha.it("Should update an address", function() {
            cont.contactInformation.address.updateAddress("2", "70812", "99 Grove St.");
        });
        mocha.it("Should delete an address", function() {
            cont.contactInformation.address.deleteAddress("2");
        });
                
*/
        //Details
        mocha.it('Should change marital status to Married', function() {
            util.navigateTo(nav.navContact.profile.details);
            cont.details.personalInfo.changeMaritalStatusTo("married", "Aabraham Checker");
        });

        mocha.it('Should add a primary SSN', function() {
            cont.details.ssn.addSSN("987987987", true);
        });

        mocha.it('Should add update the second SSN', function() {
            cont.details.ssn.updateSSN(2, "654654654", false);
        });

        mocha.it('Should delete the second SSN', function() {
            cont.details.ssn.deleteSSN(2);
        });


        //Identifications
        mocha.it('Should add an identification', function() {
            cont.details.identifications.addIdentification("driversLicense", "321321321", "Wyoming", "Dec 29, 2017");
        });

        mocha.it('Should update an identification', function() {
            cont.details.identifications.updateIdentification(1, "driversLicense", "741741741", "California", "Dec 30, 2018", false);
        });

        mocha.it('Should delete an identification', function() {
            cont.details.identifications.deleteIdentification(1);
        });

/*
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
*/
        mocha.after(function() {
            util.closeTabs();
        });

    });

    mocha.describe.skip('CRUD COMPANY', function() {
                
        mocha.it('Create company', function() {
            this.slow(15000);
            util.openCreateContact('navBarContacts', 'company');
            util.createCompany(test.company);
        });
        
        //Phone
        mocha.it("Should add a phone number", function() {
            cont.contactInformation.phone.addPhone("Other", "3213213211", "329", ["doNotCall", "doNotText"]);
        });
        mocha.it("Should update a phone number", function() {
            cont.contactInformation.phone.updatePhone("2", "7778889997", "111");
        });
        mocha.it("Should delete a phone number", function() {
            cont.contactInformation.phone.deletePhone("2");
        });

        //Email
        mocha.it("Should add an email", function() {
            cont.contactInformation.email.addEmail("Work", "xjustanotheremail@gmail.com", ["useForNotifications", "doNotSendEmails"]);
        });
        mocha.it("Should update an email", function() {
            cont.contactInformation.email.updateEmail("2", "zchangedemail@gmail.com");
        });
        mocha.it("Should delete an email", function() {
            cont.contactInformation.email.deleteEmail("2");
        });

        //Address
        mocha.it("Should add an address", function() {
            cont.contactInformation.address.addAddress("Work", "90220", "217 E Indigo St");
        });
        mocha.it("Should update an address", function() {
            cont.contactInformation.address.updateAddress("2", "70812", "99 Grove St.");
        });
        mocha.it("Should delete an address", function() {
            cont.contactInformation.address.deleteAddress("2");
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

