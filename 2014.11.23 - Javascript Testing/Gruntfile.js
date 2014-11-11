module.exports = function(grunt) {
  'use strict';

  var example = grunt.option('example') || 'final';

  grunt.initConfig({
    karma: {
      options: {
        configFile: 'shared/karma_config.js',
        files: [
          __dirname + '/bower_components/jquery/dist/jquery.js',
          __dirname + '/bower_components/chai/chai.js',
          __dirname + '/bower_components/chai-jquery/chai-jquery.js',
          __dirname + '/bower_components/sinon/sinon.js',
          __dirname + '/bower_components/sinon-chai/lib/sinon-chai.js',
          __dirname + '/shared/test_helper.js',
          __dirname + '/examples/' + example + '/test.js'
        ]
      },
      build: {
        singleRun: true,
        autoWatch: false
      },
    }
  });

  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['karma:build']);
};
