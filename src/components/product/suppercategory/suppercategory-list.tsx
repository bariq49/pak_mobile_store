import cn from 'classnames';
import {ROUTES} from '@/utils/routes';
import Link from "@/components/shared/link";

interface Props {
    className?: string;
    data: any;
}

const SupperCategoryList: React.FC<Props> = ({ className = 'mb-12 pb-0.5', data}) => {
    
    return (
        <div
            className={cn('heightFull', className)}>
            <h3 className="text-[20px]  text-brand-dark dark:text-gray-200 font-medium block-title  !border-0 ">
                {data?.name}
            </h3>
            <ul key="content" className="pt-5 text-sm leading-7">
                    {data?.children.slice(0, 5)?.map((currentItem: any, idx: number) => {
                        return (
                            <li className="pb-2" key={`${idx}`}>
                                <Link
                                     className={"block dark:text-gray-200"}
                                    href={`${ROUTES.CATEGORY}/${currentItem?.slug}`}
                                >
                                    {currentItem.name}
                                </Link>
                            </li>
                        );
                    })}
                    <li>
                        <Link
                            variant={"base"}
                            href={`${ROUTES.CATEGORY}/${data?.slug}`}
                        >
                            View All Categories
                        </Link>
                    </li>
                </ul>
        </div>
    );
};

export default SupperCategoryList;
