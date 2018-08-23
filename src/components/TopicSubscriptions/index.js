import React from 'react';
import { backendApi } from '~/dataServices';
import View from './View.jsx';
import styles from './styles.scss';

class TopicSubscriptions extends React.Component{

    constructor(props){
        super(props);
        this.state = {};

    }

    componentDidMount(){
        if(this.props.vpcId)
            this.getSubscriptions(this.props);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.vpcId != this.props.vpcId || nextProps.topicName !== this.props.topicName)
            this.getSubscriptions(nextProps);
    }

    getSubscriptions = (props) => {
        backendApi.getTopicSubscriptions(props.vpcId, props.topicName)
            .then(subscriptions => {this.setState({subscriptions})})
    }

    render(){
        return React.createElement(View, { ...this.props, ...this.state } )
    }
}


export default TopicSubscriptions