const repos = require('../../data/repos.js');

async function getIacTags (ref) {
    
    const mainTfJson = await repos.getContent('iac', 'main.tf.json', ref);
    const mainTags = JSON.parse(mainTfJson).variable.release_tags.default;

    const isFrontend = (key) => key.includes('website') || key.includes('frontend');
    const isBackend = key => !isFrontend(key)
    const toObject = (obj, key) =>  Object.assign(obj, { [key]: mainTags[key] });

    const frontends = Object.keys(mainTags).filter(isFrontend).reduce(toObject, {});
    const backends  = Object.keys(mainTags).filter(isBackend).reduce(toObject, {});

    return Object.assign({}, backends, frontends);
}

module.exports = getIacTags;
