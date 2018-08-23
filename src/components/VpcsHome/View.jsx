import React from 'react';
import { Funko } from '~/components';
import { awsUrls } from '~/dataServices';
import { NavLink } from 'react-router-dom';
import { Radio, Dimmer, Loader, Modal } from 'semantic-ui-react';

const modalHeader = (vpcName, awaken) =>
    awaken ? `Wake up ${vpcName} ?` : `Put ${vpcName} to sleep?`

const modalContent = (vpcName, awaken) => (
    <div className={`sleep-toggle-message`}>
        <Funko size={250} name={vpcName} />
    </div>
)


const View = ({ vpcNames, statuses, toggleVpc }) => (
<main className="VpcsHome">
    { vpcNames.map((vpcName, i) => {
        const vpcAwakeness = statuses && statuses[vpcName] ? statuses[vpcName].awakeness  || 'unknown': 'unknown';
        return (
        <div key={i} className={`vpcCard ${vpcAwakeness}`}>
            <div
                className={`vpcBox`}
                key={i}>
                <NavLink to={`/vpcs/${vpcName}`}>
                    <Funko
                        key={i}
                        size={100}
                        name={vpcName} />
                </NavLink>
                <div className="overview">
                    <h2>{vpcName}</h2>
                    <Dimmer.Dimmable
                        blurring
                        dimmed={vpcAwakeness === 'unknown'} >
                        <Dimmer inverted active={vpcAwakeness === 'unknown'} ><Loader /></Dimmer>
                        <div><a href={awsUrls.connect(vpcName)} target="_blank" className="connect">Connect</a></div>
                        <div><a href={awsUrls.blueprint(vpcName)} target="_blank" className="connect">Blueprint</a></div>
                    </Dimmer.Dimmable>
                </div>
            </div>
            <div className="toggler">
                <Modal
                size='tiny'
                trigger={<Radio
                            toggle
                            checked={vpcAwakeness === 'awake'}
                            disabled={vpcAwakeness === '?'}
                    />}
                header={modalHeader(vpcName, vpcAwakeness !== 'awake')}
                content={modalContent(vpcName, vpcAwakeness !== 'awake')}
                actions={[
                    'Cancel',
                    { key: 'done', content: 'OK', positive: true, onClick: (e, data) => toggleVpc(vpcName, vpcAwakeness==='asleep')},
                ]}
                />
            </div>
        </div>
    )})}
</main>
)

export default View;
