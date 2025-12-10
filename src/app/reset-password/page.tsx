import ResetPasswordForm from "@/components/auth/reset-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default async function Page({ searchParams }: { searchParams: { token?: string } }) {
  const token = searchParams?.token || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="w-full max-w-lg p-4 sm:p-6 lg:p-8">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
