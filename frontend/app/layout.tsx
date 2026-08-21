import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';

export const metadata: Metadata = {
  title: 'TaskFlow — Task Management',
  description: 'A clean, fast task manager built for the full-stack assessment.',
};

/**
 * Prevents the "flash of wrong theme" on reload: this tiny script runs
 * before React hydrates and before first paint, reading the persisted
 * theme straight from localStorage and setting it on <html>. ThemeProvider
 * then takes over for all subsequent toggles.
 */
const noFlashScript = `
  (function () {
    try {
      var storedTheme = localStorage.getItem('taskflow-theme');
      var theme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var accent = localStorage.getItem('taskflow-accent') || 'blue';
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-accent', accent);
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>{children}</ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
