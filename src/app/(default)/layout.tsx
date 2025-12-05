import DefaultLayout from '@/layouts/default/layout';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return <DefaultLayout >{children}</DefaultLayout>;
}
