import React from 'react';
import View from './View.jsx';
import styles from './styles.scss';
import { backendApi } from '~/dataServices';

class Queues extends React.Component{

    constructor(props){
        super(props);
        this.state = { subscriptions: {} };

    }

    getQueues = (vpcName) => {
        backendApi.getQueues(vpcName)
            .then( ({ queues, info }) => {

                let queusByTopic = [].concat(...Object.values(queues).map(x => Object.keys(x)))
                    .reduce((obj, topicName) => {obj[topicName] = []; return obj;}, {});

                Object.keys(queues).forEach(serviceName => {
                    Object.keys(queues[serviceName]).forEach(topicName =>{
                        queusByTopic[topicName][serviceName] = queues[serviceName][topicName];
                    })
                })

                this.setState({queues, queusByTopic, vpcId: info.VpcId});
            });
    }


    componentDidMount(){

        if(this.props.vpcName)
            this.getQueues(this.props.vpcName);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.vpcName){
            this.setState({subscriptions: {}});
            this.getQueues(nextProps.vpcName);
        }
    }

    render(){
        return React.createElement(View, { ...this.props, ...this.state } )
    }
}


export default Queues
