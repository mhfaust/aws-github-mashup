import React from 'react';
import { Table, Dimmer, Loader, Segment, Radio, Icon } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Funko, InstanceDetails, InstanceStatusRow, LoadingIndicator, Clipboard } from '~/components';
import { awsUrls } from '~/dataServices';

const rdsUrl = (vpcId) => `db${vpcId.replace('-','')}.cobyt3admyxd.us-west-2.rds.amazonaws.com`;
const pemFile = '~/.ssh/amp-terraform-dev-key.pem';
const shellScript = (vpcId, bastionPublicIp) => `ssh -i ${pemFile} -L 5433:${rdsUrl(vpcId)}:5432 -N ubuntu@${bastionPublicIp} &`;


const View = ({vpc, vpcName, selectedMicroservice, loading, handleDetailsClick, frontendTags }) => {

	return(
		<section className="VpcStatus">
			<div style={{width:'530px'}} className="dimmerContainer">
				<Dimmer inverted active={loading} ><Loader /></Dimmer>
				<Table
					compact
					collapsing
					basic="very"
					className="vpc-table">
					<Table.Header>
						<Table.Row>
							<Table.Cell>Microservice</Table.Cell>
							<Table.Cell>Status</Table.Cell>
							<Table.Cell>Reboot</Table.Cell>
							<Table.Cell>Deployed</Table.Cell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
					{ vpc.Microservices.map((instance) => (
						<InstanceStatusRow
							key={`${instance.RepoName}-${instance.InstanceId}`}
							instance={instance}
							vpcName={vpcName}
							handleDetailsClick={handleDetailsClick}
							isCurrent={instance.RepoName === selectedMicroservice.RepoName}>
						</InstanceStatusRow>
					)) }
					</Table.Body>
				</Table>
			</div>
			<div style={{width:'calc(100vw - 740px)'}}>
				{ selectedMicroservice && selectedMicroservice.Name ?
					<InstanceDetails microservice={selectedMicroservice} vpcName={vpcName}></InstanceDetails>
				: null }
			</div>

			<div style={{width:'300px'}} className="vpcBasicStats">
				<div><Funko name={vpcName} size={170}/></div>
				<Table collapsing basic="very" className="vpcBasicStatsTable">
					<Table.Body>
						<Table.Row>
							<Table.Cell className="labelColumn">VPC ID</Table.Cell>
							<Table.Cell>
								<Clipboard copyText={vpc.VpcId} className="ellipsized" />
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Bastion Pub. IP</Table.Cell>
							<Table.Cell>
								<Clipboard copyText={vpc.BastionPublicIp}  className="ellipsized"/>
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>RDS url</Table.Cell>
							<Table.Cell>
								<Clipboard copyText={rdsUrl(vpc.VpcId)} className="ellipsized"/>
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>SSH Tunnel</Table.Cell>
							<Table.Cell>
								<Clipboard copyText={shellScript(vpc.VpcId, vpc.BastionPublicIp)} className="ellipsized"/>
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
				<div>
					<a href={awsUrls.connect(vpcName)} target="_blank">Connect</a>
				</div>
				<div>
					<a href={awsUrls.blueprint(vpcName)} target="_blank">Blueprint</a>
				</div>
				<div>
					<a href={awsUrls.ec2(vpcName)} target="_blank">EC2</a>
				</div>
				<div>
					<a href={awsUrls.s3(`billing.${vpcName}.sw-dev.net`)} target="_blank">S3 - Billing</a>
				</div>
				<div>
					<a href={awsUrls.s3(`blueprint.${vpcName}.sw-dev.net`)} target="_blank">S3 - Blueprint</a>
				</div>
				<div>
					<a href={awsUrls.s3(`${vpcName}.sw-dev.net`)} target="_blank">S3 - Job</a>
				</div>
				<div>
					<a href={awsUrls.s3(`scheduling.${vpcName}.sw-dev.net`)} target="_blank">S3 - Scheduling</a>
				</div>
				<div>
					<a href={awsUrls.cloudwatch(vpcName)} target="_blank">cloudwatch</a>
				</div>
				<div>
					<a href={awsUrls.rds(vpc.VpcId)} target="_blank">RDS</a>
				</div>
			</div>
		</section>
	)
}

export default View;
