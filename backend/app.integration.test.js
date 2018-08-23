const app = require('./app');
const request = require('supertest');
const microservices = require('../common/microservices');

test('GET /api/iac/branches', function() {
    expect.assertions(2);

    const hasExpectedProps = (branch) =>
        branch.name &&
        branch.commit &&
        branch.commit.sha &&
        branch.commit.url &&
        (branch.pullRequestUrl || branch.pullRequestUrl === null) ;

    return request(app).get('/api/iac/branches').then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.every(hasExpectedProps)).toBe(true);
    });
});


test('GET /api/iac/compare', function(){
    const hasExpectedProps = (repo) =>
        !!repo.msName &&
        repo.repoName &&
        repo.baseTag &&
        repo.headTag &&
        repo.status &&
        (repo.ahead_by || repo.ahead_by === 0) &&
        (repo.behind_by || repo.behind_by === 0);

    return request(app).get('/api/iac/compare/master/develop').then(response => {

        const values = Object.keys(response.body).map(key => response.body[key]);
        expect(values.every(hasExpectedProps)).toBe(true);

    })
});

test('GET /api/repos/:repo/compare-refs/:base/:head', function(){
    return request(app).get('/api/repos/iac/compare-refs/master/develop').then(response => {
        expect(response.status).toBe(200);
        //The 2 mocks for master & develop have 10 and 19 commits, respectively.
        //All the develop ones are in master, so:
        expect(response.body.baseOnlyCommits.length).toBe(0);
        expect(response.body.headOnlyCommits.length).toBe(9);
    });

});

test('GET /api/tags/:repo', function(){
    const hasExpectedProps = (tag) =>
        !!tag.name &&
        tag.commit;

    return request(app).get('/api/tags/iac').then(response => {
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
        expect(response.body.every(hasExpectedProps));
    });
});

test('GET /api/vpcs/:vpcName/statuses', function(){
    return request(app).get('/api/vpcs/ackbar/statuses').then(response => {
        expect(response.status).toBe(200);
        expect(response.body.autoScalingGroupNames.length).toBe(21);
        expect(response.body.autoScalingGroupNames)
            .toEqual(expect.arrayContaining(['ackbar-audit2018060118080676800000000c20180601180821120500000018'])
        );
    });
});

test('GET /api/vpcs/:vpcName', function(){
    return request(app).get('/api/vpcs/batman').then(response => {

        const hasExpectedBackendProps = (service) => service.Name &&
            service.Ec2Name &&
            service.RepoName &&
            service.IacName &&
            (service.ApiUrlSegment || !microservices.convertName(service.Ec2Name, 'ec2', 'api')) &&
            service.DeployMethod &&
            service.ImageId;

        const hasExpectedFrontendProps = (service) => !!service.Name && service.IacName &&
        service.RepoName && service.DeployedVersion;

        const isFrontend = (service) => service.RepoName.includes('frontend') || service.RepoName.includes('website');

        const hasExpectedProps = (service) => isFrontend(service) ? hasExpectedFrontendProps(service) : hasExpectedBackendProps(service);

        expect(response.status).toBe(200);
        expect(response.body.Microservices.every(hasExpectedProps)).toBe(true);
        expect(response.body.Microservices.some(m => m.statusRelativeToIac === 'ahead' || m.statusRelativeToIac === 'behind')).toBe(true);
    });
})

test('GET /api/vpcs/:vpcName/queues', function(){
    return request(app).get('/api/vpcs/batman/queues').then(response => {
        expect(response.status).toBe(200);
        expect(response.body.queues['billing-backend']['BillingLineItemPublished']).toBeDefined();
    });
})

test('GET /api/vpcs/:vpcId/topics/:topicName/subscriptions', function(){
    return request(app).get('/api/vpcs/batman/topics/CustomerAssociationPublish/subscriptions').then(response => {
        expect(response.body.length).toBeGreaterThanOrEqual(1);
        expect(response.body.every(topic => topic.SubscriptionArn.includes('arn:aws:sns:us-west-2:647461886534:pt-vpc-d80f6fbe-BlueprintCustomerPublished')))
        expect(response.status).toBe(200);
    })
})

test('POST /api/vpcs/:vpcName/toggle - on', function(){
    return request(app).post('/api/vpcs/batman/toggle').send({ state:'on' }).then(response => {
        expect(response.status).toBe(200);
        expect(response.body.autoScalingGroupNames).toBeDefined();
    })
})

test('POST /api/vpcs/:vpcName/toggle - off', function(){
    return request(app).post('/api/vpcs/batman/toggle').send({ state:'off' }).then(response => {
        expect(response.status).toBe(200);
        expect(response.body.autoScalingGroupNames).toBeDefined();
    })
})

test('POST /api/vpcs/:vpcName/ec2s/:msName/instances/:instanceId/reboot', function(){
    return request(app).post('/api/vpcs/batman/ec2s/Timecard/instances/i-0a9e03463f36c8f3d/reboot').send({ }).then(response => {
        expect(response.status).toBe(200);
        expect(response.body.rebooting).toBe('batman/Timecard/i-0a9e03463f36c8f3d');
    })
})

test('GET /static returns 301', () => {
    expect.assertions(1);
    return request(app).get('/static').then(response => {
        expect(response.statusCode).toBe(301);
    });
});

test('GET /someweirdthing returns 200', () => {
    expect.assertions(1);
    return request(app).get('/someweirdthing').then(response => {
        expect(response.statusCode).toBe(200);
    });
});

test('GET / returns 302', () => {
    expect.assertions(1);
    return request(app).get('/').then(response => {
        expect(response.statusCode).toBe(302);
    });
});
