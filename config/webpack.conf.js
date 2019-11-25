const webpack = require('webpack');
module.exports = {
    watch:true,
    resolve: {
        extensions: ['.js'],
        alias:{
            'vue$':'vue/dist/vue.esm.js'
        }
    },
    mode:"development",//development
    module: {
        rules:[
            {
                test:/\.js$/,
                exclude:/(node_modules)/,
                include: /src/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:['@babel/preset-env',],
                            plugins:['@babel/transform-runtime']
                        }
                    }
                ]
            }
        ]
    }
};