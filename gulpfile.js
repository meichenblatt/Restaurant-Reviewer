
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var clean = require('gulp-clean');


gulp.task('default', ['browserSync'], function() {
	
	gulp.watch('**/*.html').on('change', browserSync.reload);
	
});

gulp.task('browserSync', function(cb){
	return browserSync.init({
		server: './src/'
	}, cb);
});




gulp.task('serve:dist', ['concat'], function(){

	browserSync.init({
		server: './dist/'
	});

});


gulp.task('clean', function () {
	return gulp.src(['dist/tmpl','dist/css','dist/js','src/compressed'], {read: false})
        .pipe(clean());
});

gulp.task('tmpl',['clean'], function () {
	return gulp.src('src/tmpl/*/')
    .pipe(gulp.dest('dist/tmpl/'));
});

gulp.task('minify-css', ['tmpl'], function() {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('compress', ['minify-css'], function (cb) {
  
  pump([
        gulp.src(['src/js/*.js', 'src/controllers/*.js']),
        uglify({mangle:false}),
        gulp.dest('src/compressed')
    ],
    cb
  );
  
});


gulp.task('concat', ['compress'], function() {
  return gulp.src(['./src/compressed/angular.min.js','./src/compressed/angular-route.min.js','./src/compressed/angular-resource.min.js','./src/compressed/jquery-3.1.1.min.js','./src/compressed/bootstrap.min.js','./src/compressed/app.js','./src/compressed/home.js','./src/compressed/restaurant.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/js'));
});