
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
    // Google Maps URL for Calle onda 22, Castellón, Spain
    // Coordinates: approximately 39.9864° N, -0.0513° W
    const selectedLocation = "https://www.google.com/maps/@39.9864,-0.0513,17z?entry=ttu";
    
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
                                    <p className="mb-1">Calle onda 22 Bajo</p>
                                    <p className="">Castellón 12006, Spain</p>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.5!2d-0.0513!3d39.9864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU5JzExLjAiTiAwwrAwMycwNC43Ilc!5e0!3m2!1sen!2ses!4v1234567890!5m2!1sen!2ses"
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
