"use client";

import Input from "@/components/shared/form/input";
import PasswordInput from "@/components/shared/form/password-input";
import Button from "@/components/shared/button";
import Link from "@/components/shared/link";
import cn from "classnames";
import { ROUTES } from "@/utils/routes";
import { useModal } from "@/hooks/use-modal";
import CloseButton from "@/components/shared/close-button";
import { useAuthModal, useSignUpForm } from "@/hooks/use-auth-hooks";
import { Loader } from "lucide-react";

interface SignUpFormProps {
  className?: string;
  isPopup?: boolean;
}

export default function RegisterForm({
  className,
  isPopup = true,
}: SignUpFormProps) {
  const { closeModal } = useModal();
  const { formMethods, handleSubmit, isPending } = useSignUpForm();
  const { handleLogin } = useAuthModal();
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <div className={cn("w-full md:w-[560px] relative", className)}>
      {isPopup && <CloseButton onClick={closeModal} />}
      <div className="flex w-full mx-auto overflow-hidden rounded-lg bg-white">
        <div className="w-full py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 flex flex-col justify-center">
          <div className="text-center mb-4 pt-2.5">
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pb-3">
              Create an account
            </h4>
          </div>

          {/*  Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              <Input
                label="Name"
                type="text"
                variant="solid"
                {...register("name", { required: "Full name is required" })}
                error={errors.name?.message}
                disabled={isPending}
              />
              <Input
                label="Email Address"
                type="email"
                variant="solid"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                error={errors.email?.message}
                disabled={isPending}
              />
              <PasswordInput
                label="Password"
                error={errors.password?.message}
                {...register("password", { required: "Password is required" })}
                disabled={isPending}
              />
              <PasswordInput
                label="Confirm Password"
                error={errors.passwordConfirm?.message}
                {...register("passwordConfirm", {
                  required: "Please confirm your password",
                })}
                disabled={isPending}
              />

              {/*  Submit button */}
              <Button
                type="submit"
                className="w-full mt-5 h-11 md:h-12"
                variant="formButton"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </Button>

              {/*  Footer link */}
              <div className="mt-3 mb-1 text-sm text-center sm:text-base text-body">
                Have an account?
                <Link
                  href={ROUTES.LOGIN}
                  onClick={handleLogin}
                  className="pl-1 text-primary-500 hover:text-brand-muted"
                >
                  Log in Now
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
