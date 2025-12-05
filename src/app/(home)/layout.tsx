import HomeLayout from '@/layouts/home/layout';

export default async function DefaultLayout({children}: {children: React.ReactNode}) {
    return <HomeLayout >{children}</HomeLayout>;
}
