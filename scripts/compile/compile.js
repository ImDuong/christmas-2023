const pug = require("pug");
const gulp = require("gulp");
const less = require("gulp-less");
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const rename = require("gulp-rename");

const currentScriptDir = __dirname;
const rootDir = path.resolve(currentScriptDir, "../../");
const mainRoomPath = path.join(rootDir, "rooms/main-room");

// Compile pug -> html
// TODO: use gulp-pug to compile pug too
const pugMainRoomFileName = "index.html"
const htmlMainRoomFileName = path.basename(pugMainRoomFileName, path.extname(pugMainRoomFileName)) + ".html";
const compiledMainRoom = pug.renderFile(path.join(mainRoomPath, "index.pug"));
prettier
  .format(compiledMainRoom, { parser: "html" })
  .then((formattedHtml) => {
    const htmlMainRoomPath = path.join(mainRoomPath, htmlMainRoomFileName);
    fs.writeFileSync(htmlMainRoomPath, formattedHtml);
    console.info(
      `Pug file compiled successfully. Output file: ${htmlMainRoomPath}`
    );
  })
  .catch((error) => {
    console.error("Error formatting HTML:", error);
  });

// Compile less -> css
const mainRoomLessFileName = "style.less"
const cssMainRoomFileName = path.basename(mainRoomLessFileName, path.extname(mainRoomLessFileName)) + ".css";
gulp.task("compile-less", function () {
  return gulp
    .src(path.join(mainRoomPath, mainRoomLessFileName))
    .pipe(less())
    .pipe(rename(cssMainRoomFileName))
    .pipe(gulp.dest(mainRoomPath));
});

gulp.task("default", gulp.series("compile-less"));

gulp.series("compile-less")((err) => {
  if (err) {
    console.error("Error running Gulp task:", err);
  } else {
    console.info(
      `Less file compiled successfully. Output file: ${path.join(mainRoomPath, cssMainRoomFileName)}`
    );
  }
});
