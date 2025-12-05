'use client';

import cn from 'classnames';
import Image from '@/components/shared/image';
import Link from '@/components/shared/link';

import { productPlaceholder } from '@/assets/placeholders';
import { ROUTES } from '@/utils/routes';
import { getCountview } from '@/utils/get-countview';
import LabelIcon from '@/components/icons/label-icon';
import TagLabel from '@/components/shared/tag-label';
import SocialShareThis from '@/components/shared/share-this';
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";
import {Blog, Tag} from "@/services/types";

interface BlogProps {
  blogData: Blog;
  className?: string;
}

const BlogPostCard: React.FC<BlogProps> = ({ blogData, className }) => {
  const {
    title,
    image,
    totalWatchCount,
    slug,
    date,
    category,
    tags,
    authorName,
    content,
    titleTwo,
    contentTwo,
    contentThree,
    quote,
  } = blogData ?? {};
  const blogUrl = `${ROUTES.BLOG}/${slug}`;
  const { selectedColor } = usePanel();
  
  return (
    <article
      className={cn(
        'flex flex-col product-card overflow-hidden  h-full ',
        className
      )}
      title={title}
    >
      <div className="pb-5 h-full relative">
        <div className={cn("text-base font-semibold mb-2.5 text-skin-primary",colorMap[selectedColor].link)}>
          {category}
        </div>
        <h4 className={'font-bold text-brand-dark text-2xl lg:text-3xl mb-3.5 '}>
          <Link
            href={{pathname:`${ROUTES.BLOG}/${slug}`}}
            className={cn("text-skin-base line-clamp-2 ",colorMap[selectedColor].hoverLink)}
          >
            {title}
          </Link>
        </h4>
        <div className="entry-meta text-13px text-gray-500">
          <span className="post-by pe-2.5 relative inline-block">
            By {authorName}
          </span>
          <span className="has-dot px-2.5 relative inline-block">
            {date}
          </span>
          <span className="has-dot px-2.5 relative inline-block">
            {getCountview(totalWatchCount)} Views
          </span>
          <span className="has-dot ps-2.5 relative inline-block">
            4 mins read
          </span>
        </div>
      </div>
      <div className="relative mb-10">
        <Link
          href={{pathname:`${ROUTES.BLOG}/${slug}`}}
          className="text-skin-base "
        >
          <div className="card-img-container rounded-xl max-w-[1050px] overflow-hidden flex mx-auto relative ">
            <Image
              src={image ?? productPlaceholder}
              alt={title || 'Product Image'}
              width={1050}
              height={460}
              className="object-cover bg-skin-thumbnail"
            />
          </div>
        </Link>
      </div>
      <div className="single-content text-sm sm:text-15px text-body leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7 mb-10">
        <p>{content}</p>
        <h3 className="mt-8 mb-3 text-[20px] text-skin-base font-medium truncate">
          {titleTwo}
        </h3>
        <p>{contentTwo}</p>
        <blockquote
          className={
            'lg:max-w-[80%] my-10 mx-auto rounded-xl text-gray-600 bg-[#f4f6fa] text-lg md:text-[22px] px-4 py-4 lg:px-12 lg:py-8'
          }
        >
          {quote?.content}
        </blockquote>
        <p>{contentThree}</p>
      </div>
      <hr className="w-full border-border-base mb-6" />
      <div
        className={
          'entry-bottom by-5 flex flex-col gap-3 md:flex-row justify-between'
        }
      >
        <div className={`tags`}>
          {Array.isArray(tags) && (
            <ul className="pt-0">
              <li className="text-sm text-skin-base text-opacity-80 inline-flex items-center justify-center me-2 relative top-1">
                <LabelIcon className="me-2" /> You can pay with:
              </li>
              {tags?.map((item: Tag) => (
                <li className="inline-block p-[3px]" key={`tag-${item.id}`}>
                  <TagLabel data={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={`social-icons single-share`}>
          <SocialShareThis
            className={`flex items-center opacity-100 top-full`}
            shareUrl={blogUrl}
          />
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
