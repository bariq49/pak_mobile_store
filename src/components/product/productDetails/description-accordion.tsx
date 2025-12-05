"use client";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel, Transition,
} from '@headlessui/react';
import { FiPlus, FiMinus } from "react-icons/fi";
import cn from 'classnames';
import {usePanel} from "@/hooks/use-panel";
import {colorMap} from "@/data/color-settings";
import descriptionData from './description-data';

export default function DescriptionAccordion() {

    const { selectedColor } = usePanel();
    
    return (
        <div className="w-full mt-8 lg:mt-10 ">
            {Object.entries(descriptionData).slice(0,3).map(([key, content]) => (
                <Disclosure key={key}  as="div">
                    {({ open }) => (
                        <>
                            <DisclosureButton
                                className={cn(
                                    "border-b-1 border-border-base  flex justify-between w-full py-4 text-base  focus:outline-none hover:text-black",
                                    open ? `${colorMap[selectedColor].link} ` : " text-brand-dark"
                                )}
                            >
                                <span>{key.split('_').join(' ')}</span>
                                
                                {open ? <FiMinus className={`text-lg text-brand-dark`} /> : <FiPlus className={"text-lg"}/>}
                            </DisclosureButton>
                            <Transition
                                show={open}
                                enter="transition-all ease-in-out duration-300"
                                enterFrom="opacity-0 max-h-0"
                                enterTo="opacity-100 max-h-screen"
                                leave="transition-all ease-in-out duration-300"
                                leaveFrom="opacity-100 max-h-screen"
                                leaveTo="opacity-0 max-h-0"
                            >
                                <DisclosurePanel transition className="py-5  text-15px leading-7">
                                    {content}
                                </DisclosurePanel>
                            </Transition>

                        </>
                    )}
                </Disclosure>
            ))}
        </div>
    );
}