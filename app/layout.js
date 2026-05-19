import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '../components/ThemeProvider';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'ClearCut — AI Background Remover',
  description: 'Remove backgrounds from images instantly with AI. Free, fast, and pixel-perfect.',
  keywords: 'background remover, remove background, AI image editing, transparent background',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body className="noise antialiased">
        <ThemeProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(16px)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                boxShadow: 'var(--shadow)',
              },
              success: {
                iconTheme: { primary: '#00f5d4', secondary: 'transparent' },
              },
              error: {
                iconTheme: { primary: '#f15bb5', secondary: 'transparent' },
              },
            }}
          />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
