import React, { CSSProperties } from 'react';
import cn from 'classnames';

interface Props {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode ;
  html?: string;
}

type Variant = 'body' | 'medium' | 'small';

const Text: React.FC<Props> = ({
  style,
  className,
  variant = 'body',
  children,
  html,
}) => {
  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {};

  return (
    <p
      className={cn(
        {
          'lg:leading-[28px] text-15px  leading-7': variant === 'body', // default body text
          '': variant === 'medium',
          'text-sm lg:leading-[1.85em]': variant === 'small',
        },
        className
      )}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </p>
  );
};

export default Text;
