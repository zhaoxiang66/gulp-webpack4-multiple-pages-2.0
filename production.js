const tools = require('./config/tools');
const path = require('path');
const entry = tools.entryDir;
const output = tools.outputDir;
const fs = require('fs');
const slog = require('single-line-log').stdout;
const jsPath = path.resolve(__dirname,`./${output}/js`);
tools.uglifyJs(`./${output}/js/*.js`,`./${output}/js`);
let number = 1;
let dirs = fs.readdirSync(jsPath);
let timer = setInterval(() => {
    number++;
    let progress = (number/dirs.length).toFixed(2).toString().substr(0,4);
    slog('压缩js进度: ' + progress* 100 + '%');
    if(number >= dirs.length){
        clearInterval(timer);
    }
}, 800);
