import Home2Layout from '@/layouts/home2/layout';

export default async function DefaultLayout({children}: {children: React.ReactNode;})
{
  return <Home2Layout>{children}</Home2Layout>;
}
