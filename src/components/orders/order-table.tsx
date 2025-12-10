import RCPagination, { PaginationProps } from "rc-pagination";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useState } from "react";
import usePrice from "@/services/product/use-price";

// ----------------- Date Formatter -----------------
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export const CreatedAt: React.FC<{ createdAt: string }> = ({ createdAt }) => (
  <span className="text-gray-500 text-sm">
    {dayjs.utc(createdAt).tz(dayjs.tz.guess()).fromNow()}
  </span>
);

// ----------------- Price Components -----------------
export const TotalPrice: React.FC<{ order?: any }> = ({ order }) => {
  const { price } = usePrice({ amount: order?.totalAmount ?? 0 });
  return <span className="font-semibold text-gray-900">{price}</span>;
};

export const DiscountPrice: React.FC<{ order?: any }> = ({ order }) => {
  const { price } = usePrice({ amount: order?.discount ?? 0 });
  return (
    <span
      className={order?.discount ? "text-red-500 font-medium" : "text-gray-400"}
    >
      {order?.discount ? <>-{price}</> : <>0</>}
    </span>
  );
};

export const DeliveryFee: React.FC<{ order?: any }> = ({ order }) => {
  const { price } = usePrice({ amount: order?.shippingFee ?? 0 });
  return <span className="text-gray-700">{price}</span>;
};

export const SubTotalPrice: React.FC<{ order?: any }> = ({ order }) => {
  const { price } = usePrice({ amount: order?.subtotal ?? 0 });
  return <span className="text-gray-700">{price}</span>;
};

// ----------------- Pagination Wrapper -----------------
const Pagination: React.FC<PaginationProps> = (props) => (
  <RCPagination
    {...props}
    className="flex justify-center items-center space-x-2 mt-6"
    prevIcon={
      <span className="px-3 py-1 rounded-md border bg-gray-100 hover:bg-gray-200 transition">
        <GrPrevious size={12} />
      </span>
    }
    nextIcon={
      <span className="px-3 py-1 rounded-md border bg-gray-100 hover:bg-gray-200 transition">
        <GrNext size={12} />
      </span>
    }
  />
);

// ----------------- Table -----------------
const OrderTable: React.FC<{ orders?: any[] }> = ({ orders = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const countPerPage = 5;

  const updatePage = (p: number) => setCurrentPage(p);

  const paginatedData = orders.slice(
    (currentPage - 1) * countPerPage,
    currentPage * countPerPage
  );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Order History</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Order ID</th>
              <th className="px-4 py-3 text-left font-medium">Subtotal</th>
              <th className="px-4 py-3 text-left font-medium">Shipping Fee</th>
              <th className="px-4 py-3 text-left font-medium">Discount</th>
              <th className="px-4 py-3 text-left font-medium">Total</th>
              <th className="px-4 py-3 text-left font-medium">Order Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((order, index) => (
              <tr
                key={order._id}
                className={`hover:bg-gray-50 transition ${
                  index % 2 === 0 ? "bg-gray-50/30" : "bg-white"
                }`}
              >
                <td className="px-4 py-3 font-mono text-xs text-gray-600">
                  {order._id}
                </td>
                <td className="px-4 py-3">
                  <SubTotalPrice order={order} />
                </td>
                <td className="px-4 py-3">
                  <DeliveryFee order={order} />
                </td>
                <td className="px-4 py-3">
                  <DiscountPrice order={order} />
                </td>
                <td className="px-4 py-3">
                  <TotalPrice order={order} />
                </td>
                <td className="px-4 py-3">
                  <CreatedAt createdAt={order.createdAt} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        current={currentPage}
        onChange={updatePage}
        pageSize={countPerPage}
        total={orders.length}
      />
    </div>
  );
};

export default OrderTable;
