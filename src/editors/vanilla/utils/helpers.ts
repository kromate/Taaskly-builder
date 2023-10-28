import { createGlobalState, useDark } from '@vueuse/core'

export const generateHTML = (
  payload: Record<string, any>,
  isDark?: boolean
) => {
  return `<html class="${isDark ? 'dark' : ''}">
        <head>
            <style id="_style">${payload.css}</style>
            <script type="module" id="_script">
                ${payload.javascript}

                window.addEventListener('message', function(event) {
                    console.log(event)
                    if (event.data === 'theme-dark') {
                        document.documentElement.classList.add('dark')
                    } else if (event.data === 'theme-light') {
                        document.documentElement.classList.remove('dark')
                    }
                })
            </script>
             <script src="https://cdn.tailwindcss.com"></script>
             <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
        </head>
        <body>
            ${payload.html}
        </body>
    </html`
}

export const useDarkGlobal = createGlobalState(() => useDark())

export const initialEditorValue = {
    html:
        `<main class="p-2">
<div id="card" 
class="p-4 bg-[#4f1ded] text-white rounded-lg shadow-xl border-2 cursor-pointer">
    Click to change card background color
</div>
</main>
`,
  javascript:
    `    const card = document.getElementById('card');
    function changeCardColor() {
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      card.style.backgroundColor = randomColor;
    }
    card.addEventListener('click', changeCardColor);`,
  css:
  `body{
    background-color: #211e25;
}
#card{
    user-select: none;
}`
}
