// Default Template Renderer for all HTML
const template = ({ title, body, data }) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <base href="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css?family=Hind:300,400,600|Montserrat:400,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Lobster&amp;subset=all" rel="stylesheet" type="text/css"/>
      </head>
      <body>
        <div id="root">${body}</div>
        <script id="preloaded" type="application/json">${data}</script>
        <script src="/client/client.js"></script>
      </body>
    </html>
  `;

  // Trims all whitespace so that react server side rendering won't complain
  return html;
}

export default template;
