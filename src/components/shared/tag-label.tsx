import { Tag } from '@/services/types';
import cn from 'classnames';
import { ROUTES } from '@/utils/routes';
import { useRouter } from 'next/navigation';

interface Props {
  data: Tag;
  className?: string;
}

const TagLabel: React.FC<Props> = ({ className, data }) => {
  const { name } = data;
  const router = useRouter();
  function changeTags() {
    router.push(ROUTES.BLOG);
  }
  return (
    <div
      className={cn(
        'text-sm rounded  block border border-border-one px-2 py-1 cursor-pointer',
        className
      )}
      role="button"
      onClick={changeTags}
    >
      {name}
    </div>
  );
};

export default TagLabel;
