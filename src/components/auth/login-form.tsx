"use client";
import Input from "@/components/shared/form/input";
import PasswordInput from "@/components/shared/form/password-input";
import Button from "@/components/shared/button";
import { useModal } from "@/hooks/use-modal";
import Switch from "@/components/shared/switch";
import { FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import cn from "classnames";
import { ROUTES } from "@/utils/routes";
import Link from "@/components/shared/link";
import CloseButton from "@/components/shared/close-button";
import {
  useAuthModal,
  useLoginForm,
  useSocialLogin,
} from "@/hooks/use-auth-hooks";
import { Loader } from "lucide-react";

interface LoginFormProps {
  isPopup?: boolean;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, isPopup = true }) => {
  const { closeModal } = useModal();
  const { formMethods, handleSubmit, isPending } = useLoginForm();
  const { handleSocialLogin } = useSocialLogin();
  const { handleForgetPassword, handleSignUp } = useAuthModal();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = formMethods;

  const remember = watch("remember_me");

  return (
    <div className={cn("w-full md:w-[560px] relative", className)}>
      {isPopup && <CloseButton onClick={closeModal} />}
      <div className="flex mx-auto overflow-hidden rounded-lg bg-white">
        <div className="w-full py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-16 flex flex-col justify-center">
          <div className="text-center mb-10 pt-2.5">
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pb-3">
              Log Into Your Account
            </h4>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              <Input
                id="login-email"
                placeholder="Enter your Email"
                label="Email Address"
                type="email"
                variant="solid"
                {...register("email", {
                  required: "You must provide your email address",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please provide a valid email address",
                  },
                })}
                error={errors.email?.message}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register("password", {
                  required: "You must provide your password",
                })}
              />

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-center py-2">
                <div className="flex items-center shrink-0">
                  <label className="relative inline-block cursor-pointer switch">
                    <Switch
                      checked={remember}
                      onChange={(checked) => setValue("remember_me", checked)}
                    />
                  </label>
                  <label
                    onClick={() => setValue("remember_me", !remember)}
                    className="mt-1 text-sm cursor-pointer shrink-0 text-heading pl-2.5"
                  >
                    Remember me
                  </label>
                </div>
                <div className="flex ml-auto mt-[3px]">
                  <button
                    type="button"
                    onClick={handleForgetPassword}
                    className="text-sm text-primary-500 hover:underline focus:outline-none"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <div className="relative">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px flex items-center justify-center gap-2"
                  variant="formButton"
                >
                  {isPending ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin mr-1" /> Logging
                      in...
                    </>
                  ) : (
                    "Log In"
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* Social logins */}
          <div className="flex justify-center mt-10 space-x-2.5">
            {[FaFacebook, FaTiktok, FaXTwitter, FaInstagram].map(
              (Icon, idx) => (
                <button
                  key={idx}
                  className="flex items-center justify-center w-10 h-10 border rounded-full border-gray-300 hover:border-primary focus:outline-none group"
                  onClick={() => handleSocialLogin(isPopup)}
                >
                  <Icon className="w-4 h-4 text-gray-500 group-hover:text-primary" />
                </button>
              )
            )}
          </div>

          {/* Footer */}
          <div className="mt-5 mb-3 text-sm text-center text-body">
            Don’t have an account?
            <Link
              href={ROUTES.REGISTER}
              onClick={handleSignUp}
              className="pl-1 text-primary-500 hover:text-brand-muted"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
