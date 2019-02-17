// gulpプラグインの読み込み
const gulp = require('gulp');
// Sassをコンパイルするプラグインの読み込み
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');

// style.scssの監視タスクを作成する
gulp.task('sass', function () {
  var processors = [
    cssnext({browsers: ['last 2 version']})
  ];
  // style.scssファイルを取得
  return ( gulp.src('sass/**/*.scss')
    // Sassのコンパイルを実行
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(processors))
    // Sassのコンパイルエラーを表示
    // (これがないと自動的に止まってしまう)
    .on('error', sass.logError))
    // cssフォルダー以下に保存
    .pipe(gulp.dest('css'));
});

gulp.task("watch", function () {
  gulp.watch('sass/**/*.scss', gulp.task('sass'));
});


gulp.task('default', gulp.series('sass', 'watch'));
