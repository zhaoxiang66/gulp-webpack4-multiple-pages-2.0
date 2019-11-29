const fs = require('fs');
const fileinclude  = require('gulp-file-include');
const gulp  = require('gulp');
const webpackConfig = require('./webpack.conf');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');//编译scss
const browserSync = require('browser-sync').create();//静态服务器
const reload = browserSync.reload;
const sassImport = require('gulp-sass-import');
const autofx = require('gulp-autoprefixer');//css浏览器前缀补全
const config = require('./config');
const htmlmin = require('gulp-htmlmin');
const entryDir = 'src';
const outputDir = 'share';
const options = {
    collapseWhitespace:true,//清除空格
    collapseBooleanAttributes:true,//省略布尔属性的值
    removeComments:true,//清除html中注释的部分
    removeEmptyAttributes:true,//清除所有的空属性
    removeScriptTypeAttributes:true,//清除所有script标签中的type="text/javascript"属性。
    removeStyleLinkTypeAttributes:true,//清楚所有Link标签上的type属性。
    minifyJS:true,//压缩html中的javascript代码。
    minifyCSS:true//压缩html中的css代码。
};
let tools = {
    entryDir: entryDir,
    outputDir: outputDir,
    judgeDir(path){
        let stat = fs.lstatSync(path);
        let isDir = stat.isDirectory();
        return isDir;
    },
    delDir(url){
        let arr = fs.readdirSync(url);
        if(arr.length > 0){//说明有文件
            arr.forEach(item => {
                let stat = fs.lstatSync(url + "/" + item);
                let isDir = stat.isDirectory();
                if(isDir){//是文件夹
                    this.delDir(url + "/" + item);
                }else{
                    fs.unlinkSync(url + "/" + item);
                }
            })
        }
    },
    //处理html
    resolveHtml(entry,output){
        gulp.src([entry,'!./src/pages/include/**.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest(output));
    },
    //处理scss
    resolveScss(entry,output){
        gulp.src(entry)
        .pipe(sassImport())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autofx(config.autofx))
        .pipe(gulp.dest(output))
        .pipe(reload({stream: true}));
    },
    //处理js
    resolveJs(entry,output){
        gulp.src(entry)
        .pipe(named())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(output))
    },
    uglifyJs(entry,output){
        gulp.src(entry)
        .pipe(named())
        .pipe(uglify())
        .pipe(gulp.dest(output))
    }
}
module.exports = tools;