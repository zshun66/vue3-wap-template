# vue3-wap-template

#### 介绍
vue3.x + vite3.x + vur-router4.x + pinia2.x + postcss + vant4.x 构建的移动端项目模板



#### 软件架构(主要技术栈)

- [x] Vue3.x: 主要js框架✨
- [x] Vue-Router4.x: 基于Vue3.x版本的路由管理库✨
- [x] Pinia2.x: 基于Vue3.x版本的状态管理库✨
- [x] Vant4.x: 基于Vue3.x版本的移动端UI框架✨
- [x] postcss: 一些辅助插件✨
- [x] Vite3.x: 构建打包器✨



#### 模板功能

- [x] Vant组件自动按需导入✨
- [x] Vue、Vue-Router框架等API自动导入✨

- [x] vw 视口适配✨
- [x] 多环境变量
- [ ] SVG 图标自动注册组件
- [x] setup 语法糖 name属性扩展

- [ ] Axios 封装

- [x] 打包资源 gzip 压缩
- [x] 自动添加浏览器前缀
- [x] 项目打包统计分析

- [ ] 首屏加载动画

- [ ] hooks
- [x]  项目资源路径 alias 别名



#### 安装教程

```js
# 克隆项目
git clone https://gitee.com/zshun66/vue3-wap-template.git

# 进入项目目录
cd vue3-h5-template

# 安装依赖
yarn
# OR
npm install

# 启动服务
yarn serve
# OR
npm run serve:dev
```



#### 使用说明

##### 1、启动项目

```js
// 启动开发环境
npm run serve:dev

// 启动模拟环境
npm run serve:sim

// 启动生产环境
npm run serve:prod
```

##### 2、打包项目

```js
// 打包开发环境
npm run build:dev

// 打包模拟环境
npm run build:sim

// 打包生产环境
npm run build:prod
```



#### 插件说明

##### unplugin-vue-components

插件介绍：自动按需导入Vant组件

GitHub：[https://github.com/antfu/unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)

安装配置：

1、安装依赖包

```js
npm install unplugin-vue-components -D
```

2、在项目根目录新建`dts`文件夹，用于存放生成的`.d.ts`文件

3、在`vite.config.js`中配置

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ command, mode, ssrBuild }) => {
	return {
		plugins: [
			vue(),
			Components({
				resolvers: [
					VantResolver()
				],
				dts: resolve(resolve(__dirname, 'dts'), 'components.d.ts'),
			}),
		],
    }
})
```



##### unplugin-auto-import

插件介绍：自动导入框架API(例如：Vue3中的ref、reactive；Vue-Router4中的useRoute、useRouter等)

GitHub：[https://github.com/antfu/unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

安装配置：

1、安装依赖包

```js
npm install unplugin-auto-import -D
```

2、在项目根目录新建`dts`文件夹，用于存放生成的`.d.ts`文件

3、在`vite.config.js`中配置

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig(({ command, mode, ssrBuild }) => {
	return {
		plugins: [
			vue(),
			AutoImport({
				imports: [
					'vue',
					'vue-router',
				],
				dts: resolve(resolve(__dirname, 'dts'), 'auto-imports.d.ts'),
			}),
		],
    }
})
```



##### vite-plugin-vue-setup-extend

插件介绍：可在Vue3`<script setup>`语法糖中定义组件`name`选项，例如`<script setup name="Tabbar">`

GitHub：[https://github.com/vbenjs/vite-plugin-vue-setup-extend](https://github.com/vbenjs/vite-plugin-vue-setup-extend)

安装配置：

1、安装依赖包

```js
npm install vite-plugin-vue-setup-extend -D
```

2、在`vite.config.js`中配置

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig(({ command, mode, ssrBuild }) => {
	return {
		plugins: [
			vue(),
			VueSetupExtend()
		],
    }
})
```



##### vite-plugin-compression

插件介绍：文件压缩插件、开启gzip压缩

GitHub：[https://github.com/vbenjs/vite-plugin-compression/blob/main/README.zh_CN.md](https://github.com/vbenjs/vite-plugin-compression/blob/main/README.zh_CN.md)

安装配置：

1、安装依赖包

```js
npm install vite-plugin-compression -D
```

2、在`vite.config.js`中配置

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import compressPlugin from 'vite-plugin-compression'

export default defineConfig(({ command, mode, ssrBuild }) => {
	return {
		plugins: [
			vue(),
			compressPlugin({
				ext: '.gz', // 压缩文件扩展名
				deleteOriginFile: false, // 是否删除原文件
			}),
		],
    }
})
```



##### postcss-preset-env

插件介绍：自动添加浏览器前缀，例如`user-select: none;`，会自动添加`-webkit-user-select: none;-moz-user-select: none;`

GitHub：[https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#readme](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env#readme)

安装配置：

1、安装依赖包

```js
npm install postcss-preset-env -D
```

2、在`vite.config.js`中配置

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcsspresetenv from 'postcss-preset-env'

export default defineConfig(({ command, mode, ssrBuild }) => {
	return {
		plugins: [
			vue(),
		],
        css: {
			postcss: {
				plugins: [
					postcsspresetenv(),
				]
			}
		},
    }
})
```



##### postcss-px-to-viewport

插件介绍：移动端vw适配方案，将px单位转换为vw单位

GitHub：[https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md](https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md)

安装配置：

1、安装依赖包

```js
npm install postcss-px-to-viewport -D
```

2、在`vite.config.js`中配置

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcsspxtoviewport from 'postcss-px-to-viewport'

export default defineConfig(({ command, mode, ssrBuild }) => {
	return {
		plugins: [
			vue(),
		],
        css: {
			postcss: {
				plugins: [
					postcsspxtoviewport({
						unitToConvert: 'px', // 需要转换的单位
						viewportWidth: 375, // UI设计稿的宽度
						unitPrecision: 6, // 转换后的精度，即小数点位数
						propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
						viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
						fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
						selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名
						minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
						mediaQuery: false, // 否在媒体查询的css代码中也进行转换，默认false
						replace: false, // 是否转换后直接更换属性值
						exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
						include: undefined,
						landscape: false, // 是否处理横屏设备
						landscapeUnit: 'vw',
						landscapeWidth: 568
					})
				]
			}
		},
    }
})
```



##### rollup-plugin-visualizer

插件介绍：打包后的视图文件，会生成一个stats.html统计分析文件

GitHub：[https://github.com/btd/rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)

安装配置：

1、安装依赖包

```js
npm install rollup-plugin-visualizer -D
```

2、在`vite.config.js`中配置

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ command, mode, ssrBuild }) => {
	return {
		plugins: [
			vue(),
            visualizer({
				open: true,
				gzipSize: true,
				brotliSize: true
			})
		],
    }
})
```



#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

