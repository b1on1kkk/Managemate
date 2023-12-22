import "./globals.css";

import ReduxProvider from "./redux/provider";

import LeftsideNavbar from "./components/LeftsideNavbar/LeftsideNavbar";
import Main from "./components/Main/Main";

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
          <Main>{children}</Main>
        </ReduxProvider>
      </body>
    </html>
  );
}
