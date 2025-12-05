"use client"; // ✅ Ensures this runs only on the client
import Image from '@/components/shared/image';
import { siteSettings } from '@/data/site-settings';
import Container from '@/components/shared/container';
import cn from 'classnames';
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";

interface CopyrightProps {
    variant?: string;
    payment?: {
        id: string | number;
        path?: string;
        name: string;
        image: string;
        width: number;
        height: number;
    }[];
}
const year = new Date().getFullYear();
const Copyright: React.FC<CopyrightProps> = ({
                                                 payment,
                                                 variant = 'default',
                                             }) => {
    const { selectedColor } = usePanel();
    
    return (
        <div className={cn('  pt-5 pb-16 sm:pb-20 md:pb-20 lg:pb-3 mb-2 sm:mb-0',
            {
                'text-fill-footer border-t  xs:border-white/10 dark:border-black/10': variant === 'default'||  variant === 'basic' ||variant === 'home6' ||  variant === 'home7',
                'bg-brand-dark text-fill-footer border-t  xs:border-white/10 dark:border-black/10': variant === 'home4',
                'text-fill-footer border-t  xs:border-white/5 dark:border-black/8': variant === 'home8'||  variant === 'home9',
                ' border-t  xs:border-black/10 dark:border-white/10': variant === 'home10'
            },
        )}>
            <Container variant={
                variant === 'basic' ||
                variant === 'home4' ||
                variant === 'home7' ||
                variant === 'home9' ||
                variant === 'home10'
                    ? 'Medium'
                    : 'Large' // Default value if none match
            }>
                <div className="flex flex-col md:flex-row text-center md:justify-between">
                    <p className="text-sm leading-7 lg:leading-[27px]">
                        &copy;&nbsp;Copyright {year}&nbsp;
                        <a
                            className={cn("transition-colors duration-200 ease-in-out  hover:text-brand-light", colorMap[selectedColor].link)}
                            href={siteSettings.author.websiteUrl}
                        >
                            {siteSettings.author.name}
                        </a>
                        &nbsp; All rights reserved
                    </p>

                    {payment && (
                        <ul className="flex flex-wrap justify-center items-center space-x-2 ">
                            {payment?.map((item) => (
                                <li
                                    className=" transition hover:opacity-80 inline-flex"
                                    key={`payment-list--key${item.id}`}
                                >
                                    <a
                                        href={item.path ? item.path : '/#'}
                                        target="_blank"
                                        className="inline-flex"
                                        rel="noreferrer"
                                    >
                                        <Image
                                            className={"scale-85"}
                                            src={item.image}
                                            alt={item.name}
                                            width={item.width}
                                            height={item.height}
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Copyright;
