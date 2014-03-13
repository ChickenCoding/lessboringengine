module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            dist : {
                src: ['src/**/*.js', 'lib/**/*.js', 'vendor/**/*.js'],
                dest: 'build/app.js'
            }
        },

        jshint: {
            files: ['Gruntfile.js', 'src/*.js', 'test/*.js'],
            options: {
                debug: true
            }
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

    grunt.registerTask('default', ['jshint', 'browserify']);
};
