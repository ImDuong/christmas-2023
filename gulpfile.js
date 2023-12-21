import gulp from "gulp";
import less from "gulp-less";
import pug from "gulp-pug";
import rename from "gulp-rename";
import beautify from "gulp-html-beautify";
import fileInclude from "gulp-file-include";
import fs from "fs";
import dotenv from "dotenv";
import {deleteSync} from "del";
import webserver from "gulp-webserver";
import path from "path";

const runMode = process.env.RUN_MODE || "local";
const modeSpecificEnvFile = `.env.${runMode}`;

if (fs.existsSync(modeSpecificEnvFile)) {
  dotenv.config({ path: modeSpecificEnvFile });
}

let buildFolder = "build";
if (runMode == "production") {
  buildFolder = "dist";
}
const buildFolderFullPath = path.join(process.cwd(), buildFolder)
const assetsFolderFullPath = path.join(process.cwd(), "assets")
let redirectedRoomPath = path.join(buildFolder, "rooms/main-room/index.html")
// support Windows path
redirectedRoomPath = redirectedRoomPath.replaceAll("\\", "\\\\")

const pugPattern = "./src/**/*.pug";
const cleanupPugPattern = `./${buildFolder}/**/*.pug`;
const lessPattern = "./src/**/*.less";
const jsPattern = "./src/**/*.js";
const cssPattern = "./src/**/*.css";

gulp.task("compile-less", function () {
  return gulp
    .src(lessPattern)
    .pipe(less())
    .pipe(rename({ extname: ".css" }))
    .pipe(gulp.dest(buildFolder));
});

gulp.task("compile-index-pug", function() {
  return gulp.src('index.pug')
  .pipe(pug({
    locals: { redirectedRoom: redirectedRoomPath }
  }))
  .pipe(gulp.dest('.'));
});

gulp.task("compile-src-pug", function () {
  return gulp
    .src(pugPattern)
    // inject root path for css, js, pug linkings
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest(buildFolder))
    .pipe(pug())
    .pipe(gulp.dest(buildFolder))
    .pipe(beautify())
    .pipe(gulp.dest(buildFolder))
    // clean up pug files generated after path injection
    .on('end', function () {
      deleteSync([cleanupPugPattern]);
    });
});

gulp.task("compile-pug", gulp.parallel("compile-index-pug", "compile-src-pug"));


gulp.task('copy-js', function () {
  return gulp
    .src(jsPattern)
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest(buildFolder));
});

// Task to copy CSS files
gulp.task('copy-css', function () {
  return gulp
    .src(cssPattern)
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest(buildFolder));
});


// Task to watch for changes and trigger the appropriate compilation task
gulp.task("watch", function () {
  gulp.watch(lessPattern, gulp.series("compile-less"));
  gulp.watch(pugPattern, gulp.series("compile-pug"));
  gulp.watch(jsPattern, gulp.series("copy-js"));
  gulp.watch(cssPattern, gulp.series("copy-css"));
});

gulp.task('serve', function() {
  gulp.src('.')
    .pipe(webserver({
      port: 6969,
      livereload: {
        enable: true,
        filter: function(fileName) {
          // only enable live reload for assets & build folder
          if (fileName.includes(buildFolderFullPath) || fileName.includes(assetsFolderFullPath)) {
            return true;
          } else {
            return false;
          }
        }
      },
      directoryListing: true,
      open: `index.html`
    }));
  console.log(`Enable live-reload for ${buildFolderFullPath} and ${assetsFolderFullPath}`);
});

gulp.task("default", gulp.parallel("compile-less", "compile-pug", "copy-js", "copy-css"));

gulp.task("dev", gulp.series("default", gulp.parallel("watch", "serve")));
