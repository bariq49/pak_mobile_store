import WidgetLink from './widget-link';
import WidgetAbout from './widget-about-us';
import Container from '@/components/shared/container';
import {footerSettings} from '@/data/footer-settings';
import React from 'react';
import WidgetSubscription from "@/layouts/footer/widget/widget-subscription";
import WidgetSignup from "@/layouts/footer/widget/widget-signup2";

interface WidgetsProps {
    variant?: string;
    showWidgetServices?: boolean;
    showWidgetSubscription?: boolean;
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
         showWidgetSubscription,
         variant = 'default',
     }) => {
    const {social} = footerSettings;
    return (
        <>
            <Container variant={
                variant === 'basic' ||
                variant === 'home4' ||
                variant === 'home7' ||
                variant === 'home9' ||
                variant === 'home10'
                    ? 'Medium'
                    : 'Large' // Default value if none match
            }
            >
                
                <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-14 pt-5 md:pt-15">
                    <WidgetAbout
                        social={social}
                        className="col-span-full sm:col-span-1 md:col-span-3"
                        variant={variant}
                    />
                    {showWidgetSubscription ? (
                        <>
                            {widgets?.slice(0, 3)?.map((widget) => (
                                <WidgetLink
                                    key={`footer-widget--key${widget.id}`}
                                    data={widget}
                                    className="col-span-1 md:col-span-2"
                                    variant={variant}
                                />
                            ))}
                            <WidgetSubscription  variant={variant}  className={"col-span-full sm:col-span-1 md:col-start-4 xl:col-start-auto md:col-span-4 xl:col-span-3"} />
                        </>
                    ): (
                        widgets?.slice(0, 4)?.map((widget) => (
                        <WidgetLink
                            key={`footer-widget--key${widget.id}`}
                            data={widget}
                            className="col-span-1 md:col-span-2"
                            variant={variant}
                        />
                        ))
                    )}
                </div>
            </Container>
            
            {variant === 'home9' && (
                <div className="border-t border-white/8 dark:border-black/8 bg-black/20 dark:bg-white/20 py-5 sm:py-8">
                    <Container>
                        <WidgetSignup className={'newsletterFooter  items-center'}/>
                    </Container>
                </div>
            )}
            
            
        </>
    );
};

export default Widgets;
