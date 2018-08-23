let tunnelSsh = require('tunnel-ssh');
let fs = require('fs'); 
const Sequelize = require('sequelize');



const test = () => {

let x;

//ssh -i ~/.ssh/amp-terraform-dev-key.pem -L 5433:dbvpcd80f6fbe.cobyt3admyxd.us-west-2.rds.amazonaws.com:5432 -N ubuntu@54.244.174.134 &
    const config = {
        host: '54.244.174.134',
        port: 22,
        username: 'ubuntu',
        dstHost: 'dbvpcd80f6fbe.cobyt3admyxd.us-west-2.rds.amazonaws.com',
        dstPort:  5432,
        privateKey: fs.readFileSync('/home/vagrant/amp-terraform-dev-key.pem'),
        agentForward: true,
        localPort: 5435
    };
    try{
        var tnl = tunnelSsh(config, function(error, tnl){

            if(error)

            console.log(error)
            const sequelize = new Sequelize('postgres', 'shiftwiseusername', 'shiftwisepassword', {
                host: 'localhost',
                dialect: 'postgres',

                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },

                

                // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
                operatorsAliases: false
            });
            console.log(sequelize);

            // setTimeout(function(){
            //     // you only need to close the tunnel by yourself if you set the 
            //     // keepAlive:true option in the configuration ! 
            //     tnl.close();
            // },20000);
        });
    }
    catch(e){console.log(e)}
}

module.exports = { test };