import cn from 'classnames';
import {Blog} from '@/services/types';
import BlogImage from "@/components/blog/blogCardUI/blog-image";
import BlogHeading from "@/components/blog/blogCardUI/blog-heading";
import BlogDetails from "@/components/blog/blogCardUI/blog-details";

interface BlogProps {
    blog: Blog;
    className?: string;
    variant?: string;
}

const BlogCardList: React.FC<BlogProps> = ({blog, className,variant = "list"}) => {
    return (
        <article className={cn('flex flex-col sm:flex-row blog-card overflow-hidden w-full bg-white  ',className)}>
            <BlogImage blog={blog} variant={variant}/>

            <div className="flex flex-col justify-center text-center py-5 px-5 sm:px-8  overflow-hidden relative">
                <BlogHeading blog={blog} useCategory={true} useDescription={true}  variant={variant} />
                <BlogDetails blog={blog} useIcon={true} variant={variant} />
            </div>
        </article>
    );
};

export default BlogCardList;
