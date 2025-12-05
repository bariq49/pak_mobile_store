import Home4Layout from '@/layouts/home4/layout';

export default async function DefaultLayout({children}: {children: React.ReactNode;})
{
  return <Home4Layout>{children}</Home4Layout>;
}
