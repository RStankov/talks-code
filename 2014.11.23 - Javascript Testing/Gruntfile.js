module.exports = function(grunt) {
  'use strict';

  var example = grunt.option('example') || 'final';

  grunt.initConfig({
    karma: {
      options: {
        configFile: 'examples/' + example + '/karma_config.js'
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
