'use strict';

module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-casper');
  grunt.loadNpmTasks('grunt-mocha-cov');

  grunt.initConfig({

    copy: {
      dev: {
        expand: true,
        cwd: 'app',
        src: ['**/*', '!three.js-master/**/*', 'three.js-master/build/three.min.js'],
        dest: 'build/',
        flatten: false,
        filter: 'isFile'
      }
    },
    uglify: {
      js: {
        files: {
          'build/browser.min.js': 'build/browser.js'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      express: {
        files:  [ 'index.html', 'server.js', 'app/**/*' ],
        tasks:  [ 'build:dev', 'express:dev' ],
        options: {
          spawn: false
        }
      }
    },
    sass: {
      dev: {
        options: {
          includePaths: ['app/styles/scss/'],
          sourceComments: 'map'
        },
        files: {
          'build/styles/main.css': 'app/styles/main.scss'
        }
      }
    },
    express: {
      options: {
      },
      dev: {
        options: {
          script: 'server.js',
          node_env: 'development'
        }
      }
    },
    browserify: {
      dev: {
        src: ['app/js/backbone/**/*.js'],
        dest: 'build/browser.js',
        options: {
          transform: ['debowerify', 'hbsfy'],
          debug: true
        }
      }
    },
    clean: {
      dev: {
        src: ['build/**/*']
      }
    },
    mochacov: {
      coverage: {
        options: {
          reporter: 'mocha-term-cov-reporter',
          coverage: true
        }
      },
      coveralls: {
        options: {
          coveralls: {
            serviceName: 'travis-ci'
          }
        }
      },
      unit: {
        options: {
          reporter: 'spec',
          require: ['chai']
        }
      },
      html: {
        options: {
          reporter: 'html-cov',
          require: ['chai']
        }
      },
      options: {
        files: 'test/*.js',
        ui: 'bdd',
        colors: true
      }
    },
    casper: {
      acceptance : {
        options : {
          test : true,
          //'log-level': 'debug'
        },
        files : {
          'test/acceptance/casper-results.xml' : ['test/acceptance/*_test.js']
        }
      }
    }

  });

grunt.registerTask('default',['express:dev', 'watch:express']);
grunt.registerTask('build:dev', ['clean:dev', 'copy:dev']);
grunt.registerTask('test', ['mochacov:unit']);

};
