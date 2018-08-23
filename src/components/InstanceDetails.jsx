import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Segment } from 'semantic-ui-react';
import { CommitsComparison, Clipboard } from '~/components';

const InstanceDetails = ({vpcName, microservice}) => (

	<Segment>
		<h2>{microservice.Name} @ {vpcName}</h2>
		<Table  collapsing basic="very" >
			{microservice.InstanceType ? (
			<Table.Body>
				<Table.Row>
					<Table.Cell>InstanceType</Table.Cell>
					<Table.Cell>{microservice.InstanceType}</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>ImageId</Table.Cell>
					<Table.Cell><Clipboard copyText={microservice.ImageId} /></Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>InstanceId</Table.Cell>
					<Table.Cell><Clipboard copyText={microservice.InstanceId} /></Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>LaunchTime</Table.Cell>
					<Table.Cell>{microservice.LaunchTime}</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Deploy Method</Table.Cell>
					<Table.Cell>{microservice.DeployMethod}</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>Merge Status (IAC/Dev)</Table.Cell>
					<Table.Cell className={`git-${microservice.statusRelativeToIac}`}>{microservice.statusRelativeToIac}</Table.Cell>
				</Table.Row>
			</Table.Body>
			) : (
			<Table.Body>
				<Table.Row>
					<Table.Cell>Merge Status (IAC/Dev)</Table.Cell>
					<Table.Cell className={`git-${microservice.statusRelativeToIac}`}>{microservice.statusRelativeToIac}</Table.Cell>
				</Table.Row>
			</Table.Body>
			)}

		</Table>
		<CommitsComparison
			status={microservice.statusRelativeToIac}
			repo={microservice.RepoName}
			base={microservice.IacMicroServiceTag}
			head={microservice.DeployedVersion}
			baseLabel="IAC Develop"
			headLabel="deployed" />
	</Segment>
)



export default InstanceDetails;
