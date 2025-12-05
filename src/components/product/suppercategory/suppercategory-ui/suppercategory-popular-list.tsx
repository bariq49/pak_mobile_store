import cn from 'classnames';
import {ROUTES} from '@/utils/routes';
import Link from "@/components/shared/link";
import {useMemo} from "react";

interface Props {
    className?: string;
    data: any;
    showBanner?: boolean;
}

const SupperCategoryList: React.FC<Props> = ({className = 'mb-12 pb-0.5', data,showBanner}) => {
    const CATEGORIES_LIMITS = useMemo(() => {
        return showBanner ? 8 : 5;
    }, [showBanner]);

    return (
        <div className={cn('heightFull', className)}>
            
            {Array.isArray(data?.children) ? (
                <ul key="content" className="text-sm leading-7">
                    {data?.children.slice(0, CATEGORIES_LIMITS)?.map((currentItem: any, idx: number) => {
                        return (
                            <li className="border-b border-black/5 py-2" key={`${idx}`}>
                                <Link href={`${ROUTES.CATEGORY}/${currentItem?.slug}`} className={'block'}>
                                    {currentItem.name}
                                </Link>
                            </li>
                        );
                    })}
                    <li className="py-2">
                        <Link variant={"base"} href={`${ROUTES.CATEGORIES}`} className={'block'}>
                            View All Categoies
                        </Link>
                    </li>
                </ul>
            ) : null}
        </div>
    );
};

export default SupperCategoryList;
