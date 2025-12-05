"use client";
import cn from 'classnames';
import React, { InputHTMLAttributes, useState, useId } from 'react';
import { Eye } from '@/components/icons/eye-icon';
import { EyeOff } from '@/components/icons/eye-off-icon';
export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    inputClassName?: string;
    label: string;
    name: string;
    shadow?: boolean;
    error: string | undefined;
    id?: string; // Add optional id prop
}
const classes = {
    root: 'py-2 px-4 md:px-5 w-full bg-white appearance-none transition duration-150 ease-in-out border text-input text-13px lg:text-sm font-body rounded-md placeholder-[#B3B3B3] transition duration-200 ease-in-out text-brand-dark border-border-two focus:border-1 focus:outline-none focus:ring-0 focus:border-gray-400 h-11 ',
};
const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            className = 'block',
            inputClassName,
            label,
            name,
            error,
            id, // Destructure id prop
            ...rest
        },
        ref,
    ) => {
        // Use provided id or generate a unique id based on name
        const generatedId = useId();
        const inputId = id || `${name}-${generatedId.replace(/:/g, '')}`;
        const [show, setShow] = useState(false);
        
        const rootClassName = cn(classes.root, inputClassName);
        return (
            <div className={className}>
                {label && (
                    <label
                        htmlFor={inputId} // Use inputId
                        className="block mb-3 text-sm font-medium leading-none cursor-pointer text-brand-dark opacity-80"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        id={inputId} // Use inputId
                        name={name}
                        type={show ? 'text' : 'password'}
                        ref={ref}
                        className={rootClassName}
                        autoComplete="off"
                        spellCheck="false"
                        {...rest}
                    />
                    <label
                        htmlFor={inputId}
                        className="absolute -mt-2 cursor-pointer ltr:right-4 rtl:left-4 top-5 text-brand-dark opacity-30"
                        onClick={() => setShow((prev) => !prev)}
                    >
                        {show ? (
                            <EyeOff className="w-6 h-6" />
                        ) : (
                            <Eye className="w-6 h-6" />
                        )}
                    </label>
                </div>
                {error && (
                    <p className="my-2 text-13px text-brand-danger text-opacity-70">
                        {error}
                    </p>
                )}
            </div>
        );
    },
);

export default PasswordInput;

PasswordInput.displayName = 'PasswordInput';
