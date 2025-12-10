"use client";
import { useForm } from "react-hook-form";
import { useLoginMutation, LoginInputType } from "@/services/auth/use-login";
import { useSignUpMutation, SignUpInputType } from "@/services/auth/use-signup";
import { useModal } from "@/hooks/use-modal";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import {
  ForgetPasswordInput,
  useForgetPasswordMutation,
} from "@/services/auth/use-forget-password";
import {
  ResetPasswordInputType,
  useResetPasswordMutation,
} from "@/services/auth/use-reset-password";
import {
  UpdatePasswordInputType,
  useUpdatePasswordMutation,
} from "@/services/auth/use-change-password";

export const useSignUpForm = () => {
  const formMethods = useForm<SignUpInputType>({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      remember_me: false,
    },
  });

  const { mutate: signUp, isPending } = useSignUpMutation(() =>
    formMethods.reset()
  );

  const onSubmit = (values: SignUpInputType) => signUp(values);

  return {
    formMethods,
    isPending,
    handleSubmit: formMethods.handleSubmit(onSubmit),
  };
};

export const useLoginForm = () => {
  const formMethods = useForm<LoginInputType>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      remember_me: true,
    },
  });

  // Pass form reset function into mutation
  const { mutate: login, isPending } = useLoginMutation(() =>
    formMethods.reset()
  );

  const onSubmit = (data: LoginInputType) => login(data);

  return {
    formMethods,
    isPending,
    handleSubmit: formMethods.handleSubmit(onSubmit),
  };
};

export const useForgetPasswordForm = () => {
  const formMethods = useForm<ForgetPasswordInput>({
    mode: "all",
    defaultValues: { email: "" },
  });
  const { mutateAsync: forgetPassword, isPending } = useForgetPasswordMutation(
    () => formMethods.reset()
  );
  const onSubmit = (data: ForgetPasswordInput) => forgetPassword(data);

  return {
    formMethods,
    isPending,
    handleSubmit: formMethods.handleSubmit(onSubmit),
  };
};

export const useResetPasswordForm = (token: string) => {
  const formMethods = useForm<ResetPasswordInputType>({
    mode: "all",
    defaultValues: { password: "", passwordConfirm: "" },
  });

  const { mutate: resetPassword, isPending } = useResetPasswordMutation(() =>
    formMethods.reset()
  );

  const onSubmit = ({ password, passwordConfirm }: ResetPasswordInputType) =>
    resetPassword({ token, password, passwordConfirm });

  return {
    formMethods,
    isPending,
    handleSubmit: formMethods.handleSubmit(onSubmit),
  };
};

export const useUpdatePasswordForm = () => {
  const formMethods = useForm<UpdatePasswordInputType>({
    mode: "all",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  const { mutate: updatePassword, isPending } = useUpdatePasswordMutation(() =>
    formMethods.reset()
  );
  const onSubmit = (values: UpdatePasswordInputType) => {
    updatePassword(values);
  };
  return {
    formMethods,
    isPending,
    handleSubmit: formMethods.handleSubmit(onSubmit),
  };
};

export const useSocialLogin = () => {
  const { mutate: login } = useLoginMutation();
  const { closeModal } = useModal();
  const { reset } = useForm<LoginInputType>();
  const navigate = useRouter();

  const handleSocialLogin = (isPopup: boolean = true) => {
    login(
      {
        email: "guest@demo.com",
        password: "admin",
        remember_me: true,
      },
      {
        onSuccess: () => {
          if (isPopup) {
            closeModal();
          } else {
            navigate.push(ROUTES.HOME);
          }
          reset();
        },
      }
    );
  };

  return { handleSocialLogin };
};

export const useAuthModal = () => {
  const { openModal, closeModal } = useModal();

  const handleForgetPassword = () => {
    openModal("FORGET_PASSWORD");
  };

  const handleSignUp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openModal("SIGNUP_VIEW");
  };

  const handleLogin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openModal("LOGIN_VIEW");
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return { handleForgetPassword, handleSignUp, handleLogin, handleCloseModal };
};
