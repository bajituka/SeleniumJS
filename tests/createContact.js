var util = require('../src/utilities.js'),
    test = require('../src/testdata.js');

var webdriver = util.webdriver,
    driver = util.driver,
    By = util.By,
    until = util.until;
    
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
    
util.authorize(test.env, test.login, test.password);
util.closeTabs();
util.openCreateContact('dashboard', 'person');
util.createPerson(tempPerson);
util.closeTabs();

util.logOut();

