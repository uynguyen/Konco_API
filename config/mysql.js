// mysql.js


var cfenv = require('cfenv');       // get env var from cfenv

var appEnv = cfenv.getAppEnv();     // get app env

var config = {};


if (appEnv.isLocal){        // config for local, don't change
	config = {
    db_name: 'example',     // may change db_name, it must exist
    username: 'root',
    password: '',
    options: {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        pool: false
    }
}
} else {

    var credentials  = appEnv.services.cleardb[0].credentials;
    config  = {
    db_name: credentials.name,
    username: credentials.username,
    password: credentials.password ,
    options: {
        host: credentials.hostname,
        port: credentials.port,
        dialect: 'mysql',
        pool: false
    }
    }
}

module.exports = config;