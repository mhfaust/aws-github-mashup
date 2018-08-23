Requirements
- vpc status: each ec2
	- status, e.g. '200' (metadata pg options call)
	- tag or manual-branch
		- if tag: ahead/behind iac/develop
		- if branch: who deployed
	
- vpc controls: each ec2
	- select branch --> deploy (if running locally)
	- pick tags --> IAC deploy.
	- reboot
	- kill
	
- vpc mq-monitoring

Requests: 
- As a developer I want to see all of the AWS resource limits for my account and how close we are too exceeding them. (Eric)