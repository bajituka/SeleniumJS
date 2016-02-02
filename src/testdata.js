var nav = require('./navigation.js'),
    efp = require('./efilingparams.js'),
    req = require('./functions.js');

var login = "edge@gmail.com",
    password = "Password1";

var dev = 'http://192.168.2.77:98/',
    sprint3 = 'http://192.168.2.77:100/',
    trunk = 'http://192.168.2.77:90/';

var env = sprint3;

var firstName = 'Heralt',
    lastName = 'Rivia',
    middleName = 'Van';

var determineDisplayName = function() {
        if (req.argsCount == 2) {
            displayName = lastName + ', ' + firstName;
            return displayName;
        } else {
            displayName = lastName + ', ' + firstName + ' ' + middleName;
            return displayName;
        }
    };
    
var displayName = determineDisplayName();

var companyName = 'CompanyOfYourDream';

var selMatterType = 'bankruptcy',
    selChapter = 'chapter 13',
    selJurisdiction = 'illinois';    





module.exports = {
    login: login,
    password: password,
    loginHost: loginHost,
    passwordHost: passwordHost,
    dev: dev,
    sprint3: sprint3,
    trunk: trunk,
    prod: prod,
    env: env,
    
    determineDisplayName: determineDisplayName,
    
    firstName: firstName,
    lastName: lastName,
    middleName: middleName,
    displayName: displayName,
    companyName: companyName,
    
    selMatterType: selMatterType,
    selChapter: selChapter,
    selJurisdiction: selJurisdiction
}