import React from 'react';
import { TopicSubscriptions } from '~/components';
import { awsUrls } from '~/dataServices';


const View = ({queues, queusByTopic, vpcName, vpcId}) => { 

    let i;
    const topicIndex = reset => { if (reset) i = reset; return ++i; }
    topicIndex(0);
    return (
    <div className="Queues">
        <div className="QueueList">   
            <h2>By Service</h2>   
            <ul> 
                {queues ? Object.keys(queues).map(serviceName => (

                    <li key={serviceName}>
                        <h3>{serviceName}</h3>
                        <ol value={topicIndex()}>
                        {Object.keys(queues[serviceName]).map(topicName => {
                            i++;
                            return (
                                <li key={topicName}>
                                    <a href={awsUrls.sqs(vpcId, serviceName, topicName)} target="_blank">{topicName}</a>
                                </li>                     
                            )
                        })}
                        </ol>

                    </li>

                )) : null}

            </ul>
        </div>


        <div className="QueueList">   
            <h2>By Topic</h2>   
            <ul> 
                {queusByTopic ? Object.keys(queusByTopic).map(topicName => (

                    <li key={topicName}>
                        <h3>{topicName}</h3>
                        <ol value={topicIndex()}>
                        {Object.keys(queusByTopic[topicName]).map(serviceName => {
                            i++;
                            return (
                                <li key={serviceName}>
                                    <a href={awsUrls.sqs(vpcId, serviceName, topicName)} target="_blank">{serviceName}</a>
                                </li>                     
                            )
                        })}
                        </ol>

                    </li>

                )) : null}

            </ul>
        </div>
    </div>
)}


        
export default View;