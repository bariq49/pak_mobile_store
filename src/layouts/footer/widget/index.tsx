import WidgetLink from "./widget-link";
import WidgetAbout from "./widget-about-us";
import Container from "@/components/shared/container";
import { footerSettings } from "@/data/footer-settings";
import React from "react";

interface WidgetsProps {
  widgets: {
    id: number;
    widgetTitle: string;
    lists?: {
      id: number;
      path: string;
      title: string;
    }[];
  }[];
}

const Widgets: React.FC<WidgetsProps> = ({ widgets }) => {
  const { social } = footerSettings;

  return (
    <Container variant="Large">
      <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 pb-14 pt-5 md:pt-15 -mt-5.5">
        <WidgetAbout
          social={social}
          className="col-span-full sm:col-span-1 md:col-span-3"
        />

        {widgets?.slice(0, 4)?.map((widget) => (
          <WidgetLink
            key={`footer-widget--key${widget.id}`}
            data={widget}
            className="col-span-1 md:col-span-2"
          />
        ))}
      </div>
    </Container>
  );
};

export default Widgets;
