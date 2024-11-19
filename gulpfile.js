const gulp = require('gulp');
const sftp = require('gulp-sftp-up4');
const fs = require('fs');
const sass = require('gulp-sass')(require('node-sass'));
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

const config = JSON.parse(fs.readFileSync('staging.json', 'utf8'));
//"remotePath": "/path/to/remote/directory"
///var/www/html/[clientfolder]/wp-content/themes/infinite-child -> this is the base in staging.json

// Define the SCSS compile and minify task
gulp.task('scss', function () {
    return gulp.src('assets/scss/*.scss') // specify the SCSS files to compile
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css')) // concatenate into a single file
        .pipe(cleanCSS({ compatibility: 'ie8' })) // minify the CSS
        .pipe(gulp.dest('assets/css')); // output to the specified directory
});
//const config = JSON.parse(fs.readFileSync('staging.json', 'utf8'));
// Define the deploy task
gulp.task('deploy', function () {
    return gulp.src('assets/**/*.*') // specify the files to upload
        .pipe(sftp({
            host: config.host,
            user: config.user,
            pass: config.pass,
            remotePath: `${config.remotePath}/asset` //asset folder here
        }));
});

// Define the watch task
gulp.task('watch', function () {
    // Watch for changes in the /test directory and SCSS files
    gulp.watch('assets/scss/*.scss', gulp.series('scss'));
    gulp.watch('assets/**/*.*', gulp.series('deploy'));
    
});

// Default task to start watching
gulp.task('default', gulp.series('scss','deploy', 'watch'));