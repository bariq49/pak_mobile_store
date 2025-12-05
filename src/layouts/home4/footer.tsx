import Widgets from '@/layouts/footer/widget';
import Copyright from '@/layouts/footer/copyright';
import {footerSettings} from '@/data/footer-settings';
import React from "react";
import cn from "classnames";
import WidgetSignup from "@/layouts/footer/widget/widget-signup";
import useWindowSize from "@/utils/use-window-size";

const {widgets, payment} = footerSettings;

interface FooterProps {
    variant?: string;
    className?: string;
    showWidgetServices?: boolean;
    showWidgetSubscription?: boolean;
}


function getImage(deviceWidth: number, imgObj: any) {
    return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

const Footer: React.FC<FooterProps> = ({variant = 'default',className,showWidgetServices = false, showWidgetSubscription = false}) => {
    const {width} = useWindowSize();
    const imageFooter ={
        mobile: {
            url: '/assets/images/footer/bg_footer_mobile_h8.jpg',
        },
        desktop: {
            url: '/assets/images/footer/bg_footer_h8.jpg',
        },
    }
    const selectedImage = getImage(width!, imageFooter);
    
    // Conditionally apply the backgroundImage style
    const backgroundStyle =
        variant === 'home8' && selectedImage?.url ? { backgroundImage: `url(${selectedImage.url})` } : {};
   
    return (
        <footer className={cn(
            'border-t border-black/10', {
                'bg-fill-two': variant === 'home7',
                [`bg-[#272727] bg-repeat-x  bg-bottom`]: variant === 'home8',
            },
            className
        )}
             style={backgroundStyle}
        >
            <WidgetSignup variant={variant} className={'newsletterFooter items-center p-4 pt-10 md:pt-16'}/>
            <Widgets widgets={widgets} variant={variant}  showWidgetServices={showWidgetServices} showWidgetSubscription={showWidgetSubscription}/>
            <Copyright payment={payment} variant={variant} />
        </footer>
    );
};

export default Footer;
