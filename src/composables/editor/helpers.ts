export const generateHtml = (payload) => {
    return `
    <!Doctype HTML>
    <html>
        <head>
            <title>Webpage</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                ${payload.css}
            </style>
        </head>
        <body>
        ${payload.html}

        <script>
            ${payload.js}
        </script>
        </body>
    </html>`
}
