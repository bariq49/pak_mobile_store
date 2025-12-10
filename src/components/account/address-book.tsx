"use client";
import React, { useEffect, useState } from "react";
import cn from "classnames";
import CloseButton from "@/components/shared/close-button";
import Heading from "@/components/shared/heading";
import Button from "@/components/shared/button";
import Input from "@/components/shared/form/input";
import { useModal } from "@/hooks/use-modal";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/shared/radio-group";
import { Checkbox } from "../shared/form/checkbox";
import {
  Address,
  useAddAddressMutation,
  useUpdateAddressMutation,
} from "@/services/customer/address-api";


const AddressForm: React.FC<{ initialData?: Address }> = ({ initialData }) => {
  const { closeModal } = useModal();
  const { mutate: addAddress, isPending: isAdding } = useAddAddressMutation();
  const { mutate: updateAddress, isPending: isUpdating } =
    useUpdateAddressMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Address>();

  // Local state for label + default checkbox
  const [addressType, setAddressType] = useState(initialData?.label || "Home");
  const [isDefault, setIsDefault] = useState(initialData?.isDefault || false);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setAddressType(initialData.label || "Home");
      setIsDefault(initialData.isDefault || false);
    } else {
      reset({
        country: "",
        state: "",
        city: "",
        area: "",
        streetAddress: "",
        apartment: "",
        postalCode: "",
      });
      setAddressType("Home");
      setIsDefault(false);
    }
  }, [initialData, reset]);

  function onSubmit(input: Address) {
    const payload = {
      ...input,
      label: addressType,
      isDefault,
    };

    if (initialData?._id) {
      updateAddress(
        { addressId: initialData._id, input: payload },
        { onSuccess: () => closeModal() }
      );
    } else {
      addAddress(payload, { onSuccess: () => closeModal() });
    }
  }

  return (
    <div className={cn("w-full md:w-[720px] relative")}>
      <CloseButton onClick={closeModal} />
      <div className="flex mx-auto overflow-hidden rounded-lg bg-white">
        <div className="w-full py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-16 flex flex-col justify-center">
          <Heading variant="titleMedium" className="mb-5 text-center">
            {initialData ? "Edit Address" : "Add New Address"}
          </Heading>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center w-full space-y-4"
            noValidate
          >
            {/* Full name & phone */}
            <div className="flex flex-col sm:flex-row gap-4">
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

            {/* Country & state */}
            <div className="flex flex-col sm:flex-row gap-4">
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

            {/* City & area */}
            <div className="flex flex-col sm:flex-row gap-4">
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

            {/* Apartment & postal */}
            <div className="flex flex-col sm:flex-row gap-4">
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

            {/* Street address */}
            <Input
              label="Street Address"
              className="w-full"
              {...register("streetAddress", {
                required: "Street Address is required",
              })}
              variant="solid"
              error={errors.streetAddress?.message}
            />

            {/* Address Type (Radio) */}
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

            {/* Default Address (Checkbox) */}
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

            {/* Submit */}
            <div className="flex mt-6 sm:ml-auto">
              <Button
                type="submit"
                variant="formButton"
                className="w-full sm:w-auto flex items-center justify-center gap-2"
                disabled={isAdding || isUpdating}
              >
                {isAdding || isUpdating ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : initialData ? (
                  "Update Address"
                ) : (
                  "Save Address"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
