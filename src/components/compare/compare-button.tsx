import cn from 'classnames';
import {useCompare} from "@/hooks/use-compare";
import {Tooltip} from "@/components/shared/tooltip";
import {Check, GitCompare} from "lucide-react";
import {colorMap} from "@/data/color-settings";
import {usePanel} from '@/hooks/use-panel';
import {useUI} from "@/hooks/use-UI";

interface Props {
    product : any;
    className?: string;
};

const CompareButton: React.FC<Props> = ({product,className}) => {
    const {compareList,addToCompare } = useCompare();

    const {openDrawer, setDrawerView} = useUI();
    const InCompare = (productId: number) => compareList.some((product) => product.id === productId);
    const isInCompare = InCompare(product?.id);
    const compareStatus = isInCompare === true ? 'Browse compares ' : 'Added to Compares';
    const { selectedColor } = usePanel();

    return (
        <Tooltip content={compareStatus} className={"min-w-36"}>
            {isInCompare ? (
                <button onClick={() => {
                    setDrawerView('COMPARE_SIDEBAR');
                    return openDrawer();
                }}
                className={cn('bg-gray-200 text-gray-600 dark:text-gray-700 px-5 py-3  rounded  w-full flex justify-center  h-full',className)} >
                    
                    <Check size={20} strokeWidth={2} />
                </button>
            ) : (
                <button onClick={() => {
                    addToCompare(product);
                    setDrawerView('COMPARE_SIDEBAR');
                    return openDrawer();
                }}
                className={cn(' bg-gray-200 text-gray-600 dark:text-gray-700 px-5 py-3  rounded  w-full flex justify-center  h-full hover:bg-blue-500 hover:text-white',className,colorMap[selectedColor].hoverBg)}
                >
                    <GitCompare size={20} strokeWidth={1} />
                </button>
            )}
        </Tooltip>
    );
}
export default CompareButton;
