import Home5Layout from '@/layouts/home5/layout';

export default async function DefaultLayout({children}: {children: React.ReactNode;})
{
  return <Home5Layout>{children}</Home5Layout>;
}
