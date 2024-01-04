import { useStorage } from '@vueuse/core'
import { useBuilderModal } from '@/composables/core/modals'
import { generateHash, hashedHTML_CSS_JS } from '@/composables/utils/index'
import { useAlert } from '@/composables/core/notification'

// Assuming import statements are already present
export const usedHashedHTML_CSS_JS = useStorage('usedHashedHTML_CSS_JS', `${hashedHTML_CSS_JS}`)

export const generateTestIframeSrcdoc = (component) => {
  console.log(usedHashedHTML_CSS_JS.value)
  const hash1 = generateHash()
  const hash2 = generateHash()
  let hashedFunction
  try {
    // eslint-disable-next-line no-new-func
    hashedFunction = new Function('return ' + usedHashedHTML_CSS_JS.value)()
    console.log(hashedFunction)
  } catch (error) {
    console.error('Error creating function from string:', error)
    throw new Error('Failed to create hashed function from stored string.')
  }

  const hashedComponent1 = hashedFunction(component.html, component.css, component.js, hash1)
  const hashedComponent2 = hashedFunction(component.html, component.css, component.js, hash2)

  const errorHandlingScript = `
    <script>
      window.onerror = function(message, source, lineno, colno, error) {
        parent.postMessage({ action: 'test_iframe_error', error: {message, source, lineno, colno, error} }, '*');
      };
      window.addEventListener('unhandledrejection', event => {
        parent.postMessage({ action: 'test_iframe_unhandledrejection', reason: event.reason }, '*');
      });
    </script>`

  let srcdoc = `<!DOCTYPE html><html><head>
   <script src="https://cdn.tailwindcss.com"></script>
   <style>${hashedComponent1.css}</style>
   <style>${hashedComponent2.css}</style>
   ${errorHandlingScript}
   </head><body>
   ${hashedComponent1.html}
   ${hashedComponent2.html}
   <script type="module">${hashedComponent1.js}</script>
   <script type="module">${hashedComponent2.js}</script>
   </body></html>`

  return srcdoc
}

export const listenToTestIframeMessages = () => {
  window.addEventListener('message', (event) => {
    if (event.data.action === 'test_iframe_error') {
      console.error('Test Iframe Error:', event.data.error)
    } else if (event.data.action === 'test_iframe_unhandledrejection') {
      console.error('Test Iframe Unhandled Rejection:', event.data.reason)
    }
  })
}

export const updateUsedHashedHTML_CSS_JS = (newFunctionString) => {
  // More robust validation needed here as per your application's requirements
  const isValidFunction = /^\(\s*html\s*,\s*css\s*,\s*js\s*,\s*hash\s*\)\s*=>/.test(newFunctionString)

  if (!isValidFunction) {
    useAlert().openAlert({ type: 'ERROR', msg: 'Provided string does not match the required function signature.' })
    throw new Error('Provided string does not match the required function signature.')
  }

  try {
    // eslint-disable-next-line no-new-func
    const newFunction = new Function('return ' + newFunctionString)()

    // Test the function with dummy arguments to ensure it returns the expected object
    const testResult = newFunction('', '', '', '')
    if (!testResult || typeof testResult !== 'object' || !('html' in testResult && 'css' in testResult && 'js' in testResult)) {
        useAlert().openAlert({ type: 'ERROR', msg: 'Function does not return the expected object structure.' })
      throw new Error('Function does not return the expected object structure.')
    }

    usedHashedHTML_CSS_JS.value = newFunctionString // Update the reactive variable

    useBuilderModal().closeUpdateHash()
    useAlert().openAlert({ type: 'SUCCESS', msg: 'Hashed function updated successfully.' })
  } catch (error) {
        useAlert().openAlert({ type: 'ERROR', msg: 'Function does not return the expected object structure.' })
    throw new Error('Provided string is not valid js or does not return the expected object structure.')
  }
}
