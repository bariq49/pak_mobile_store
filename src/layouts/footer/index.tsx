import Widgets from "@/layouts/footer/widget";
import Copyright from "@/layouts/footer/copyright";
import { footerSettings } from "@/data/footer-settings";
import React from "react";
import cn from "classnames";
import WidgetSignup from "@/layouts/footer/widget/widget-signup";

const { widgets, payment } = footerSettings;

interface FooterProps {
  variant?: string;
  className?: string;
  showWidgetServices?: boolean;
  showWidgetSubscription?: boolean;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <>
      <WidgetSignup className="newsletterFooter items-center" />
      <footer className={cn("bg-fill-one", className)}>
        <Widgets widgets={widgets} />
        <Copyright payment={payment} />
      </footer>
    </>
  );
};

export default Footer;
