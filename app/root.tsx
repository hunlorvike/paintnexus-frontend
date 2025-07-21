import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import './app.css';
import { ThemeProvider } from '@/shared/context/theme-provider';
import i18n from '@/infrastructure/i18n/i18n';
import { I18nextProvider } from 'react-i18next';

export const links = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <Outlet />
      </ThemeProvider>
    </I18nextProvider>
  );
}
