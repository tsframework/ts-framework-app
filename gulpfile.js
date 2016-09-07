var gulp = require("gulp");
var nodemon = require('nodemon');
var typescript = require('gulp-typescript');
var rename = require('gulp-rename');
var less = require('gulp-less');
var browser = require('gulp-browser');
var fs = require('fs');
var path = require('path');

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
var tsconfigClientJson = JSON.parse(fs.readFileSync('resources/scripts/tsconfig.json'));
var tsClientProject = typescript.createProject("resources/scripts/tsconfig.json", {
    "rootDir": path.resolve('.', tsconfigClientJson.compilerOptions.rootDir),
    "outDir": path.resolve('.', tsconfigClientJson.compilerOptions.outDir)
});
gulp.task("build:client", function() {
    var tsResult = tsClientProject.src()
        .pipe(rename(function (path) { path.dirname = path.dirname.replace("resources", "").replace("scripts", ""); }))
        .pipe(typescript(tsClientProject));

    return tsResult
        .js
        .pipe(gulp.dest('./public/js/modules'));
});

/** Browserify individual modules JS files for usage in the browser **/
gulp.task("build:browser", function () {
    return gulp.src('./public/js/modules/app.js')
        .pipe(browser.browserify())
        .pipe(gulp.dest("./public/js/"));
});

/** Build typecript client frontend **/
gulp.task("build:frontend", gulp.parallel("build:less", gulp.series("build:client", "build:browser")));


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
});

/** Watch for changes and reload **/
gulp.task("watch", gulp.series("start", function() {
    //Watch for frontend changes
    //Watch for less changes
    gulp.watch(['./resources/less/*', './resources/less/**/*'], gulp.series("build:less"));

    gulp.watch(['./resources/scripts/*'], gulp.series("build:client", "build:browser"));

    //Watch for backend changes
    var backendFolders = [
        "./config.js",
        "./app/*.ts",
        "./app/**/*.ts"
    ];
    gulp.watch(backendFolders, gulp.series("build:backend"));
}));

gulp.task("default", gulp.series("build"));