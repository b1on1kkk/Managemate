import LeftsideNavbar from "../components/LeftsideNavbar/LeftsideNavbar";

export default function LeftSideBlockLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LeftsideNavbar />

      {children}
    </>
  );
}
