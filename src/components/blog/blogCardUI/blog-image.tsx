import {Blog} from "@/services/types";
import React, {useMemo} from "react";
import Link from "@/components/shared/link";
import {ROUTES} from "@/utils/routes";
import Image from "@/components/shared/image";
import {productPlaceholder} from "@/assets/placeholders";

interface BlogProps {
    blog: Blog;
    variant?: string;
}
const BlogImage: React.FC<BlogProps> = ({ blog, variant="default" }) => {
    const {title, image, slug} = blog;
    const imgSize = useMemo(() => {
        switch (variant) {
            case 'big':
                return {width:1040, height:430};
            case 'list':
                return {width:530, height:300};
            default:
                return {width:420, height:330};
        }
    }, [variant]);
    return (
        <div className="relative flex-shrink-0 ">
            <Link
                href={`${ROUTES.BLOG}/${slug}`}
                className="text-brand-dark "
            >
                <div
                    className="card-img-container flex overflow-hidden rounded-xl relative hover:opacity-80">
                    <Image
                        src={image ?? productPlaceholder}
                        alt={title || 'Product Image'}
                        width={imgSize.width}
                        height={imgSize.height}
                        className="object-cover bg-skin-thumbnail"
                    />
                </div>
            </Link>
        </div>
    );
}
export default BlogImage;