import  { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Category } from '@/services/types';
import { colorMap } from '@/data/color-settings';
import {usePanel} from "@/hooks/use-panel";

const MobileDropdownTabs = ({ childrenData, onNavClick }: { childrenData: Category[]; onNavClick: (id: number) => void }) => {
    const [categoryMenu, setCategoryMenu] = useState(false);
    const { selectedColor } = usePanel();

    return (
        <div className="block xl:hidden ltabs-tabs-wrap relative z-10">
            <button
                className="flex justify-between bg-white border border-black/10 rounded-md min-w-[170px] focus:outline-none text-sm px-3 py-2 mt-2 mb-1"
                onClick={() => setCategoryMenu(!categoryMenu)}
            >
                <span className="inline-flex me-2.5">
                    {childrenData[0]?.name}
                </span>
                <FiChevronDown className="text-xl lg:text-2xl" />
            </button>
            {categoryMenu && (
                <div
                    id="dropdown"
                    className="z-10 w-44 bg-white rounded drop-shadow absolute"
                >
                    <ul className="py-2 text-[14px] leading-6">
                        {childrenData.slice(0, 4).map((currentItem, idx) => (
                            <li className={colorMap[selectedColor].hoverLink} key={`${idx}`}>
                                <button
                                    onClick={() => onNavClick(Number(currentItem.id))}
                                    className={'py-2 px-4 block whitespace-no-wrap'}
                                >
                                    {currentItem.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MobileDropdownTabs;
