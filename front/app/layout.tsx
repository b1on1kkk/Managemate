import "./globals.css";

import Header from "./components/Header/Header";
import ReduxProvider from "./redux/provider";

import LeftsideNavbar from "./components/LeftsideNavbar/LeftsideNavbar";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <LeftsideNavbar />
          <main className="pl-16 flex h-full z-10 relative">
            <div className="flex flex-col flex-1">
              <Header />
              <div className="flex-1 overflow-auto bg-gray-100 flex">
                {children}
              </div>
            </div>
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
