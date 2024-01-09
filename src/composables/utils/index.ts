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

type OptionalString = string | null;

const getHashedId = (id: string, hash: string): string => `${id.trim()}_${hash}`

const replaceHTMLIds = (htmlCode: OptionalString, hash: string): string => {
  // @ts-ignore
  return htmlCode.replace(
    /id="([^"']+)"|id='([^"']+)'/g,
    (match: string, id: string): string => {
      if (match.includes('\'')) {
        return match.replace(/'(.*?)'/, (match, id) => {
          return `"${getHashedId(id.trim(), hash)}"`
        })
      } else if (match.includes('"')) {
        return match.replace(/"(.*?)"/, (match, id) => {
          return `"${getHashedId(id.trim(), hash)}"`
        })
      } else {
        return id.trim()
      }
    }
  )
}

export const replaceCSSIds = (cssCode: OptionalString, hash: string) => {
  // @ts-ignore
  return cssCode.replace(/#([^,{}]+)/g, (match, id) => {
    const splitId = id.split(';')

    if (splitId[0].match(/^([0-9a-f]{3}|[0-9a-f]{6})$/i)) {
      return `#${id}`
    }

    return `#${getHashedId(id, hash)}`
  })
}

export const replaceJSIds = (jsCode: string, hash: string) => {
  const jsVarFuncRegex = /(var|const|let)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)/g

  const names = [] as string[]
  let newJs = jsCode

  newJs = newJs
    .replace(/#([a-zA-Z0-9_]+)/g, (match, id) => {
      return `#${getHashedId(id, hash)}`
    })
    .replace(
      /(\W)document\.getElementById\(['"]([^'"]+)['"]\)/g,
      `$1document.getElementById('${getHashedId('$2', hash)}')`
    )
    .replace(
      /(\W)document\.querySelector\(['"]#([^'"]+)['"]\)/g,
      `$1document.querySelector('#${getHashedId('$2', hash)}')`
    )

  // @ts-ignore
  newJs.replace(jsVarFuncRegex, (match, declarationType, name) => {
    names.push(name)
  })

  for (const name of names) {
    const regex = new RegExp(`\\b${name}\\b`, 'g')
    if (!name.includes(hash)) {
      newJs = newJs.replace(regex, `${name}_${hash}`)
    }
  }

  const dotVarHashRegex = new RegExp(
    `(\\.[a-zA-Z_$][0-9a-zA-Z_$]*)_${hash}`,
    'g'
  )

  newJs = newJs.replace(dotVarHashRegex, (match, nameWithDot) => {
    return nameWithDot
  })

  return newJs
}

export const hashedHTML_CSS_JS = (html: OptionalString, css: OptionalString, js: string, hash: string) => {
    const htmlWithNamespaces = replaceHTMLIds(html, hash)
    const cssWithNamespaces = replaceCSSIds(css, hash)
    const newJs = replaceJSIds(js, hash)

    return {
      html: htmlWithNamespaces,
      css: cssWithNamespaces,
      javascript: newJs
    }
  }
