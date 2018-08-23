import React from 'react';
import { Table, Icon, Dropdown, Loader, Dimmer } from 'semantic-ui-react';
import { StickyContainer, Sticky } from 'react-sticky';

const View = ({
  repo,
  currentRelease,
  mappedTags,
  testTags,
  updated
}) => {
  if (currentRelease) console.log(repo + ": " + currentRelease + " (current release)");
  if (testTags) { console.log("raw data (updated " + updated + "): "); console.log(testTags); }
  return (
    <main className="DeployStatus">
      <h1>Status Board</h1>

      <StickyContainer className="statusBoardContainer">
        {/* Dims the display: <Dimmer inverted active={someCondition}><Loader /></Dimmer> */}
        {/* Options: https://react.semantic-ui.com/collections/table#table-example-collapsing */}
        {/* I opted to keep everything the same here as in the other IAC page. */}
        <Table collapsing basic="very" style={{flex:'0 0 auto'}}>
          <Table.Row as={Table.Header}>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell>Version</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>CI</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>RC</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell colSpan="2">Training</Table.Cell>
              {/*<Table.Cell></Table.Cell>*/}
              <Table.Cell>Beta</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>Demo</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>Connect</Table.Cell>
            </Table.Row>
          </Table.Row>
          <Table.Body>{mappedTags.map(tag => { return (
            <Table.Row key={tag.name}>
              <Table.Cell></Table.Cell>
              <Table.Cell>
                <a href={`https://github.com/ShiftWise/iac/releases/tag/${tag.name}`} target="_blank">
                  {tag.name}
                </a>
              </Table.Cell>
              <Table.Cell></Table.Cell>
              {/* if we got this far, CI has been deployed to, and passed */}
              <Table.Cell><i className="check circle icon green"></i></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>{!!tag.environments.rc ? <i className="check circle icon green"></i> : <i className="times circle icon grey"></i>}</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>{!!tag.environments.training ? <i className="check circle icon green"></i> : <i className="times circle icon grey"></i>}</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>{!!tag.environments.beta ? <i className="check circle icon green"></i> : <i className="times circle icon grey"></i>}</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>{!!tag.environments.demo ? <i className="check circle icon green"></i> : <i className="times circle icon grey"></i>}</Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>{!!tag.environments.connect ? <i className="check circle icon green"></i> : <i className="times circle icon grey"></i>}</Table.Cell>
            </Table.Row>
          )})}
          </Table.Body>
        </Table>
      </StickyContainer>
    </main>
  )
}

export default View;
