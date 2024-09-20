const gulp = require('gulp');
const sftp = require('gulp-sftp-up4');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('staging.json', 'utf8'));
// Define the deploy task
gulp.task('deploy', function () {
    return gulp.src('test/**/*.*')  // specify the files to upload
        .pipe(sftp({
            host: config.host,
            user: config.user,
            pass: config.pass,
            remotePath: config.remotePath
        }));
});

// Define the watch task
gulp.task('watch', function () {
    // Watch for changes in the /test directory
    gulp.watch('test/**/*.*', gulp.series('deploy'));
});

// Default task to start watching
gulp.task('default', gulp.series('watch'));