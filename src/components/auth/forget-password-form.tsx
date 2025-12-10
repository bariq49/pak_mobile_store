import Button from "@/components/shared/button";
import Input from "@/components/shared/form/input";
import { useModal } from "@/hooks/use-modal";
import CloseButton from "@/components/shared/close-button";
import { useForgetPasswordForm } from "@/hooks/use-auth-hooks";
import { Loader } from "lucide-react";

const ForgetPasswordForm = () => {
  const { closeModal } = useModal();
  const { formMethods, handleSubmit, isPending } = useForgetPasswordForm();
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <div className="w-full px-5 py-6 mx-auto rounded-lg sm:p-8 bg-white md:w-[550px]">
      <CloseButton onClick={closeModal} />
      <div className="text-center mb-9 pt-2.5">
        <p className="mt-3 mb-8 text-sm md:text-base text-body sm:mt-4 sm:mb-10">
          We&#39;ll send you a link to reset your password
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center"
        noValidate
      >
        <Input
          label={"Email Address"}
          type="email"
          variant="solid"
          className="mb-4"
          {...register("email", {
            required: `You must need to provide your email address`,
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please provide valid email address",
            },
          })}
          error={errors.email?.message}
        />

        <Button
          type="submit"
          variant="formButton"
          className="w-full mt-0 h-11 md:h-12"
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              Sending...
            </span>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>

      <div className="relative flex flex-col items-center justify-center mt-8 mb-6 text-sm text-heading sm:mt-10 sm:mb-7">
        <hr className="w-full border-gray-300" />
      </div>

      <div className="text-sm text-center sm:text-15px text-brand-muted">
        Back to{" "}
        <button
          type="button"
          className="font-medium underline text-primary-500 hover:no-underline focus:outline-none"
          onClick={closeModal}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
