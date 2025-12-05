'use client';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";
import cn from "classnames";

const Link: React.FC<
  NextLinkProps & {
    className?: string;
    children?: React.ReactNode;
    variant?: 'base' | 'line' | 'button-border' | 'button-primary'| 'button-black'| 'button-white'| 'button-detail'| 'btnFurni-detail';
    title?: string;
  }
> = ({ children, className, title,variant = 'line', ...props }) => {
    const { selectedColor } = usePanel();
    const btnClassName = "rounded block uppercase font-medium px-5  py-4 md:py-3.5 lg:py-4 text-sm lg:text-15px leading-4  cursor-pointer transition-all ease-in-out duration-300  text-center";
    const rootClassName = cn(
        'group ',
        {
            [colorMap?.[selectedColor]?.text as string ] : variant === 'base',
            [`${colorMap?.[selectedColor]?.hoverLink} transition-all ease-in-out duration-500` ]: variant === 'line',
            [`text-black font-medium border border-gray-400 ${btnClassName} ${colorMap[selectedColor].hoverBorder} ${colorMap?.[selectedColor]?.hoverLink} `] : variant === 'button-border',
            [`bg-brand-dark dark:bg-brand-light  text-white ${btnClassName} hover:bg-brand-dark/90`] : variant === 'button-black',
            [`bg-white  text-brand-dark ${btnClassName} ${colorMap[selectedColor].hoverBg} hover:text-white`] : variant === 'button-white',
            [`text-brand-light ${btnClassName} ${colorMap[selectedColor].bg} ${colorMap[selectedColor].hoverBg}`] : variant === 'button-primary',
            [`inline-block text-center min-w-[150px] flex px-4 py-2  relative leading-6 text-brand-light font-medium rounded-full text-[13px] transition-all ${colorMap[selectedColor].bg} ${colorMap[selectedColor].hoverBg}`] : variant === 'button-detail',
            [`w-full xs:rounded-none text-center min-w-[150px] flex px-4 py-2  relative leading-6 text-brand-light font-medium rounded text-[13px] items-center justify-center transition-all  ${colorMap[selectedColor].bg} ${colorMap[selectedColor].hoverBg}`] : variant === 'btnFurni-detail',
        },
        className
    );
  return (
    <NextLink {...props} title={title} className={rootClassName} >
      {children}
    </NextLink>
  );
};

export default Link;
