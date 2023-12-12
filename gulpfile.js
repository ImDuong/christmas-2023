import gulp from "gulp";
import less from "gulp-less";
import pug from "gulp-pug";
import rename from "gulp-rename";
import beautify from "gulp-html-beautify";
import fileInclude from "gulp-file-include";
import fs from "fs";
import dotenv from "dotenv";
import {deleteSync} from "del";

const runMode = process.env.RUN_MODE || "local";
const modeSpecificEnvFile = `.env.${runMode}`;

if (fs.existsSync(modeSpecificEnvFile)) {
  dotenv.config({ path: modeSpecificEnvFile });
}

let buildFolder = "build";
if (runMode == "production") {
  buildFolder = "dist";
}

const pugPattern = "./src/**/*.pug";
const cleanupPugPattern = `./${buildFolder}/**/*.pug`;
const lessPattern = "./src/**/*.less";

gulp.task("compile-less", function () {
  return gulp
    .src(lessPattern)
    .pipe(less())
    .pipe(rename({ extname: ".css" }))
    .pipe(gulp.dest(buildFolder));
});

gulp.task("compile-pug", function () {
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

// Task to watch for changes and trigger the appropriate compilation task
gulp.task("watch", function () {
  gulp.watch(lessPattern, gulp.series("compile-less"));
  gulp.watch(pugPattern, gulp.series("compile-pug"));
});

gulp.task("default", gulp.series("compile-less", "compile-pug"));

gulp.task("dev", gulp.series("compile-less", "compile-pug", "watch"));
