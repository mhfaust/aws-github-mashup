import React from 'react';
import { backendApi } from '~/dataServices';
import View from './View.jsx';
import styles from './styles.scss';

class DeployStatus extends React.Component{

    constructor(){
        super();
        this.state = {
            repo: 'iac',
            mappedTags: []
        };
    }

    // todo: functions! tests! all the things!
    componentDidMount(){
        let release = /^[0-9]*\.[0-9]*\.[0-9]*-?[0-9]*?/;
        let base = new RegExp(release.source + "$");
        let rc = new RegExp(release.source + "-rc$");
        let training = new RegExp(release.source + "-training$");
        let beta = new RegExp(release.source + "-beta$");
        let demo = new RegExp(release.source + "-demo$");
        let connect = new RegExp(release.source + "-connect$");

        let cut = 10; // TODO: user configurable slice

        backendApi.getTags(this.state.repo).then(returnedTags => {
            let releaseTags = returnedTags.filter(allTags => allTags.name.match(release)).slice(0, 100) // yes, all that just to reduce it to what would have been one page. needs refactoring.
                .map(eachTag => { return { "name": eachTag.name, "url": eachTag.commit.url } });
            let baseTags = releaseTags.filter(releaseTags => releaseTags.name.match(base)).slice(0, cut)
                .sort((a, b) => b.name.includes(a.name) ? +1 : 0); // reverse standard ASCII order for hotfixes
            let rcTags = releaseTags.filter(releaseTags => releaseTags.name.match(rc)).slice(0, cut);
            let trainingTags = releaseTags.filter(releaseTags => releaseTags.name.match(training)).slice(0, cut);
            let betaTags = releaseTags.filter(releaseTags => releaseTags.name.match(beta)).slice(0, cut);
            let demoTags = releaseTags.filter(releaseTags => releaseTags.name.match(demo)).slice(0, cut);
            let connectTags = releaseTags.filter(releaseTags => releaseTags.name.match(connect)).slice(0, cut);

            let mappedTags = baseTags.map(releaseTag => {
                return {
                    "name": releaseTag.name,
                    "url": releaseTag.url,
                    "environments": {
                        "rc": rcTags.find(tag => tag.name === releaseTag.name + '-rc'),
                        "training": trainingTags.find(tag => tag.name === releaseTag.name + '-training'),
                        "beta": betaTags.find(tag => tag.name === releaseTag.name + '-beta'),
                        "demo": demoTags.find(tag => tag.name === releaseTag.name + '-demo'),
                        "connect": connectTags.find(tag => tag.name === releaseTag.name + '-connect')
                    }
                };
            });

            this.setState({
                testTags: mappedTags, // allows in-browser debugging of the above variables
                mappedTags: mappedTags,
                currentRelease: baseTags[0].name,
                updated: new Date().toISOString()
            });
        });
    }

    render(){
        return React.createElement(View, {
            ...this.state
        }
      )
    }
}

export default DeployStatus;
