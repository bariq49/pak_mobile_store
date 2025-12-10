import Link from "@/components/shared/link";
import { FaChevronDown } from "react-icons/fa";
import cn from "classnames";
import { useWishlist } from "@/hooks/use-wishlist";
import { MenutopType } from "@/services/types";
import { useIsMounted } from "@/utils/use-is-mounted";

interface MenuProps {
  data?: MenutopType[];
  className?: string;
  variant?: string;
}

const HeaderMenutop: React.FC<MenuProps> = ({ data, className }) => {
  const { wishlistList } = useWishlist();
  const mounted = useIsMounted();

  return (
    <nav className={cn("flex relative", className)}>
      {data?.map((item: any) => (
        <div
          className={`menuItem cursor-pointer mx-2 md:mx-3 ${
            item.subMenu ? "relative" : ""
          }`}
          key={item.id}
        >
          <Link href={item.path}>
            {item.label}
            {item.label === "Wishlist" &&
              mounted &&
              ` (${wishlistList.length})`}

            {item.subMenu && (
              <span
                className={cn(
                  "text-xs mt-1 xl:mt-0.5 w-4 flex justify-end opacity-40"
                )}
              >
                <FaChevronDown className="group-hover:-rotate-180" />
              </span>
            )}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenutop;
