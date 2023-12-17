import "./globals.css";

import LeftsideNavbar from "./components/LeftsideNavbar/LeftsideNavbar";
import Main from "./components/Main/Main";

import ReduxProvider from "./redux/provider";

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
