import React from 'react';
import View from './View.jsx';
import styles from './styles.scss';
import { backendApi } from '~/dataServices';
import { vpcNames } from '../../../common';

class VpcsHome extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            vpcNames: props.audience === 'training'
                ? vpcNames.training
                : vpcNames.all,
            togglingServices: new Set(),
            statuses: []
         };
         this.interval = null;
    }

    //todo: rename "asgs" and "status" to something more informative.
    componentDidMount(){
        this.getAsgs();
        this.interval = setInterval(this.getAsgs, 5 * 60 * 1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    getAsgs = async () => {
        let i;
        let vpcNames = this.state.vpcNames;
        //calls need to be sync. so for..next instead of forEach.
        for(i = 0; i < vpcNames.length; i++){
            let vpcName = vpcNames[i];
            this.setState((prev, props) => ({ statuses: {
                    ... prev.statuses,
                    [vpcName]: null
                }
            }));
            const vpcStatus = await backendApi.getAsgsByVpc(vpcName);

            this.setState((prev, props) => ({ statuses: {
                    ... prev.statuses,
                    [vpcName]: vpcStatus
                }
            }));
        }

    }


    toggleVpc = (vpcName, checked) => {
        this.setState((prev, props) => {
            let statuses = { ... prev.statuses };
            let vpcStatus = { ... statuses[vpcName] };
            vpcStatus.awakeness = 'unknown';
            statuses[vpcName] = vpcStatus;
            return { statuses };
        });

        const newState = checked  ? 'on' : 'off';

        backendApi.toggleVpc(vpcName, newState).then((statusObj) => {
            this.setState((prev, props) => {
                let statuses = { ... prev.statuses };
                statuses[vpcName] = statusObj;
                return {  statuses };
            })

        })
    }



    render(){
        return React.createElement(View, {
            toggleVpc: this.toggleVpc,
            ...this.props,
            ...this.state
        } );
    }
}


export default VpcsHome
