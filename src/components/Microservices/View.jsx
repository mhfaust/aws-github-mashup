import React from 'react';
import { Table, Icon, Dropdown, Loader, Dimmer } from 'semantic-ui-react';
import { StickyContainer, Sticky } from 'react-sticky';

import { microservices } from '../../../common';
import { CommitsComparison, MergeArrow } from '~/components';
import { githubUrls } from '~/dataServices';

const GitTagLink = ({diff, repo}) => {

    let iacName = microservices.convertName(repo, 'git', 'iac');
    let tag = (diff && diff[iacName] ? diff[iacName].baseTag : '?.?.?.?');

    return (
        <a href={githubUrls.commits(repo, tag)} target="_blank">
            {tag.split('.').join(' . ')}
        </a>
    );
}

const iacNames = microservices.allServiceNamesFor('iac');

const View = ({
	candidate,
	pullRequestUrl,
	branchOptions,
	handleBranchChange,
	fetchingComps,
	iacDev_iacMaster,
	msDev_iacCand,
	iacCand_iacDev,
	compDetailsParams,
	setCompDetailsParams,
	compContainerRef,
	handleCompContainerRef
}) => {
	return (
		<main className="Microservices">
			<h1>Microservice Versions</h1>

			{branchOptions ?  (
				<span>
					<b>Select Candidate branch &nbsp;&nbsp;&nbsp;</b>
					<Dropdown scrolling placeholder="select branch"
						options={branchOptions}
						onChange={handleBranchChange}
						search
						value={candidate}
						className="branchSelector"
					></Dropdown>
				</span>
			) : null}

			{
				pullRequestUrl
			    ? <a href={pullRequestUrl} className="prLink" target="_blank">View Pull Request</a>
				: null
			}

			<StickyContainer className="diffsTableContainer">
				<Dimmer inverted active={fetchingComps}><Loader /></Dimmer>
				<Table collapsing basic="very" style={{flex:'0 0 auto'}}>
					<Table.Row as={Table.Header}>
						<Table.Row>
							<Table.Cell></Table.Cell>
							<Table.Cell>MS Dev</Table.Cell>
							<Table.Cell style={{display: candidate && candidate !== 'develop' ? 'table-cell' : 'none'}}></Table.Cell>
							<Table.Cell style={{display: candidate && candidate !== 'develop' ? 'table-cell' : 'none'}}>IAC Candidate</Table.Cell>
							<Table.Cell></Table.Cell>
							<Table.Cell>IAC Develop</Table.Cell>
							<Table.Cell></Table.Cell>
							<Table.Cell>IAC Master</Table.Cell>
						</Table.Row>
					</Table.Row>
					<Table.Body>
					{microservices.allServiceNamesFor('git').map(repoName => {
						let iacName = microservices.convertName(repoName, 'git', 'iac');
						return (
						<Table.Row key={repoName}>
							<Table.Cell>{repoName}</Table.Cell>
							<Table.Cell>
								<a className="git-tag" href={githubUrls.commits(repoName, 'develop')}>develop</a>
							</Table.Cell>
							<Table.Cell>
								<MergeArrow
									diff={msDev_iacCand}
									repo={repoName}
									iacName={iacName}
									headLabel={repoName}
									baseLabel='IAC Candidate'
									handleClick={setCompDetailsParams}
								/>
							</Table.Cell>
							<Table.Cell>
								<GitTagLink diff={msDev_iacCand} repo={repoName} />
							</Table.Cell>

							<Table.Cell style={{display: candidate && candidate !== 'develop' ? 'table-cell' : 'none'}}>
								<MergeArrow
									diff={iacCand_iacDev}
									repo={repoName}
									iacName={iacName}
									headLabel='IAC Candidate'
									baseLabel='IAC Develop'
									handleClick={setCompDetailsParams}
								/>
							</Table.Cell>
							<Table.Cell style={{display: candidate && candidate !== 'develop' ? 'table-cell' : 'none'}}>
								<GitTagLink diff={iacCand_iacDev} repo={repoName} />
							</Table.Cell>

							<Table.Cell>
								<MergeArrow
									diff={iacDev_iacMaster}
									repo={repoName}
									iacName={iacName}
									headLabel='IAC Develop'
									baseLabel='IAC Master'
									handleClick={setCompDetailsParams}
								/>
							</Table.Cell>
							<Table.Cell>
								<GitTagLink diff={iacDev_iacMaster} repo={repoName} />
							</Table.Cell>
						</Table.Row>
					)})}
					</Table.Body>
				</Table>

				{compDetailsParams ? (

					<div style={{flex:'1 0 auto'}} >
						<Sticky topOffset={-80}>

							{ ({style, isSticky}) => (

								<div style={style} className={(isSticky ? 'sticky' : '')}>
									<div className='compWrapper'>
										<h2>{compDetailsParams.repo}</h2>
										<CommitsComparison
											repo={compDetailsParams.repo}
											base={compDetailsParams.base}
											head={compDetailsParams.head}
											baseLabel={compDetailsParams.baseLabel}
											headLabel={compDetailsParams.headLabel} />
										</div>
								</div>
							)}

						</Sticky>
					</div>

				) : null}

			</StickyContainer>
		</main>
	)
}

export default View;
