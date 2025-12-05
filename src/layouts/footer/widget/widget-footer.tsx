import WidgetLink from './widget-link';
import WidgetAbout from './widget-about-us';
import Container from '@/components/shared/container';
import {footerSettings} from '@/data/footer-settings';
import React from 'react';

import ServiceFeature from "@/components/common/service-featured";
import WidgetSubscription from "@/layouts/footer/widget/widget-subscription";
import cn from "classnames";

interface WidgetsProps {
    variant?: string;
    widgets: {
        id: number;
        widgetTitle: string;
        lists?: {
            id: number ;
            path: string;
            title: string;
        }[]; // Fix: lists is an optional array
    }[];
}


const Widgets: React.FC<WidgetsProps> = ({
         widgets,
         variant = 'default',
     }) => {
    const {social} = footerSettings;
    return (
        <>
            
            <Container className={cn(
                {'2xl:max-w-[1730px]': variant === 'home10',}
            )}>
                <div
                    className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-14 pt-10 md:pt-14">
                    <WidgetAbout
                        social={social}
                        className="col-span-full sm:col-span-1 md:col-span-3"
                        variant={variant}
                    />
                    <div className={"grid gap-5 md:grid-cols-6 sm:col-span-1 md:col-span-5"}>
                        {widgets.slice(0,3)?.map((widget) => (
                            <WidgetLink
                                key={`footer-widget--key${widget.id}`}
                                data={widget}
                                className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2"
                            />
                        ))}
                    </div>
                    <WidgetSubscription  variant={variant}  className="newsletterFooter col-span-full  md:col-span-4 ltr:lg:border-l rtl:lg:border-r border-black/10 lg:ps-10 " />

                </div>
            </Container>
        </>

    );
};

export default Widgets;
