let gulp = require("gulp");
let connect = require("gulp-connect")
let minify = require("minify");
let minifyJS = require("gulp-babel-minify");
let minifyCSS = require("gulp-clean-css");
let sass = require("gulp-sass");
let minifyIMG = require("gulp-imagemin");
//定义任务build复制代码到dist
gulp.task("build", () => {
    //压缩js
    gulp.src("./src/**/*.js")
        .pipe(minifyJS())
        .pipe(gulp.dest("./dist"));
    //压缩css
    gulp.src("./src/**/*.scss")
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest("./dist"));
    //复制HTML
    gulp.src("./src/**/*.html")
        .pipe(gulp.dest("./dist"));
    //图片处理
    gulp.src("./src/img/*")
        .pipe(minifyIMG())
        .pipe(gulp.dest("./dist/img"))
    //字体处理
    gulp.src("./src/font/**/*")
        .pipe(gulp.dest("./dist/font"))

})
gulp.task("refreshHTML", () => {
    gulp.src("./src/**/*.html")
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());
})
gulp.task("refreshCSS", () => {
    gulp.src("./src/**/*.scss")
        .pipe(sass({
            outputStyle: "expanded"
        })).on('error', sass.logError)
        .pipe(minifyCSS())
        .pipe(gulp.dest("./dist"));
})
gulp.task("refreshJS", () => {
    gulp.src("./src/**/*.js")
        .pipe(minifyJS())
        .pipe(gulp.dest("./dist"));
})
gulp.task("refreshIMG", () => {
    gulp.src("./src/img/*")
        .pipe(minifyIMG())
        .pipe(gulp.dest("./dist/img"))
})
gulp.task("refreshFONT", () => {
    gulp.src("./src/font/**/*")
        .pipe(gulp.dest("./dist/font"))
})
gulp.task("proxyserver", () => {
    connect.server({
        root: "dist",
        port: 9090,
        livereload: true,
        middleware: function (connect, opt) {
            var proxy = require("gulp-connect-proxy");
            opt.route = '/proxy';
            var proxy = new proxy(opt);
            return [proxy];
        }
    })
    gulp.watch("./src/**/*.html", ["refreshHTML"]);
    gulp.watch("./src/**/*.scss", ["refreshCSS", "refreshHTML"]);
    gulp.watch("./src/**/*.js", ["refreshJS", "refreshHTML"]);
    gulp.watch("./src/img/*", ["refreshIMG", "refreshHTML"]);
    gulp.watch("./src/font/*", ["refreshFONT", "refreshHTML"]);

})