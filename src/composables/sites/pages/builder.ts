import { useStorage } from '@vueuse/core'
import { useAlert } from '@/composables/core/notification'

// const mountedComponent = useStorage('mountedComponent', [])
const mountedComponent = ref([] as Record<string, any>)
const iframe_srcdoc = ref('')

export const iframe_content = useStorage('iframe_content', '')

export const useMountComponent = () => {
  const mountComponent = (component: any) => {
  const clone_comp = JSON.parse(JSON.stringify(component))
    delete clone_comp.img_obj
    clone_comp.comp_pos = mountedComponent.value.length
    mountedComponent.value.push(clone_comp)
    iframe_srcdoc.value = generateIframeSrcdoc(mountedComponent.value)
    useAlert().openAlert({ type: 'SUCCESS', msg: 'Component added to Board' })
    setTimeout(() => {
        preview(false)
    }, 1000)
  }

  const loadCompArray = (compArray: any) => {
    mountedComponent.value = compArray
    iframe_srcdoc.value = generateIframeSrcdoc(mountedComponent.value)
  }

  const unMountComponent = (comp_pos: number) => {
    mountedComponent.value.splice(comp_pos, 1)
    iframe_srcdoc.value = generateIframeSrcdoc(mountedComponent.value)
  }

  return { mountedComponent, mountComponent, iframe_srcdoc, preview, loadCompArray, unMountComponent }
}

const generateIframeSrcdoc = (array) => {
  array.sort((a, b) => a.comp_pos - b.comp_pos)

  let srcdoc = `<!DOCTYPE html><html><head>
   <script  src="https://cdn.tailwindcss.com"></script>
             <script  src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    `

  array.forEach((item) => { srcdoc += `<style>${item.hashed_code.css}</style>` })

  srcdoc += '</head><body>'

  array.forEach((item) => { srcdoc += item.hashed_code.html })
  array.forEach((item) => { srcdoc += `<script type="module">${item.hashed_code.javascript}</script>` })

  srcdoc += '</body></html>'

  return srcdoc
}

const preview = (openTab = true) => {
  const iframe = document.querySelector('iframe')
  const iframeDocument = iframe?.contentDocument || iframe?.contentWindow?.document

  if (!iframeDocument || !iframeDocument.documentElement) {
    console.error('Could not access iframe content')
    return
  }

  const iframeHTML = iframeDocument.documentElement.outerHTML
  iframe_content.value = iframeHTML

  if (openTab) {
    const fullPath = useRoute().fullPath.split('?')[0]
  window.open(`${fullPath}/preview`, '_blank')
  }
}
