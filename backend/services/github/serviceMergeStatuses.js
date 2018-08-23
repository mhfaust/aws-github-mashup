const repos = require('../../data/repos.js');

async function serviceMergeStatuses (intancesInfo) {

    const kvPairs = await Promise.all( intancesInfo.Microservices.map(
        async ms => ( { 
            repoName: ms.RepoName,
            status: !ms.RepoName || !ms.IacMicroServiceTag || !ms.DeployedVersion
                ? null 
                : await repos.compareCommits(ms.RepoName, ms.IacMicroServiceTag, ms.DeployedVersion).then(r => {                    
                    if(r && r.data && r.data.status)
                        return r.data.status
                    else
                        return null;
                })
        } )
    ));

    return kvPairs.reduce((obj, s) => { obj[s.repoName] = s.status; return obj; }, {})
}

module.exports = serviceMergeStatuses;
