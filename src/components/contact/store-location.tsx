
import Container from "@/components/shared/container";
import Heading from "@/components/shared/heading";
import Map from "@/components/shared/map";
import Link from "@/components/shared/link";
import getLocation from "@/utils/get-location";

interface Props {
    useStore?: boolean;
    height?:string;

}

export default function StoreLocation({
                                          useStore = true,height="420px"
                                      }: React.PropsWithChildren<Props>) {
    // Get URL from Google Maps URL
    const selectedLocation = "https://www.google.com/maps/@-37.7603734,144.7878172,17z?entry=ttu&g_ep=EgoyMDI1MDQyMi4wIKXMDSoJLDEwMjExNjM5SAFQAw%3D%3D";
    
    return (
        <div className="relative w-full overflow-hidden">
            {/* Store popup */}
            {useStore && (
                <Container>
                    <div className={'relative'}>
                        <div className="absolute top-1/2 translate-y-1/2  left-0 transform   z-10">
                            <div className="rounded p-5 lg:p-8   w-full  lg:w-[380px] shadow-xl bg-brand-light">
                                <h3 className="text-sm  font-normal">OUR STORES</h3>
                                <div className="py-2 text-15px">
                                    <Heading variant="titleMedium" className="mb-3">Visit Our Store</Heading>
                                    <p className="mb-1"> 123 Widget Street Acmeville.</p>
                                    <p className=""> AC 12345 United States of America</p>
                                </div>
                                <div className="pt-0 ">
                                    <Link href={'#'} className={"text-sm"} variant={'base'} >
                                        SEE MORE ABOUT
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            )}
            
            {/* GMap  */}
            <iframe
                src={getLocation(selectedLocation)}
                width="100%"
                height={height}
                style={{border: 0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full "
            />
            
        </div>
    )
}
