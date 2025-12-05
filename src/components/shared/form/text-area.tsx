import React, { TextareaHTMLAttributes } from 'react';
import cn from 'classnames';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  label?: string;
  name: string;
  placeholder?: string;
  error?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
}

const variantClasses = {
  normal:
    'bg-gray-100/50 border border-gray-200 focus:shadow focus:outline-none focus:border-gray-400 focus:ring-3 focus:ring-black/5',
  solid:
    'bg-white border border-border-two focus:bg-white focus:border-1 focus:border-gray-400 focus:ring-3 focus:ring-black/5',
  outline: 'border border-gray-300 focus:border-primary',
};

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const {
    className,
    label,
    name,
    placeholder,
    error,
    variant = 'normal',
    shadow = false,
    inputClassName,
    labelClassName,
    ...rest
  } = props;
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className={`block ${
            labelClassName || 'text-brand-dark '
          } font-medium text-13px lg:text-sm leading-none mb-3 cursor-pointer`}
        >
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        className={cn(
          'px-4 py-3 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-brand-dark text-13px lg:text-sm focus:outline-none focus:ring-0 placeholder-[#B3B3B3]',
          shadow && 'focus:shadow',
          variantClasses[variant],
          inputClassName,
        )}
        autoComplete="off"
        spellCheck="false"
        rows={4}
        ref={ref}
        // @ts-ignore
        placeholder={placeholder}
        {...rest}
      />
      {error && (
        <p className="my-2 text-13px text-brand-danger ">
          {error}
        </p>
      )}
    </div>
  );
});

export default TextArea;

TextArea.displayName = 'TextArea';
