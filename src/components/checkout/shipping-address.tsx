"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  MapPin,
  Home,
  Phone,
  Check,
  Loader,
  Trash2,
  Pencil,
  Building2,
} from "lucide-react";
import Button from "@/components/shared/button";
import Loading from "@/components/shared/loading";
import {
  useAddressesQuery,
  useDeleteAddressMutation,
  Address,
} from "@/services/customer/address-api";
import { useModal } from "@/hooks/use-modal";
import IconButton from "../shared/Icon-Button";

interface ShippingAddressProps {
  onComplete: (data: Address & { selectedAddressId?: string }) => void;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({ onComplete }) => {
  const { data: addresses = [], isLoading } = useAddressesQuery();
  const deleteMutation = useDeleteAddressMutation();
  const { openModal } = useModal();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddress = addresses.find((a: any) => a.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress._id);
      }
    }
  }, [addresses, selectedAddressId]);

  const handleAddressSelect = (id: string) => {
    setSelectedAddressId(id);
  };

  const handleContinue = () => {
    if (!selectedAddressId) return;
    const selected = addresses.find((a: any) => a._id === selectedAddressId);
    if (selected) {
      onComplete({ ...selected, selectedAddressId });
    }
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
    deleteMutation.mutate(id, {
      onSettled: () => setDeletingId(null),
    });
  };

  const getAddressIcon = (label: string) => {
    if (!label) return <Home className="w-4 h-4 text-primary-500" />;
    const normalized = label.toLowerCase();
    if (normalized.includes("office") || normalized.includes("work")) {
      return <Building2 className="w-4 h-4 text-primary-500" />;
    }
    return <Home className="w-4 h-4 text-primary-500" />;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full">
      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {addresses.map((address: any) => (
            <div
              key={address._id}
              onClick={() => handleAddressSelect(address._id)}
              className={`relative border rounded-xl shadow-sm p-6 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                selectedAddressId === address._id
                  ? "border-primary-500 ring-2 ring-primary-500/30 bg-primary-500/5"
                  : "border-border hover:border-primary-500/40"
              }`}
            >
              {selectedAddressId === address._id && (
                <div className="absolute top-1 right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center shadow">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getAddressIcon(address.label)}
                  <span className="font-semibold text-sm capitalize">
                    {address.label || "Address"}
                  </span>
                  {address.isDefault && (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary-500 text-brand-light">
                      Default
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <IconButton
                    size="sm"
                    tooltip="Edit Address"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal("ADDRESS_BOOK", address);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </IconButton>

                  <IconButton
                    variant="destructive"
                    size="sm"
                    tooltip="Delete Address"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(address._id);
                    }}
                    disabled={deletingId === address._id}
                  >
                    {deletingId === address._id ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </IconButton>
                </div>
              </div>

              <div className="mb-4 rounded-lg">
                <h4 className="text-sm font-semibold text-card-foreground mb-2">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-card-foreground capitalize">
                      {address.fullName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-card-foreground">
                      {address.phoneNumber}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-card-foreground">
                  Address Details
                </h4>
                <p className="text-sm text-card-foreground leading-normal mb-0">
                  {`${address.streetAddress}${
                    address.apartment ? `, ${address.apartment}` : ""
                  }, ${address.area}, ${address.city}, ${address.state}, ${
                    address.postalCode
                  }, ${address.country}`}
                </p>
              </div>
            </div>
          ))}

          {/* Add New Address Card */}
          <button
            onClick={() => openModal("ADDRESS_BOOK")}
            className="group flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl min-h-[300px] hover:border-primary/50 hover:bg-muted/20 transition-all duration-200"
          >
            <div className="p-4 rounded-full bg-primary-500 group-hover:bg-primary-400 transition-colors duration-200 mb-3">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-card-foreground mb-1">
              Add New Address
            </span>
            <span className="text-xs text-muted-foreground">
              Click to add a shipping address
            </span>
          </button>
        </div>
      ) : (
        <div className="text-center py-10 border border-dashed border-border rounded-xl">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-muted rounded-full">
              <MapPin className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-card-foreground mb-2">
            No saved addresses
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add your first shipping address
          </p>
          <Button
            onClick={() => openModal("ADDRESS_BOOK")}
            variant="primary"
            className="inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Address
          </Button>
        </div>
      )}

      {addresses.length > 0 && (
        <div className="flex items-center justify-end gap-3 mt-6">
          <Button
            onClick={handleContinue}
            disabled={!selectedAddressId}
            variant="primary"
          >
            Use This Address
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;
