const browserSync = require("browser-sync").create();
const gulp = require("gulp");
const sass = require("gulp-sass");

gulp.task("browserSync", () => {
  browserSync.init({
    server: {
      baseDir: "src"
    }
  });
});

// compile sass -> css
gulp.task("sass", () => {
  return gulp
    .src("src/scss/main.scss")
    .pipe(sass())
    .pipe(gulp.dest("src"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// compile js with babel
gulp.task("scripts", () => {
  return gulp
    .src(["node_modules/babel-polyfill/dist/polyfill.js", "js/*.js"])
    .pipe(babel())
    .pipe(gulp.dest("src/compiled"));
});

// watch for css changes
gulp.task("watch:css", () => {
  return gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
});

// watch for js changes
gulp.task("watch:js", () => {
  return gulp.watch("src/js/**/*.js", gulp.series("scripts"));
});

// watch for html changes
gulp.task("watch:html", () => {
  return gulp.watch("src/*.html", browserSync.reload);
});

// run dev mode
gulp.task(
  "default",
  gulp.series("sass", gulp.parallel("browserSync", "watch:css", "watch:html"))
);
