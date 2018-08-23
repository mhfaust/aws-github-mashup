import React from 'react';
import { backendApi } from '~/dataServices';
import View from './View.jsx';
import styles from './styles.scss';

class CI extends React.Component {
  constructor () {
    super();
    this.state = {
      repo: 'continuous-integration',
      ciInfo: []
    }
  }

  // OUT OF ORDER
  // componentDidMount() {
  //   backendApi.getTravisBuilds(this.state.repo).then(builds => {
  //     let info = builds.map(build => {
  //       return {
  //         "number": build.number,
  //         "wasSuccess": build.success,
  //         "link": build.url
  //       }
  //     });
      
  //     this.setState({
  //       ciInfo: info
  //     });
  //   });
  // }

  render () {
    return React.createElement(View, {
      ...this.state
    });
  }
}

export default CI;
