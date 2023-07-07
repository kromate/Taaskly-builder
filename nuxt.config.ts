
import app from './app.config'
import vite from './vite_nuxt.config'

export default {
	ssr: false,
	target: 'static',

	alias: {
		'@': './src'
	},

	css: ['/src/assets/css/main.scss'],
	components: [
		'@/components',
		{ path: '@/components/core', extensions: ['vue'] }
	],
	modules: ['@nuxtjs/tailwindcss', 'nuxt-monaco-editor'],

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
		cssPath: '@/assets/css/main.scss'
	},

	vite,
	app
}
