const gulp = require('gulp');
const util = require('gulp-util');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const compiler = require('babel-core/register');

const src = 'src/*.js';

gulp.task('lint', () => (
  gulp.src(src)
  .pipe(eslint())
  .pipe(eslint.format())
));

gulp.task('test', ['lint'], () => (
  gulp.src('test')
  .pipe(mocha({
    reporter: 'spec',
    compilers: {
      js: compiler,
    },
  }))
  .on('error', util.log)
));

gulp.task('build', ['test'], () => (
  gulp.src(src)
  .pipe(babel())
  .pipe(gulp.dest('lib'))
));

gulp.task('default', ['build']);
