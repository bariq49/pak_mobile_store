import Home8Layout from '@/layouts/home8/layout';

export default async function DefaultLayout({children}: {children: React.ReactNode;})
{
  return <Home8Layout>{children}</Home8Layout>;
}
