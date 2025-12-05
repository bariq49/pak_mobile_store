import Widgets from '@/layouts/footer/widget';
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
}

const Footer: React.FC<FooterProps> = ({variant = 'default',className,showWidgetServices = false}) => {
    return (
        <footer className={cn(
            'bg-[#1f2024] text-fill-footer border-t border-black/10',
            className
        )}
        >
            <Widgets widgets={widgets} variant={variant}  showWidgetServices={showWidgetServices}/>
            <Copyright payment={payment} variant={variant} />
        </footer>
    );
};

export default Footer;
