const mockResponse = require('./mockResponse.js');

module.exports = () => {
  const service = 'github';
  return {
    authenticate: () => {},
    repos: {
      getBranches: (config, callback) =>
        mockResponse(`repos.getBranches.${config.repo}.json`, callback, `github.repos.getBranches: No response is mocked for repo name: "${config.repo}"`, service),
      
      compareCommits: (config, callback) =>
        mockResponse(`repos.compareCommits.blueprint-backend.json`, callback, `github.repose.compareCommits`, service),
      
      getContent: (config, callback) =>
        mockResponse(`repos.getContent.${config.repo}.${config.path}.json`, callback, `github.repos.getContent: No response is mocked for repo: ${config.repo} & path: ${config.path}`, service),
      getCommits: (config, callback) => {
        if(config.page == 1){
          return mockResponse(`repos.getCommits.job-backend.${config.sha}.json`, callback, `github.repos.getCommits`, service)
        } else {
          callback(null, []);
        }
      },
      getTags: (config, callback) =>
        mockResponse(`repos.getTags.${config.repo}.json`, callback, `github.repos.getTags`, service)
    },
    pullRequests: {
      getAll: (config, callback) =>
        mockResponse(`pullRequests.getAll.${config.repo}.json`, callback, `github.pullRequests.getAll: No response is mocked for repo name: "${config.repo}"`, service)
    },
}};
