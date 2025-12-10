"use client";

import Button from "@/components/shared/button";
import Input from "@/components/shared/form/input";
import { Loader } from "lucide-react";
import { useResetPasswordForm } from "@/hooks/use-auth-hooks";

interface ResetPasswordFormProps {
  className?: string;
  token: string;
}

export default function ResetPasswordForm({
  className,
  token,
}: ResetPasswordFormProps) {
  const { formMethods, handleSubmit, isPending } = useResetPasswordForm(token);
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <div className={`w-full md:w-[560px] relative ${className || ""}`}>
      <div className="flex w-full mx-auto overflow-hidden rounded-lg bg-white">
        <div className="w-full py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 flex flex-col justify-center">
          <div className="text-center mb-10 pt-2.5">
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pb-3">
              Reset Password
            </h4>
            <p className="mb-6 text-sm md:text-base text-body">
              Please enter your new password below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
            <Input
              label="New Password"
              type="password"
              variant="solid"
              className="mb-4"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={errors.password?.message}
              disabled={isPending}
            />

            <Input
              label="Confirm Password"
              type="password"
              variant="solid"
              className="mb-4"
              {...register("passwordConfirm", {
                required: "Please confirm your password",
                validate: (value, { password }) =>
                  value === password || "Passwords do not match",
              })}
              error={errors.passwordConfirm?.message}
              disabled={isPending}
            />

            <Button
              type="submit"
              variant="formButton"
              className="w-full mt-5 h-11 md:h-12"
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  Updating...
                </span>
              ) : (
                "Set New Password"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
