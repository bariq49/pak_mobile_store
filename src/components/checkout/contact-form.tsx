import { useForm } from "react-hook-form";

import Input from "@/components/shared/form/input";
import React, { useState } from "react";
import Switch from "@/components/shared/switch";
import Button from "@/components/shared/button";
type ContactFormData = {
  phone: string;
  email: string;
  receiveNews: boolean;
};

interface ContactFormProps {
  onComplete: (data: ContactFormData) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onComplete }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      phone: "+8553456644",
      email: "yourexample@email.com",
      receiveNews: false,
    },
  });

  const [receiveNews, setReceiveNews] = useState(true);

  return (
    <div className="w-full ">
      <form onSubmit={handleSubmit(onComplete)}>
        <div className="md:flex justify-between items-center mb-6">
          <h1 className="text-xl text-brand-dark font-semibold">
            Contact infomation
          </h1>
        </div>
        <div className="space-y-6">
          <Input
            id={"checkout-phone-number"}
            type="tel"
            label={"Your phone number"}
            {...register("phone", {
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
            className="w-full"
            error={errors.phone?.message}
          />

          <Input
            id={"checkout-email"}
            type="email"
            label="Email Address"
            {...register("email", {
              required: "You must need to provide your email address",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email address",
              },
            })}
            error={errors.email?.message}
          />

          <div className="flex items-center space-x-2">
            <label className="relative inline-block cursor-pointer switch">
              <Switch
                {...register("receiveNews")}
                checked={receiveNews}
                onChange={setReceiveNews}
              />
            </label>
            <label
              onClick={() => setReceiveNews(!receiveNews)}
              className="mt-1 text-sm cursor-pointer shrink-0 text-heading ltr:pl-2.5 rtl:pr-2.5"
            >
              Email me news and offers
            </label>
          </div>
        </div>

        <div className="ltr:text-right rtl:text-left mt-6">
          <Button
            type="submit"
            variant="formButton"
            className="xs:text-sm  text-brand-light"
          >
            Save and Next Steps
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
