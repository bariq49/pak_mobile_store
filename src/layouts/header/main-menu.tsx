import { BsChevronDown } from "react-icons/bs";
import cn from "classnames";
import { MainMenuType, SubMenuType } from "@/services/types";
import React, { useRef, useState } from "react";
import SubDemo from "@/components/shared/mega/sub-demo";
import ListMenu from "@/components/shared/mega/list-menu";
import SubMega from "@/components/shared/mega/sub-mega";
import Link from "next/link";
import { motion } from "motion/react";

interface MenuProps {
  navigations: MainMenuType[];
  className?: string;
  classLink?: string;
  bgPrimary?: boolean;
}

const MainMenu: React.FC<MenuProps> = ({
  navigations,
  className,
  classLink,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showSubMenu = (id: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenuId(id);
  };

  const hideSubMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMenuId(null);
    }, 3000);
  };

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };
  return (
    <nav className={cn("headerMenu hidden lg:flex", className)}>
      {navigations?.map((item: MainMenuType) => (
        <div
          className={`menuItem group py-3 mx-4 xl:mx-4 2xl:mx-5  ${
            item.type == "mega" || item.type == "demo" ? "" : "relative"
          }`}
          key={item.id}
          onMouseEnter={() => showSubMenu(item.id)}
          onMouseLeave={hideSubMenu}
        >
          <Link
            href={item.path}
            className={cn(
              "uppercase text-brand-light inline-flex items-center  text-sm  py-1.5 font-medium relative hover:text-brand-light/90 group-hover:text-brand-light/90 group-hover:before:bg-brand-light",
              classLink
            )}
            onFocus={() => showSubMenu(item.id)}
            onBlur={hideSubMenu}
          >
            {item.label}
            {item?.subMenu && (
              <span className={`text-xs w-4 flex justify-end  opacity-80 `}>
                <BsChevronDown className="transition duration-300 ease-in-out transform" />
              </span>
            )}
          </Link>

          {item?.subMenu && activeMenuId === item.id && (
            <motion.div
              className={cn(
                " drop-shadow-dropDown  bg-white  z-30 absolute start-0 top-full ",
                !item?.type ? "subMenu w-[250px] " : "subMega w-full"
              )}
              variants={animationVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                switch (item?.type) {
                  case "mega":
                    return <SubMega item={item} />;
                  case "demo":
                    return <SubDemo item={item} />;
                  default:
                    return (
                      <ul className="py-3 text-sm">
                        {item.subMenu.map(
                          (menu: SubMenuType, index: number) => {
                            const dept: number = 1;
                            const menuName: string = `sidebar-menu-${dept}-${index}`;

                            return (
                              <ListMenu
                                dept={dept}
                                data={menu}
                                hasSubMenu={!!menu.subMenu}
                                menuName={menuName}
                                key={menuName}
                                menuIndex={index}
                              />
                            );
                          }
                        )}
                      </ul>
                    );
                }
              })()}
            </motion.div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default MainMenu;
