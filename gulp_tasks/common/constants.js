'use strict';

var path = require('path');

module.exports = function() {
    var cwd = process.env.INIT_CWD || '';
    var clientFolder = 'src'; // the source file folder
    var defaultTarget = 'app'; // the name of the app that corresponds to index.html
    var constants = {
        appname: 'yoobic-angular-core',
        cwd: cwd,
        defaultTarget: defaultTarget,
        targetName: '{{targetName}}',
        targetSuffix: '{{targetSuffix}}',
        mode: '{{mode}}',
        clientFolder: clientFolder,
        repository: 'https://github.com/Yoobic/yoobic-angular-core',
        versionFiles: ['./package.json', './bower.json', './' + clientFolder + '/config*.xml'],
        growly: {
            notify: false,
            successIcon: path.join(cwd, 'node_modules/karma-growl-reporter/images/success.png'),
            failedIcon: path.join(cwd, 'node_modules/karma-growl-reporter/images/failed.png')
        },
        cordova: {
            src: './' + clientFolder + '/cordova/{{targetName}}',
            icon: './' + clientFolder + '/icons/{{targetName}}/icon.png',
            platform: 'ios',
            iconBackground: '#3D4860'
        },
        lint: [
            './' + clientFolder + '/scripts/*/**/*.js',
            '!./' + clientFolder + '/scripts/bundle*.js',
            './server/**/*.js', 'gulpfile.js', './gulp_tasks/**/*.js', 'karma.conf.js', './test/**/*.js'
        ],
        fonts: {
            src: ['./' + clientFolder + '/fonts/*.*', './' + clientFolder + '/fonts/{{targetName}}/**/*.*'], // you can also add a specific src_appname
            dest: 'fonts'
        },
        html: {
            src: './' + clientFolder + '/index{{targetSuffix}}.html'
        },
        images: {
            src: [
                './' + clientFolder + '/images/{{targetName}}/**/*', './' + clientFolder + '/images/*.*',
                './' + clientFolder + '/icons/{{targetName}}/**/*', './' + clientFolder + '/icons/*.*'
            ]
        },
        style: {
            src: [
                './' + clientFolder + '/styles/main{{targetSuffix}}.scss'
            ],
            watchFolder: './' + clientFolder + '/styles/**/*.scss',
            dest: 'styles',
            destName: 'main.css',
            sass: {
                src: ['./' + clientFolder + '/styles/main{{targetSuffix}}.scss']
            },
            css: {
                src: [''] // you can also add a specific src_appname
            }
        },

        browserify: {
            src: './' + clientFolder + '/scripts/core/index.js',
            dest: '',
            bundleName: 'yoobic-angular-core.js'
        },

        serve: {
            host: 'localhost', //'0.0.0.0',
            port: 5000,
            open: true,
            browser: ['google chrome'], // ['google chrome', 'firefox'],
            localtunnel: false // true, false or 'angular-core'
        },
        mocha: {
            libs: ['server/**/*.js'],
            tests: ['test/mocha/**/*.js'],
            globals: 'test/mocha/helpers/globals.js',
            timeout: 5000
        },
        dist: {
            distFolder: './dist'
        }
    };

    return constants;
};
