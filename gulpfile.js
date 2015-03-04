var gulp = require('gulp');
var livereload = require('gulp-livereload');
var watchify = require('gulp-watchify');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var notify = require('gulp-notify');


var paths = {
    scripts: [
        'js/app.js'
    ],
    css: [
        'css/main.scss'
    ]
};

gulp.task('watchify', watchify(function (watchify) {
    gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(watchify({watch: true}))
        .pipe(gulp.dest('public/js'))
        .pipe(livereload())
        .pipe(notify('Browserify compiled'));
}));


gulp.task('sass', function () {
    gulp.src(paths.css)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'))
        .pipe(livereload())
        .pipe(notify('SASS compiled'));
});

gulp.task('server', function () {
    nodemon({
        script: 'server.js'
    })
});

gulp.task('watch', function () {
    gulp.watch(paths.css, ['sass']);
});

gulp.task('default', ['sass', 'watchify', 'watch']);