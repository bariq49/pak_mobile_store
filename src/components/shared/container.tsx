import cn from 'classnames';
import React from "react";

interface Props {
  className?: string;
  children?: React.ReactNode;
  el?: React.ElementType; // Correct type for dynamic elements/components
  variant?: Variant;
}

type Variant =
    | 'Large'
    | 'Medium'
    | 'Normal';

const Container: React.FC<Props> = ({
  children,
  className,
  el = 'div',
  variant='Medium'
}) => {
  const rootClassName = cn(className, {
    'mx-auto max-w-[1380px] px-4 md:px-6 2xl:px-0': variant ==='Normal',
    'mx-auto max-w-[1730px] px-4 md:px-6 2xl:px-20': variant ==='Medium',
    'mx-auto max-w-[1870px] px-4 md:px-6 2xl:px-20': variant ==='Large',
  });
  
  // Assert el as a React.ComponentType that accepts div props
  const Component = el as React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;

  return <Component className={rootClassName}>{children}</Component>;
};

export default Container;
