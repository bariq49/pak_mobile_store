'use client';

import {usePathname} from 'next/navigation';
import Link from '@/components/shared/link';
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";
import cn from "classnames";

type Option = {
    name: string;
    slug: string;
};

export default function AccountNav({
                                       options,
                                   }: {
    options: Option[];
}) {
    const pathname = usePathname();
    const { selectedColor } = usePanel();
    
    return (
        <nav
            className="flex flex-col md:flex-row  border-b  border-border-base bg-white space-x-4 md:space-x-8">
            {options.map((item, index) => {
                return (
                    <Link
                        key={index}
                        href={item.slug}
                        className={cn(
                            "relative  flex items-center cursor-pointer text-sm lg:text-base py-3.5",
                            colorMap[selectedColor].hoverLink,
                            pathname!= item.slug ? "font-medium " : colorMap[selectedColor].link+ ' ' + colorMap[selectedColor].border+" border-b-2 font-medium"
                        )}
                       
                    >
                        
                        {(item.name)}
                    </Link>
                );
            })}
        
        </nav>
    );
}
