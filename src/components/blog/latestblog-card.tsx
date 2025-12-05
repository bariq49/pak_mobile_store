import Heading from '@/components/shared/heading';
import Image from '@/components/shared/image';
import Link from '@/components/shared/link';
import {LinkProps} from 'next/link';
import Text from '@/components/shared/text';
import {collectionPlaceholder} from '@/assets/placeholders';
import {Blog} from "@/services/types";
import cn from "classnames";
import {usePanel} from "@/hooks/use-panel";
import {colorMap} from "@/data/color-settings";

interface Props {
    variant?: string;
    imgWidth?: number;
    imgHeight?: number;
    href: LinkProps['href'];
    collection: Blog;
}

const LatestblogCard: React.FC<Props> = ({
                                             collection,
                                             imgWidth = 440,
                                             imgHeight = 360,
                                             href,
                                             variant
                                         }) => {
    const {image, title,  date , shortDescription} = collection;
    const {selectedColor} = usePanel();
    
    return (
        <Link href={href} className={cn("group flex flex-col  ")}>
            <Image
                src={image ?? collectionPlaceholder}
                alt={(title) || ('text-card-thumbnail')}
                width={imgWidth}
                height={imgHeight}
                className="transition duration-1000 ease-in-expo  group-hover:opacity-70"
            />
            
            <div className={cn('flex flex-col ',{
                    'mt-2 mb-10': variant === 'default' ,
                    'mt-3 ': variant === 'home4',
                    'mt-4 ': variant === 'furniture' || variant === 'furniture2'
                }
            )}
            >
                <Heading
                    variant="title"
                    className={cn(colorMap[selectedColor].groupHoverLink,"mb-1 lg:mb-1.5 text-15px line-clamp-2  ")}
                >
                    {title}
                </Heading>
                <Text variant="body" className="text-[13px] xs:mb-0 text-gray-500 pb-1.5">
                    Post Date: {date}
                  
                </Text>
                
                {variant === 'furniture2' && (
                    <div className={"short-des text-gray text-sm leading-6 text-body"}>
                        {shortDescription}
                    </div>
                )}
            </div>
        </Link>
    );
};

export default LatestblogCard;
