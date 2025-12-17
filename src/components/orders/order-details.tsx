"use client";

import usePrice from "@/services/product/use-price";
import { Order, OrderItem } from "@/services/order/order-api";
import { Printer, ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "@/components/shared/image";
import { productPlaceholder } from "@/assets/placeholders";
import Link from "../shared/link";
import {
  calculateSubtotalWithoutTax,
  calculateTaxTotal,
} from "@/services/utils/cartUtils";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";

// Resolve a displayable image URL for an order item.
// - Uses existing image attachment/string when available.
// - If the backend only sends a product ObjectId for the item image,
//   we fetch the product and derive its image (similar to how cart items get image from product).
const useOrderItemImage = (item: OrderItem) => {
  const [resolvedImage, setResolvedImage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const resolve = async () => {
      // 1) If item already has an image field (attachment-like object or URL string), prefer that.
      const rawImage: any = (item as any).image;

      if (rawImage && typeof rawImage === "object") {
        const candidate =
          rawImage.thumbnail ||
          rawImage.original ||
          rawImage.original2 ||
          null;
        if (!cancelled && candidate) {
          setResolvedImage(candidate);
          return;
        }
      }

      if (typeof rawImage === "string" && rawImage) {
        const looksLikeUrl =
          rawImage.startsWith("http://") ||
          rawImage.startsWith("https://") ||
          rawImage.startsWith("/") ||
          rawImage.includes(".");

        if (!cancelled && looksLikeUrl) {
          setResolvedImage(rawImage);
          return;
        }
      }

      // 2) If the order item contains a populated product object, extract image from it.
      const productField: any = (item as any).product;
      if (productField && typeof productField === "object") {
        const candidateFromObject =
          productField.mainImage ||
          // product.image can be either an attachment object or a direct URL string
          (typeof productField.image === "string"
            ? productField.image
            : productField.image?.thumbnail ||
              productField.image?.original ||
              productField.image?.original2) ||
          null;

        if (!cancelled && candidateFromObject) {
          setResolvedImage(candidateFromObject);
          return;
        }
      }

      // 3) Fallback: if product is just an ObjectId, fetch the product to resolve its image.
      const productId =
        typeof productField === "string" && productField
          ? productField
          : (item as any).productId;

      if (!productId) {
        return;
      }

      try {
        const { data } = await http.get(
          `${API_RESOURCES.PRODUCTS}/${productId}`
        );
        const rawProduct = data?.data?.product ?? data?.data ?? data;
        const productImage =
          rawProduct?.mainImage ||
          (typeof rawProduct?.image === "string"
            ? rawProduct.image
            : rawProduct?.image?.thumbnail ||
              rawProduct?.image?.original ||
              rawProduct?.image?.original2) ||
          null;

        if (!cancelled && productImage) {
          setResolvedImage(productImage);
          return;
        }
      } catch {
        // Silently fall back to placeholder on failure
      }
    };

    resolve();

    return () => {
      cancelled = true;
    };
  }, [item]);

  return resolvedImage;
};

const OrderItemCard = ({ item }: { item: OrderItem }) => {
  const hasBackendDeal =
    typeof item.originalPrice === "number" &&
    item.originalPrice > 0 &&
    typeof item.dealPrice === "number" &&
    item.dealPrice > 0 &&
    item.dealPrice < item.originalPrice;

  const unitAmount = hasBackendDeal
    ? (item.dealPrice as number)
    : item.price;

  const { price: itemTotal } = usePrice({
    amount: unitAmount * item.quantity,
  });

  const resolvedImage = useOrderItemImage(item);
  const imageSrc = resolvedImage ?? productPlaceholder;

  const hasTax =
    typeof (item as any).tax === "number" && (item as any).tax > 0;

  return (
    <div className="flex gap-3 items-start py-2">
      <div className="flex w-16 h-16 border rounded-md border-border-base shrink-0 overflow-hidden bg-gray-50">
        <Image
          src={imageSrc}
          alt={item.name}
          width={64}
          height={64}
          className="object-contain"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-brand-dark text-sm">
          <span className="font-medium">{item.quantity} x </span>
          {item.name}
        </p>
        {hasTax && (
          <span className="text-xs text-gray-500 mt-1 block">
            Includes {(item as any).tax}% tax
          </span>
        )}
      </div>
      <div className="text-brand-dark text-end shrink-0">
        <p className="font-semibold text-sm">{itemTotal}</p>
      </div>
    </div>
  );
};

const OrderDetails: React.FC<{ order: Order; className?: string }> = ({
  order,
  className = "pt-0",
}) => {
  // Derive subtotal (without tax) and total tax from order items to match checkout summary.
  // If backend already provides order-level tax, prefer that.
  const itemsSubtotalWithoutTax = calculateSubtotalWithoutTax(
    order.items as unknown as any[]
  );
  const itemsTaxTotal = calculateTaxTotal(order.items as unknown as any[]);

  const subtotalWithoutTax = itemsSubtotalWithoutTax;
  const taxTotal =
    typeof (order as any).taxTotal === "number"
      ? (order as any).taxTotal
      : typeof (order as any).tax === "number"
      ? (order as any).tax
      : itemsTaxTotal;

  const { price: formattedSubtotal } = usePrice({ amount: subtotalWithoutTax });
  const { price: formattedTaxTotal } = usePrice({ amount: taxTotal });
  const { price: formattedDiscount } = usePrice({ amount: order.discount });
  const { price: formattedShipping } = usePrice({ amount: order.shippingFee });
  const { price: formattedCOD } = usePrice({ amount: order.codFee || 0 });
  const { price: formattedTotal } = usePrice({ amount: order.totalAmount });

  // Derive tax label like "Tax (4%)" when there is a single tax rate across items
  const distinctTaxRates = Array.from(
    new Set(
      order.items
        .map((item) =>
          typeof (item as any).tax === "number" && (item as any).tax > 0
            ? (item as any).tax
            : null
        )
        .filter((v): v is number => v !== null)
    )
  );

  const taxLabel =
    taxTotal > 0 && distinctTaxRates.length === 1
      ? `Tax (${distinctTaxRates[0]}%)`
      : "Tax";

  return (
    <div
      className={`bg-white p-5 md:p-8 border rounded-lg border-border-base ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-2 border-b border-border-base">
        <h2 className="text-lg font-semibold text-brand-dark">Order Summary</h2>
        <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
          <Printer className="w-4 h-4 mr-1" />
          <span>Print</span>
        </button>
      </div>

      {/* Items */}
      <div
        className={`mb-4 pb-2 border-b border-border-base ${
          order.items.length > 2 ? "max-h-60 overflow-y-auto pr-2" : ""
        }`}
      >
        {order.items.length === 0 ? (
          <p className="py-4 text-center text-gray-500">
            No items in this order.
          </p>
        ) : (
          order.items.map((item, index) => (
            <OrderItemCard key={index} item={item} />
          ))
        )}
      </div>

      {/* Coupon */}
      {order.coupon?.code && (
        <div className="space-y-3 mb-5">
          <h3 className="text-brand-dark mb-2 font-medium">Coupon</h3>
          <div className="flex justify-between items-center p-4 rounded-lg border border-border-base">
            <div>
              <span className="text-green-700 font-medium">
                Applied: {order.coupon.code}
              </span>
              <p className="text-green-700 text-sm">
                Discount:{" "}
                {order.coupon.discountType === "percentage"
                  ? `${order.coupon.discountValue}%`
                  : `$${order.coupon.discountValue?.toFixed(2) ?? 0}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Totals */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-brand-dark">
          <span>Subtotal</span>
          <span>{formattedSubtotal}</span>
        </div>

        {/* Show tax line - will be hidden if no tax */}
        {taxTotal > 0 && (
          <div className="flex justify-between text-brand-dark">
            <span>{taxLabel}</span>
            <span>{formattedTaxTotal}</span>
          </div>
        )}

        {order.discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Discount</span>
            <span>- {formattedDiscount}</span>
          </div>
        )}

        <div className="flex justify-between text-brand-dark">
          <span>
            Shipping{" "}
            {order.shippingMethod && (
              <span className="text-sm text-gray-500">
                ({order.shippingMethod})
              </span>
            )}
          </span>
          {order.shippingFee > 0 ? (
            <span>+ {formattedShipping}</span>
          ) : (
            <span className="text-green-600 font-medium">Free Shipping</span>
          )}
        </div>

        {order.codFee !== undefined && order.codFee > 0 && (
          <div className="flex justify-between text-brand-dark font-medium">
            <span>COD Fee</span>
            <span>+ {formattedCOD}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between font-bold text-lg pt-6 border-t border-border-base">
        <span>Total</span>
        <span>{formattedTotal}</span>
      </div>
      {/* Action Buttons */}
      <div className="pt-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            variant="button-black"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium text-sm flex-1 text-center"
          >
            <ShoppingBag className="w-4 h-4" />
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
