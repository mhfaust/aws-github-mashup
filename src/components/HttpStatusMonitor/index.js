import React from 'react';

import { microServiceApi } from '~/dataServices';
import { store, actionCreators } from '~/stateManagement';
import View  from './View.jsx';
import styles from './styles.scss'

const five_seconds = 5 * 1000;
const one_minute = 60 * 1000;
const two_minutes = 2 * 60 * 1000;
const five_minutes = 5 * 60 * 1000;



class HttpStatusMonitor extends React.Component{

    constructor() {
        super();
        this.state={ status: '???' }
        this.cycle = null;
        this.interval = one_minute;
        this.unsubscribe = null;
    }
  
    componentDidMount() {
        this.setCycle();
        this.unsubscribe = store.subscribe(() => this.setCycle());
    }
    componentWillReceiveProps(){
        this.setCycle();
    }

    componentWillUnmount(){
        clearInterval(this.cycle);
        this.unsubscribe();
    }

    timedOut = () => {
        const r = store.getState().reboots[this.props.instanceId];
        return !!r && !!r.time && new Date() - r.time >= two_minutes;
    }


    getRebootStatus = () =>{

        const record = store.getState().reboots[this.props.instanceId];
        const status = record ? record.status : 'never-requested';
        return record ? record.status : 'never-requested';
    }    

    isRebooting = () => {
        const rebootStatus = this.getRebootStatus();
        return (rebootStatus === 'initiated' || rebootStatus === 'underway') && !this.timedOut();
    }

    setCycle = () => {
        clearTimeout(this.cycle);
        this.getHttpStatus();
        this.interval = this.isRebooting() ? five_seconds : one_minute;
        this.cycle = setTimeout(this.setCycle, this.interval);
    }

    getHttpStatus = () => {

        let wasRebooting = this.isRebooting();
        microServiceApi.getHttpStatus(this.props.ApiUrlSegment, this.props.vpcName, this.isRebooting() ? five_seconds : 10000)
            .then(this.maybeUpdateRebootState)
            .then(({ status, apiUrlSegment, vpcName }) =>  {
                if(apiUrlSegment === this.props.ApiUrlSegment && vpcName === this.props.vpcName)
                    this.setState(({ status: status || '?' }))
            });
                     
    }

    maybeUpdateRebootState = (response) => {
        
        
        if( this.getRebootStatus() === 'underway'){
            
            if(response.status == 200)
                store.dispatch(actionCreators.resolveReboot(this.props.instanceId, 'success'));
            else if(this.timedOut())
                store.dispatch(actionCreators.resolveReboot(this.props.instanceId, 'fail'));
        }
        else if(this.getRebootStatus() === 'initiated' && response.status !== 200){
            
            store.dispatch(actionCreators.detectReboot(this.props.instanceId))
        }
        return response;
    }

    render(){

        return React.createElement(View, { 
            instanceId: this.props.instanceId,
            vpcName: this.props.vpcName,
            ApiUrlSegment: this.props.ApiUrlSegment,
            status: this.state.status
        });
    }
}




export default HttpStatusMonitor;