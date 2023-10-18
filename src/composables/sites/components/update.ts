import { updateFirestoreSubDocument } from '@/firebase/firestore'
import { useAlert } from '@/composables/core/useNotification'

type TComponentData = {
    props: Record<string, any>,
    serializedState: string,
    code: string,
    compiled_js: string,
    compiled_css: string,
}

const parsePropsString = (propsString: string): { [key: string]: { type: string; default: string } } => {
  // Remove unnecessary spaces and newlines
  propsString = propsString.replace(/\s/g, '')

  // Create a regular expression to match property definitions
  const propRegex = /(\w+):\{type:(\w+),default:'([^']+)'\}/g

  const propsObject: { [key: string]: { type: string; default: string } } = {}

  let match
  while ((match = propRegex.exec(propsString))) {
    const [, propName, propType, propDefault] = match
    propsObject[propName] = { type: propType, default: propDefault }
  }

  return propsObject
}

export const getPropsFromString = (sourceCode: string): Record<string, any> => {
  const startIndex = sourceCode.indexOf('props: {')
if (startIndex !== -1) {
  let count = 1 // Count the opening brace '{'
  let endIndex = startIndex + 8 // Start from the position after "props: {"

  while (count > 0 && endIndex < sourceCode.length) {
    if (sourceCode[endIndex] === '{') {
      count++
    } else if (sourceCode[endIndex] === '}') {
      count--
    }
    endIndex++
  }

  if (count === 0) {
    const propsObject = sourceCode.slice(startIndex, endIndex)
      return (parsePropsString(propsObject))
  } else {
      return {}
  }
} else {
  return {}
}
}

export const useUpdateComponent = () => {
    const updateCompLoading = ref(false)
    const updateComponent = async (siteId: string, compId: string, data: TComponentData) => {
        updateCompLoading.value = true
      try {
        console.log(data.props)

        if (Object.keys(data.props).length > 0) {
          Object.keys(data.props).forEach((key) => {
            if (typeof data.props[key] !== 'object' || !data.props[key].type) {
              console.log('Error: props must be an object with type')
              useAlert().openAlert({ type: 'ERROR', msg: 'Error: props must be an object with type' })
            }
          })
        }

            await updateFirestoreSubDocument('sites', siteId, 'components', compId, data)
            useAlert().openAlert({ type: 'Alert', msg: 'saved' })
            updateCompLoading.value = false
        } catch (e: any) {
            updateCompLoading.value = false
            useAlert().openAlert({ type: 'ERROR', msg: `Error: ${e.message}` })
        }
    }

    return { updateComponent, updateCompLoading }
}
