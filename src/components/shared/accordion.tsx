// components/Accordion.tsx

import cn from 'classnames';
import {Disclosure, DisclosureButton, DisclosurePanel, Transition} from '@headlessui/react';
import { usePanel } from "@/hooks/use-panel";
import {colorMap} from '@/data/color-settings';
import {FiPlus, FiMinus} from 'react-icons/fi';
import {AccordionGroup} from './accordionGroup';
import {CollapseProps} from "@/services/types";

export const Accordion: React.FC<CollapseProps> = ({
                                                       item,
                                                       variant = 'underline',
                                                       isOpen,
                                                       onToggle,
                                                   }) => {
    const {title, content} = item;
    const {selectedColor} = usePanel();

    return (
            <div className="w-full  group">
                <Disclosure as="div">
                    {() => ( // Removed { open } since it's unused
                        <>
                            <DisclosureButton
                                className={cn(
                                    "border-b-1 border-border-base  flex justify-between w-full py-4 text-base  focus:outline-none hover:text-black",
                                    isOpen ? `${colorMap[selectedColor].link} ` : " text-brand-dark"
                                )}
                                onClick={onToggle}
                            >
                                <span className={"text-start"}>{title}</span>
                                {isOpen ? <FiMinus className={`text-lg text-brand-dark`} /> : <FiPlus className={"text-lg"}/>}
                            </DisclosureButton>

                            <Transition
                                show={isOpen}
                                enter="transition-all ease-in-out duration-300"
                                enterFrom="opacity-0 max-h-0"
                                enterTo="opacity-100 max-h-screen"
                                leave="transition-all ease-in-out duration-300"
                                leaveFrom="opacity-100 max-h-screen"
                                leaveTo="opacity-0 max-h-0"
                            >
                                <DisclosurePanel static className="overflow-hidden">
                                    <div className="py-3 text-15px leading-7">
                                        {typeof content === 'string' ? (
                                            content
                                        ) : (
                                            <AccordionGroup items={content} variant={variant} />
                                        )}
                                    </div>
                                </DisclosurePanel>
                            </Transition>
                        </>
                    )}
                </Disclosure>
            </div>
    );
};

export default Accordion;