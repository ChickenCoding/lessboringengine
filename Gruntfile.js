module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            dist : {
                src: ['example/**/*.js', 'lib/**/*.js', 'vendor/**/*.js'],
                dest: 'build/app.js'
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'src/*.js', 'test/*.js'],
            options: {
                debug: true
            }
        },

        clean: {
          files : ["build/*.*"]
        },

        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['jshint', 'browserify'],
                options: {
                    spawn: false,
                },
            },
        },
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'jshint', 'browserify']);
};
