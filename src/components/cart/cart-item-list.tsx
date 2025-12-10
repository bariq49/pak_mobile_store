"use client";
import { useState } from "react";
import { CartItem } from "./cart-item";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shared/table";
import { Item } from "@/services/utils/cartUtils";

interface CartItemListProps {
  items: Item[];
}

export function CartItemList({ items }: CartItemListProps) {
  const [page, setPage] = useState(1);
  const perPage = 2;

  const totalPages = Math.ceil(items.length / perPage);
  const paginatedItems = items.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="sm:border-b-2">
            <TableHead className="w-[100px]">Product</TableHead>
            <TableHead className="w-[500px]"></TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="w-[100px]">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedItems.map((item, index) => (
            <CartItem key={`${item?.id}+${index}`} item={item} />
          ))}
        </TableBody>
      </Table>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-4">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
