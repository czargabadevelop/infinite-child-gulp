const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sftp = require('gulp-sftp-up4');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('staging.json', 'utf8'));

// Compile SCSS to CSS
gulp.task('scss', function () {
    return gulp.src('assets/scss/**/*.scss') // Include all SCSS files
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css')) // Combine into a single file
        .pipe(cleanCSS({ compatibility: 'ie8' })) // Minify CSS
        .pipe(gulp.dest('assets/css')) // Output directory
        .on('end', () => console.log('SCSS compiled successfully.'));
});

// Deploy compiled assets
gulp.task('deploy', function () {
    return gulp.src('assets/**/*.*') // Specify the files to upload
        .pipe(sftp({
            host: config.host,
            user: config.user,
            pass: config.pass,
            remotePath: `${config.remotePath}/assets`
        }));
});

// Watch for changes in SCSS and deploy assets
gulp.task('watch', function () {
    gulp.watch('assets/scss/**/*.scss', gulp.series('scss')); // Watch all SCSS files
    gulp.watch('assets/**/*.*', gulp.series('deploy')); // Watch all assets
});

// Default task
gulp.task('default', gulp.series('scss', 'deploy', 'watch'));