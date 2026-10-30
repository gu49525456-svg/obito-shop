export const metadata = {
  title: 'OBITO SHOP',
  description: 'Game account sales, spins, and top-ups',
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
          body { background-color: #0f172a; color: #f8fafc; min-height: 100vh; }
          input, button { font-family: inherit; }
          button { cursor: pointer; }
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
