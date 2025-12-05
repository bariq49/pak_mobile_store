"use client";
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from '@headlessui/react';
import cn from 'classnames';
import {usePanel} from "@/hooks/use-panel";
import {colorMap} from "@/data/color-settings";
import descriptionData from './description-data';


export default function DescriptionTab() {
   
    const { selectedColor } = usePanel();
    return (
        <div className="w-full   mb-8 lg:mb-10">
            <TabGroup>
                <TabList className=" border-b border-border-base flex flex-wrap gap-2">
                    {Object.entries(descriptionData).map(([key, content]) => (
                        <Tab
                            key={key}
                            className={({selected}) =>
                                cn(
                                    colorMap[selectedColor].hoverLink,
                                    'relative inline-block border-b-2 transition-all text-base font-semibold uppercase leading-5  focus:outline-none pb-2 md:pb-4 mt-2 xs:mt-0  me-5 xl:me-10 ',
                                    selected
                                        ? `text-brand-dark  ${colorMap[selectedColor].border}`
                                        : ' border-transparent'
                                )
                            }
                        >
                            {key.split('_').join(' ')}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels className="mt-6 lg:mt-9">
                    {Object.entries(descriptionData).map(([key, content]) => (
                        <TabPanel key={key}>
                            {content}
                        </TabPanel>
                    ))}
                </TabPanels>
            </TabGroup>
        </div>
    );
}
