const request = require('request');

let page = 1;

function req() {
    request({
        url: `https://api.github.com/repos/rdmtc/RedMatic/releases?page=${page}&per_page=100`,
        headers: {
            'User-Agent': 'node-request'
        }
    }, (err, res, body) => {
        if (!err) {
            parse(JSON.parse(body))
        }
    });
}

function parse(data) {
    data.forEach(release => {
        console.log(`# [${release.tag_name}](https://github.com/rdmtc/RedMatic/releases/${release.tag_name}) ${release.published_at}`);
        let include = false;
        release.body.split('\n').forEach(line => {
            if (line.startsWith('Module | Version')) {
                include = false;
            }
            if (include && line !== '') {
                console.log(line.replace(/^\s*\* [0-9a-f]{7} /, '* '));
            }
            if (line.startsWith('### Changelog')) {
                include = true;
            }
        });
        console.log('\n');
    });
    if (data.length === 100) {
        page += 1;
        req();
    }
}

req();