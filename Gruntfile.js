module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    
    var config = grunt.file.readYAML('Gruntconfig.yml');
    
    grunt.initConfig({

    imagemin: {
        dynamic: {
            files: [{
                expand: true,
                cwd: 'imgs/',
                src: ['*.{png,jpg,gif}'],
                dest: 'imgs/'
                }]
            }
        },
    responsive_images: {
            dev: {
                options: {
                    engine: 'gm',
                    sizes: [{
                        name: "450",
                        width: 450
                    },{
                        name: "650",
                        width: 650
                    },{
                        name: "1250",
                        width: 1250,
                    }
                    ]
                },
                files: [{
                    expand:true,
                    src: ['*.{jpg,gif,png}'],
                    cwd: 'imgs/', 
                    dest: 'imgs/responsive/'
                }]
            }
        
        },
        
    });
    
    grunt.registerTask('default', [
    ]);
    grunt.registerTask('min', [
    'imagemin',
    ]);
    grunt.registerTask('res', [
    'responsive_images'
    ]);
};

