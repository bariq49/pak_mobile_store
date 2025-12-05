import Widgets from '@/layouts/footer/widget/widget-footer';
import Copyright from '@/layouts/footer/copyright';
import {footerSettings} from '@/data/footer-settings';
import React from "react";
import cn from "classnames";
import WidgetSignup from "@/layouts/footer/widget/widget-signup";

const {widgets, payment} = footerSettings;

interface FooterProps {
    variant?: string;
    className?: string;
    showWidgetServices?: boolean;
    showWidgetSubscription?: boolean;
}

const Footer: React.FC<FooterProps> = ({variant = 'default',className,showWidgetServices = false,showWidgetSubscription = true}) => {
    return (
        <footer className={cn(
            'footer-one border-t border-black/10',
            className
        )}
        >
            <Widgets widgets={widgets} variant={variant} />
            <Copyright payment={payment} variant={variant} />
        </footer>
    );
};

export default Footer;
