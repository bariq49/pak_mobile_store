import AccountInfo from "@/components/account/account-info";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Info",
};

export default async function AccountPage() {
  return <AccountInfo />;
}
