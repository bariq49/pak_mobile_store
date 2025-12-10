"use client";

import Modal from "@/components/common/modal/modal";
import dynamic from "next/dynamic";
import { useModal } from "@/hooks/use-modal";
import ResetPasswordForm from "@/components/auth/reset-password-form";
import ReviewForm from "@/components/product/productDetails/review-form";
import AddressForm from "@/components/account/address-book";

const LoginForm = dynamic(() => import("@/components/auth/login-form"));
const SignUpForm = dynamic(() => import("@/components/auth/register-form"));
const ForgetPasswordForm = dynamic(
  () => import("@/components/auth/forget-password-form")
);
const ProductQuickview = dynamic(
  () => import("@/components/product/product-quickview")
);

export default function ModalManaged() {
  const { isOpen, view, closeModal, data } = useModal();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === "LOGIN_VIEW" && <LoginForm />}
      {view === "SIGNUP_VIEW" && <SignUpForm />}
      {view === "FORGET_PASSWORD" && <ForgetPasswordForm />}
      {view === "PRODUCT_VIEW" && <ProductQuickview />}
      {view === "WRITE_REVIEW" && <ReviewForm productId={data?.productId} />}
      {view === "ADDRESS_BOOK" && <AddressForm initialData={data} />}
      {view === "RESET_PASSWORD" && (
        <ResetPasswordForm token={data?.token || ""} />
      )}
    </Modal>
  );
}
