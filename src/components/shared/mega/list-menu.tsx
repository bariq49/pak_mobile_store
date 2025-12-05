import {IoIosArrowForward} from 'react-icons/io';
import Link from '@/components/shared/link';
import cn from "classnames";
import {SubMenuType} from "@/services/types";
import React from "react";

interface ListMenuProps {
    dept: number;
    data: SubMenuType;
    hasSubMenu: boolean;
    menuIndex: number;
    menuName?: string;
}

const ListMenu: React.FC<ListMenuProps> = ({dept, data, hasSubMenu, menuIndex}) => {
    return (
        <li className="relative">
            <Link
                href={data.path}
                className={cn("flex items-center justify-between py-1 ps-6 pe-3  ")}
            >
                <span className={"reversed-links py-1"}> {data.label}</span>
                {data.subMenu && (
                    <span className="text-sm mt-0.5 shrink-0">
              <IoIosArrowForward
                  className="text-body transition duration-300 ease-in-out group-hover:text-brand-dark rtl:rotate-180"/>
          </span>
                )}
            </Link>
            {hasSubMenu && data.subMenu && (
                <SubMenu
                    dept={dept}
                    data={data.subMenu}
                    menuIndex={menuIndex}
                />
            )}
        </li>
    );
};

interface SubMenuProps {
    dept: number;
    data: SubMenuType[];
    menuIndex: number;
}

const SubMenu: React.FC<SubMenuProps> = ({dept, data, menuIndex}) => {
    const nextDept = dept + 1;
    return (
        <ul className="absolute z-0 invisible w-56 py-3  transition-all duration-300 opacity-0 subMenuChild drop-shadow-subMenu bg-white ltr:right-full rtl:left-full 2xl:ltr:right-auto 2xl:rtl:left-auto 2xl:ltr:left-full 2xl:rtl:right-full top-4">
            {data?.map((menu: SubMenuType, index: number) => {
                const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;
                return (
                    <ListMenu
                        dept={nextDept}
                        data={menu}
                        hasSubMenu={!!menu.subMenu}
                        menuName={menuName}
                        key={menuName}
                        menuIndex={index}
                    />
                );
            })}
        </ul>
    );
};

export default ListMenu;
