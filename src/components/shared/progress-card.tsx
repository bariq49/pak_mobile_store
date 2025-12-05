
interface Props {
    soldProduct?: number;
    totalProduct?: number;
    className?: string;
}

const ProgressCard: React.FC<Props> = ({
                                           soldProduct = 0,
                                           totalProduct = 0,
                                           className = '',
                                       }) => {
    const progressBar = (100 / totalProduct) * soldProduct;
    return (
      <div className={`w-full ${className}`}>
        <div className="relative w-full h-2.5  bg-gray-300 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-red-500 rounded-full bg-opacity-90 "
            style={{ width: `${Math.round(progressBar)}%` }}
          />
        </div>
        <div className="flex items-center mt-2.5 md:mt-3 xl:mt-2.5 2xl:mt-3.5">
          <div className="text-brand-dark text-sm">
              Sold :&nbsp;
            <span className="text-black font-semibold">
              {soldProduct}/{totalProduct} &nbsp;
            </span>
              Products
          </div>
        </div>
      </div>
    );
};

export default ProgressCard;
