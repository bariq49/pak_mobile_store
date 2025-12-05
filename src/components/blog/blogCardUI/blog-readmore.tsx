import {Blog} from "@/services/types";
import React from "react";
import Link from "@/components/shared/link";
import {ROUTES} from "@/utils/routes";
import cn from "classnames";
import {colorMap} from "@/data/color-settings";
import {usePanel} from "@/hooks/use-panel";
import {BsArrowRight} from "react-icons/bs";

interface BlogProps {
    blog: Blog;
    variant?: string;
}
const BlogReadMore: React.FC<BlogProps> = ({ blog, variant="default" }) => {
    const { slug} = blog;
    const { selectedColor } = usePanel();
    return (
        <Link
            href={`${ROUTES.BLOG}/${slug}`}
            className={cn(" rounded text-brand-light px-4 lg:px-5 py-2 xs:hover:text-brand-light text-13px flex items-center gap-1.5",
                colorMap[selectedColor].bg,
                colorMap[selectedColor].hoverBg,
            )}
        >
            Read More
            <BsArrowRight className={`rtl:rotate-180`}/>
        </Link>
    );
}
export default BlogReadMore;