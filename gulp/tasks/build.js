var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),   //for compression of files like html
rev = require('gulp-rev'),    //revision of files
cssnano = require('gulp-cssnano'),     // compress css
uglify = require('gulp-uglify'),     // compress javascript
browserSync = require('browser-sync').create();

gulp.task('previewDist',function(){
  browserSync.init({
    notify:false,
    server: {
      baseDir: "docs"
    }
  });
});

gulp.task('deleteDistFolder',function(){
  return del("./docs");
})

gulp.task('optimizeImages',['deleteDistFolder'],function(){
  return gulp.src(['./app/assets/images/**/*'])
  .pipe(imagemin({
    progressive: true,   //for jpeg
    interlaced: true,    //for gif
    multipass: true      //for svg
  }))
  .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('usemin',['deleteDistFolder'],function(){
  return gulp.src("app/index.html")
  .pipe(usemin({
    css: [function(){return rev()}, function(){return cssnano()}],
    js: [function(){return rev()}, function(){return uglify()}]
  }))
  .pipe(gulp.dest("./docs"));
})

gulp.task('build', ['deleteDistFolder','optimizeImages','usemin']);
