var By = require('selenium-webdriver').By;

var navBar = {
    contacts: By.xpath("//div[@id='mainNavBar']//a[@data-hint='Contacts']"),
    matters: By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Matters']"),
    navNew: {
        self: By.xpath("//div[@id='mainNavBar']//a[@data-hint='New']"),
        contact: {
            self: By.xpath("//div[@id='mainNavBar']//a[@data-hint='Contact']"),
            person: By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Create Person']"),
            company: By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Create Company']"),
        },
        email: By.xpath("//div[@id='mainNavBar']//a[@data-pe-dialog='/EmailMessages/Create']"),
        task: By.xpath("//div[@id='mainNavBar']//a[text()='Task']"),
        appointment: By.xpath("//div[@id='mainNavBar']//a[text()='Appointment']"),
        activity: By.xpath("//div[@id='mainNavBar']//a[text()='Activity']"),
        matter: By.xpath("//div[@id='mainNavBar']//a[text()='Matter']"),
        newClientIntake: By.xpath("//div[@id='mainNavBar']//a[text()='New Client Intake']"),
    },
    view: {
        self: By.xpath("//div[@id='mainNavBar']//a[@data-hint='View']"),
        calendar: By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Calendar']"),
        emails: By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Emails']"),
        tasks: By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Tasks']"),
        activities: By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Activities']"),
        documents: By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Documents']"),
        documentTemplates: By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Document Templates']"),
        deposit: By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Deposit']"),
        maintenance: By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Maintenance']"),
        expenses: By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Expenses']"),
        import1: By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Import']")
    }   
}


var navMatter = {
    
    overview: By.xpath("//ul[@id='schedulesView']/li[1]/a"),
    events: {
        self: By.xpath("//ul[@id='schedulesView']/li[2]/a"),
        tasks: By.xpath("//div[starts-with(@id, 'CaseViewEventsContent_')]//a[text()='Tasks']"),
        appointments: By.xpath("//div[starts-with(@id, 'CaseViewEventsContent_')]//a[text()='Appointments']"),
        activities: By.xpath("//div[starts-with(@id, 'CaseViewEventsContent_')]//a[text()='Activities']")
    },
    manage: {
        self: By.xpath("//ul[@id='schedulesView']/li[3]/a"),
        emailMessages: By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[text()='Email Messages']"),
        documents: By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[text()='Documents']"),
        matterForms: {
            self: By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[text()='Matter Forms']"),
            officialForms: By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[text()='Official Forms']"),
            plans: By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[text()='Plans']"),
            localForms: By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[text()='Local Forms']"),
            userDefinedForms: By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[text()='User-Defined Forms']") 
        },
        finance: By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[text()='Finance']"),
        associatedParties: {
            self: By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[starts-with(@href, '#CaseViewParties_')]"),
            parties: By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[text()='Parties']"),
            history: By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[text()='History']")
        },
        caseHistory: By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[starts-with(@href, '#CaseViewHistory_')]")
    },
    petition: {
        self: By.xpath("//ul[@id='schedulesView']/li[4]/a"),
        generalInformation: {
            self: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CaseInformation_')]"),
            details: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[text()='Details']"),
            fees: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[text()='Fees']"),
            pendingBankrupties: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[text()='Pending/Prior Bankruptcies']"),
            creditCounseling: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[text()='Credit Counseling']"),
            tenant: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[text()='Tenant']"),
            hazardousProperty: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[text()='Hazardous Property']"),
            additional: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[text()='Additional']"),
            security: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[text()='Security']"),
        },
        property: {
            self: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CaseProperty_')]"),
            realProperty: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#realproperty')]"),
            personalProperty: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#personalproperty')]"),
            assetExemptions: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#exemptions') and not(starts-with(@href, '#exemptionsCalc'))]"),
            exemptionCalculator: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#exemptionsCalc')]"),
        },
        creditors: {
            self: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CaseCreditors_')]"),
            secured: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#secured')]"),
            priority: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#priority')]"),
            unsecured: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#unsecured')]"),
            codebtors: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#codebtors')]"),
        },
        executoryContracts: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CaseExecutoryContracts_')]"),
        incomeAndExpenses: {
            self: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CaseIncome_')]"),
            income: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#income') and not(starts-with(@href, '#incomenew'))]"),
            expenses: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#expenses')]"),
            meansTest: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#meansTest')]"),
        },
        sofa: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CaseSofa_')]"),
        plan: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CasePlans_')]"),
        statementOfIntent: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CaseStatementOfIntent_')]"),
        dueDiligence: {
            self: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CaseVendors_')]"),
            viewExistingOrders: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[text()='View Existing Orders']"),
            placeNewOrder: By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[text()='Place New Order']"),
        },
    },
    court: {
        self: By.xpath("//ul[@id='schedulesView']/li[5]/a"),
        courtview: {
            self: By.xpath("//div[starts-with(@id, 'CaseViewCourtContent_')]//a[starts-with(@href, '#CaseCourtView_')]"),
            courtNotices: By.xpath("//div[starts-with(@id, 'CaseViewCourtContent_')]//a[text()='Court Notices']"),
            proofOfClaims: By.xpath("//div[starts-with(@id, 'CaseViewCourtContent_')]//a[text()='Proof of Claims']"),
            oldPacerView: By.xpath("//div[starts-with(@id, 'CaseViewCourtContent_')]//a[text()='Old Pacer View']"),
        },
        filing: {
            self: By.xpath("//div[starts-with(@id, 'CaseViewCourtContent_')]//a[starts-with(@href, '#CaseViewEfiling_')]"),
            overview: By.xpath("//div[starts-with(@id, 'CaseViewCourtContent_')]//a[text()='Overview']"),
            prepareSummary: By.xpath("//div[starts-with(@id, 'CaseViewCourtContent_')]//a[text()='Prepare Summary']"),
            settings: By.xpath("//div[starts-with(@id, 'CaseViewCourtContent_')]//a[text()='Settings']"),
        }
    }
    
}

var navBarContacts = By.xpath("//div[@id='mainNavBar']//a[@data-hint='Contacts']"),
    navBarMatters = By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Matters']"),
    navBarNew = By.xpath("//div[@id='mainNavBar']//a[@data-hint='New']"),
        navBarNewContact = By.xpath("//div[@id='mainNavBar']//a[@data-hint='Contact']"),
            navBarNewContactPerson = By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Create Person']"),
            navBarNewContactCompany = By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Create Company']"),
        navBarNewEmails = By.xpath("//div[@id='mainNavBar']//a[@data-pe-dialog='/EmailMessages/Create']"),
        navBarNewTask = By.xpath("//div[@id='mainNavBar']//a[text()='Task']"),
        navBarNewAppointment = By.xpath("//div[@id='mainNavBar']//a[text()='Appointment']"),
        navBarNewAcitivity = By.xpath("//div[@id='mainNavBar']//a[text()='Activity']"),
        navBarNewMatter = By.xpath("//div[@id='mainNavBar']//a[text()='Matter']"),
        navBarNewNewClientIntake = By.xpath("//div[@id='mainNavBar']//a[text()='New Client Intake']"),
    navBarView = By.xpath("//div[@id='mainNavBar']//a[@data-hint='View']"),
        navBarViewCalendar = By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Calendar']"),
        navBarViewEmails = By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Emails']"),
        navBarViewTasks = By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Tasks']"),
        navBarViewAcitivities = By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Activities']"),
        navBarViewDocuments = By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Documents']"),
        navBarViewDocumentTemplates = By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Document Templates']"),
        navBarViewDeposit = By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Deposit']"),
        navBarViewMaintenance = By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Maintenance']"),
        navBarViewExpenses = By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Expenses']"),
        navBarViewImport = By.xpath("//div[@id='mainNavBar']//a[@data-pe-tab='Import']");

var navBarOverview = By.xpath("//ul[@id='schedulesView']/li[1]/a"),
    navBarEvents = By.xpath("//ul[@id='schedulesView']/li[2]/a"),
        navBarEventsTasks = By.xpath("//div[starts-with(@id, 'CaseViewEventsContent_')]//a[text()='Tasks']"),
        navBarEventsAppointments = By.xpath("//div[starts-with(@id, 'CaseViewEventsContent_')]//a[text()='Appointments']"),
        navBarEventsActivities = By.xpath("//div[starts-with(@id, 'CaseViewEventsContent_')]//a[text()='Activities']"),
    navBarManage = By.xpath("//ul[@id='schedulesView']/li[3]/a"),
        navBarManageEmailMessages = By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[text()='Email Messages']"),
        navBarManageDocuments = By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[text()='Documents']"),
        navBarManageMatterForms = By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[text()='Matter Forms']"),
        navBarManageFinance = By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[text()='Finance']"),
        navBarManageAssociatedParties = By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[starts-with(@href, '#CaseViewParties_')]"),
        navBarManageCaseHistory = By.xpath("//div[starts-with(@id, 'CaseViewManageContent_')]//a[starts-with(@href, '#CaseViewHistory_')]"),
    navBarPetition = By.xpath("//ul[@id='schedulesView']/li[4]/a"),
        navBarPetitionGeneralInformation = By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CaseInformation_')]"),
        navBarPetitionProperty = By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CaseProperty_')]"),
        navBarPetitionCreditors = By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CaseCreditors_')]"),
        navBarPetitionExecutoryContracts = By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CaseExecutoryContracts_')]"),
        navBarPetitionIncomeAndExpenses = By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CaseIncome_')]"),
        navBarPetitionSofa = By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CaseSofa_')]"),
        navBarPetitionStatementOfIntent = By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CaseStatementOfIntent_')]"),
        navBarPetitionDueDiligence = By.xpath("//div[starts-with(@id, 'CaseViewPetitionContent_')]//a[starts-with(@href, '#CaseVendors_')]"),
    navBarCourt = By.xpath("//ul[@id='schedulesView']/li[5]/a"),
        navBarCourtCourtview = By.xpath("//div[starts-with(@id, 'CaseViewCourtContent_')]//a[starts-with(@href, '#CaseCourtView_')]"),
        navBarCourtFiling = By.xpath("//div[starts-with(@id, 'CaseViewCourtContent_')]//a[starts-with(@href, '#CaseViewEfiling_')]");
        
var homeTab = By.xpath("//div[@id='AppTabs']/ul[@role='tablist']/li/a[@href='#tab0']"),
    closeAllTabsBtn = By.className('closeAllTabsBtn');





module.exports = {
    navBar: navBar,
    navMatter: navMatter,
        
    navBarContacts: navBarContacts,
    navBarMatters: navBarMatters,
    navBarNew: navBarNew,
        navBarNewContact: navBarNewContact,
            navBarNewContactPerson: navBarNewContactPerson,
            navBarNewContactCompany: navBarNewContactCompany,
        navBarNewEmails: navBarNewEmails,
        navBarNewTask: navBarNewTask,
        navBarNewAppointment: navBarNewAppointment,
        navBarNewAcitivity: navBarNewAcitivity,
        navBarNewMatter: navBarNewMatter,
        navBarNewNewClientIntake: navBarNewNewClientIntake,
    navBarView: navBarView,
        navBarViewCalendar: navBarViewCalendar,
        navBarViewEmails: navBarViewEmails,
        navBarViewTasks: navBarViewTasks,
        navBarViewAcitivities: navBarViewAcitivities,
        navBarViewDocuments: navBarViewDocuments,
        navBarViewDocumentTemplates: navBarViewDocumentTemplates,
        navBarViewDeposit: navBarViewDeposit,
        navBarViewMaintenance: navBarViewMaintenance,
        navBarViewExpenses: navBarViewExpenses,
        navBarViewImport: navBarViewImport,

    navBarOverview: navBarOverview,
    navBarEvents: navBarEvents,
        navBarEventsTasks: navBarEventsTasks,
        navBarEventsAppointments: navBarEventsAppointments,
        navBarEventsActivities: navBarEventsActivities,
    navBarManage: navBarManage,
        navBarManageEmailMessages: navBarManageEmailMessages,
        navBarManageDocuments: navBarManageDocuments,
        navBarManageMatterForms: navBarManageMatterForms,
        navBarManageFinance: navBarManageFinance,
        navBarManageAssociatedParties: navBarManageAssociatedParties,
        navBarManageCaseHistory: navBarManageCaseHistory,
    navBarPetition: navBarPetition,
        navBarPetitionGeneralInformation: navBarPetitionGeneralInformation,
        navBarPetitionProperty: navBarPetitionProperty,
        navBarPetitionCreditors: navBarPetitionCreditors,
        navBarPetitionExecutoryContracts: navBarPetitionExecutoryContracts,
        navBarPetitionIncomeAndExpenses: navBarPetitionIncomeAndExpenses,
        navBarPetitionSofa: navBarPetitionSofa,
        navBarPetitionStatementOfIntent: navBarPetitionStatementOfIntent,
        navBarPetitionDueDiligence: navBarPetitionDueDiligence,
    navBarCourt: navBarCourt,
        navBarCourtCourtview: navBarCourtCourtview,
        navBarCourtFiling: navBarCourtFiling,

    homeTab: homeTab,
    closeAllTabsBtn: closeAllTabsBtn
}

