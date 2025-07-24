import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import './app.css';
import { ThemeProvider } from '@/shared/context/theme-provider';
import i18n from '@/infrastructure/i18n/i18n';
import { I18nextProvider } from 'react-i18next';
import type { Route } from './+types/root';

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

export const meta = () => {
  return [
    { charset: 'utf-8' },
    { title: 'PaintNexus - Giải pháp Sơn toàn diện' },
    { name: 'viewport', content: 'width=device-width,initial-scale=1' },
    {
      name: 'description',
      content:
        'Ứng dụng giúp ước tính lượng sơn, quản lý dự án và tối ưu hóa chi phí sơn.',
    },
    { property: 'og:title', content: 'PaintNexus' },
    {
      property: 'og:description',
      content: 'Giải pháp Sơn toàn diện cho mọi công trình.',
    },
    {
      property: 'og:image',
      content: 'https://sondaiminh.com/images/og-image.jpg',
    },
    { property: 'og:url', content: 'https://sondaiminh.com' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'PaintNexus' },
    {
      name: 'twitter:description',
      content: 'Giải pháp Sơn toàn diện cho mọi công trình.',
    },
    {
      name: 'twitter:image',
      content: 'https://sondaiminh.com/images/twitter-image.jpg',
    },
  ];
};

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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
