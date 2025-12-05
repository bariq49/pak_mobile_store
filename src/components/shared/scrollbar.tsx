import cn from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
type ScrollbarProps = {
    options?: object; // Or a more specific type
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const Scrollbar: React.FC<ScrollbarProps> = ({
  options = {},
  className,
  children,
  style,
  ...props
}) => {
  return (
    <OverlayScrollbarsComponent
        className={cn('os-theme-thin', className)} // Apply className here
      options={{
        scrollbars: {
          autoHide: 'scroll',
        },
        ...options,
      } }
      style={style}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};

export default Scrollbar;
