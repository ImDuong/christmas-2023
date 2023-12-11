const pug = require("pug");
const gulp = require("gulp");
const less = require("gulp-less");
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const rename = require("gulp-rename");

const currentScriptDir = __dirname;
const rootDir = path.resolve(currentScriptDir, "../../");

const targetDirs = ["rooms/main-room"];
targetDirs.forEach(function (targetDir) {
  const toCompileDir = path.join(rootDir, targetDir);
  // Compile pug -> html
  // TODO: use gulp-pug to compile pug too
  const pugMainRoomFileName = "index.html";
  const htmlMainRoomFileName =
    path.basename(pugMainRoomFileName, path.extname(pugMainRoomFileName)) +
    ".html";
  const compiledMainRoom = pug.renderFile(path.join(toCompileDir, "index.pug"));
  prettier
    .format(compiledMainRoom, { parser: "html" })
    .then((formattedHtml) => {
      const htmltoCompileDir = path.join(toCompileDir, htmlMainRoomFileName);
      fs.writeFileSync(htmltoCompileDir, formattedHtml);
      console.info(
        `Pug file compiled successfully. Output file: ${htmltoCompileDir}`
      );
    })
    .catch((error) => {
      console.error("Error formatting HTML:", error);
    });

  // Compile less -> css
  const mainRoomLessFileName = "style.less";
  const cssMainRoomFileName =
    path.basename(mainRoomLessFileName, path.extname(mainRoomLessFileName)) +
    ".css";
  gulp.task("compile-less", function () {
    return gulp
      .src(path.join(toCompileDir, mainRoomLessFileName))
      .pipe(less())
      .pipe(rename(cssMainRoomFileName))
      .pipe(gulp.dest(toCompileDir));
  });

  gulp.task("default", gulp.series("compile-less"));

  gulp.series("compile-less")((err) => {
    if (err) {
      console.error("Error running Gulp task:", err);
    } else {
      console.info(
        `Less file compiled successfully. Output file: ${path.join(
          toCompileDir,
          cssMainRoomFileName
        )}`
      );
    }
  });
});

// TODO: add watch to auto compile pug & less when there are changes
