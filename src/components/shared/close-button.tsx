import { IoClose } from 'react-icons/io5';
import cn from 'classnames';

type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>,
) => void;

interface CloseButtonProps {
  className?: string;
  onClick?: ButtonEvent;
}

const CloseButton: React.FC<CloseButtonProps> = ({ className, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Close Button"
      className={cn(
        'absolute z-10 inline-flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 transition duration-200 text-brand-dark text-opacity-50 focus:outline-none  hover:text-opacity-100 -top-3 md:top-2 lg:top-3  ltr:-right-3 rtl:-left-3 md:ltr:right-2 md:rtl:left-2 lg:ltr:right-3 lg:rtl:left-3  bg-background lg:bg-transparent hover:bg-background rounded-full',
        className,
      )}
    >
      <IoClose className="text-xl lg:text-2xl" />
    </button>
  );
};

export default CloseButton;
