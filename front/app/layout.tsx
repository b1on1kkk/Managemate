import "./globals.css";

import LeftSideBlockLayout from "./(LeftSideBlock)/layout";
import Header from "./components/Header/Header";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LeftSideBlockLayout>
          <main className="pl-25 flex h-full">
            <aside className="h-full w-80 flex flex-col border-r-1 bg-white">
              Projects
            </aside>
            <main className="flex flex-col flex-1">
              <Header />
              <main className="flex-1 overflow-auto">{children}</main>
            </main>
          </main>
        </LeftSideBlockLayout>
      </body>
    </html>
  );
}
