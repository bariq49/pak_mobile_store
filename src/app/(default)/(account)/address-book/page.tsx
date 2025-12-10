"use client";
import React from "react";
import {
  Home,
  MapPin,
  Mail,
  Pencil,
  Trash2,
  Plus,
  Star,
  Loader,
  Phone,
  Tag,
} from "lucide-react";
import IconButton from "@/components/shared/Icon-Button";
import {
  useAddressesQuery,
  useSetDefaultAddressMutation,
  useDeleteAddressMutation,
} from "@/services/customer/address-api";
import Loading from "@/components/shared/loading";
import { useModal } from "@/hooks/use-modal";

export default function AddressCard() {
  const { data: addresses = [], isLoading } = useAddressesQuery();
  const deleteMutation = useDeleteAddressMutation();
  const setDefaultMutation = useSetDefaultAddressMutation();
  const { openModal } = useModal();
  // Track which button is loading
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [settingDefaultId, setSettingDefaultId] = React.useState<string | null>(
    null
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Loading />
      </div>
    );
  }

  const handleDelete = (id: string) => {
    setDeletingId(id);
    deleteMutation.mutate(id, {
      onSettled: () => setDeletingId(null),
    });
  };

  const handleSetDefault = (id: string) => {
    setSettingDefaultId(id);
    setDefaultMutation.mutate(id, {
      onSettled: () => setSettingDefaultId(null),
    });
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Shipping Addresses
        </h1>
        <p className="text-muted-foreground">Manage your delivery addresses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {addresses.map((address) => (
          <div
            key={address._id}
            className="relative bg-card border border-border rounded-xl shadow-sm p-6"
          >
            {/* Header with Label and Actions */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-primary" />
                  <h3 className="text-lg font-semibold text-card-foreground capitalize">
                    {address.label || "Address"}
                  </h3>
                </div>
                {address.isDefault && (
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary-500 text-brand-dark">
                    Default
                  </span>
                )}
              </div>

              {/* Action Icons - Top Right */}
              <div className="flex items-center gap-1">
                <IconButton
                  size="sm"
                  tooltip="Edit Address"
                  onClick={() => openModal("ADDRESS_BOOK", address)}
                >
                  <Pencil className="w-4 h-4" />
                </IconButton>

                {/* Delete */}
                <IconButton
                  variant="destructive"
                  size="sm"
                  tooltip="Delete Address"
                  onClick={() => handleDelete(address._id)}
                  disabled={deletingId === address._id}
                >
                  {deletingId === address._id ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </IconButton>

                {/* Set as Default */}
                {!address.isDefault && (
                  <IconButton
                    variant="primary"
                    size="sm"
                    tooltip="Set as Default"
                    onClick={() => handleSetDefault(address._id)}
                    disabled={settingDefaultId === address._id}
                  >
                    {settingDefaultId === address._id ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Star className="w-4 h-4" />
                    )}
                  </IconButton>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-4 bg-muted/20 rounded-lg">
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

            {/* Address Details */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-card-foreground">
                Address Details
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {/* Country */}
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Country
                    </p>
                    <p className="text-sm text-card-foreground capitalize truncate">
                      {address.country}
                    </p>
                  </div>
                </div>

                {/* State */}
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      State
                    </p>
                    <p className="text-sm text-card-foreground capitalize truncate">
                      {address.state}
                    </p>
                  </div>
                </div>

                {/* City */}
                <div className="flex items-start gap-2">
                  <Home className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      City
                    </p>
                    <p className="text-sm text-card-foreground capitalize truncate">
                      {address.city}
                    </p>
                  </div>
                </div>

                {/* Area */}
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Area
                    </p>
                    <p className="text-sm text-card-foreground capitalize truncate">
                      {address.area}
                    </p>
                  </div>
                </div>
                {/* Postal Code */}
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Postal Code
                    </p>
                    <p className="text-sm text-card-foreground">
                      {address.postalCode}
                    </p>
                  </div>
                </div>
                {/* Street Address */}
                <div className="flex items-start gap-2 col-span-2">
                  <Home className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Street Address
                    </p>
                    <p className="text-sm text-card-foreground">
                      {address.streetAddress}
                      {address.apartment && `, ${address.apartment}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Complete Address Summary */}
              <div className="pt-4 mt-4 border-t border-border bg-muted/30 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Complete Address
                </p>
                <p className="text-sm text-card-foreground leading-relaxed">
                  {`${address.streetAddress}${
                    address.apartment ? `, ${address.apartment}` : ""
                  }, ${address.area}, ${address.city}, ${address.state}, ${
                    address.postalCode
                  }, ${address.country}`}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Address Card */}
        <button
          onClick={() => openModal("ADDRESS_BOOK")}
          className="group flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl min-h-[500px] hover:border-primary/50 hover:bg-muted/20 transition-all duration-200"
        >
          <div className="p-4 rounded-full bg-primary-500 group-hover:bg-primary-400 transition-colors duration-200 mb-4">
            <Plus className="w-8 h-8 text-primary" />
          </div>
          <span className="text-base font-semibold text-card-foreground mb-2">
            Add New Address
          </span>
          <span className="text-sm text-muted-foreground">
            Click to add a shipping address
          </span>
        </button>
      </div>
    </div>
  );
}
