import React from 'react';
import { List, Image, Icon } from 'semantic-ui-react';
import dateformat from 'dateformat';
import { githubUrls } from '~/dataServices';

const CommitList = ({ commits, repo }) =>  
  (
      <List className="CommitList">
      {commits.map(wrapper =>  wrapper.commit ? (
          <List.Item key={wrapper.sha}>
            {wrapper.author && wrapper.author.avatar_url 
              ?  <Image avatar src={wrapper.author.avatar_url} />
              :  <Icon className="no-avatar" name="user circle outline" />
             }
            <List.Content style={{maxWidth:'calc(100% - 30px)'}}>
              <List.Header 
                  as="a" 
                  href={githubUrls.commit(repo, wrapper.sha)} 
                  target="_blank">{wrapper.commit.message}</List.Header>
              <List.Description>{wrapper.commit.author.name}, {dateformat(new Date(wrapper.commit.author.date), "ddd, mmm dS, h:MM TT")},</List.Description>
            </List.Content>
          </List.Item>
      ) : null )}
      </List>
  )

export default CommitList;
