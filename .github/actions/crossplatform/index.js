const core = require('@actions/core');
const exec = require('@actions/exec');

const path = require('path');
const os = require('os');
const fs = require('fs');
// 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'.




function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  


async function body() {
    try{
        let command =  core.getInput('linux');


        let file = path.join(process.env.GITHUB_WORKSPACE, uuidv4())

        // https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#using-a-specific-shell
        if(os.platform() == 'darwin'){
            file += ".sh"
            command = core.getInput('mac')
            shell = `bash --noprofile --norc -eo pipefail ${file}`
        } else if (os.platform() == 'win32'){
            file += ".ps1"
            command = core.getInput('windows')
            shell = `pwsh -command "& ${file}"`
        } else{
            file += ".sh"
            shell = `bash --noprofile --norc -eo pipefail ${file}`        
        }

        fs.writeFileSync(file, command)

        core.info(`About to run command ${command}`)

        const error_code = await exec.exec(shell);

        if(error_code != 0){
            core.setFailed(`Failed with error code ${error_code}`)
        }
    }catch(error){
        core.setFailed(error.message);
    }
}
body()

