import { fileURLToPath, URL } from 'node:url'
import { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'
import eslintPlugin from 'vite-plugin-eslint'

const genStub: Plugin = {
  name: 'gen-stub',
  apply: 'build',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'ssr-stub.js',
      source: 'module.exports = {}'
    })
  }
}

export default {
  vue: {
    script: {
        defineModel: true
      }
  },
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
  plugins: [
    eslintPlugin({ useEslintrc: true })
  ],

  resolve: {
    alias: {
      path: 'path-browserify',
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
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
  }
}
