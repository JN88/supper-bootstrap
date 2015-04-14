'use strict';
module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  grunt.initConfig({
    less: {
      dev: {
        files: {
          '../assets/css/style.css': [
            '../assets/less/style.less'
          ]
        },
        options: {
          compress: false,
          // LESS source map
          // To enable, set sourceMap to true and update sourceMapRootpath based on your install
          sourceMap: true,
          sourceMapFilename: '../assets/css/style.css.map',
          sourceMapRootpath: '/app/themes/roots/'
        }
      },
      build: {
        files: {
          '../assets/css/style.min.css': [
            '../assets/less/style.less'
          ]
        },
        options: {
          compress: true
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dev: {
        options: {
          map: {
            prev: '../assets/css/'
          }
        },
        src: '../assets/css/style.css'
      },
      build: {
        src: '../assets/css/style.min.css'
      }
    },
    modernizr: {
      build: {
        devFile: '../assets/vendor/modernizr/modernizr.js',
        outputFile: '../assets/js/vendor/modernizr.min.js',
        files: {
          'src': [
            ['../assets/js/scripts.min.js'],
            ['../assets/css/style.min.css']
          ]
        },
        uglify: true,
        parseFiles: true
      }
    },
    watch: {
      less: {
        files: [
          '../assets/less/*.less',
          '../assets/less/**/*.less'
        ],
        tasks: ['less:dev', 'autoprefixer:dev']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: false
        },
        files: [
          '../assets/css/style.css'
        ]
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    'dev'
  ]);
  grunt.registerTask('dev', [
    'less:dev',
    'autoprefixer:dev'
  ]);
  grunt.registerTask('build', [
    'less:build',
    'autoprefixer:build',
    'uglify',
    'modernizr'
  ]);
};
