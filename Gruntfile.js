module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Concatenate any type of files 
        concat: {
            css: {
                src: [
                    'node_modules/bootstrap/dist/css/bootstrap.min.css'
                ],
                dest: 'build/css/build.css',
            },
            js: {
                src: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/bootstrap/dist/js/bootstrap.min.js'
                ],
                dest: 'build/js/build.js',
            },
        },
        // Copy files from one destination to another
        copy: {
            main: {
                nonull: true,
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/bootstrap/fonts/*'],
                        dest: 'build/fonts/',
                        filter: 'isFile'
                    },
                ],
            },
        },
        // Minify javascript files
        uglify: {
            main: {
                files: {
                    'build/js/build.min.js': [
                        'build/js/build.js'
                    ]
                }
            },
        },
        // gzip assets 1-to-1 for production
        compress: {
            assets: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: 'assets/',
                src: ['**/*'],
                dest: 'build/images/'
            },
        }
    });

    // Register the tasks we need
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Define the default task and the order in which you want the tasks to run
    grunt.registerTask('default', ['copy', 'concat', 'uglify', 'compress']);
}
