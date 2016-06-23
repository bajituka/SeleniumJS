var req = require('../src/commonFunctions.js'),
    test = require('../src/testdata.js');

var webdriver = req.webdriver,
    driver = req.driver,
    By = req.By,
    until = req.until;
    
driver.manage().window().maximize();

function person(first, last, middle, phone, ssn, zip) {

    this.firstName = first;
    this.lastName = last;
    this.middleName = middle;
    this.phone = phone;
    this.email = function() {return this.firstName.charAt(0).toLowerCase() + '.' + this.lastName.toLowerCase() + '@gmail.com'};
    this.ssn = ssn;
    this.zip = zip
};

function company(name, phone, ssn, zip) {

    this.displayName = name;
    this.phone = phone;
    this.email = function() {return this.displayName.toLowerCase() + '@gmail.com'};
    this.ssn = ssn;
    this.zip = zip
};

var tempPerson = new person('James', 'Harden', 'Coffee', '4444444444', '123123123', '12345');
var tempCompany = new company('Roga', '1231231231', '123123123', '60007');
    
req.authorize(test.env, test.login, test.password);
req.closeTabs();
req.openCreateContact('dashboard', 'person');
req.createPerson(tempPerson);
req.closeTabs();

req.logOut();

