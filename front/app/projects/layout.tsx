import MainLeftAsideMenu from "../components/MainLeftAsideMenu/MainLeftAsideMenu";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainLeftAsideMenu />
      {children}
    </>
  );
}
