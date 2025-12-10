
import {FC} from "react";
import CategoriesSidebar from "@/components/blog/categories";
import RecentPosts from "@/components/blog/recent-posts";

export const BlogSidebar: FC = () => {
  return (
    <div className="space-y-6">
      {/* <CategoriesSidebar /> */}
      <RecentPosts />
    </div>
  );
};
