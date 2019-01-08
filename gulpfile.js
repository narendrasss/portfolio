const gulp = require("gulp");
const sass = require("gulp-sass");
const inject = require("gulp-inject");
const webserver = require("gulp-webserver");

const paths = {
  src: "src/**/*",
  srcHTML: "src/**/*.html",
  srcSCSS: "src/scss/**/*.scss",
  srcJS: "src/js/**/*.js",

  tmp: "tmp",
  tmpHTML: "tmp/**/*.html",
  tmpCSS: "tmp/**/*.css",
  tmpJS: "tmp/**/*.js",

  dist: "dist",
  distIndex: "dist/index.html",
  distCSS: "dist/**/*.css",
  distJS: "dist/**/*.js"
};

gulp.task("html", () => {
  return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.tmp));
});

gulp.task("css", () => {
  return gulp
    .src(paths.srcSCSS)
    .pipe(sass())
    .pipe(gulp.dest(paths.tmp));
});

gulp.task("js", () => {
  return gulp.src(paths.srcJS).pipe(gulp.dest(paths.tmp));
});

gulp.task("copy", gulp.parallel(["html", "css", "js"]));

gulp.task("inject", () => {
  const css = gulp.src(paths.tmpCSS);
  const js = gulp.src(paths.tmpJS);
  return gulp
    .src(paths.tmpHTML)
    .pipe(inject(css, { relative: true }))
    .pipe(inject(js, { relative: true }))
    .pipe(gulp.dest(paths.tmp));
});

gulp.task("serve", () => {
  return gulp.src(paths.tmp).pipe(
    webserver({
      host: "0.0.0.0",
      port: 3000,
      livereload: true
    })
  );
});

gulp.task("watch", () => {
  gulp.watch(paths.src, gulp.series(["copy", "inject"]));
});

gulp.task("dev", gulp.series(["copy", "inject", "serve", "watch"]));
