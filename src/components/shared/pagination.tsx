import RCPagination, { PaginationProps } from "rc-pagination";

const Pagination: React.FC<PaginationProps> = (props) => {
  return <RCPagination {...props} />;
};

export default Pagination;
