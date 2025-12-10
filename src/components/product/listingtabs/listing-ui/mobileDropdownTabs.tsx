import { useState, useMemo } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Category } from "@/services/types";

const MobileDropdownTabs = ({
  childrenData,
  onNavClick,
  activeTab,
}: {
  childrenData: Category[];
  onNavClick: (slug: string) => void;
  activeTab: string;
}) => {
  const [categoryMenu, setCategoryMenu] = useState(false);
  // Determine the selected tab name
  const activeTabLabel = useMemo(() => {
    const active = childrenData.find((cat) => cat.slug === activeTab);
    return active?.name || childrenData[0]?.name;
  }, [activeTab, childrenData]);

  return (
    <div className="block xl:hidden ltabs-tabs-wrap relative z-10">
      <button
        className="flex justify-between bg-white border border-black/10 rounded-md min-w-[170px] focus:outline-none text-sm px-3 py-2 mt-2 mb-1"
        onClick={() => setCategoryMenu(!categoryMenu)}
      >
        <span className="inline-flex me-2.5">{activeTabLabel}</span>
        <FiChevronDown className="text-xl lg:text-2xl" />
      </button>

      {categoryMenu && (
        <div
          id="dropdown"
          className="z-10 w-44 bg-white rounded drop-shadow absolute"
        >
          <ul className="py-2 text-[14px] leading-6">
            {childrenData.slice(0, 4).map((currentItem, idx) => (
              <li className={"hover:text-primary-500"} key={`${idx}`}>
                <button
                  onClick={() => {
                    onNavClick(currentItem.slug);
                    setCategoryMenu(false);
                  }}
                  className="py-2 px-4 block whitespace-no-wrap"
                >
                  {currentItem.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileDropdownTabs;
