import cn from 'classnames';
import {Blog} from '@/services/types';
import BlogImage from "@/components/blog/blogCardUI/blog-image";
import BlogDetails from "@/components/blog/blogCardUI/blog-details";
import BlogReadMore from "@/components/blog/blogCardUI/blog-readmore";
import BlogHeading from "@/components/blog/blogCardUI/blog-heading";

interface BlogProps {
    blog: Blog;
    className?: string;
    variant?: string;
}

const BlogCardBig: React.FC<BlogProps> = ({blog, className, variant = "big"}) => {
    return (
        <article className={cn('blog-card overflow-hidden w-full bg-white ', className)}>
            <BlogImage blog={blog} variant={variant}/>

            <div className="justify-center py-5 lg:py-6 relative">
                <BlogHeading blog={blog} useDescription={true}  variant={variant} />

                <div className={'flex flex-col lg:flex-row gap-2 justify-between items-start lg:items-center'}>
                    <BlogDetails blog={blog} useIcon={true} variant={variant} />
                    <BlogReadMore blog={blog} />
                </div>
            </div>
        </article>
    );
};

export default BlogCardBig;
