import React from 'react';
import { List, Image, Icon, Dimmer, Loader } from 'semantic-ui-react';
import { CommitList } from '~/components';
import { githubUrls } from '~/dataServices';


const View = ({ repo, base, head, baseOnlyCommits, headOnlyCommits, baseLabel, headLabel, loading }) => {
  

  const Wrapper = ({children}) => (
    <div className="CommitsComparison dimmerContainer">
      <Dimmer inverted active={loading}><Loader /></Dimmer>
      <h3>
        <a href={githubUrls.commits(repo, head)} target="_blank">{head}</a> 
        &nbsp;({headLabel})&nbsp;
        <Icon name='long arrow right' className={status()}/> 
        <a href={githubUrls.commits(repo, base)} target="_blank">{base}</a> 
        &nbsp;({baseLabel})&nbsp;
      </h3>
      {children}
    </div>
  )



  const status = () => !baseOnlyCommits || !headOnlyCommits
      ? 'git-indeterminate'
      : baseOnlyCommits.length && headOnlyCommits.length 
        ? 'git-diverged' 
        : baseOnlyCommits.length 
          ? 'git-behind' 
          : headOnlyCommits.length 
            ? 'git-ahead' 
            : 'git-identical';
  


  if(!repo)
    return <div></div>

  if(!baseOnlyCommits)
    return <Wrapper />

  if(!baseOnlyCommits.length && !headOnlyCommits.length)
    return (
      <Wrapper>
        <p>{repo}/{head} and {repo}/{base} are identical</p>
      </Wrapper>
  );

  return (
    <Wrapper>
      {baseOnlyCommits.length ? (
        <div>
          <h4><span className='git-behind'>behind</span> by {baseOnlyCommits.length} commits ({head} is missing these):</h4>
          <CommitList commits={baseOnlyCommits} repo={repo} />
        </div>
      ) : <div></div> }    
      {headOnlyCommits.length ? (
        <div>
          <h4><span className='git-ahead'>ahead</span> by {headOnlyCommits.length} commits:</h4>
          <CommitList commits={headOnlyCommits} repo={repo} />
        </div>
      ) : <div></div> }
    </Wrapper>
)}

export default View;