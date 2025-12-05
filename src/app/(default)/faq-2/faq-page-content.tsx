"use client"

import Container from '@/components/shared/container';
import Heading from '@/components/shared/heading';
import {Link, Element} from 'react-scroll';
import {usePanel} from "@/hooks/use-panel";
import {colorMap} from "@/data/color-settings";
import cn from "classnames";
import {ArrowUpRight} from "lucide-react";
import React, {useState} from "react";
import {order, payment, shopping} from "@/data/faq-settings";
import AccordionGroup from "@/components/shared/accordionGroup";

function makeTitleToDOMId(title: string) {
    return title.toLowerCase().split(' ').join('_');
}

const faqs = [
    {
        id: '1',
        title: 'Shopping Information',
        content: order,
    },
    {
        id: '2',
        title: 'Payment information',
        content: payment,
    },
    {
        id: '3',
        title: ' Order & Returns',
        content: shopping,
    },
    {
        id: '4',
        title: ' The Cookies We Set',
        content: order,
    },
];

export default function FaqPageContent() {
    const {selectedColor} = usePanel();
    const [activeSection, setActiveSection] = useState<string | null>(null);
    return (
        <div className="py-7 lg:py-8 0 xl:px-16 2xl:px-24 3xl:px-36">
            <Container>
                <div className="flex lg:flex-row-reverse flex-wrap  w-full  relative z-10  my-10">
                    <div className="w-full lg:w-[70%] xl:w-[75%] xl:ps-10  xl:mb-0 mb-8">
                        {faqs?.map((item) => (
                            <Element
                                name={item.title}
                                key={item.title}
                                id={makeTitleToDOMId(item.title)}
                                className="mb-8 lg:mb-12 last:mb-0 order-list-enable"
                            >
                                <Heading variant="heading" className="mb-3 ">
                                    {item.title}
                                </Heading>
                                <AccordionGroup items={item.content}/>
                            
                            </Element>
                        ))}
                    </div>
                    
                    <div className="w-full lg:w-[30%] xl:w-[25%] ">
                        <ol className=" sticky z-10 md:top-16 lg:top-20   bg-white rounded-lg p-5 border border-black/10">
                            {faqs?.map((item, index) => (
                                <li key={index} className={"border-b border-black/10 last:border-0 group"}>
                                    <Link
                                        spy={true}
                                        offset={-120}
                                        smooth={true}
                                        duration={200}
                                        to={makeTitleToDOMId(item.title)}
                                        activeClass={cn(colorMap[selectedColor].text)}
                                        className="flex items-center justify-between py-4 text-sm text-brand-dark font-medium cursor-pointer lg:text-15px "
                                        onSetActive={() => setActiveSection(makeTitleToDOMId(item.title))}
                                        onSetInactive={() => setActiveSection(null)}
                                    >
                                        {item.title}
                                        <ArrowUpRight size={20} strokeWidth={2}
                                                      className={cn(" transition-all ease-in-out duration-300 group-hover:opacity-100 group-hover:translate-x-0",
                                                          {
                                                              "opacity-100": activeSection === makeTitleToDOMId(item.title),
                                                              "opacity-0 -translate-x-5": activeSection !== makeTitleToDOMId(item.title),
                                                          }
                                                      )}/>
                                    </Link>
                                </li>
                            ))}
                        </ol>

                    </div>
                    
                    

                </div>

            </Container>
        </div>
    );
}
