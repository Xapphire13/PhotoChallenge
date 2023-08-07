import CenterLayout from "../layouts/CenterLayout";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CenterLayout>{children}</CenterLayout>;
}
