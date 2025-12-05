import React from 'react';
import { Switch } from '@headlessui/react';
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";

interface SwitchProps {
  srText?: string;
  checked?: boolean;
  onChange?: (value: boolean) => void;
}

const SwitchComponent = React.forwardRef<never, SwitchProps>(
  ({ srText = 'toggle', checked, onChange }, ref) => {
    const { selectedColor } = usePanel();
    return (
      <Switch
        checked={checked!}
        onChange={onChange!}
        type="button"
        ref={ref}
        className={`${checked ? colorMap[selectedColor].bg : 'bg-gray-200'}
          relative inline-flex shrink-0 h-6 lg:h-7 w-10 lg:w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-brand-light focus-visible:ring-opacity-75 `}
      >
        <span className="sr-only">{srText}</span>
        <span
          aria-hidden="true"
          className={`${
            checked
              ? 'rtl:-translate-x-4 rtl:lg:-translate-x-5 ltr:translate-x-4 ltr:lg:translate-x-5'
              : 'translate-x-0'
          }
            pointer-events-none inline-block h-5 lg:h-6 w-5 lg:w-6 rounded-full bg-brand-light drop-shadow-switch transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    );
  }
);

SwitchComponent.displayName = 'SwitchComponent';
export default SwitchComponent;
