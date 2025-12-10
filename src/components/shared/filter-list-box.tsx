import { Fragment, useState, useEffect } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { IoChevronDown, IoCheckmarkSharp } from 'react-icons/io5';
import { usePathname, useSearchParams } from 'next/navigation';
import useQueryParam from '@/utils/use-query-params';
type Option = {
  name: string;
  value: string;
};

export default function ListBox({
  options,
}: {
  options: Option[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? '/');
  const hasQueryKey = searchParams?.get('sort_by');
  const currentSelectedItem = hasQueryKey
    ? options.find((o) => o.value === hasQueryKey)!
    : options[0];
  const [selectedItem, setSelectedItem] = useState<Option>(currentSelectedItem);

  useEffect(() => {
    setSelectedItem(currentSelectedItem);
  }, [currentSelectedItem]);

  useEffect(() => {
    updateQueryparams("sort_by", currentSelectedItem.value.toString());
  }, [currentSelectedItem.value]);

  function handleItemClick(value: string) {
    updateQueryparams('sort_by', value);
  }

  return (
    <Listbox
      value={selectedItem}
      onChange={({ value }) => handleItemClick(value)}
    >
      {({ open }) => (
        <div className="relative ltr:ml-2 rtl:mr-2 lg:ltr:ml-0 lg:rtl:mr-0 min-w-[160px]">
          <div className="flex items-center justify-center">
            <div className="shrink-0 text-15px ltr:mr-2 rtl:ml-2  text-opacity-70">
              Sort by:
            </div>
            <ListboxButton className="min-w-[130px] relative w-full text-sm border border-black/10 hover:border-black/50  rounded cursor-pointer p-1.5 px-3 ltr:pr-7 rtl:pl-7  ltr:text-left rtl:text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-brand focus-visible:ring-offset-2 focus-visible:border-indigo-500">
              <span className="block truncate">{selectedItem.name}</span>
              <span className="absolute flex items-end pointer-events-none top-2 ltr:right-1 rtl:left-1 ltr:pl-1 rtl:pr-1">
                <IoChevronDown
                  className="w-3.5 h-3.5 text-brand-muted"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>
          </div>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              static
              className="absolute z-20 w-full py-1 mt-1 overflow-auto text-sm rounded-md shadow-lg bg-white max-h-60 ring-1 ring-border-two ring-opacity-5 focus:outline-none"
            >
              {options?.map((option, personIdx) => (
                <ListboxOption
                  key={personIdx}
                  className={({ active }) =>
                    `${
                      active
                        ? 'text-brand-dark bg-gray-100/50'
                        : 'bg-white'
                    }
                    cursor-pointer transition-all select-none relative py-2 ltr:pl-10 rtl:pr-10 ltr:pr-4 rtl:pl-4`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? 'text-brand-dark' : ''}
                                check-icon absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-3 rtl:pr-3`}
                        >
                          <IoCheckmarkSharp
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
