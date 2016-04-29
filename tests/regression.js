var req = require('../src/commonFunctions.js'),
    nav = require('../src/navigation.js'),
    efp = require('../src/efilingparams.js'),
    test = require('../src/testdata.js'),
    cont = require('../src/contacts.js'),
    tasks = require('../src/tasks.js'),
    mf = require('../src/matterForms.js'),
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
    
mocha.describe('REGRESSION', function() {
    this.timeout(0);
    
    mocha.before(function() {
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(2000);
        req.authorize(test.env, test.login, test.password);
        req.catchUncaughtExceptions();
        req.closeTabs()
    });
    
    
    mocha.describe('CRUD PERSON', function() {
        
        mocha.before(function() {
            req.closeTabs()
        });
        
        
        mocha.it('See all button', function() { 
            driver.findElement(By.xpath("//div[@id='Contacts_Tab']//a[contains(@class, 'seeAllBtn')]")).click();
            driver.wait(until.elementLocated(By.xpath("//div[contains(@class, 'contacts-gridview')]//tr[contains(@id, '_DXDataRow0') or contains(@id, 'DXEmptyRow')]")), 15000);
            req.closeTabs()
        });

        mocha.it('Create person', function() {
            req.openCreateContact('dashboard', 'person');
            req.createPerson(test.testPerson)
        });
        
        mocha.it('Contact information (person)', function() {
            cont.crudPhone();
            cont.crudEmail();
            cont.crudAddress()
        });
        
        mocha.it('Details', function() {  
            cont.addSpouse();
            cont.crudSSN();
            cont.crudIDs()
        });
        
        mocha.it('Employment', function() {   
            cont.crudEmployment()
        });

        mocha.it('Dependents', function() {  
            cont.crudDependents()
        });

        mocha.it('Marketing', function() {   
            cont.marketing()
        });

        mocha.it('Other names', function() {
            cont.crudOtherNames()
        });

        mocha.it('Delete from dashboard', function() { 
            cont.deletePersonFromDashboard()
        });

        mocha.it('Contact name change and delete from Contacts grid', function() {
            cont.crudContactName()
        });

    });

    mocha.describe('CRUD COMPANY', function() {

        mocha.before(function() {
            req.closeTabs()
        });
        
        mocha.it('Create company', function() {
            req.openCreateContact('navBarContacts', 'company');
            req.createCompany(test.testCompany)
        });
        
        mocha.it('Contact information', function() {
            cont.crudPhone();
            cont.crudEmail();
            cont.crudAddress()
        });
        
        mocha.it('Details', function() {
            cont.companyDetails()
        });
        
        mocha.it('Marketing', function() {
            cont.marketing()
        });
        
        mocha.it('Other names', function() {
            cont.companyOtherNames()
        });
        
        mocha.it('Delete from dashboard', function() {
            cont.deleteCompFromDashboard()
        });
        
    });


    mocha.describe('TASKS', function() {
        this.timeout(0);
        
        mocha.before(function() {
            req.closeTabs()
        });
        
        mocha.after(function() {
            req.closeTabs();
        });
        
        mocha.it('CRUD Tasks on Dashboard', function() {
            this.slow(30000);
            tasks.dashboardTasks()
        });
        
        mocha.it('CRUD Tasks in Contacts Events', function() {
            this.slow(60000);
            req.closeTabs();
            req.openCreateContact('dashboard', 'person');
            req.createPerson(test.testPerson);
            tasks.contactTasks()
        });
      
    });

    mocha.describe('PETITION', function() {
    
        this.timeout(0);
        
        mocha.before(function() {
            req.catchUncaughtExceptions();
            //req.leaveDialogListener();
            
            req.closeTabs();
            req.openCreateContact('dashboard', 'person');
            req.createPerson(test.testPerson);
            req.createBKmatter(test.testMatter);
            driver.wait(until.elementLocated(nav.navMatter.petition.self), 15000);
            driver.findElement(nav.navMatter.petition.self).click();
            driver.wait(until.elementLocated(By.id('stateId')), 15000);
            driver.wait(until.elementLocated(By.id('Case_CountyId')), 15000);
            driver.wait(until.elementLocated(By.id('District_Id')), 15000);
            driver.wait(until.elementLocated(By.id('Case_DivisionId')), 15000);
            driver.wait(until.elementLocated(By.id('Case_CaseStatus')), 15000);
        });
        
        mocha.after(function() {
            req.closeTabs();
        });
        
        mocha.describe('General information', function() {
            
            mocha.it('General information', function() {
            gi.giArr.forEach(function(item, i, arr) {
                    item();
                }); 
            });
            
        });
        
        mocha.describe('Property', function() {
            
            mocha.it('Real property', function() {
                prop.realProperty();
            });
            
            mocha.it('Personal property', function() {
                prop.personalProperty();
            });
            
            mocha.it('Asset Exemptions', function() {
                prop.assetExemptions();
            });
            
            mocha.it('Exemption Calculator', function() {
                prop.exemptionCalculator();
            });
        });
        
        mocha.describe('Creditors', function() {
            
            mocha.it('Secured creditor', function() {
                cred.securedCreditor();
            });
            
            mocha.it('Priority creditor', function() {
                cred.priorityCreditor();
            });
            
            mocha.it('Unsecured creditor', function() {
                cred.unsecuredCreditor();
            });
            
            mocha.it('Codebtors', function() {
                cred.codebtors();
            });
            
        });
        
        mocha.describe('Executory contracts', function() {
            
            mocha.it('Executory contracts', function() {
                exec.executoryContracts();
            });
            
        });
        
        mocha.describe('Income and expenses', function() {
        
            mocha.it('Income and expenses', function() {
                inc.incomeBudget();
                inc.incomeAndExpenses();
            });
        
        });
        
        mocha.describe('Sofa', function() {
            
            mocha.it('Sofa', function() {
                sofa.sofaArr.forEach(function(item, i, arr){
                    item();
                });
            });
            
        });
        
        mocha.describe('Statement of intent', function() {
        
            mocha.it('Statement of intent', function() {
                soi.statementOfIntent();
            });
            
        });
        
        mocha.describe('Due diligence', function() {
        
            mocha.it('Due diligence', function() {
                dd.dueDiligence();
            });

        });
        
        
        
    });

    mocha.describe('MATTER FORMS', function() {
        
        mocha.before(function() {
            req.closeTabs();
        });
        
        mocha.it('Matter forms', function() {
            mf.matterForms();
        });
        
        mocha.after(function() {
            req.closeTabs();
            req.logOut()
        });
        
    });
});