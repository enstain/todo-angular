var 

gulp = require('gulp'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
include = require('gulp-include'),
sass = require('gulp-sass'),
gutil = require('gulp-util'),
streamqueue = require('streamqueue'),
browserSync = require('browser-sync'),
changed = require('gulp-changed'),
karma = require('karma').server,
isProd = gutil.env.type === 'prod',

sources = {
  js: 'src/js/**/*.js',
  sass: 'src/sass/**/*.scss',
},

targets = {
  css: 'www/css',
  html: 'www/',
  js: 'www/js'
};

gulp.task('js', function() {
  var stream;

  stream = streamqueue({
    objectMode: true
  });

  stream.queue(
    gulp.src(sources.js)
    .pipe(include({
      extensions: "js"
    }))
  );

  stream.done().pipe(concat("app.js")).pipe(isProd ? uglify() : gutil.noop()).pipe(gulp.dest(targets.js));
});

gulp.task('css', function() {
  var stream;
  stream = streamqueue({
    objectMode: true
  });
  
  stream.queue(gulp.src(sources.sass).pipe(sass({
    style: 'expanded',
    includePaths: ['src/css'],
    errLogToConsole: true
  })));

  stream.done().pipe(concat("style.css")).pipe(isProd ? uglify() : gutil.noop()).pipe(gulp.dest(targets.css));
});

gulp.task('unit', function (done) {
  karma.start({
    configFile: __dirname + '/tests/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('server', function() {
  browserSync.init(null, {
    open: true,
    server: {
      baseDir: targets.html
    },
    reloadDelay: 2000,
    watchOptions: {
      debounceDelay: 1000
    }
  });
});

gulp.task('watch', function() {
  gulp.watch([sources.js, 'tests/*_spec.js'], ['js', 'unit']);
  gulp.watch(sources.sass, ['css']);

  gulp.watch('www/**/**', function(file) {
    if (file.type === "changed") {
      browserSync.reload(file.path);
    }
  });
});

gulp.task('build', ['js', 'css']);

gulp.task('default', ['watch', 'server']);