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

export const hashedHTML_CSS_JS = (html, css, javascript, hash) => {
  // Function to replace IDs and classes in the HTML and CSS with namespaced versions
  function namespaceCode(code, hash) {
    const replaceID = (id) => `${id.trim()}_${hash}`
    const replaceClass = (classAttr) => classAttr.replace(/\.(?!.*_)/g, `.${hash}_`)

    const htmlWithNamespaces = code.html.replace(/id="([^"]+)"/g, (match, id) => `id="${replaceID(id)}"`)
    const cssWithNamespaces = code.css.replace(/#([^,{}]+)/g, (match, id) => `#${replaceID(id)}`)
    const jsVarFuncRegex = /(var|const|let)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)/g

    const names = [] as string[]
    console.log(code)
    let newJs = code.javascript

        newJs = newJs.replace(/#([^,{}]+)/g, (match, id) => `#${replaceID(id)}`)
      .replace(/(\W)document\.getElementById\(['"]([^'"]+)['"]\)/g, `$1document.getElementById('${replaceID('$2')}')`)
          .replace(/(\W)document\.querySelector\(['"]#([^'"]+)['"]\)/g, `$1document.querySelector('#${replaceID('$2')}')`)

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
      html: htmlWithNamespaces,
      css: cssWithNamespaces,
      javascript: newJs
    }
  }

  return namespaceCode({ html, css, javascript }, hash)
}
