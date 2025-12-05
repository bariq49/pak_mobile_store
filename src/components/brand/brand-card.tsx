'use client';
import Image from '@/components/shared/image';
import Link from '@/components/shared/link';

import { collectionPlaceholder } from '@/assets/placeholders';

interface Props {
  imgWidth?: number | string;
  imgHeight?: number | string;
  collection: {
    image: string;
    title: string;
    href: string;
  };
}

const BrandCard: React.FC<Props> = ({
  collection,
  imgWidth = 200,
  imgHeight = 65,
}) => {
  const { image, title, href } = collection;
  return (
      <Link
          href={href}
          className="flex flex-col overflow-hidden  group  relative"
      >
        <Image
            src={image ?? collectionPlaceholder}
            alt={title || ('text-card-thumbnail')}
            width={imgWidth as number}
            height={imgHeight as number}
            className="rounded-lg object-cover transition duration-300 ease-in-out transform bg-fill-thumbnail group-hover:opacity-90 group-hover:scale-105"
        />

      </Link>
  );
};

export default BrandCard;
