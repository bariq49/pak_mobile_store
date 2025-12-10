import { useUI } from "@/hooks/use-UI";
import FilterIcon from "@/components/icons/filter-icon";
import { Drawer } from "@/components/common/drawer/drawer";
import motionProps from "@/components/common/drawer/motion";
import FilterSidebar from "@/components/filter/filter-sidebar";
import { getDirection } from "@/utils/get-direction";
import Button from "@/components/shared/button";
import ListBox from "@/components/shared/filter-list-box";

interface Props {
  setViewAs: (value: boolean) => void;
  viewAs: boolean;
}

const TopBar: React.FC<Props> = ({ setViewAs, viewAs }) => {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const dir = getDirection("en");

  return (
    <div className="w-full mb-3 filters-panel bg-white p-2">
      {/* Mobile: View As + Filter side by side */}
      <div className="flex justify-between items-center mb-3 lg:hidden">
        {/* View As */}
        <div className="list-view flex items-center">
          <div className="btn btn-gridview text-15px mr-2">View as:</div>
          <button
            type="button"
            id="grid-5"
            className={`btn btn-view grid ${(viewAs && "active") || ""}`}
            onClick={() => setViewAs(!viewAs)}
          >
            <div>
              <div className="icon-bar"></div>
              <div className="icon-bar"></div>
              <div className="icon-bar"></div>
            </div>
          </button>
          <button
            type="button"
            id="list-view"
            className={`btn btn-view list ${(!viewAs && "active") || ""}`}
            onClick={() => setViewAs(!viewAs)}
          >
            <div>
              <div className="icon-bar"></div>
              <div className="icon-bar"></div>
              <div className="icon-bar"></div>
            </div>
          </button>
        </div>

        {/* Filter Button */}
        <Button
          variant={"border"}
          className="px-5 !py-1.5 !rounded leading-5 !border-black/10"
          onClick={openFilter}
        >
          <FilterIcon />
          <span className="text-sm ltr:pl-2.5 rtl:pr-2.5">Filter</span>
        </Button>
      </div>

      {/* Mobile: Sort By below */}
      <div className="lg:hidden">
        <ListBox
          options={[
            { name: "New arrival", value: "new_arrival" },
            { name: "Best selling", value: "best_selling" },
            { name: "Lowest price", value: "lowest" },
            { name: "Highest price", value: "highest" },
          ]}
        />
      </div>

      {/* Desktop: View As + Sort By side by side */}
      <div className="hidden lg:flex items-center justify-between">
        {/* View As */}
        <div className="list-view flex items-center">
          <div className="btn btn-gridview text-15px mr-2">View as:</div>
          <button
            type="button"
            id="grid-5"
            className={`btn btn-view grid ${(viewAs && "active") || ""}`}
            onClick={() => setViewAs(!viewAs)}
          >
            <div>
              <div className="icon-bar"></div>
              <div className="icon-bar"></div>
              <div className="icon-bar"></div>
            </div>
          </button>
          <button
            type="button"
            id="list-view"
            className={`btn btn-view list ${(!viewAs && "active") || ""}`}
            onClick={() => setViewAs(!viewAs)}
          >
            <div>
              <div className="icon-bar"></div>
              <div className="icon-bar"></div>
              <div className="icon-bar"></div>
            </div>
          </button>
        </div>

        {/* Sort By */}
        <ListBox
          options={[
            { name: "New arrival", value: "new_arrival" },
            { name: "Best selling", value: "best_selling" },
            { name: "Lowest price", value: "lowest" },
            { name: "Highest price", value: "highest" },
          ]}
        />
      </div>

      {/* Drawer - only mobile */}
      <div className="lg:hidden">
        <Drawer
          rootClassName={"filter-drawer"}
          placement={dir === "rtl" ? "right" : "left"}
          open={displayFilter}
          onClose={closeFilter}
          {...motionProps}
        >
          <FilterSidebar />
        </Drawer>
      </div>
    </div>
  );
};

export default TopBar;
