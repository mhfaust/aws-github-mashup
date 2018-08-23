import React from 'react';
import { backendApi } from '~/dataServices';
import View from './View.jsx';
import styles from './styles.scss';

class Microservices extends React.Component{
        constructor(){
        super();
        this.state={
            candidate: 'develop',
            iacDev_iacMaster: {},
            msDev_iacCand: {},
            iacCand_iacDev: {}
        }
    }

    componentDidMount(){

        backendApi.getIacBranches().then(branchList => {

            let toOptions = b => ({
                key: b.name,
                text: (b.pullRequestUrl ? 'PR: ' : '') + b.name,
                value: b.name
            });

            let branchOptions = branchList.map(toOptions);  
            this.setState({ branchList, branchOptions });
    
        });

        this.getIacComparisons();
    }

    handleBranchChange = (e, { value }) => { 


        if(value && value !== this.state.candidate){

            let pullRequestUrl = this.state.branchList.find(b => b.name === value).pullRequestUrl;

            this.setState({ 
                candidate: value, 
                pullRequestUrl,
                compDetailsParams: null 
            }, this.getIacComparisons);
        
        }
            
    }

    setCompDetailsParams = ({repo, base, head, baseLabel, headLabel}) => {

        this.setState({compDetailsParams: { repo, base, head, baseLabel, headLabel }});
    }

    getIacComparisons = () => {

        this.setState({ fetchingComps : true });
        
        let p1 = backendApi.getIacComparison('master', 'develop')
            .then(iacDev_iacMaster =>  this.setState({ iacDev_iacMaster }));

        let promises =[p1];

        if(this.state.candidate){

            let p2 = backendApi.getIacComparison(this.state.candidate, 'microservices-develop')
                .then(msDev_iacCand => this.setState({ msDev_iacCand }));

            let p3 = backendApi.getIacComparison('develop', this.state.candidate)
                .then(iacCand_iacDev => this.setState({ iacCand_iacDev }));

            promises = promises.concat(p2, p3);
        }

        Promise.all(promises)
            .catch(e => console.log(e))
            .then(() => this.setState({ fetchingComps : false }) );
    }

    render(){
        return React.createElement(View, {
            handleBranchChange: this.handleBranchChange,
            setCompDetailsParams: this.setCompDetailsParams,
            ... this.state
        })
    }
}

export default Microservices;
