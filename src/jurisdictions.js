var By = require('selenium-webdriver').By;

var illinois = {
        self: By.xpath("//select[@id='stateId']/option[@value='14']"),
        ilnb: By.xpath("//select[@id='District_Id']/option[@value='28']"),
        ilcb: By.xpath("//select[@id='District_Id']/option[@value='29']"),
        ilsb: By.xpath("//select[@id='District_Id']/option[@value='30']"),
        zip: '60007'
};

var georgia = {
        self: By.xpath("//select[@id='stateId']/option[@value='11']"),
        ganb: By.xpath("//select[@id='District_Id']/option[@value='66']"),
        gamb: By.xpath("//select[@id='District_Id']/option[@value='67']"),
        gasb: By.xpath("//select[@id='District_Id']/option[@value='68']"),
        zip: '30134'
};

var california = {
        self: By.xpath("//select[@id='stateId']/option[@value='5']"),
        casb: By.xpath("//select[@id='District_Id']/option[@value='1']"),
        zip: '90220'
};

var florida = {
        self: By.xpath("//select[@id='stateId']/option[@value='10']"),
        flsb: By.xpath("//select[@id='District_Id']/option[@value='20']"),
        zip: '32210'
};

var indiana = {
        self: By.xpath("//select[@id='stateId']/option[@value='15']"),
        insb: By.xpath("//select[@id='District_Id']/option[@value='24']"),
        zip: '47805'
};

var kentucky = {
        self: By.xpath("//select[@id='stateId']/option[@value='18']"),
        kywb: By.xpath("//select[@id='District_Id']/option[@value='26']"),
        zip: '40003'
};

var michigan = {
        self: By.xpath("//select[@id='stateId']/option[@value='35']"),
        mieb: By.xpath("//select[@id='District_Id']/option[@value='7']"),
        zip: '48062'
};

var alabama = {
        self: By.xpath("//select[@id='stateId']/option[@value='1']"),
        alsb: By.xpath("//select[@id='District_Id']/option[@value='58']"),
        zip: '35034'
};

var oregon = {
        self: By.xpath("//select[@id='stateId']/option[@value='32']"),
        orb: By.xpath("//select[@id='District_Id']/option[@value='38']"),
        zip: '97019'
};

var newJersey = {
        self: By.xpath("//select[@id='stateId']/option[@value='25']"),
        njb: By.xpath("//select[@id='District_Id']/option[@value='75']"),
        zip: '07040'
};

var states = [illinois, georgia, california, florida, indiana, kentucky, michigan, alabama, oregon, newJersey];
    
var county = By.xpath("//select[@id='Case_CountyId']/option[not(@disabled='')][not(@value='')]"); //random county
    
    

var ilnbArr = ['159'/*, '402', '158', '401'*/],
    ilcbArr = ['161'/*, '160', '162', '447'*/],
    ilsbArr = ['314'/*, '315', '163', '426'*/];

var ganbArr = ['228'/*, '446', '229', '227'*/],
    gambArr = ['443'/*, '444', '300', '445', '230', '301', '302'*/],
    gasbArr = ['231'/*, '303', '304', '232', '305', '306'*/];
    



module.exports = {
    county: county,

    illinois: illinois,
    georgia: georgia,
    california: california,
    florida: florida,
    indiana: indiana,
    kentucky: kentucky,
    michigan: michigan,
    alabama: alabama,
    oregon: oregon,
    newJersey: newJersey,

    states: states
}
