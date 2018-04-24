const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const colors = require('ansi-colors');
const browserSync = require('browser-sync').create();
const wait = require('gulp-wait');
const notify = require('gulp-notify');

function showError(err) {

    notify.onError({
        title: "Gulp error in " + err.plugin,
        message:  err.message
    })(err);

    // console.log(colors.red(err.toString()));
    this.emit('end');
}

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        notify: false
        //host: 'IP numer'
        //port: 3000
        //browser: 'google chrome'/'chrome'
    });
});

gulp.task('sass', function () {
    return gulp.src('./scss/main.scss')
        .pipe(wait(100))
            .pipe(plumber({
                errorHandler : showError
            }))
            .pipe(sourcemaps.init())
                .pipe(sass({
                    outputStyle: 'compressed'
                }))
                .pipe(autoprefixer({
                    browsers: ['last 2 versions']
                }))
            .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch("./**/*.js", browserSync.reload());
    gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', function () {
    console.log(colors.bold(colors.yellow('------ GULP START ------')));
    gulp.start(['sass', 'browser-sync', 'watch']);
});

