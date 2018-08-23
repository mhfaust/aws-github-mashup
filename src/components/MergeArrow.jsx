import React from 'react';
import { Icon } from 'semantic-ui-react';

const MergeArrow = ({diff, repo, iacName, headLabel, baseLabel, handleClick}) => (
    <Icon 
        name='long arrow right' 
        className={'merge ' + (diff && diff[iacName] ? diff[iacName].status : 'unkown-merge-status')}
        onClick={() => handleClick({
            repo: repo, 
            base: diff[iacName].baseTag, 
            head: diff[iacName].headTag,
            headLabel,
            baseLabel
        })}
    />
)

export default MergeArrow;
