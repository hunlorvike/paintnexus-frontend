import { Outlet } from 'react-router';

export default function EndUserLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">End User App</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-6 bg-background text-foreground">
        <Outlet />
      </main>
      <footer className="bg-secondary text-secondary-foreground p-4 text-center shadow-inner">
        <div className="container mx-auto">
          <p>&copy; 2024 End User App</p>
        </div>
      </footer>
    </div>
  );
}
