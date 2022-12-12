import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig(({ command, mode, ssrBuild }) => {
	// 获取环境变量
	const env = loadEnv(mode, resolve(__dirname, 'env'), 'VITE_APP_')
	
	return {
		envDir: 'env',
		envPrefix: 'VITE_APP_',
		base: env.VITE_APP_BASE_URL,
		publicDir: 'public',
		cacheDir: '.vite',
		clearScreen: false,
		plugins: [
			vue(),
			AutoImport({
				imports: [
					'vue',
					'vue-router',
				],
				dts: resolve(resolve(__dirname, 'dts'), 'auto-imports.d.ts'),
			}),
			Components({
				resolvers: [
					VantResolver()
				],
				dts: resolve(resolve(__dirname, 'dts'), 'components.d.ts'),
			}),
			VueSetupExtend()
		],
		resolve: {
			alias: {
				'@/': `${resolve(__dirname, 'src')}/`,
			},
			// 导入时想要省略的扩展名列表
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
		},
		// 开发服务器选项
		server: {
			host: '0.0.0.0',
			port: 9999,
			strictPort: false,
			https: false,
			open: false,
			cors: true,
			proxy: {
				[env.VITE_APP_BASE_API_URL]: {
					target: env.VITE_APP_BASE_PROXY_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(new RegExp("^\\" + env.VITE_APP_BASE_API_URL), '')
				}
			},
		},
		// 构建选项
		build: {
			// 设置最终构建的浏览器兼容目标。modules:支持原生 ES 模块的浏览器
			target: 'modules',
			// 打包输出目录
			outDir: env.VITE_APP_OUTDIR,
			// 构建后是否生成 source map 文件
			sourcemap: false,
			// 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
			brotliSize: true,
			// chunk 大小警告的限制（以 kbs 为单位）
			chunkSizeWarningLimit: 5000,
			// 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。（以 kbs 为单位）
			assetsInlineLimit: 4096,
			// 指定生成静态资源的存放路径（相对于 build.outDir）
			assetsDir: 'assets',
			// 自定义底层的 Rollup 打包配置
			rollupOptions: {
				// 打包资源拆分输出
				output: {
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
				}
			},
			// 混淆器，terser构建后文件体积更小 esbuild构建速度更快
			minify: 'terser',
			// 传递给 Terser 的更多 minify 选项
			terserOptions: {
				// 压缩选项
				compress: {
					drop_console: false,
					pure_funcs: ['console.log', 'console.info'],
					drop_debugger: true
				}
			},
		},
		// 预览选项
		preview: {
			host: '0.0.0.0',
			port: 9999,
			strictPort: true,
			https: false,
			open: false,
			cors: true,
			proxy: {
				[env.VITE_APP_BASE_API_URL]: {
					target: env.VITE_APP_BASE_PROXY_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(new RegExp("^\\" + env.VITE_APP_BASE_API_URL), '')
				}
			}
		},
		// 依赖优化选项
		optimizeDeps: {
			// 设置为 true 强制使依赖预构建
			force: true,
		}
	}
})