'use client';
import Container from '@/components/shared/container';
import {ROUTES} from "@/utils/routes";
import Link from "@/components/shared/link";

interface BannerProps {
    className?: string;
}


const BannerBackground: React.FC<BannerProps> = ({
                                                     className = 'mb-12 lg:mb-20 ',
                                                 }) => {
    const backgroundBanner = '/assets/images/bg_block.jpg';
    return (
        <div className={`${className} text-center text-brand-light bg-fixed bg-center lg:py-35 py-[100px]`}
             style={{backgroundImage: `url(${backgroundBanner})`}}>
            <Container>
                <div className={`flex flex-col`}>
                    <h4 className={"text-xl uppercase mb-5"}>Clearance Sales</h4>
                    <h2 className={"text-6xl uppercase mb-5"}>All Sales are Final!</h2>
                    <p className={"mb-20"}>Last chance to take advantage of our discounts!</p>
                    <p>
                        <Link
                            variant={"button-white"}
                            className={"inline-block sm:capitalize px-10 lg:px-15 xl:text-sm"}
                            href={ROUTES.HOME}
                        >
                            Discover Sale
                        </Link>
                    </p>
                    
                   
                </div>
            </Container>
        </div>
    );
};

export default BannerBackground;
