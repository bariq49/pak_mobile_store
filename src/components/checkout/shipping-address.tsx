"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  MapPin,
  Check,
  Loader,
  Trash2,
  Pencil,
  X,
} from "lucide-react";
import Loading from "@/components/shared/loading";
import {
  useAddressesQuery,
  useDeleteAddressMutation,
  useAddAddressMutation,
  useUpdateAddressMutation,
  Address,
} from "@/services/customer/address-api";
import IconButton from "../shared/Icon-Button";
import Input from "@/components/shared/form/input";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/shared/radio-group";
import { Checkbox } from "../shared/form/checkbox";

interface ShippingAddressProps {
  onComplete: (data: Address & { selectedAddressId?: string }) => void;
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({ onComplete }) => {
  const { data: addresses = [], isLoading } = useAddressesQuery();
  const deleteMutation = useDeleteAddressMutation();
  const addAddressMutation = useAddAddressMutation();
  const updateAddressMutation = useUpdateAddressMutation();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
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

  const handleAddNew = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  // Inline Address Form Component
  const AddressFormInline = () => {
    const [addressType, setAddressType] = useState(editingAddress?.label || "Home");
    const [isDefault, setIsDefault] = useState(editingAddress?.isDefault || false);

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<Address>();

    useEffect(() => {
      if (editingAddress) {
        reset(editingAddress);
        setAddressType(editingAddress.label || "Home");
        setIsDefault(editingAddress.isDefault || false);
      } else {
        reset({
          country: "",
          state: "",
          city: "",
          area: "",
          streetAddress: "",
          apartment: "",
          postalCode: "",
          fullName: "",
          phoneNumber: "",
        });
        setAddressType("Home");
        setIsDefault(false);
      }
    }, [editingAddress, reset]);

    const onSubmit = (input: Address) => {
      const payload = {
        ...input,
        label: addressType,
        isDefault,
      };

      if (editingAddress?._id) {
        updateAddressMutation.mutate(
          { addressId: editingAddress._id, input: payload },
          {
            onSuccess: () => {
              setShowForm(false);
              setEditingAddress(null);
            },
          }
        );
      } else {
        addAddressMutation.mutate(payload, {
          onSuccess: () => {
            setShowForm(false);
            setEditingAddress(null);
          },
        });
      }
    };

    return (
      <div className="border border-gray-200 rounded p-5 bg-white mt-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-normal text-brand-dark">
            {editingAddress ? "Edit Address" : "Add New Address"}
          </h3>
          <button
            onClick={handleCancelForm}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              className="w-full"
              {...register("fullName", { required: "Full name is required" })}
              variant="solid"
              error={errors.fullName?.message}
            />
            <Input
              label="Phone Number"
              className="w-full"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9+\-() ]+$/,
                  message: "Enter a valid phone number",
                },
              })}
              variant="solid"
              error={errors.phoneNumber?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Country"
              className="w-full"
              {...register("country", { required: "Country is required" })}
              variant="solid"
              error={errors.country?.message}
            />
            <Input
              label="State"
              className="w-full"
              {...register("state", { required: "State is required" })}
              variant="solid"
              error={errors.state?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="City"
              className="w-full"
              {...register("city", { required: "City is required" })}
              variant="solid"
              error={errors.city?.message}
            />
            <Input
              label="Area / Locality"
              className="w-full"
              {...register("area", { required: "Area is required" })}
              variant="solid"
              error={errors.area?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Apartment / Suite"
              className="w-full"
              {...register("apartment")}
              variant="solid"
            />
            <Input
              label="Postal Code"
              {...register("postalCode", {
                required: "Postal code is required",
              })}
              variant="solid"
              error={errors.postalCode?.message}
            />
          </div>

          <Input
            label="Street Address"
            className="w-full"
            {...register("streetAddress", {
              required: "Street Address is required",
            })}
            variant="solid"
            error={errors.streetAddress?.message}
          />

          <div className="mt-4">
            <RadioGroup
              value={addressType}
              onValueChange={setAddressType}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Home" id="r1" />
                <label
                  htmlFor="r1"
                  className="text-sm font-medium text-brand-dark"
                >
                  Home <span className="font-light">(All Day Delivery)</span>
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Office" id="r2" />
                <label
                  htmlFor="r2"
                  className="text-sm font-medium text-brand-dark"
                >
                  Office{" "}
                  <span className="font-light">(Delivery 9 AM - 5 PM)</span>
                </label>
              </div>
            </RadioGroup>
          </div>

          <div className="mt-4 flex items-center space-x-2">
            <Checkbox
              id="defaultAddress"
              checked={isDefault}
              onCheckedChange={(val: any) => setIsDefault(!!val)}
            />
            <label
              htmlFor="defaultAddress"
              className="text-sm font-medium text-brand-dark"
            >
              Set as default address
            </label>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={handleCancelForm}
              className="px-6 py-2 border border-gray-300 rounded-md font-medium text-base text-brand-dark hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={addAddressMutation.isPending || updateAddressMutation.isPending}
              className={`px-6 py-2 rounded-md font-medium text-base transition-all ${
                addAddressMutation.isPending || updateAddressMutation.isPending
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800 cursor-pointer"
              }`}
            >
              {addAddressMutation.isPending || updateAddressMutation.isPending ? (
                <Loader className="w-4 h-4 animate-spin inline" />
              ) : editingAddress ? (
                "Update Address"
              ) : (
                "Save Address"
              )}
            </button>
          </div>
        </form>
      </div>
    );
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
        <div className="space-y-3">
          {addresses.map((address: any) => (
            <div
              key={address._id}
              onClick={() => handleAddressSelect(address._id)}
              className={`relative border rounded p-4 cursor-pointer transition-all duration-200 ${
                selectedAddressId === address._id
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedAddressId === address._id
                    ? "border-black bg-black"
                    : "border-gray-300"
                }`}>
                  {selectedAddressId === address._id && (
                    <Check className="w-2.5 h-2.5 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-base text-brand-dark capitalize">
                      {address.fullName}
                    </span>
                    {address.isDefault && (
                      <span className="px-2 py-0.5 text-xs font-normal rounded bg-gray-200 text-gray-700">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-1">
                    {`${address.streetAddress}${
                      address.apartment ? `, ${address.apartment}` : ""
                    }, ${address.area}, ${address.city}, ${address.state}, ${
                      address.postalCode
                    }, ${address.country}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {address.phoneNumber}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <IconButton
                    size="sm"
                    tooltip="Edit Address"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(address);
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
            </div>
          ))}

          {/* Add New Address Card */}
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="group flex items-center gap-3 border-2 border-dashed border-gray-300 rounded p-4 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 w-full"
            >
              <Plus className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
              <span className="text-sm font-normal text-gray-600 group-hover:text-gray-800">
                Add New Address
              </span>
            </button>
          )}

          {/* Inline Address Form */}
          {showForm && <AddressFormInline />}
        </div>
      ) : (
        <>
          {!showForm ? (
            <div className="text-center py-10 border border-dashed border-gray-300 rounded">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gray-100 rounded-full">
                  <MapPin className="w-6 h-6 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-brand-dark mb-2">
                No saved addresses
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Add your first shipping address
              </p>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800"
              >
                <Plus className="w-4 h-4" />
                Add Address
              </button>
            </div>
          ) : (
            <AddressFormInline />
          )}
        </>
      )}

      {addresses.length > 0 && (
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={handleContinue}
            disabled={!selectedAddressId}
            className={`px-6 py-3 rounded-md font-medium text-base transition-all ${
              selectedAddressId
                ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;
