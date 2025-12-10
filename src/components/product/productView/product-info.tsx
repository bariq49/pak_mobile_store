import React from "react";
import { Product } from "@/services/types";

interface ProductInfoProps {
  data: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ data }) => {
  // filter only important fields to show here
  const fieldsToShow = ["brand", "model", "origin"];

  const filteredInfo =
    data?.additional_info?.filter((info) =>
      fieldsToShow.includes(info.key.toLowerCase())
    ) || [];

  return (
    <dl className="productView-info text-[14px] leading-8 pb-5 mb-5 border-b border-border-base">
      {filteredInfo?.length > 0 ? (
        filteredInfo.map((info, idx) => (
          <React.Fragment key={idx}>
            <dt className="productView-info-name w-40 float-start capitalize">
              {info.key.replace(/_/g, " ")}:
            </dt>
            <dd className="productView-info-value">{info.value || "N/A"}</dd>
          </React.Fragment>
        ))
      ) : (
        <dd className="text-gray-500">No product information available</dd>
      )}
    </dl>
  );
};

export default ProductInfo;
