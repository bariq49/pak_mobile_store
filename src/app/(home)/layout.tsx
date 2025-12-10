import ModernLayout from "@/layouts/default/layout";

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModernLayout>{children}</ModernLayout>;
}
