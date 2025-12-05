import cn from 'classnames';
import BlogImage from "@/components/blog/blogCardUI/blog-image";
import BlogHeading from "@/components/blog/blogCardUI/blog-heading";
import BlogDetails from "@/components/blog/blogCardUI/blog-details";
import {Blog} from "@/services/types";

interface BlogProps {
    blog: Blog;
    className?: string;
}


const BlogCard: React.FC<BlogProps> = ({blog, className}) => {
    return (
        <article className={cn('flex flex-col product-card overflow-hidden  h-full bg-white rounded', className )}>
            <BlogImage blog={blog}/>
            <div className="flex flex-col py-5 px-5 h-full overflow-hidden text-center relative">
                <BlogHeading blog={blog} useCategory={true}/>
                <BlogDetails blog={blog} />
            </div>
        </article>
    );
};

export default BlogCard;
