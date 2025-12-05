import Link from '@/components/shared/link';
import Image from '@/components/shared/image';
import {LinkProps} from 'next/link';
import cn from 'classnames';
import {categoryPlaceholder} from '@/assets/placeholders';
import {usePanel} from "@/hooks/use-panel";
import {colorMap} from "@/data/color-settings";
import {ROUTES} from "@/utils/routes";
import {Category} from "@/services/types";

interface Props {
    item: Category;
    href: LinkProps['href'];
    className?: string;
    variant: string;
}

const GridBaseCard: React.FC<Props> = ({ item, href, className,variant}) => {
    const {name, image, children} = item ;
    const { selectedColor } = usePanel();
    const SUBCATEGORIES_LIMITS = 5;
    return (
        <div className={`wb-categories__items `}>
            <Link
                href={href}
                className={cn('group flex w-full', className)} key={name}>
                    <Image
                        src={image?.original ?? categoryPlaceholder}
                        alt={name || 'Card Thumbnail'}
                        width={275}
                        height={170}
                        className=" transition duration-1000 ease-in-expo hover:scale-109"
                    />
            </Link>
            
            <h3 className={cn(colorMap?.[selectedColor]?.groupHoverLink, "pt-4 font-medium text-brand-dark truncate leading-6 group-hover:text-skin-primary")}>
                <Link
                    href={href}
                    className={cn('group block w-full', className)} >
                        {name}
                </Link>
            </h3>
            
            {Array.isArray(children) ? (
                <ul key="content" className="py-2 text-sm leading-6">
                    {children.slice(0, SUBCATEGORIES_LIMITS)?.map((currentItem: any, idx:number) => {
                        return (
                            <li className="py-1" key={`${idx}`}>
                                <Link
                                    className={"block"}
                                    href={`${ROUTES.CATEGORY}/${currentItem.slug}`}
                                >
                                    {currentItem.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        
        
        </div>
    );
};

export default GridBaseCard;
