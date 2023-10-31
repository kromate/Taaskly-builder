export const generateHash = (): string => {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  let hash = ''
  for (let i = 0; i < 7; i++) {
    if (i % 2 === 0) {
      hash += letters[Math.floor(Math.random() * letters.length)]
    } else {
      hash += Math.floor(Math.random() * 10)
    }
  }
  return hash
}

// export const hashedHTML_CSS_JS = (html, css, js, hash) => {
//    // Regular expression to match class names, id names and tag names in the HTML
//   const regex = /class="(.*?)"/g
//   const idRegex = /id="(.*?)"/g

//   // Replace class names, id names and tag names in the HTML
//   let newHtml = html.replace(idRegex, (match, idName) => {
//     return `id="${idName}_${hash}"`
//   })
// // .replace(regex, (match, className) => {
// //     let newClassNames = className.split(' ').map((name) => `${name}_${hash}`).join(' ')
// //     return `class="${newClassNames}"`
// //   })

//   // Regular expression to match class names, id names and tag names  in the CSS
//   const cssRegex = /\.([a-z0-9\-_]+)/gi
//   const cssIdRegex = /#([a-z0-9\-_]+)/gi
//   const cssTagRegex = /(\w+)(?=\s*{)/g

//   // Replace class names, id names and tag names in the CSS
//   let newCss = css

//   //   .replace(cssIdRegex, (match, idName) => {
//   //   return `#${idName}_${hash}`
//   // }).replace(cssTagRegex, (match, tagName) => {
//   //   return `${tagName}_${hash}`
//   // }).replace(cssRegex, (match, className) => {
//   //   return `.${className}_${hash}`
//   // })

//  const jsVarFuncRegex = /(var|const|let)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)/g

//     let names = [] as string[]
//   let newJs = js
//   // Replace variable and function names, hashed IDs and classes, and literal IDs in the JavaScript code
//  js.replace(jsVarFuncRegex, (match, declarationType, name) => {
//     names.push(name)
//   })

//  for (let name of names) {
//     let regex = new RegExp(`\\b${name}\\b`, 'g')
//     newJs = newJs.replace(regex, `${name}_${hash}`)
//  }

//   let dotVarHashRegex = new RegExp(`(\\.[a-zA-Z_$][0-9a-zA-Z_$]*)_${hash}`, 'g')

//   newJs = newJs.replace(dotVarHashRegex, (match, nameWithDot) => {
//     return nameWithDot // remove the _hash part from instances like  "element.style.transform" that get
//   })

//   console.log(newHtml, newCss, newJs)

//   return { newHtml, newCss, newJs }
// }

export const hashedHTML_CSS_JS = (html, css, js, hash) => {
  // Function to replace IDs and classes in the HTML and CSS with namespaced versions
  function namespaceCode(code, hash) {
    const replaceID = (id) => `${id.trim()}_${hash}`
    const replaceClass = (classAttr) => classAttr.replace(/\.(?!.*_)/g, `.${hash}_`)

    const htmlWithNamespaces = code.html.replace(/id="([^"]+)"/g, (match, id) => `id="${replaceID(id)}"`)
    const cssWithNamespaces = code.css.replace(/#([^,{}]+)/g, (match, id) => `#${replaceID(id)}`)
      // .replace(/(\.[^,{}]+)/g, (match, classAttr) => `.${hash}_${classAttr.slice(1)}`)
    // const cssWithNamespacedClasses = cssWithNamespaces.replace(/\.([^,{}]+)/g, (match, classAttr) => `.${replaceClass(classAttr)}`)

    // Hash the JavaScript code
    const jsVarFuncRegex = /(var|const|let)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)/g

    const names = [] as string[]
    let newJs = code.javascript

        newJs = newJs.replace(/#([^,{}]+)/g, (match, id) => `#${replaceID(id)}`)
      .replace(/(\W)document\.getElementById\(['"]([^'"]+)['"]\)/g, `$1document.getElementById('${replaceID('$2')}')`)
          .replace(/(\W)document\.querySelector\(['"]#([^'"]+)['"]\)/g, `$1document.querySelector('#${replaceID('$2')}')`)

    // Replace variable and function names, hashed IDs and classes, and literal IDs in the JavaScript code
    newJs.replace(jsVarFuncRegex, (match, declarationType, name) => {
      names.push(name)
    })

    for (const name of names) {
      const regex = new RegExp(`\\b${name}\\b`, 'g')
      if (!name.includes(hash)) {
        newJs = newJs.replace(regex, `${name}_${hash}`)
      }
    }

      const dotVarHashRegex = new RegExp(`(\\.[a-zA-Z_$][0-9a-zA-Z_$]*)_${hash}`, 'g')

  newJs = newJs.replace(dotVarHashRegex, (match, nameWithDot) => {
    return nameWithDot // remove the _hash part from instances like  "element.style.transform" that get
  })

    return {
      newHtml: htmlWithNamespaces,
      newCss: cssWithNamespaces,
      newJs
    }
  }

  return namespaceCode({ html, css, javascript: js }, hash)
}
