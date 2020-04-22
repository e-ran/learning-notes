import path from 'path';

/** rollup默认对node模块不友好，需要使用该插件 帮助 Rollup 查找外部模块，然后安装 */
import resolve from '@rollup/plugin-node-resolve'; 

/** 插件可以解决 ES6模块的查找导入，但是npm中的大多数包都是以CommonJS模块的形式出现的，所以需要使用这个插件将CommonJS模块转换为 ES2015 供 Rollup 处理 */
import common from '@rollup/plugin-commonjs'; 
import json from '@rollup/plugin-json';

/** 变量替换，可以将动态设置的变量提取出来在配置文件中设置 */
import replace from '@rollup/plugin-replace';

/** 打包过程中实现代码压缩 */
import {terser} from 'rollup-plugin-terser'; 

/**  用来转码 通过这个插件可以方便的使用 javascript 的新特性 */
import babel from 'rollup-plugin-babel';

/** 用来使用node的内置包的，如util、buffer等 */
import builtins from 'rollup-plugin-node-builtins'; 


//rollup-plugin-uglify 压缩 js 代码

//rollup-plugin-eslint 代码检查
//另外，需要创建 .eslintrc 文件配置 eslint 规则
//   eslint({
//             include: ['src/**/*.js']  需要检查的部分
//    }),


import os from 'os';

const cpuNums = os.cpus().length;

const NODEJS_BUILD_CONFIG = {
    input: {
        index: path.resolve(__dirname, './src/index.js'),
    },
    plugins: [
        // builtins(),
        // resolve({
        //     mainFields: ['module', 'main'],
         //       module: true, // ES6模块尽可能使用 ‘module’字段
        //     browser: false, // 适配需要加载browser 模块的包
        //     //jsnext: true,  // 该属性是指定将Node包转换为ES2015模块
        //     // main 和 browser 属性将使插件决定将那些文件应用到bundle中
        //     //main: true,  // Default: true 
        // }),
        // babel({
        //     exclude: 'node_modules/**', // 只转译我们的源代码
        //     runtimeHelpers: true 
        // }),
        // json(),
        common({
          include: 'node_modules/**', // 包括 
          exclude: [],  // 排除
          extensions: ['.js', '.ts']
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
        // replace({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        //      include: 'src/maths.js', // 指定可以使用变量的文件路径
        //      exclude: 'node_modules/**',
        //      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        //      HOST: JSON.stringify('http://111/111')
        // }),
    ],
    output: [{
        dir: path.resolve(__dirname, 'dist'),
        format: 'umd', // amd, cjs, es, iife, umd, system
        name: 'melotsdk',
        entryFileNames: '[name].umd.js', 
        chunkFileNames: '[name].umd.js',
        //compact: false,
        //extend: false,
        //sourcemap: false,
    },{
        dir: path.resolve(__dirname, 'dist'),
        format: 'cjs', // amd, cjs, es, iife, umd, system
        name: 'melotsdk',
        entryFileNames: '[name].cjs.js', 
        chunkFileNames: '[name].cjs.js',
        //compact: false,
        //extend: false,
        //sourcemap: false,
    },{
        dir: path.resolve(__dirname, 'dist'),
        format: 'es', // amd, cjs, es, iife, umd, system
        name: 'melotsdk',
        entryFileNames: '[name].es.js', 
        chunkFileNames: '[name].es.js',
        //compact: false,
        //extend: false,
        //sourcemap: false,
    }
    ]
}

const DEV_BUILD_CONFIG = {
    input: {
        index: path.resolve(__dirname, './src/index.js'),
    },
    plugins: [
        builtins(),
        resolve({
            mainFields: ['module', 'main'],
            browser: true, // 适配需要加载browser 模块的包
            //jsnext: true,  // 该属性是指定将Node包转换为ES2015模块
            // main 和 browser 属性将使插件决定将那些文件应用到bundle中
            //main: true,  // Default: true 
        }),
        json(),
        common({
          include: 'node_modules/**', // 包括 
          exclude: [],  // 排除
          extensions: ['.js', '.ts']
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        babel({
            exclude: 'node_modules/**' // 只转译我们的源代码
        }),
    ],
    output: [{
        dir: path.resolve(__dirname, 'dist'),
        format: 'umd', // amd, cjs, es, iife, umd, system
        name: 'melotsdk',
        entryFileNames: '[name].js', 
        chunkFileNames: '[name].js',
        // compact: false,
        // extend: false,
        // sourcemap: false,
    }
    ],
    treeshake: {
        moduleSideEffects: true
    },
}

const PROD_BUILD_TASK = {
    input: {
        index: path.resolve(__dirname, './src/index.js'),
    },
    plugins: [
        builtins(),
        resolve({
            mainFields: ['module', 'main'],
            browser: true, // 适配需要加载browser 模块的包
        }),
        
       
        json(),
        common({
            include: 'node_modules/**', // 包括 
            exclude: [],  // 排除
            extensions: ['.js', '.ts']
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        babel({
            exclude: 'node_modules/**' // 只转译我们的源代码
        }),
        terser({
            output: {
                comments: false
            },
            include: [/^.+\.js$/],
            exclude: ['node_moudles/**'],
            numWorkers: cpuNums,
            sourcemap: false
        }),
       
    ],
    output: {
        dir: path.resolve(__dirname, 'dist'),
        format: 'umd',
        name: 'melotsdk',
        entryFileNames: '[name].min.js', 
        chunkFileNames: '[name].min..js',
        compact: false,
        extend: false,
        sourcemap: false,
    },
    treeshake: {
        moduleSideEffects: true
    },
}
//NODEJS_BUILD_CONFIG,

export default [ DEV_BUILD_CONFIG, PROD_BUILD_TASK];