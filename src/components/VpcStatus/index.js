import React from 'react';

import { backendApi } from '~/dataServices';
import { microservices } from '../../../common';
import View from './View.jsx';
import styles from './styles.scss';

class VpcStatus extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            VpcId: '?',
            Microservices: [],
            ms: {},
            fontendTags: {}
        };
    }

    componentDidMount(){
        this.loadVpcData(this.props.vpcName);
    }

    componentWillReceiveProps(nextProps){

        this.loadVpcData(nextProps.vpcName);
    }

    handleDetailsClick = (selectedMicroservice) => {
        this.setState({ selectedMicroservice });
    }

    loadVpcData = (vpcName) => {

        const ec2Name = this.state.selectedMicroservice && this.state.selectedMicroservice.Ec2Name ? this.state.selectedMicroservice.Ec2Name : null;
        this.setState({ loading: true, selectedMicroservice: null });
        backendApi.getVpc(vpcName).then((vpc) => this.setVpc(vpc, ec2Name))
    }

    setVpc = (vpc, ec2Name) => {
        const selectedMicroservice = ec2Name ? vpc.Microservices.find(ms => ms.Ec2Name === ec2Name) : null;

        vpc.Microservices.sort(microservices.sortFn);
        this.setState({
                vpc: vpc,
                VpcId: vpc.VpcId,
                BastionPublicIp: vpc.BastionPublicIp,
                Microservices: vpc.Microservices,
                loading: false
            },
            () => selectedMicroservice ? this.handleDetailsClick(selectedMicroservice) : null
        );
    }


    render(){
        if(this.state.vpc){

            return (
                React.createElement(View, {
                    vpc: this.state.vpc,
                    vpcName: this.props.vpcName,
                    selectedMicroservice: this.state.selectedMicroservice || {},
                    loading:this.state.loading,
                    handleDetailsClick: this.handleDetailsClick
                })
            )
        }else
            return null
    }
}

export default VpcStatus;
