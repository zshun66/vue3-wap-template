# vue3-wap-template

#### 介绍
vue3.x + vite3.x + vur-router4.x + pinia2.x + postcss + vant4.x 构建的移动端H5项目模板



#### 软件架构(主要技术栈)

- [x] Vue3.x: 主要js框架✨
- [x] Vue-Router4.x: 基于Vue3.x版本的路由管理库✨
- [x] Pinia2.x: 基于Vue3.x版本的状态管理库✨
- [x] Vant4.x: 基于Vue3.x版本的移动端UI框架✨
- [x] postcss: 一些辅助插件✨
- [x] Vite3.x: 构建打包器✨



#### 模板功能

- [x] Vant组件自动按需导入
- [x] Vue、Vue-Router框架等API自动导入
- [x] vw 视口适配
- [x] 路由跳转动画
- [x] SVG 图标自动注册组件
- [x] 路由缓存方案
- [x] 多环境变量
- [x] setup 语法糖 name属性扩展
- [x] postcss嵌套语法
- [x] Axios 封装
- [x] 首屏加载动画
- [x] 苹果底部安全区适配
- [x] 打包资源 gzip 压缩
- [x] 图片资源压缩
- [x] 自动添加浏览器前缀
- [x] 项目打包统计分析
- [x] 移动端开发调试工具
- [x] 项目资源路径 alias 别名
- [x] vue-i18n国际化方案集成
- [ ] 主题切换
- [x] 鉴别并拦截重复请求



#### 安装教程

```js
# 克隆项目
git clone https://gitee.com/zshun66/vue3-wap-template.git

# 进入项目目录
cd vue3-wap-template

# 安装依赖
npm install

# 启动服务
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



#### 插件集成

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

缺陷：无法处理多设计图尺寸问题，比如Vant设计图尺寸为375，而自己项目的原型图尺寸为750，替代品cnjm-postcss-px-to-viewport

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



##### cnjm-postcss-px-to-viewport

插件介绍：基于postcss-px-to-viewport稍加修改而来，解决多设计图尺寸问题

GitHub：[https://github.com/cnjm/postcss-px-to-viewport](https://github.com/cnjm/postcss-px-to-viewport)

安装配置：

1、安装依赖包

```js
npm install cnjm-postcss-px-to-viewport -D
```

2、在`vite.config.js`中配置

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import cnjmpostcsspxtoviewport from 'cnjm-postcss-px-to-viewport'

export default defineConfig(({ command, mode, ssrBuild }) => {
	return {
		plugins: [
			vue(),
		],
        css: {
			postcss: {
				plugins: [
					cnjmpostcsspxtoviewport({
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
						landscapeWidth: 568,
                        // 这个自定义的方法是针对处理vant组件下的设计稿为375问题
						customFun: ({ file }) => {
							const designWidth = path.join(file).includes(path.join('node_modules', 'vant')) ? 375 : 750
							return designWidth
						}
					})
				]
			}
		},
    }
})
```



##### postcss-nested

插件介绍：支持css嵌套规则插件。

GitHub：[https://github.com/postcss/postcss-nested](https://github.com/postcss/postcss-nested)

安装配置：

1、安装依赖包

```js
cnpm install postcss-nested -D
```

2、在`vite.config.js`中配置

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssnested from 'postcss-nested'

export default defineConfig(({ command, mode, ssrBuild }) => {
	return {
		plugins: [
			vue(),
		],
        css: {
			postcss: {
				plugins: [
                    postcssnested()
                ]
            }
        }
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



##### vite-plugin-eruda

插件介绍：移动端调试工具，一般用于开发环境中。

GitHub：[https://github.com/wuxiuran/vite-plugin-eruda](https://github.com/wuxiuran/vite-plugin-eruda)

安装配置：

1、安装依赖包

```js
npm install vite-plugin-eruda -D
```

2、在`vite.config.js`中配置

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eruda from 'vite-plugin-eruda'

export default defineConfig(({ command, mode, ssrBuild }) => {
	return {
		plugins: [
			vue(),
            eruda({
				debug: env.VITE_APP_ENV !== 'production'
			})
		],
    }
})
```



##### vite-plugin-imagemin

插件介绍：一个压缩图片资源的 vite 插件。

GitHub：[https://github.com/vbenjs/vite-plugin-imagemin](https://github.com/vbenjs/vite-plugin-imagemin)

安装配置：

1、安装依赖包

```js
cnpm install vite-plugin-imagemin -D
```

2、在`vite.config.js`中配置

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig(({ command, mode, ssrBuild }) => {
	return {
		plugins: [
			vue(),
            viteImagemin({
				optipng: {
					optimizationLevel: 8,
				},
				pngquant: {
					quality: [0.8, 0.9],
					speed: 4,
				},
				mozjpeg: {
					quality: 80,
				},
			}),
		],
    }
})
```



##### vite-plugin-style-import

插件介绍：一个组件样式按需导入插件。

GitHub：[https://github.com/vbenjs/vite-plugin-style-import/blob/main/README.zh_CN.md](https://github.com/vbenjs/vite-plugin-style-import/blob/main/README.zh_CN.md)

安装配置：

1、安装依赖包

```js
cnpm install vite-plugin-style-import -D
cnpm install consola -D
```

2、在`vite.config.js`中配置

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import'

export default defineConfig(({ command, mode, ssrBuild }) => {
	return {
		plugins: [
			vue(),
            createStyleImportPlugin({
				resolves: [
					VantResolve(),
				]
			}),
		],
    }
})
```



##### vite-plugin-svg-icons

插件介绍：用于生成 svg 雪碧图。

GitHub：[https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md](https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md)

安装配置：

1、安装依赖包

```js
cnpm install vite-plugin-svg-icons -D
```

2、在`vite.config.js`中配置

```js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig(({ command, mode, ssrBuild }) => {
	return {
		plugins: [
			vue(),
            createSvgIconsPlugin({
				iconDirs: [resolve(__dirname, 'src/assets/icons/svg')],
				symbolId: 'icon-[dir]-[name]'
			}),
		],
    }
})
```



#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

