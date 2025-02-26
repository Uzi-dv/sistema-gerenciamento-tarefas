import 'bootstrap/dist/css/bootstrap.min.css';
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
