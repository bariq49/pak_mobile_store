import cn from "classnames";
import { Category } from "@/services/types";

const DesktopTabs = ({
  childrenData,
  activeTab,
  onNavClick,
}: {
  childrenData: Category[];
  activeTab: string | null;
  onNavClick: (slug: string) => void;
}) => {
  return (
    <div className="ltabs-tabs-wrap flex flex-wrap justify-end xl:basis-[70%]">
      <ul className="flex text-sm">
        {childrenData.slice(0, 4).map((currentItem, idx) => (
          <li
            className={`ps-2 ${
              activeTab === currentItem.slug
                ? "text-skin-primary"
                : "text-fill-base "
            }`}
            key={`${idx}`}
          >
            <button
              onClick={() => onNavClick(currentItem.slug)}
              className={cn(
                "px-4 py-2 rounded-full",
                activeTab === currentItem.slug
                  ? `bg-primary-500 text-brand-light`
                  : `text-gray-700 hover:text-primary-500`
              )}
            >
              {currentItem.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DesktopTabs;
