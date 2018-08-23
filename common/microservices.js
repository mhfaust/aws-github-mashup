const chalk = require('chalk');

const nameTypes = {
    iac: 'iac',
    ec2: 'ec2',
    git: 'git',
    api: 'api',
    asg: 'asg'
};

const nameTypesSet = new Set(Object.entries(nameTypes).map(t => t[1]));


const serviceNameDefinitions = [
    {
        iac: 'connect-frontend',
        git: 'connect-frontend'
    },
    {
        iac: 'billing-frontend',
        git: 'billing-frontend'
    },
    {
        iac: 'scheduling-frontend',
        git: 'scheduling-frontend'
    },
    {
        iac: 'blueprint-website',
        git: 'blueprint-website'
    },
    {
        iac: 'audit-backend',
        ec2: 'Audit',
        git: 'audit-backend',
        api: 'audit',
        asg: '-audit'
    },
    {
        iac: 'billing-backend',
        ec2: 'Billing',
        git: 'billing-backend',
        api: 'billing',
        asg: '-billing'
    },
    {
        iac: 'blueprint-backend',
        ec2: 'Blueprint',
        git: 'blueprint-backend',
        api: 'blueprint',
        asg: '-blueprint'
    },
    {
        iac: 'chat-backend',
        ec2: 'Chat',
        git: 'chat-backend',
        api: 'chat',
        asg: '-chat'
    },
    {
        iac: 'document-backend',
        ec2: 'Document',
        git: 'document-backend',
        api: 'document',
        asg: '-document'
    },
    {
        iac: 'gps-backend',
        ec2: 'GPS',
        git: 'gps-backend',
        api: 'gps',
        asg: '-gps'
    },
    {
        iac: 'job-backend',
        ec2: 'Job',
        git: 'job-backend',
        api: 'job',
        asg: '-job'
    },
    {
        iac: 'login-backend',
        ec2: 'Login',
        git: 'login-backend',
        api: 'login',
        asg: '-login'
    },
    {
        iac: 'notifications-backend',
        ec2: 'Notifications',
        git: 'notifications-backend',
        api: 'notification',
        asg: '-notifications'
    },
    {
        iac: 'roles-backend',
        ec2: 'Roles',
        git: 'roles-backend',
        api: 'role',
        asg: '-roles'
    },
    {
        iac: 'scheduling-backend',
        ec2: 'Scheduling',
        git: 'scheduling-backend',
        api: 'scheduling',
        asg: '-scheduling'
    },
    {
        iac: 'staff-backend',
        ec2: 'Staff',
        git: 'staff-backend',
        api: 'staff',
        asg: '-staff'
    },
    {
        iac: 'timecard-backend',
        ec2: 'Timecard',
        git: 'timecard-backend',
        api: 'timecard',
        asg: '-timecard'
    },
    {
        iac: 'rtibridge',
        ec2: 'RTI Bridge',
        git: 'rtibridge',
        asg: 'rtibridgeasgterraform-'
    },
    {
        iac: 'rtidata',
        ec2: 'RTI Data',
        git: 'rtidata',
        asg: 'rtidataasgterraform-'
    },
    {
        iac: 'rtimatching',
        ec2: 'RTI Matching',
        git: 'rtimatching',
        asg: 'rtimatchingasgterraform-'
    },
    {
        iac: 'rtistaffhistory',
        ec2: 'RTI Staffhistory',
        git: 'rtistaffhistory',
        asg: '-rtistaffhistory'
    },
    {
        iac: 'rtistaffhistorydata',
        ec2: 'RTI StaffhistoryData',
        git: 'rtistaffhistorydata',
        asg: '-rtistaffhistorydata'
    },
    {
        iac: 'rtisystem',
        ec2: 'RTI System',
        git: 'rtisystem',
        asg: 'rtisystem-asg'
    },
    {
        iac: 'rtitributary',
        ec2: 'RTI Tributary',
        git: 'rtitributary',
        asg: 'rtitribasgterraform-'
    },
    {
        iac: 'rtifinance',
        ec2: 'RTI Finance',
        git: 'rtifinance',
        asg: 'rtifinanceasgterraform-'
    },
    {
        iac: 'bastion-base',
        ec2: 'SSH-Bastion',
        git: 'bastion-base'
    }
]

//check for mis-specified keys:
serviceNameDefinitions.forEach(def => {
    Object.keys(def).forEach(key => {
        if(!nameTypesSet.has(key))
            throw `A key was mis-specified in ${JSON.stringify(def)}`
    })
})

//e.g.: nameToDefinitionMap['iac'][job-backend'] => object containing all the job-backend names.
//...so you can get from 'job-backend'(knowing that that is an iac name) to all the other
// ways it's defined in different contexts. This is internal, and its values
// are exposed via the more intuitive function 'convertName':
const nameToDefinitionMap = {};
for(const [key, nameType] of Object.entries(nameTypes)) {
    nameToDefinitionMap[nameType] = {};
    serviceNameDefinitions.forEach(def => {
        if(def[nameType])
            nameToDefinitionMap[nameType][def[nameType]] = def;
    })
};

const convertName = (name, fromNameType, toNameType) => {
    const subMapping = nameToDefinitionMap[fromNameType];
    if(!subMapping)
        return console.log(chalk.red(`microservices.js does not recognize conversions from names of type ${fromNameType}. Recognized types: ${[...nameTypesSet].join(', ')}`));

    const service = subMapping[name];
    if(!service){
        return console.log(chalk.red(`microservices.js did not find a service with a ${fromNameType}-name for "${name}"`));
    }

    const toName = service[toNameType];
    if(!toName){
        if(!nameTypesSet.has(toNameType))
            return console.log(chalk.red(`microservices.js does not recognize conversions to names of type "${toNameType}". Recognized types: ${[...nameTypesSet].join(', ')}`));
        else
            return console.log(chalk.yellow(`microservices.js did not find a/an ${toNameType}-name for the ${fromNameType}-name "${name}"`));
    }

    return toName;
}

const allServiceNamesFor = (nameType) => {
    if(!nameTypesSet.has(nameType))
        throw `microservices.js does not recognize the name type ${toNameType}. Recognized types: ${[...nameTypesSet].join(', ')}`;

    return serviceNameDefinitions.filter(def => !!def[nameType]).map(def => def[nameType]);
}

const order = serviceNameDefinitions.reduce((obj, def, i) => {obj[def.git] = i; return obj;}, {});
const sortFn = (a,b) => order[a.RepoName] < order[b.RepoName] ? -1 : order[a.RepoName] > order[b.RepoName] ? 1 : 0;

module.exports = {
    convertName,
    nameTypes,
    allServiceNamesFor,
    sortFn
}


// console.log(convertName('rtifinance', nameTypes.iac, nameTypes.ec2))
// console.log(convertName('rtifinKJKJJsance_o', nameTypes.iac, nameTypes.ec2))
// console.log(convertName('rtifinance', 'x', nameTypes.ec2))
// console.log(convertName('rtifinance', nameTypes.iac, 'x'))
