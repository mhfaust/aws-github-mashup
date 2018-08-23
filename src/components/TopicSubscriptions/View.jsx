import React from 'react';

const View = ({subscriptions}) => (
    <div className="TopicSubscriptions">
        {subscriptions && subscriptions.map ? subscriptions.map((subscription, i) => (
            <span key={i}>got one</span>
        ))

        : (<div>{typeof subscriptions}</div>)}
    </div>
)

export default View;