import React from 'react';
import View from './View.jsx';
import styles from './styles.scss';

class <%= componentName %> extends React.Component{

    constructor(props){
        super(props);
        this.state = {};

    }

    componentDidMount(){
        //delete me if you don't need me.
    }

    componentWillReceiveProps(nextProps){
        //delete me if you don't need me.
    }

    render(){
        return React.createElement(View, { ...this.props, ...this.state } )
    }
}


export default <%= componentName %>