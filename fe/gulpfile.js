var gulp = require('gulp');
//
var PATHS = {
    src: {
        js: 'src/**/*.ts',
        html: 'src/**/*.html',
        css: 'src/**/*.scss',
    },
    lib: [
        'node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
        'node_modules/angular2/bundles/angular2.js',
        'node_modules/angular2/bundles/http.js',
        'node_modules/angular2/bundles/forms.js',
        'node_modules/angular2/bundles/router.dev.js',
        'node_modules/systemjs/dist/system-csp-production.js'
    ],
    typings: 'node_modules/angular2/bundles/typings/angular2/angular2.d.ts',
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('js', function () {
    var typescript = require('gulp-typescript');
    var sourcemaps = require('gulp-sourcemaps');
    return gulp.src([PATHS.src.js, PATHS.typings])
        .pipe(sourcemaps.init())
        .pipe(typescript({
            noImplicitAny: true,
            module: 'system',
            target: 'ES5',
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            sourceMaps: true,
        })).js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('css',  function() {
    var sass = require('gulp-sass');
    return gulp.src(PATHS.src.css)
        .pipe(sass())
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src(PATHS.src.html).pipe(gulp.dest('dist'));
});

gulp.task('libs', function () {
    return gulp.src(PATHS.lib).pipe(gulp.dest('dist/lib'));
});

gulp.task('play', ['libs', 'html', 'css', 'js'], function () {
    var http = require('http');
    // var connect = require('connect');
    // var serveStatic = require('serve-static');

    // var port = 9000, app;

    gulp.watch(PATHS.src.html, ['html']);
    gulp.watch(PATHS.src.js, ['js']);
    gulp.watch(PATHS.src.css, ['css']);

    // app = connect().use(serveStatic(__dirname + '/dist'));  // serve everything that is static
    // http.createServer(app).listen(port);
});

