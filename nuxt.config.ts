import { fileURLToPath, URL } from 'node:url'
import eslintPlugin from 'vite-plugin-eslint'
import app from './app.config'

export default {
	ssr: false,
	target: 'static',

	alias: {
		'@': './src'
	},

	css: ['/src/assets/css/main.css'],
	components: [
		'@/components',
		{ path: '@/components/core', extensions: ['vue'] }
	],
	modules: ['@nuxtjs/tailwindcss'],

	build: {
		postcss: {
			postcssOptions: require('./postcss.config.js')
		}
	},
	dir: {
		layouts: './src/layouts',
		pages: './src/pages',
		middleware: './src/middleware'
	},
	tailwindcss: {
		cssPath: '@/assets/css/main.css'
	},
	vite: {
		plugins: [
			eslintPlugin({ useEslintrc: true })
		],
		server: {
			watch: {
				usePolling: true
			}
		},
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		}
	},
	app
}
