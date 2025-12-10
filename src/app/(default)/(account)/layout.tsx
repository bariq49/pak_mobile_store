import Container from "@/components/shared/container";
import AccountNav from "@/components/account/account-nav";
import { ROUTES } from "@/utils/routes";

import AccountNavMobile from "@/components/account/account-nav-mobile";

const accountMenu = [
  {
    slug: ROUTES.ACCOUNT,
    name: "My Profile",
  },
  {
    slug: ROUTES.ADDRESS_BOOK,
    name: "Address Book",
  },
  {
    slug: ROUTES.ORDERS,
    name: "My Orders",
  },
  {
    slug: ROUTES.SAVELISTS,
    name: "Save lists",
  },
  {
    slug: ROUTES.ACCOUNT_BILLING,
    name: "Change Billing",
  },

  {
    slug: ROUTES.CHANGE_PASSWORD,
    name: "Change password",
  },
];

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <div className="pt-10 2xl:pt-12 pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 mx-auto">
        <div className="flex flex-col w-full">
          <div className="lg:hidden">
            <AccountNavMobile options={accountMenu} />
          </div>
          <div className="hidden lg:block flex-shrink-0 ">
            <AccountNav options={accountMenu} />
          </div>
          <div className="w-full  mt-4 md:mt-8 ">{children}</div>
        </div>
      </div>
    </Container>
  );
}
