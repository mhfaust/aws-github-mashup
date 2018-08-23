import React from 'react';
import View from './View.jsx';
import styles from './styles.scss';

class Clipboard extends React.Component{

    state = { isOpen: false }

    handleOpen = () => {
        this.setState({ isOpen: true })

        this.timeout = setTimeout(() => {
            this.setState({ isOpen: false })
        }, 1000)
    }

    handleClose = () => {
        this.setState({ isOpen: false })
        clearTimeout(this.timeout)
    }

    render(){
        return React.createElement(View, { 
            ...this.props, 
            ...this.state,
            handleClose: this.handleClose,
            handleOpen: this.handleOpen
        } )
    }
}


export default Clipboard