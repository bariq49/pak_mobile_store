import cn from 'classnames';
import MinusIcon from '@/components/icons/minus-icon';
import PlusIcon from '@/components/icons/plus-icon';

type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>
) => void;

type CounterProps = {
  value?: number;
  variant?: 'mercury' | 'cart' | 'single' | 'furni';
  onDecrement: ButtonEvent;
  onIncrement: ButtonEvent;
  className?: string;
  disabled?: boolean;
};

const Counter: React.FC<CounterProps> = ({
  value,
  variant = 'mercury',
  onDecrement,
  onIncrement,
  className,
  disabled,
}) => {
  const size = variant === 'single' ? '15' : '13';
  return (
    <div
      className={cn(
        'button--mutiqty  flex items-center justify-between  overflow-hidden shrink-0 ',
        {
          'h-8 md:h-10 bg-brand drop-shadow-counter rounded-3xl':
            variant === 'mercury' || variant === 'furni',
          'rounded h-11 4 bg-gray-100 w-32 mb-5': variant === 'single',
          'inline-flex rounded-sm p-1 bg-neutral-100 dark:bg-neutral-700/50': variant === 'cart',
        },
        className
      )}
    >
      <button
        onClick={onDecrement}
        className={cn(
          'flex items-center justify-center shrink-0 transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none',
          {
            'w-8 md:w-12 h-8 rounded-2xl text-white text-heading ms-1':
              variant === 'mercury' || variant === 'furni',
            '!w-6 !h-6  text-brand-dark  ltr:ml-auto rtl:mr-auto':
              variant === 'single',
            '!w-6 !h-6 pr-0  text-brand-dark  ':
              variant === 'cart',
          }
        )}
      >
        <span className="sr-only">{('button-minus')}</span>
        <MinusIcon width={size} height={size} opacity="1" />
      </button>
      <span
        className={cn(
          'font-semibold flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default shrink-0',
          {
            'text-sm md:text-base w-6 text-white':
              variant === 'mercury' || variant === 'furni',
            'text-base text-brand-dark md:text-[15px] w-12 ': variant === 'single',
            'text-[13px] w-9': variant === 'cart',
          }
        )}
      >
        {value}
      </span>
      <button
        onClick={onIncrement}
        disabled={disabled}
        className={cn(
          'group flex items-center justify-center flex-shrink-0 transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none',
          {
            'w-8 md:w-12 h-8 rounded-2xl text-heading text-white me-1':
              variant === 'mercury' || variant === 'furni',
            '!w-8 !h-8  lg:scale-100 text-brand-dark ltr:mr-auto rtl:ml-auto !pr-0 justify-center':
              variant === 'single',
            '!w-6 !h-6  text-brand-dark  !pr-0':
              variant === 'cart',
              'cursor-not-allowed opacity-50 ':
              disabled,
          }
        )}
        title={disabled ? 'Out Of Stock' : ''}
      >
        <span className="sr-only">{('button-plus')}</span>
        <PlusIcon width={size} height={size} opacity="1" />
      </button>
    </div>
  );
};

export default Counter;
