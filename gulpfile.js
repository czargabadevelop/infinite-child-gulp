const gulp = require('gulp');
const sftp = require('gulp-sftp-up4');
const fs = require('fs');
const sass = require('gulp-sass')(require('node-sass'));
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

const config = JSON.parse(fs.readFileSync('staging.json', 'utf8'));

// Define the SCSS compile and minify task
gulp.task('scss', function () {
    return gulp.src('asset/scss/*.scss') // specify the SCSS files to compile
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css')) // concatenate into a single file
        .pipe(cleanCSS({ compatibility: 'ie8' })) // minify the CSS
        .pipe(gulp.dest('asset/css')); // output to the specified directory
});

// Define the deploy task
gulp.task('deploy', function () {
    return gulp.src('test/**/*.*') // specify the files to upload
        .pipe(sftp({
            host: config.host,
            user: config.user,
            pass: config.pass,
            remotePath: config.remotePath
        }));
});

// Define the watch task
gulp.task('watch', function () {
    // Watch for changes in the /test directory and SCSS files
    gulp.watch('test/**/*.*', gulp.series('deploy'));
    gulp.watch('asset/scss/*.scss', gulp.series('scss'));
});

// Default task to start watching
gulp.task('default', gulp.series('scss', 'watch'));