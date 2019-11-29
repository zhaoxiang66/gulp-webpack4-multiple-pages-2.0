const browserSync = require('browser-sync').create();//静态服务器
const path = require('path');
const reload = browserSync.reload;
const tools = require('./config/tools');
const outDir = tools.outputDir;
const baseDir = path.resolve(__dirname,`./${outDir}`);
const gulp = require('gulp');
browserSync.init({      // 启动Browsersync服务
    server: {
        baseDir: baseDir,   // 启动服务的目录 默认 index.html
        index: '/pages/home.html' // 自定义启动文件名
    },
    notify: false,
    open: 'external',   // 决定Browsersync启动时自动打开的网址 external 表示 可外部打开 url, 可以在同一 wifi 下不同终端测试
    injectChanges: false // 注入CSS改变
});
gulp.watch(`./${outDir}/*.css`).on('change', reload);
gulp.watch(`./${outDir}/pages/**/*.html`,).on('change', reload);
gulp.watch(`./${outDir}/*.html`).on('change', reload);
gulp.watch(`./${outDir}/js/*.js`).on('change', reload);