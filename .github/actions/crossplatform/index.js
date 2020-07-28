const core = require('@actions/core');
const exec = require('@actions/exec');

const path = require('path');

// 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'.
const os = require('os');
const fs = require('fs');




function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  

// add format because that seems to be how github does formatting
String.prototype.format = function () {
    var a = this;
    for (var k in arguments) {
        a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
    }
    return a
}


async function body() {
    try{
        let command =  '';


        let file = path.join(process.env.GITHUB_WORKSPACE, uuidv4())

        // https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#using-a-specific-shell
        
        if(core.getInput('common-shell') == "pwsh"){
            file += ".ps1"
            shell = 'pwsh -command "&  \'{0}\'"'.format(file)
        } else{
            if(os.platform() == 'darwin'){
                file += ".sh"
                shell = 'bash --noprofile --norc -eo pipefail {0}'.format(file)
            } else if (os.platform() == 'win32'){
                file += ".ps1"
                shell = 'pwsh -command "&  \'{0}\'"'.format(file)
            } else{
                file += ".sh"
                shell = 'bash --noprofile --norc -eo pipefail {0}'.format(file)    
            }
        }
        if(os.platform() == 'darwin'){
            command = core.getInput('mac')
        } else if (os.platform() == 'win32'){
            command = core.getInput('windows')
        } else{
            core.getInput('linux');
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

