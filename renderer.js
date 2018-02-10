const electron = require('electron');
const ipc = electron.ipcRenderer;
const remote = electron.remote;
const process = remote.getGlobal('process');
const testButton = document.getElementById('testButton');

let header = new window.Headers();
header.append('Travis-API-Version', '3');
header.append('User-Agent', 'Build Notifier');
header.append('Authorization', process.env.TRAVIS_CI_TOKEN);

const options = {
    method: 'GET',
    headers: header,
    mode: 'cors',
    cache: 'default'
};

testButton.addEventListener('click', function () {
    ipc.send('testTravisConnection', 'travis test');

    window.fetch('https://api.travis-ci.org/builds?limit=5', options)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        //document.getElementById('travisReply').innerHTML = ('Hello ' + data.name);
        document.getElementById('buildStatus').innerHTML = 'Build number: ' + data.builds[0].number + ' Branch name: ' + data.builds[0].branch.name + ' Status: ' + data.builds[0].state;
    });
});
