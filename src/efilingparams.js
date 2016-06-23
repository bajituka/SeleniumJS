var By = require('selenium-webdriver').By;

var illinois = {
        self: By.xpath("//select[@id='stateId']/option[@value='14']"),
        ilnb: By.xpath("//select[@id='District_Id']/option[@value='28']"),
        ilcb: By.xpath("//select[@id='District_Id']/option[@value='29']"),
        ilsb: By.xpath("//select[@id='District_Id']/option[@value='30']")
};

var georgia = {
        self: By.xpath("//select[@id='stateId']/option[@value='11']"),
        ganb: By.xpath("//select[@id='District_Id']/option[@value='66']"),
        gamb: By.xpath("//select[@id='District_Id']/option[@value='67']"),
        gasb: By.xpath("//select[@id='District_Id']/option[@value='68']")
};

var california = {
        self: By.xpath("//select[@id='stateId']/option[@value='5']"),
        casb: By.xpath("//select[@id='District_Id']/option[@value='1']")
};

var florida = {
        self: By.xpath("//select[@id='stateId']/option[@value='10']"),
        flsb: By.xpath("//select[@id='District_Id']/option[@value='20']")
};

var indiana = {
        self: By.xpath("//select[@id='stateId']/option[@value='15']"),
        insb: By.xpath("//select[@id='District_Id']/option[@value='24']")
};

var kentucky = {
        self: By.xpath("//select[@id='stateId']/option[@value='18']"),
        kywb: By.xpath("//select[@id='District_Id']/option[@value='26']")
};

var michigan = {
        self: By.xpath("//select[@id='stateId']/option[@value='35']"),
        mieb: By.xpath("//select[@id='District_Id']/option[@value='7']")
};

var alabama = {
        self: By.xpath("//select[@id='stateId']/option[@value='1']"),
        alsb: By.xpath("//select[@id='District_Id']/option[@value='58']")
};

var oregon = {
        self: By.xpath("//select[@id='stateId']/option[@value='32']"),
        orb: By.xpath("//select[@id='District_Id']/option[@value='38']")
};

var newJersey = {
        self: By.xpath("//select[@id='stateId']/option[@value='25']"),
        njb: By.xpath("//select[@id='District_Id']/option[@value='75']")
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
