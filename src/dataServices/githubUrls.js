const enc = (str) => encodeURIComponent(str);

export default {
    
    commit:  (repo, sha) => `https://github.com/Thecompany/${repo}/commit/${sha}`,

    commits: (repo, ref) => `https://github.com/Thecompany/${repo}/commits/${enc(ref)}`,

    ref:     (repo, ref) => `https://github.com/Thecompany/${repo}/tree/${enc(ref)}`,
}