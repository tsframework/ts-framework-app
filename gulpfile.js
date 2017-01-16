var gulp = require("gulp");
var nodemon = require('nodemon');
var typescript = require('gulp-typescript');
var count = require('gulp-count');
var rename = require('gulp-rename');
var less = require('gulp-less');
var browser = require('gulp-browser');
var exec = require('gulp-exec');
var fs = require('fs');
var path = require('path');
var browserSync = require('browser-sync').create();

function onError(err) {
    console.log(err);
    this.emit('end');
}

/********************************************
 *            Backend tasks                 *
 ********************************************/

/** Build Typescript Backend **/
var tsconfigJson = JSON.parse(fs.readFileSync('app/tsconfig.json'));
var tsProject = typescript.createProject("app/tsconfig.json", {
    "rootDir": path.resolve('.', tsconfigJson.compilerOptions.rootDir),
    "outDir": path.resolve('.', tsconfigJson.compilerOptions.outDir)
});
gulp.task("build:backend", function() {
    var tsResult = tsProject.src()
        .pipe(rename(function (path) { path.dirname = path.dirname.replace("app", ""); }))
        .pipe(typescript(tsProject));

    return tsResult.js.pipe(gulp.dest('build'));
});

/********************************************
 *            Frontend tasks                *
 ********************************************/
gulp.task("build:less", function() {
    return gulp.src('./resources/less/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./public/css'));
});

/** Build typescript frontend into individual modules **/
gulp.task("build:client", function() {
    var tsconfigJson = JSON.parse(fs.readFileSync('client/tsconfig.json'));
    var tsProject = typescript.createProject("client/tsconfig.json", {
        "rootDir": path.resolve('.', tsconfigJson.compilerOptions.rootDir),
        "outDir": path.resolve('.', tsconfigJson.compilerOptions.outDir)
    });

    var tsResult = tsProject.src()
        .pipe(rename(function (path) { path.dirname = path.dirname.replace("client", ""); }))
        .pipe(typescript(tsProject));

    return tsResult.js.pipe(gulp.dest('./public/js/modules'));
});

gulp.task('build:client-templates', function() {
    return gulp.src('./client/**/*.html')
        .pipe(gulp.dest('./public/js/modules/'));
})

/** Browserify individual modules JS files for usage in the browser **/
gulp.task("build:browser", function () {
    return gulp.src('./public/js/modules/app.js')
        .pipe(browser.browserify({transform: 'brfs'}))
        .on('error', onError)
        .pipe(gulp.dest("./public/js/"));
});

/** Build typecript client frontend **/
gulp.task("build:frontend", gulp.parallel("build:less", gulp.series("build:client", "build:client-templates", "build:browser")));


/********************************************
 *            Running tasks                 *
 ********************************************/

/** Build the whole server **/
gulp.task("build", gulp.parallel("build:backend", "build:frontend"));

/** Start the server and watch for changes **/
gulp.task("start", function(cb) {
    var options = {
        watch: ["build/"],
        script: "build/app.js"
    };
    nodemon(options);
    nodemon.on("start", cb);
    nodemon.on('restart', cb);
    nodemon.on('change', cb);

    /*browserSync.init({
        proxy: {
            target: "localhost:3000",
            ws: true
        },
        port: 8080
    });*/
});

/** Watch for changes and reload **/
gulp.task("watch", gulp.series("build", "start", function() {
    //Watch for frontend changes
    //Watch for less changes
    gulp.watch(['./resources/less/*', './resources/less/**/*'], gulp.series("build:less"));
    //gulp.watch(['./resources/views/*'], gulp.series());
    gulp.watch(['./client/*', './client/**/*'], gulp.series("build:client", "build:client-templates", "build:browser"));

    //Watch for backend changes
    var backendFolders = [
        "./config.js",
        "./app/*.ts",
        "./app/**/*.ts"
    ];
    gulp.watch(backendFolders, gulp.series("build:backend"));
}));

gulp.task("default", gulp.series("build"));