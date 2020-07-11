const core = require('@actions/core');
const exec = require('@actions/exec');

const os = require('os');
// 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'.

async function body() {
    let command =  core.getInput('linux', );

    if(os.platform() == 'darwin'){
        core.getInput('mac')
    } else if (os.platform() == 'win32'){
        core.getInput('windows')
    }

    const error_code = await exec.exec(command);

    if(error_code != 0){
        core.setFailed(`Failed with error code ${error_code}`)
    }
}
body()

