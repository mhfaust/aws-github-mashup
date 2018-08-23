const axios = require('axios')

const jsonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'cache-control': 'no-cache'
};

const logErr = (err) => console.log(err);
const jsonThru = (response) => response.json();
const enc = (str) => encodeURIComponent(str);

export default {
    // OUT OF ORDER
	// getTravisBuilds: (repo) => fetch(`/api/travis/${repo}`, {
	// 	jsonHeaders,
	// 	method: 'get'
	// }).then(jsonThru).catch(logErr)
	// ,
	getMicroservice: (vpcName, microservice) => fetch(`/api/vpcs/${vpcName}/${microservice}`, {
		jsonHeaders,
		method: 'get'
	}).then(jsonThru).catch(logErr)
	,
	getVpc: (vpcName, compareto = 'iac-develop') => fetch(`/api/vpcs/${vpcName}`, {
		jsonHeaders,
		method: 'get'
	}).then(jsonThru).catch(logErr)
	,
	// getAllVpcs: () => new Promise(resolve => resolve(['ackbar','ash','batman','daenerys','dumbledore','eleven','groot','leia','megaman','picard','rey','skellington','uhura','velma','voltron','uat','exuat','rc','ci','ops-01','ar01','ar02','ar03','consul','default','rticd4','raclark-test','monkey-vpc','vms-now-maintenance-page']))
	// ,
	getIacComparison: (base, head) => fetch(`/api/iac/compare/${enc(base)}/${enc(head)}`,{
		jsonHeaders,
		method: 'get'
	}).then(jsonThru).catch(logErr)
	,
	getIacBranches: () => fetch(`/api/iac/branches`,{
		jsonHeaders,
		method: 'get'
	}).then(jsonThru).catch(logErr)
	,
	getTags: (repo) => fetch(`/api/tags/${enc(repo)}`,{
		jsonHeaders,
		method: 'get'
	}).then(jsonThru).catch(logErr)
	,
	rebootInstance: (vpcName, ec2Name, instanceId) => fetch(`/api/vpcs/${vpcName}/ec2s/${ec2Name}/instances/${instanceId}/reboot`, {
		jsonHeaders,
		method: 'post'
	})
	,
	getCompareRepoVersions: (repo, base, head) => fetch(`/api/repos/${repo}/compare-refs/${enc(base)}/${enc(head)}`, {
		jsonHeaders,
		method: 'get'
	}).then(jsonThru).catch(logErr)
	,
	getQueues: (vpcName) => fetch(`/api/vpcs/${vpcName}/queues`, {
		jsonHeaders,
		method: 'get'
	}).then(jsonThru).catch(logErr)
	,
	getTopicSubscriptions: (vpcId, topicName) => fetch(`/api/vpcs/${vpcId}/topics/${topicName}/subscriptions`, {
		jsonHeaders,
		method: 'get'
	}).then(jsonThru).catch(logErr)
	,
	getAsgsByVpc: (vpcName) => fetch (`/api/vpc-statuses/${vpcName}`, {
		jsonHeaders,
		method: 'get'
	}).then(jsonThru)
	//chrome+fetch doesn't attach the body correctly for post/put.
	//So I need to use 3rd party http lib (axios):
	,
	toggleVpc: (vpcName, stateTo) => {

		return axios({
			method: 'post',
			url: `/api/vpcs/${vpcName}/toggle`,
			data: {
				state: stateTo,
			}
		  }
		).then(response => response.data)
	}
};
