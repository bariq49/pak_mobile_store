interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className = '' }) => {
  return <div className={`border-t border-border-base my-8 ${className}`} />;
};

export default Divider;
