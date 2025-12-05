'use client';

import Heading from '@/components/shared/heading';
import cn from 'classnames';

import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  XIcon,
} from 'react-share';

interface Props {
  className?: string;
  shareUrl: string;
}



const SocialShareThis: React.FC<Props> = ({
  className = '',
  shareUrl,
}) => {
  return (
    <div className={cn('', className)}>
      <Heading className="text-gray-500 pe-3 sm:text-sm font-normal">
        Share this:
      </Heading>
      <div className="flex items-center flex-wrap space-x-2 ">
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon
            size={32}
            round
            className="transition-all hover:opacity-90"
          />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl}>
          <XIcon
            size={32}
            round
            className="transition-all hover:opacity-90"
          />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} separator=":: ">
          <WhatsappIcon
            size={32}
            round
            className="transition-all hover:opacity-90"
          />
        </WhatsappShareButton>
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon
            size={32}
            round
            className="transition-all hover:opacity-90"
          />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default SocialShareThis;
