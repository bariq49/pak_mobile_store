import Link from "@/components/shared/link";
import cn from "classnames";

function SidebarMenuItem({ className, item, depth = 0 }: any) {
  const { name, children: items, icon, type } = item;
  return (
    <>
      <li
        className={`relative transition  ${className ? className : "text-sm "}`}
      >
        <Link
          href={`/department/category/${item.slug}` || "/"}
          className={`flex items-center w-full hover:ps-3  ${
            items ? "font-semibold" : " "
          }`}
        >
          <span className="capitalize ">{name}</span>
        </Link>
        {Array.isArray(items) && (
          <div
            className={`subMenuChild w-full py-1 subMega--level${depth} ${
              depth > 1 && " hidden "
            }`}
          >
            <ul key="content" className="text-sm">
              {items?.map((currentItem) => {
                const childDepth = depth + 1;
                return (
                  <SidebarMenuItem
                    key={`${currentItem.name}${currentItem.slug}`}
                    item={currentItem}
                    depth={childDepth}
                    className={cn(
                      "text-sm text-brand-dark hover:text-primary-500"
                    )}
                  />
                );
              })}
            </ul>
          </div>
        )}
      </li>
    </>
  );
}

const SubMegaVertical = ({ items }: any) => {
  const depth = 0;
  return (
    <div className="dropdownMenu hidden md:block absolute z-10 left-full top-0 w-[800px] bg-white opacity-0 invisible drop-shadow-dropDown">
      <ul
        key="content"
        className="text-xs ps-7 px-5 py-4 grid grid-cols-3 gap-4"
      >
        {items?.map((currentItem: { name: any; slug: any }) => {
          const childDepth = depth + 1;
          return (
            <SidebarMenuItem
              key={`${currentItem.name}${currentItem.slug}`}
              item={currentItem}
              depth={childDepth}
              className={cn("text-sm  text-brand-dark ")}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default SubMegaVertical;
