const fs = require('fs');
const watch = require('node-watch');
const tools = require('./config/tools');
const path = require('path');
const browserSync = require('browser-sync').create();//静态服务器
const reload = browserSync.reload;
const shell = require('shelljs');
const entry = tools.entryDir;
const output = tools.outputDir;
const watchSrc = path.resolve(__dirname,`./${entry}`);
let jsArr = fs.readdirSync(path.resolve(__dirname,`./${entry}/js`));
if(jsArr.length > 0){
    tools.resolveJs(`./${entry}/js/*.js`,path.resolve(__dirname,`./${output}/js`));
}else{
    tools.delDir(path.resolve(__dirname,`./${output}/js`));
}
//开始监听文件夹
watch(watchSrc,{recursive: true},function(evt,name){
    let srcObj = path.parse(name);
    let reg = new RegExp(`${entry}`,"gi");
    let ouputPath = name.replace(reg,output);
    if(srcObj.ext == '.scss'){
        ouputPath = ouputPath.replace(/scss/ig,'css');
    }
    if(evt == 'update'){
        if(srcObj.ext == '.js'){
            let jsPath = path.resolve(__dirname,`./${output}/js`);
            if(ouputPath.indexOf(jsPath) != -1){
                let isExist = fs.existsSync(ouputPath);
                if(!isExist){
                    shell.exec('node server.js');
                }
            }
        }
        if(srcObj.ext == '.scss'){
            tools.resolveScss(`./${entry}/scss/*.scss`,path.resolve(__dirname,`./${output}/css`));
        }
        if(srcObj.ext == '.html'){
            tools.resolveHtml(`./${entry}/*.html`,path.resolve(__dirname,`./${output}`));
            tools.resolveHtml(`./${entry}/pages/*.html`,path.resolve(__dirname,`./${output}/pages`));
        }
    }else{
        if(srcObj.ext == '.js'){
            fs.unlinkSync(ouputPath);
            shell.exec('node server.js');
        }
        if(srcObj.ext == '.scss'){
            fs.unlinkSync(ouputPath);
        }
        if(srcObj.ext == '.html'){
            fs.unlinkSync(ouputPath);
        }
    }
})
