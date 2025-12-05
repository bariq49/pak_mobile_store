'use client';

import Input from '@/components/shared/form/input';
import PasswordInput from '@/components/shared/form/password-input';
import Button from '@/components/shared/button';

import Link from '@/components/shared/link';
import cn from 'classnames';
import { ROUTES } from '@/utils/routes';
import { usePanel } from "@/hooks/use-panel";
import { colorMap } from "@/data/color-settings";
import {useModal} from "@/hooks/use-modal";
import CloseButton from "@/components/shared/close-button";
import {useAuthModal, useSignUpForm} from "@/hooks/use-auth-hooks";

interface SignUpFormProps {
  className?: string;
  isPopup?: boolean;
}

export default function RegisterForm({
  className,
  isPopup = true
}: SignUpFormProps) {
  const { selectedColor } = usePanel();
  const { closeModal } = useModal();
  const { formMethods, handleSubmit } = useSignUpForm();
  const {handleLogin} = useAuthModal();
  const { register, formState: { errors } } = formMethods;

  return (
    <div
      className={cn(
          'w-full md:w-[560px]  relative',
        className,
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
      <div className="flex w-full mx-auto overflow-hidden rounded-lg bg-white">
        <div className="w-full py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md  flex flex-col justify-center">
          <div className="text-center mb-10 pt-2.5">
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pb-3 ">
              Create an account
            </h4>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              <Input
                label={"Username"}
                type="text"
                variant="solid"
                {...register('name', {
                  required: "You must need to provide your full name",
                })}
                error={errors.name?.message}
              />
              <Input
                label={"Email Address"}
                type="email"
                variant="solid"
                {...register('email', {
                  required: `You must need to provide your email address`,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please provide valid email address",
                  },
                })}
                error={errors.email?.message}
              />
              <PasswordInput
                label={"Password"}
                error={errors.password?.message}
                {...register('password', {
                  required: `You must need to provide your password`,
                })}
              />
              <div className="flex items-center justify-center">
                
                <div
                  className="flex ltr:ml-auto rtl:mr-auto mt-[2px]"
                >
                  <Link
                    href={ROUTES.PRIVACY}
                    className={cn("text-sm ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3 hover:underline", colorMap[selectedColor].link)}
                  >
                    Privacy and policy
                  </Link>
                </div>
              </div>
              <div className="relative">
                <Button
                  type="submit"
                  className="w-full mt-5 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  Register
                </Button>
              </div>
              <div className="mt-3 mb-1 text-sm text-center sm:text-base text-body">
                Have an account?
                <Link
                    href={ROUTES.LOGIN}
                    onClick={handleLogin}
                    className={cn(" ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3   hover:underline",colorMap[selectedColor].link)}
                >
                  Log in  Now
                </Link>
                
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
