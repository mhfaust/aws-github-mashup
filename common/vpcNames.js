const funkos = ['ackbar','ash','batman','daenerys','dumbledore','eleven','groot','leia','megaman','picard','rey','jack','uhura','velma','voltron']
const devops = [
    'rc',
    'ci'
    ]
const ar = ['ar01','ar02','ar03'];

const funkoSet = new Set(funkos);

const all = [].concat(funkos, devops, ar);

module.exports = {
    funkos,
    devops,
    ar,
    all,
    isFunko: vpcName => funkoSet.has(vpcName)
}
