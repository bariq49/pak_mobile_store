'use client';

import cn from 'classnames';
import { forwardRef, ButtonHTMLAttributes } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'primary' | 'border' | 'formButton'| 'dark'| 'paypal';
  active?: boolean;
  type?: 'submit' | 'reset' | 'button';
  loading?: boolean;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = 'primary',
    children,
    active,
    loading = false,
    disabled = false,
    ...rest
  } = props;
  const { selectedColor } = usePanel();
  
  const rootClassName = cn(
    
    
    'group font-medium text-15px leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-body  text-center justify-center tracking-[0.2px] rounded-md placeholder-white focus-visible:outline-none focus:outline-none',
    {
      [`h-12   text-brand-light tracking-widest px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 ${colorMap[selectedColor].bg} ${colorMap[selectedColor].hoverBg}`]:
        variant === 'primary',
        'h-12  bg-brand-dark dark:bg-brand-light hover:bg-brand-dark/90 text-white tracking-widest px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 ':
        variant === 'dark',
      'h-12 w-full bg-[#ffc439] hover:bg-[#f0b82d] text-black dark:text-white sm:font-normal tracking-widest px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 ':
          variant === 'paypal',
      [`text-base border border-gray-400 tracking-widest px-5  py-4  lg:py-4  ${colorMap[selectedColor].hoverBorder} ${colorMap?.[selectedColor]?.hoverLink}`]:
        variant === 'border',
      [`h-11 md:h-[50px]  text-brand-light  px-5 lg:px-6 py-4 md:py-3.5 lg:py-4  focus:bg-opacity-70 ${colorMap[selectedColor].bg} ${colorMap[selectedColor].hoverBg}`]:
        variant === 'formButton',
      'cursor-not-allowed hover:cursor-not-allowed bg-opacity-50 ':
        disabled,
    },
    className
  );

  return (
    <button
      aria-pressed={active}
      data-variant={variant}
      ref={ref}
      className={rootClassName}
      disabled={disabled}
      {...rest}
    >
      {children}
      {loading && (
        <ImSpinner2 className="w-5 h-5 animate-spin ltr:-mr-1 rtl:-ml-1 ltr:ml-3 rtl:mr-3 " />
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
