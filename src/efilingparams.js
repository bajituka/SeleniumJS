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
    
var county = By.xpath("//select[@id='Case_CountyId']/option[not(@disabled='')][not(@value='')]"); //random county
    
    

var ilnbArr = ['159'/*, '402', '158', '401'*/],
    ilcbArr = ['161'/*, '160', '162', '447'*/],
    ilsbArr = ['314'/*, '315', '163', '426'*/];

var ganbArr = ['228'/*, '446', '229', '227'*/],
    gambArr = ['443'/*, '444', '300', '445', '230', '301', '302'*/],
    gasbArr = ['231'/*, '303', '304', '232', '305', '306'*/];
    
var chapter7 = By.xpath("//select[@id='Case_Chapter']/option[@value='1']"),
    chapter13 = By.xpath("//select[@id='Case_Chapter']/option[@value='4']"),
    individual = By.xpath("//select[@id='Case_Ownership']/option[@value='1']"),
    joint = By.xpath("//select[@id='Case_Ownership']/option[@value='2']");


var chapter = chapter7,
    matterType = individual,
    distArr = ilnbArr,
    state = illinois.self,
    district = illinois.ilnb;
    

module.exports = {
    county: county,

    individual: individual,
    joint: joint,
    
    chapter: chapter,
    matterType: matterType,
    distArr: distArr,
    state: state,
    district: district
}
