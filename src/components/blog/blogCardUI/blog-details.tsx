import {Blog} from "@/services/types";
import React from "react";
import {getCountview} from "@/utils/get-countview";
import {BsClock} from "react-icons/bs";
import cn from "classnames";
interface BlogProps {
    blog: Blog;
    variant?: string;
    useIcon?: boolean;
}
const BlogDetails: React.FC<BlogProps> = ({ blog, variant="default",useIcon }) => {
    const {date,  totalWatchCount} = blog;
    return (
        <div className={cn("entry-meta text-13px text-gray-400 flex",{
                "justify-center": variant === "default" || variant === "list",
                "justify-start": variant === "big",
            }
            )}>
            <span className="post-on pe-2.5 relative flex items-center gap-1.5">
                 {useIcon && <BsClock className="transition "/>}
                {date}
            </span>
            <span className="has-dot px-2.5 relative inline-block">{getCountview(totalWatchCount)} View</span>
            <span className="has-dot ps-2.5 relative inline-block">4 mins read</span>
        </div>
    );
}
export default BlogDetails;