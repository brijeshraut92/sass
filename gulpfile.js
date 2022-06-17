'use-strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

// Compile scss into css

function style(){
    
    return gulp.src('./src/scss/**/*.scss') // where is scss file
    .pipe(sass().on('error',sass.logError)) // pass that file through sass compile
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dest/css')) // where to save compiled css file?
    .pipe(browserSync.stream());  // stream change to all browser
}

function script(){
    return gulp.src('./src/js/**/*.js') // where is scss file
    .pipe(concat('scripts.js')) // concatinate all js file in one file
    .pipe(gulp.dest('./dest/scripts')) // where to save compiled css file?
    .pipe(browserSync.stream());  // stream change to all browser
}

function watch(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./src/scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js', script).on('change', browserSync.reload);
    
}

exports.style = style;
exports.script = script;
exports.watch = watch;