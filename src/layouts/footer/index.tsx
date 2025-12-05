import Widgets from '@/layouts/footer/widget';
import Copyright from '@/layouts/footer/copyright';
import {footerSettings} from '@/data/footer-settings';
import React from "react";
import cn from "classnames";

const {widgets, payment} = footerSettings;

interface FooterProps {
    variant?: string;
    className?: string;
    showWidgetSubscription?: boolean;
}

const Footer: React.FC<FooterProps> = ({variant = 'default',className,showWidgetSubscription = true}) => {
    return (
        <footer className={cn(
           {
                'footer-default bg-fill-one': variant === 'default' || variant === 'basic',
            },
            className
        )}
        >
            <Widgets widgets={widgets} variant={variant}  showWidgetSubscription={showWidgetSubscription}/>
            <Copyright payment={payment} variant={variant} />
        </footer>
    );
};

export default Footer;
