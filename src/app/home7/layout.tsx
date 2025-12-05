import Home7Layout from '@/layouts/home7/layout';

export default async function DefaultLayout({children}: {children: React.ReactNode;})
{
  return <Home7Layout>{children}</Home7Layout>;
}
