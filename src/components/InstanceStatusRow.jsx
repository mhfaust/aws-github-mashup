import React from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { backendApi } from '~/dataServices';
import { RebootButton, HttpStatusMonitor } from '~/components'


const InstanceStatusRow = ({instance, vpcName, handleDetailsClick, isCurrent}) => {
    return (
        <Table.Row className={isCurrent ? 'current' : ''}>
            <Table.Cell>{instance.Ec2Name || instance.Name }</Table.Cell>
            <Table.Cell>
                {instance.ApiUrlSegment ?
                <HttpStatusMonitor
                    vpcName={vpcName}
                    ApiUrlSegment={instance.ApiUrlSegment}
                    instanceId={instance.InstanceId}>
                </HttpStatusMonitor>
                : null}

            </Table.Cell>
            <Table.Cell>
                {instance.ApiUrlSegment ?
                <RebootButton
                    vpcName={vpcName}
                    Ec2Name={instance.Ec2Name}
                    instanceId={instance.InstanceId}
                ></RebootButton>
                : null}
            </Table.Cell>
            <Table.Cell className={`git-${instance.statusRelativeToIac}`}>
                {instance.DeployedVersion}
            </Table.Cell>
            <Table.Cell>
                <a href="javascript:void(0)" className="details-link" onClick={(e) =>{
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    handleDetailsClick(instance)
                }}>details</a></Table.Cell>
        </Table.Row>
    )

}

export default InstanceStatusRow;
