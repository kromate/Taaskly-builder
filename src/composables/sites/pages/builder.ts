import { useStorage } from '@vueuse/core'

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
    }

    return { mountedComponent, mountComponent, iframe_srcdoc }
}

const generateIframeSrcdoc = (array) => {
  // Sort the array based on the comp_pos key
  array.sort((a, b) => a.comp_pos - b.comp_pos)

  // Initialize the srcdoc string with a doctype
    let srcdoc = `<!DOCTYPE html><html><head>
   <script  src="https://cdn.tailwindcss.com"></script>
             <script  src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    `

  // Add each CSS to the srcdoc
  array.forEach((item) => {
    srcdoc += `<style>${item.hashed_code.css}</style>`
  })

  srcdoc += '</head><body>'

  // Add each HTML to the srcdoc
  array.forEach((item) => {
    srcdoc += item.hashed_code.html
  })

  // Add each JavaScript to the srcdoc
  array.forEach((item) => {
    srcdoc += `<script>${item.hashed_code.javascript}</script>`
  })

  srcdoc += '</body></html>'

  return srcdoc
}
