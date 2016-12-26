var nav = require('./navigation.js'),
    jur = require('./jurisdictions.js'),
    util = require('./utilities.js');

const webdriver = require('selenium-webdriver'),
      By = require('selenium-webdriver').By,
      until = require('selenium-webdriver').until;

var xlsx = require('xlsx');

var workbook = xlsx.readFile("../../creds.xlsx"),
    firstSheet = workbook.SheetNames[0],
    worksheet = workbook.Sheets[firstSheet];

var userLogin = worksheet["B2"].v,
    userPassword = worksheet["C2"].v;

var ndilplanui = worksheet["A2"].v,
    userRoles = worksheet["A3"].v,
    doctemp = worksheet["A4"].v,
    general25 = worksheet["A5"].v,
    blob = worksheet["A6"].v,
    assetExemptions = worksheet["A7"].v;

var env = assetExemptions,
    login = userLogin,
    password = userPassword;

var chapter7 = By.xpath("//select[@id='Case_Chapter']/option[@value='1']"),
    chapter13 = By.xpath("//select[@id='Case_Chapter']/option[@value='4']"),
    individual = By.xpath("//select[@id='Case_Ownership']/option[@value='1']"),
    joint = By.xpath("//select[@id='Case_Ownership']/option[@value='2']");

var selMatterType = ';',
    selChapter = 'chapter 7',
    selJurisdiction = 'illinois';

var determinePhone = function() { //10-digit phone
    var num = Math.floor((Math.random() * 10000000000) + 1);
            while (num.toString().length != 10) {
                num = Math.floor((Math.random() * 10000000000) + 1);
            }
    return num.toString()
};

var determineSSN = function() { //9-digit ssn
    var num = Math.floor((Math.random() * 1000000000) + 1);
            while (num.toString().length != 9) {
                num = Math.floor((Math.random() * 1000000000) + 1);
            }
    return num.toString()
};

var Person = function (first, last, zip, middle = '', phone = determinePhone(), ssn = determineSSN()) {
    this.firstName = first;
    this.lastName = last;
    this.middleName = middle;
    this.displayName = function() {return this.lastName + ', ' + this.firstName + ' ' + this.middleName};
    this.phone = phone;
    this.email = function() {return this.firstName.charAt(0).toLowerCase() + '.' + this.lastName.toLowerCase() + '@gmail.com'};
    this.ssn = ssn;
    this.zip = zip
};

var Company = function (name, zip, phone = determinePhone(), ssn = determineSSN()) {
    this.displayName = name;
    this.phone = phone;
    this.email = function() {return this.displayName.toLowerCase() + '@gmail.com'};
    this.ssn = ssn;
    this.zip = zip
};

var Matter = function (chapter, type, state, county, district, division) {
    this.chapter = chapter;
    this.type = type;
    this.state = state;
    this.county = county;
    this.district = district;
    this.division = division
};

var randomTwoDigitNumber = Math.floor((Math.random() * 100) + 1);

var personFirstname = 'Keira' + randomTwoDigitNumber,
    personLastname = 'Metz' + randomTwoDigitNumber,
    companyName = 'CompanyOfYourDream' + randomTwoDigitNumber;

var person = new Person(personFirstname, personLastname, jur.illinois.zip),
    company = new Company(companyName, jur.illinois.zip),
    matter = new Matter(chapter7, individual, jur.illinois.self, jur.county, jur.illinois.ilnb);

module.exports = {
    login: login,
    password: password,
    env: env,

    joint: joint,

    person: person,
    company: company,
    matter: matter,

    selMatterType: selMatterType,
    selChapter: selChapter,
    selJurisdiction: selJurisdiction
};