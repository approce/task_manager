var plan = require('flightplan');

var appName = 'task-manager';
var username = 'root';
var startFile = 'bin/www';

var tmpDir = appName+'-' + new Date().getTime();

// configuration
plan.target('production', [
    {
        host: '198.211.120.110',
        username: username,
        privateKey: '/Users/roman/.ssh/id_rsa',
        agent: process.env.SSH_AUTH_SOCK
    }
]);

// run commands on localhost
plan.local(function(local) {
    // uncomment these if you need to run a build on your machine first
    // local.log('Run build');
    // local.exec('gulp build');

    local.log('Copy files to remote hosts');
    var filesToCopy = local.exec('git ls-files', {silent: true});
    // rsync files to all the destination's hosts
    local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

// run commands on remote hosts (destinations)
plan.remote(function(remote) {
    remote.log('Move folder to root');
    remote.sudo('cp -R /tmp/' + tmpDir + ' ~', {user: username});
    remote.rm('-rf /tmp/' + tmpDir);

    remote.log('Install dependencies');
    remote.sudo('npm --production --prefix ~/' + tmpDir + ' install ~/' + tmpDir, {user: username});

    remote.log('Reload application');
    remote.sudo('ln -snf ~/' + tmpDir + ' ~/'+appName, {user: username});
    remote.exec('forever stop ~/'+appName+'/'+startFile, {failsafe: true});
    remote.exec('forever start ~/'+appName+'/'+startFile);
});