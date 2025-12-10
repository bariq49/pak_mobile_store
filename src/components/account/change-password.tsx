"use client";

import PasswordInput from "@/components/shared/form/password-input";
import Button from "@/components/shared/button";
import Heading from "@/components/shared/heading";
import { Loader } from "lucide-react";
import { useUpdatePasswordForm } from "@/hooks/use-auth-hooks";

const ChangePassword: React.FC = () => {
  const { formMethods, handleSubmit, isPending } = useUpdatePasswordForm();
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <>
      <Heading variant="titleMedium">Update your password</Heading>
      <div className="flex flex-col w-full mt-6 lg:w-10/12 2xl:w-9/12 lg:mt-7">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center max-w-xl"
        >
          <div className="flex flex-col space-y-5 lg:space-y-7">
            <PasswordInput
              label="Current password"
              error={errors.currentPassword?.message}
              {...register("currentPassword", {
                required: "You must provide your current password",
              })}
            />
            <PasswordInput
              label="New password"
              error={errors.newPassword?.message}
              {...register("newPassword", {
                required: "You must provide your new password",
              })}
            />
            <PasswordInput
              label="Confirm new password"
              error={errors.newPasswordConfirm?.message}
              {...register("newPasswordConfirm", {
                required: "Please confirm your new password",
              })}
            />

            <div className="relative mt-3">
              <Button
                type="submit"
                variant="formButton"
                className="w-full sm:w-auto"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" /> Updating...
                  </span>
                ) : (
                  "Update password"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
