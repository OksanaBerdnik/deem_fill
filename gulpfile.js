var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var postCSS = require('gulp-postcss');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var gutil = require('gulp-util');

//style paths
var path = {
    cssMain: './css',
    sassCustom: './scss/**/*.scss',
    sassCore: './scss/main.scss',
    cssCustom: './css/main.css',
};

gulp.task('cleanCssCustom', function () {
    del(path.cssCustom).then(function (paths){
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});
gulp.task('buildCssCustom', ['cleanCssCustom'], function () {
    return gulp.src([path.sassCore])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .on('error', notify.onError({ message: 'There is a CSS error, please look the console for details'}))
        .pipe(cleanCSS())
        .pipe(postCSS([autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'iOS 7', 'iOS 8', 'ie 11', 'Safari 9'] })]))
        // .pipe(concat('theme-custom.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.cssMain))
        .pipe(notify('Custom theme minified'));
});


gulp.task("node_modules", function () {
    gulp.src("./node_modules/slick-carousel/**/*")
        .pipe(gulp.dest("./vendor/slick-carousel/"));
    gulp.src("./node_modules/jquery/**/*")
        .pipe(gulp.dest("./vendor/jquery/"));
});

gulp.task('run', ['build'], function() {
    // gulp.watch(path.sassCore,['buildCssTheme']);
    gulp.watch(path.sassCustom,['buildCssCustom']);
    // gulp.watch(path.lessCore,['buildBootstrap']);
    // gulp.watch(path.sassAdminExtentions,['buildAdminExtentions']);
    // gulp.watch(path.sassTV,['buildTV']);
});

gulp.task('build', ['buildCssCustom']);