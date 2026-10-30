export const metadata = {
  title: 'OBITO SHOP',
  description: 'Game account sales, spins, and top-ups',
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body className="bg-slate-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
