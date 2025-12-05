import Home10Layout from '@/layouts/home10/layout';

export default async function DefaultLayout({children}: {children: React.ReactNode;})
{
  return <Home10Layout>{children}</Home10Layout>;
}
