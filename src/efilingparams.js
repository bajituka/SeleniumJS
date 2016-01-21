var By = require('selenium-webdriver').By;

var illinois = By.xpath("//select[@id='stateId']/option[@value='14']"),
    georgia = By.xpath("//select[@id='stateId']/option[@value='11']"),
    county = By.xpath("//select[@id='Case_CountyId']/option[not(@disabled)][not(@value='')]"), //random county
    ilnb = By.xpath("//select[@id='District_Id']/option[@value='28']"),
    ilcb = By.xpath("//select[@id='District_Id']/option[@value='29']"),
    ilsb = By.xpath("//select[@id='District_Id']/option[@value='30']"),
    ganb = By.xpath("//select[@id='District_Id']/option[@value='66']"),
    gamb = By.xpath("//select[@id='District_Id']/option[@value='67']"),
    gasb = By.xpath("//select[@id='District_Id']/option[@value='68']");

var ilnbArr = ['159'/*, '402', '158', '401'*/],
    ilcbArr = ['161', '160', '162', '447'],
    ilsbArr = ['314', '315', '163', '426'];

var ganbArr = ['228'/*, '446', '229', '227'*/],
    gambArr = ['443', '444', '300', '445', '230', '301', '302'],
    gasbArr = ['231', '303', '304', '232', '305', '306'];
    
module.exports = {
    illinois: illinois,
    georgia: georgia,
    county: county,

    ilnb: ilnb,
    ilcb: ilcb,
    ilsb: ilsb,
    ganb: ganb,
    gamb: gamb,
    gasb: gasb,

    ilnbArr: ilnbArr,
    ilcbArr: ilcbArr,
    ilsbArr: ilsbArr,

    ganbArr: ganbArr,
    gambArr: gambArr,
    gasbArr: gasbArr
}
