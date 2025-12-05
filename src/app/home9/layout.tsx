import Home9Layout from '@/layouts/home9/layout';

export default async function DefaultLayout({children}: {children: React.ReactNode;})
{
  return <Home9Layout>{children}</Home9Layout>;
}
