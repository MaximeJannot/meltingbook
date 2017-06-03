// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json
var uglify = require("gulp-uglify");

// Variables de chemins
var source = './_src'; // dossier de travail
var destination = './dist'; // dossier à livrer

// Tâche "build" = sass + autoprefixer + CSScomb + beautify (source -> destination)
gulp.task('minify-css', function () {
  return gulp.src(source + '/_css/*.scss')
    .pipe(plugins.sass())
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(source + '/_css/'))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.csso())
    .pipe(gulp.dest(destination + '/css/'));
});
// task
gulp.task('minify-js', function () {
    gulp.src(source + '/_js/*.js') // path to your files
    .pipe(uglify())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest(destination + '/js/'));
});

// plugin custom scrollbar
gulp.task('minify-customscrollbar', function () {
    gulp.src('./components/perfect-scrollbar/js/*.js') // path to your files
    .pipe(uglify())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest('./components/perfect-scrollbar/js/minify/'));
});

// Tâche "watch" = je surveille *sass
gulp.task('watch', function () {
  gulp.watch(source + '/_css/*.scss', ['minify-css']);
  gulp.watch(source + '/_js/*.js', ['minify-js']);
});

// Tâche par défaut
gulp.task('default', ['minify-css', 'minify-js']);