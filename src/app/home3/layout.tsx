import Home3Layout from '@/layouts/home3/layout';

export default async function DefaultLayout({children}: {children: React.ReactNode;})
{
  return <Home3Layout>{children}</Home3Layout>;
}
