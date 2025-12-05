import Filters from '@/components/filter/filters';
import Scrollbar from '@/components/shared/scrollbar';
import { useUI } from '@/hooks/use-UI';
import { IoArrowBack } from 'react-icons/io5';

import Heading from '@/components/shared/heading';

const FilterSidebar = () => {
  const { closeFilter } = useUI();
  return (
    <div className="flex flex-col  w-full h-full">
      <div className="w-full border-b border-border-base flex justify-between items-center relative ltr:pr-5 rtl:pl-5 md:ltr:pr-7 md:rtl:pl-7 shrink-0 py-0.5">
        <button
          className="flex items-center justify-center px-4 py-3 text-2xl transition-opacity  focus:outline-none hover:opacity-60"
          onClick={closeFilter}
          aria-label="close"
        >
            <IoArrowBack className="text-brand-dark rtl:rotate-180" />
        </button>
        <Heading
          variant="title"
          className="w-full text-center "
        >
          Product Filters
        </Heading>
      </div>

      <Scrollbar className="flex-grow mb-auto menu-scrollbar">
        <div className="p-4 lg:p-6">
          <Filters  />
        </div>
      </Scrollbar>

     
    </div>
  );
};

export default FilterSidebar;
