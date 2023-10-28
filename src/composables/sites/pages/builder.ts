import { useStorage } from '@vueuse/core'

// const mountedComponent = useStorage('mountedComponent', [])
const mountedComponent = ref([] as Record<string, any>)

export const useMountComponent = () => {
    const mountComponent = (component: any) => {
        delete component.img_obj
        mountedComponent.value.push(component)
    }

    return { mountedComponent, mountComponent }
}