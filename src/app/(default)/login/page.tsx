import LoginForm from '@/components/auth/login-form';
import { Metadata } from 'next';
import Breadcrumb from "@/components/shared/breadcrumb";
import Container from "@/components/shared/container";

export const metadata: Metadata = {
  title: 'Sign In',
};

export default async function Page() {
    const backgroundBanner = '/assets/images/bg_auth.png';
  return (
    <div className={"bg-center"} style={{backgroundImage: `url(${backgroundBanner})`}}>
        <Container >
            <div className="pt-7 lg:pt-10 pb-10 blog-category">
                <Breadcrumb/>
                <div className="flex items-center justify-center">
                    <div className="w-full md:w-auto py-8 lg:py-20  drop-shadow-dropDown">
                        <LoginForm isPopup={false}/>
                    </div>
                </div>
            </div>
        </Container>
    </div>
  );
}
