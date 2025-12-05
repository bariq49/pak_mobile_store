import React from 'react';
import Link from "next/link";
import Image from '@/components/shared/image';
import { ROUTES } from '@/utils/routes';
import { categoryPlaceholder } from '@/assets/placeholders';

interface Props {
    slug: string;
    name: string;
    bannerUrl: string;
}

const ListingBanner: React.FC<Props> = ({ slug, name, bannerUrl }) => (
    <div className="hidden xl:flex xl:w-[246px]">
        <Link href={`${ROUTES.CATEGORY}/${slug}`} title={name || 'Product Image'}>
            <div className="card-img-container flex overflow-hidden relative">
                <Image
                    src={bannerUrl ?? categoryPlaceholder}
                    alt={name || 'Product Image'}
                    width={246}
                    height={350}
                />
            </div>
        </Link>
    </div>
);

export default ListingBanner;
