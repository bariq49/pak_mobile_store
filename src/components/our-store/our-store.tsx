import cn from "classnames";
import Link from "@/components/shared/link";
import Image from "@/components/shared/image";
import {productPlaceholder} from "@/assets/placeholders";
import {StoreType} from "@/services/types";
import Heading from "@/components/shared/heading";

interface storesProps {
    data?: any;
    className?: string;
}

const OurStores: React.FC<storesProps> = ({
        data,
        className ,
    }) => {

    return (
        <div
            className={cn(
                className,
                'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 md:gap-5'
            )}
        >
            {data?.map((item: StoreType) => {
                const {id, name, image, address, phoneNumber, openTime, location} = item ?? {};
                const htmlLocation = openTime
                    ? {
                        dangerouslySetInnerHTML: { __html: openTime },
                    }
                    : {};

                return (
                    <article
                        key={`categories--key-${id}`}
                        className={cn(
                            'bg-white rounded-md p-4 md:p-5 space-y-5',
                            className
                        )}
                    >
                        <div className="flex overflow-hidden  relative z-2 rounded-lg overflow-hidden">
                            <Image
                                src={image ?? productPlaceholder}
                                alt={name || 'Product Image'}
                                width={500}
                                height={300}
                                className="duration-1000 ease-in-expo hover:scale-109"
                            />
                        </div>
                        <div className={"space-y-3"}>
                            <Heading variant="titleMedium" className="mb-3">{name}</Heading>
                            <div className={"space-y-2 text-sm"}>
                                <p>{address}</p>
                                <p>Phone: {phoneNumber}</p>
                            </div>
                            <div className={"leading-7 text-sm"} {...htmlLocation}>
                            </div>
                            <Link href={location as string} className={"sm:capitalize max-w-[170px] lg:!py-3.5"}
                                  variant={'button-border'} >
                                Get Directions
                            </Link>
                        </div>

                    </article>
                );
            })}
        </div>
    );
}
export default OurStores;