import React, { JSXElementConstructor, CSSProperties } from 'react';
import cn from 'classnames';

interface Props {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode ;
  html?: string;
}

type Variant =
  | 'mediumHeading'
  | 'heading'
  | 'base'
  | 'title'
  | 'titleMedium'
  | 'titleLarge'
  | 'pageHeading'
  | 'subHeading'
  | 'checkoutHeading';

const Heading: React.FC<Props> = ({
  style,
  className,
  variant = 'base',
  children,
  html,
}) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string;
  } = {
    base: 'h3',
    heading: 'h2',
    mediumHeading: 'h3',
    title: 'h2', // Collection card
    titleMedium: 'h3',
    titleLarge: 'h2',
    pageHeading: 'h1',
    subHeading: 'h2',
    checkoutHeading: 'h3',
  };

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    | string = componentsMap![variant!];

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {};

  return (
    <Component
      className={cn(
        'font-medium',
        {
          'text-sm  text-brand-dark': variant === 'base',
          'text-base  text-brand-dark': variant === 'title',
          'font-bold text-brand-dark text-lg': variant === 'titleMedium',
          'text-xl xl:leading-8  text-brand-dark': variant === 'titleLarge',
            'text-brand-dark text-[17px] lg:leading-7 ': variant === 'mediumHeading',
          'text-lg lg:text-xl xl:text-[22px] xl:leading-8  text-brand-dark font-bold ': variant === 'heading',
          'sm:font-light text-lg lg:text-xl xl:text-[22px]  xl:leading-8 text-brand-dark': variant === 'checkoutHeading',
        },
        className
      )}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  );
};

export default Heading;
