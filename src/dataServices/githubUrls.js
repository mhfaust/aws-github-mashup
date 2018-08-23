const enc = (str) => encodeURIComponent(str);

export default {
    
    commit:  (repo, sha) => `https://github.com/ShiftWise/${repo}/commit/${sha}`,

    commits: (repo, ref) => `https://github.com/ShiftWise/${repo}/commits/${enc(ref)}`,

    ref:     (repo, ref) => `https://github.com/ShiftWise/${repo}/tree/${enc(ref)}`,
}