"use client";

import Input from "@/components/shared/form/input";
import Button from "@/components/shared/button";
import Heading from "@/components/shared/heading";
import Divider from "@/components/shared/divider";
import Image from "@/components/shared/image";
import { FaCamera, FaCaretDown } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import cn from "classnames";
import { useForm } from "react-hook-form";
import {
  UpdateUserType,
  useUpdateUserMutation,
} from "@/services/customer/use-update-customer";
import { useCustomerQuery } from "@/services/customer/use-customer";
import Loading from "../shared/loading";
import { Loader } from "lucide-react";

const people = [
  { id: 1, name: "Male" },
  { id: 2, name: "Female" },
  { id: 3, name: "Other" },
];

const AccountInfo: React.FC = () => {
  const { data: user, isLoading } = useCustomerQuery();
  const { mutate: updateUser, isPending } = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserType>();

  const [selected, setSelected] = useState(people[0]);
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "",
        phoneNumber: user.phoneNumber,
        gender: user.gender || "",
      });

      if (user.gender) {
        const found = people.find(
          (p) => p.name.toLowerCase() === user.gender?.toLowerCase()
        );
        if (found) setSelected(found);
      }
    }
  }, [user, reset]);

  function onSubmit(input: UpdateUserType) {
    updateUser({
      ...input,
      gender: selected.name,
      avatar,
    });
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="dashboard__main-top">
        <div className="flex flex-col sm:flex-row flex-wrap">
          <div className="w-full sm:w-1/2">
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20">
                {avatar || user?.avatar ? (
                  <Image
                    src={
                      avatar
                        ? URL.createObjectURL(avatar)
                        : (user?.avatar as string)
                    }
                    alt="avatar"
                    width={90}
                    height={90}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-400 text-white text-2xl font-bold">
                    {user?.email ? user.email[0].toUpperCase() : "U"}
                  </div>
                )}

                <input
                  id="profile-thumb-input"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <label
                  htmlFor="profile-thumb-input"
                  className="flex items-center justify-center border-2 rounded-full text-white w-8 h-8 absolute bottom-2 border-white -right-2 bg-gray-500 cursor-pointer"
                >
                  <FaCamera />
                </label>
              </div>

              <div className="dashboard__main-content">
                <h4 className="text-brand-dark text-xl font-semibold mb-1">
                  Welcome {user?.name}.
                </h4>
                <p className="text-base mb-0">
                  {user?.email} ·{" "}
                  {user?.completeAddress ||
                    "please add address in address book section"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* Form */}
      <Heading variant="titleMedium" className="mb-5 md:mb-6 lg:mb-7">
        Account information
      </Heading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full mx-auto"
        noValidate
      >
        <div className="pb-7 md:pb-8 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            {/* Row 1: Name + Email */}
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                id="account-name"
                label="Full Name"
                {...register("name", { required: "Name is required" })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.name?.message}
              />
              <Input
                id="account-email"
                type="email"
                label="Email"
                value={user?.email || ""}
                disabled
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                name={""}
              />
            </div>

            {/* Row 2: DOB + Gender */}
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                label="Date of birth"
                {...register("dateOfBirth", {
                  required: "Date of birth is required",
                })}
                variant="solid"
                type="date"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.dateOfBirth?.message}
              />

              <div className="w-full sm:w-1/2 px-1.5 md:px-2.5">
                <label
                  htmlFor="gender"
                  className="block text-brand-dark font-medium text-sm leading-none mb-3"
                >
                  Gender
                </label>
                <Listbox value={selected} onChange={setSelected}>
                  <ListboxButton
                    className={cn(
                      "py-2 px-4 w-full text-start appearance-none relative border text-13px lg:text-sm font-body rounded min-h-11 transition duration-200 ease-in-out",
                      "focus:ring-0 text-brand-dark border-border-two focus:border-1 focus:outline-none focus:border-gray-400 h-11"
                    )}
                  >
                    {selected.name}
                    <FaCaretDown
                      className="absolute top-2.5 right-2.5 size-4 text-black"
                      aria-hidden="true"
                    />
                  </ListboxButton>
                  <ListboxOptions className="w-[var(--button-width)] rounded border border-black/15 bg-white p-1 drop-shadow-md focus:outline-none">
                    {people.map((person) => (
                      <ListboxOption
                        key={person.id}
                        value={person}
                        className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none hover:bg-gray-100"
                      >
                        {person.name}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Listbox>
              </div>
            </div>

            {/* Row 3: Phone number */}
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5">
              <Input
                type="tel"
                label="Phone number"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                    message: "Please enter a valid phone number",
                  },
                  minLength: {
                    value: 7,
                    message: "Phone number must be at least 7 digits",
                  },
                  maxLength: {
                    value: 15,
                    message: "Phone number must be no more than 15 digits",
                  },
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.phoneNumber?.message}
              />
            </div>
          </div>
        </div>

        <div className="relative flex pb-2 mt-5 sm:ml-auto lg:pb-0">
          <Button
            type="submit"
            variant="formButton"
            className="w-full sm:w-auto flex items-center justify-center gap-2"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader className="w-4 h-4 animate-spin" /> Updating...
              </>
            ) : (
              "Update Account"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountInfo;
