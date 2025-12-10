import cn from "classnames";
import { useState } from "react";
import {
  IoIosAddCircleOutline,
  IoIosArrowForward,
  IoIosRemoveCircleOutline,
} from "react-icons/io";

import Image from "@/components/shared/image";
import SubMegaVertical from "@/components/shared/mega/sub-mega-vertical";
import Link from "next/link";

function SidebarMenuItem({ className, item, depth = 0, parentSlug = "" }: any) {
  const { name, children: items, icon, type, slug } = item;
  const fullSlug = parentSlug ? `${parentSlug}/${slug}` : slug;

  return (
    <li
      className={cn(
        "flex flex-col transition hover:bg-background",
        type !== "mega" ? "relative" : "",
        className ? className : "text-sm px-3.5 2xl:px-4"
      )}
    >
      <Link
        href={`/department/${fullSlug}`}
        className={cn(
          "flex items-center w-full py-3 text-start outline-none focus:outline-none focus:ring-0",
          {
            [`text-brand-muted border-b border-border-base hover:text-primary-500`]:
              depth === 0,
          }
        )}
      >
        {icon && (
          <div className="inline-flex w-8 shrink-0 3xl:h-auto">
            <Image
              src={icon ?? "/assets/placeholder/category-small.svg"}
              alt={name}
              width={25}
              height={25}
            />
          </div>
        )}
        <span className="capitalize">{name}</span>
        {items && (
          <span className="hidden ltr:ml-auto rtl:mr-auto md:inline-flex">
            <IoIosArrowForward className="text-15px text-brand-dark opacity-40 rtl:rotate-180" />
          </span>
        )}
      </Link>

      {Array.isArray(items) ? (
        <>
          {type !== "mega" ? (
            <div
              className={`dropdownMenu absolute top-0 z-10 invisible hidden w-full border opacity-0 md:block left-full bg-white border-border-base subMenu--level${depth} drop-shadow-dropDown`}
            >
              <ul key="content" className="py-3">
                {items.map((currentItem) => {
                  const childDepth = depth + 1;
                  return (
                    <SidebarMenuItem
                      key={`${currentItem.name}${currentItem.slug}`}
                      item={currentItem}
                      depth={childDepth}
                      parentSlug={fullSlug}
                      className={cn(
                        "text-sm px-3 ltr:pl-4 rtl:pr-4 text-brand-muted hover:text-primary-500"
                      )}
                    />
                  );
                })}
              </ul>
            </div>
          ) : (
            <SubMegaVertical items={items} />
          )}
        </>
      ) : null}
    </li>
  );
}

function SidebarMenu({ items, className, categoriesLimit }: any) {
  const [categoryMenuToggle, setcategoryMenuToggle] = useState(false);

  function handleCategoryMenu() {
    setcategoryMenuToggle(!categoryMenuToggle);
  }

  return (
    <ul
      className={cn(
        "w-full bg-brand-light relative border-t-0 border-2 rounded-b-md category-dropdown-menu border-border-base",
        className
      )}
    >
      {items?.map((item: any, idx: number) =>
        idx <= categoriesLimit - 1 ? (
          <SidebarMenuItem
            key={`${item.slug}-key-${item.id}`}
            item={item}
            parentSlug=""
          />
        ) : (
          categoryMenuToggle && (
            <SidebarMenuItem
              key={`${item.slug}-key-${item.id}`}
              item={item}
              parentSlug=""
            />
          )
        )
      )}

      {items.length >= categoriesLimit && (
        <li className={`px-4 relative transition text-sm hover:text-brand`}>
          <div
            className={`flex items-center w-full py-3 text-start cursor-pointer text-brand-dark`}
            onClick={handleCategoryMenu}
          >
            <div className={`inline-flex flex-shrink-0 ltr:mr-2 rtl:ml-2`}>
              {categoryMenuToggle ? (
                <IoIosRemoveCircleOutline className="text-xl text-brand-dark text-opacity-80" />
              ) : (
                <IoIosAddCircleOutline className="text-xl text-brand-dark text-opacity-80" />
              )}
            </div>
            <span className="capitalize">Browse All Categories</span>
          </div>
        </li>
      )}
    </ul>
  );
}

export default SidebarMenu;
