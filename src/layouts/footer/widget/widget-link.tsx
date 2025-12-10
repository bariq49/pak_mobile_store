"use client";
import Heading from "@/components/shared/heading";
import Link from "@/components/shared/link";
import cn from "classnames";

interface Props {
  className?: string;
  data: {
    id: number;
    widgetTitle: string;
    lists?: {
      id: number | undefined;
      path: string | undefined;
      title: string | undefined;
    }[];
  };
}

const WidgetLink: React.FC<Props> = ({ className, data }) => {
  const { widgetTitle, lists } = data;

  return (
    <div className={cn("text-fill-footer", className)}>
      <Heading
        variant="mediumHeading"
        className={cn("text-brand-light mb-4 lg:mb-5")}
      >
        {widgetTitle}
      </Heading>
      <ul className="text-sm lg:text-14px flex flex-col space-y-1">
        {lists?.map((list) => (
          <li key={`widget-list--key${list.id}`}>
            <Link
              href={`${list.path ? list.path : ""}`}
              className={cn(
                "leading-7 transition-colors duration-200 block text-brand-light/80 hover:text-brand-muted"
              )}
            >
              {list.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetLink;
