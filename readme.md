
## aws-github-mashup
This is a mashup for understanding what versions of running services are deployed to any of a set of VPCs. It presents color-coded github information about the merge status (ahead, behind, diverged) with respect to a main branch for each service. You can also restart EC2s through the UI and get visual feedback obtained through health-check urls when the service is fully functioning. There are a few other features in there too. If you're interested in learning more about what's here and how you might adapt this to one of your projects, please email me at mhfaust@gmail.com.

## Instructions for Running
There is both a backend node app `/backend` and src files for a react + semantic-UI frontend.

You'll need AWS creds installed on the machine running this, and a GitHub Token in its environment with the name GIT_TOKEN. 

If you have not previously built the frontend (files in /src), you can just run ```npm start```.  If you have previously built the version you have, use ```npm run serve``` to just start up the node backend.




