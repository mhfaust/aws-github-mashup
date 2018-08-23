import React from 'react';
import { backendApi } from '../../dataServices';
import View from './View.jsx';
import styles from './styles.scss';

class CommitsComparison extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            baseOnlyCommits:[],
            headOnlyCommits:[]
        };
    }

    componentDidMount(){
        this.getComp(this.props);
    }

    componentWillReceiveProps(nextProps){
        if(['repo', 'head', 'base'].some(prop => this.props[prop] !== nextProps[prop]))
            this.getComp(nextProps);
    }

    getComp = (props) => {

        let { repo, base, head } = props;

        this.setState({
            loading:true,
            headOnlyCommits: null,
            baseOnlyCommits: null,
            repo: null,
        });

        backendApi.getCompareRepoVersions(repo, base, head)
            .then(response => this.setState({ repo, base, head, loading:false, ...response }));
    }

    render(){
        return React.createElement(View, { ...this.state, ...this.props } )
    }
}

export default CommitsComparison;