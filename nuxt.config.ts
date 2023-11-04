import { fileURLToPath, URL } from 'node:url'
import eslintPlugin from 'vite-plugin-eslint'
import replace from '@rollup/plugin-replace'
import app from './app.config'

export default {
	ssr: false,
	// target: 'static',
	routeRules: {
		'/': { ssr: true }
	},
	alias: {
		'@': './src'
	},
	macros: {
		setupSFC: true
	},
	typescript: {
		tsConfig: {
			vueCompilerOptions: {
				target: 3.3
			}
		}
	},
	devtools: {
		enabled: true
	},
	experimental: {
		payloadExtraction: false,
		inlineSSRStyles: false,
		renderJsonPayloads: true
	},

	css: ['/src/assets/css/main.scss'],
	components: [
		'@/components',
		{ path: '@/components/core', extensions: ['vue'] }
	],
	modules: ['@nuxtjs/tailwindcss'],

	dir: {
		layouts: './src/layouts',
		pages: './src/pages',
		middleware: './src/middleware'
	},
	tailwindcss: {
		cssPath: '@/assets/css/main.scss'
	},
	nitro: {
		esbuild: {
			options: {
				target: 'esnext'
			}
		},
		prerender: {
			crawlLinks: true
		}

	},
	vite: {
		vue: {
            script: {
                defineModel: true,
                propsDestructure: true
            }
        },
		define: {
			'process.env.VSCODE_TEXTMATE_DEBUG': 'false',
			'process.test': 'false'
		},
		worker: {
			format: 'es',
			plugins: [
				replace({
					preventAssignment: true,
					values: {
						'process.env.NODE_ENV': JSON.stringify('production')
					}
				})
			]
		},
		build: {
			target: 'esnext'
		},
		plugins: [
			eslintPlugin({ useEslintrc: true, exclude: ['**/node_modules/**', 'external_packages/**', 'src/editors/vue/monaco/prettier-html.js'] })
		],
		optimizeDeps: {
			include: [
				'path-browserify',
				'onigasm',
				'typescript',
				'@vue/language-service',
				'monaco-editor-core/esm/vs/editor/editor.worker',
				'@volar/monaco/worker',
				'vue/server-renderer'
			]
		},
		server: {
			watch: {
				usePolling: true
			}
		},
		resolve: {
			alias: {
				path: 'path-browserify',
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		}
	},
	app
}
