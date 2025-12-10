"use client";

import React, { useCallback, useRef } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { User, ShoppingBag, Heart, HelpCircle, LogOut } from "lucide-react";
import AccountIcon from "@/components/icons/account-icon";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import { useModal } from "@/hooks/use-modal";
import { useUI } from "@/hooks/use-UI";
import { useLogoutMutation } from "@/services/auth/use-logout";
import { useCurrentUserQuery } from "@/services/customer/use-current-user";
import Cookies from "js-cookie";
import cn from "classnames";

interface UserDropdownProps {
  hideLabel?: boolean;
}

export default function AuthDropdown({ hideLabel }: UserDropdownProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { openModal } = useModal();
  const { isAuthorized } = useUI();
  const { mutate: logout } = useLogoutMutation();
  const { data: currentUser, refetch } = useCurrentUserQuery();
  const isLoggedIn = isAuthorized ?? !!Cookies.get("auth_token");

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  // Login handler
  const handleLogin = useCallback(() => {
    openModal("LOGIN_VIEW");
  }, [openModal]);

  if (!isLoggedIn) {
    return (
      <button
        className={cn(
          "hidden lg:flex items-center focus:outline-none group",
          hideLabel ? "" : "text-sm font-normal"
        )}
        onClick={handleLogin}
      >
        <div
          className={cn(
            "cart-button w-11 h-11 flex justify-center items-center rounded-full border-2 border-brand-light/90 group-hover:border-brand-muted"
          )}
        >
          <AccountIcon className="w-5 h-5 text-brand-light group-hover:text-brand-light/60" />
        </div>
        {!hideLabel && (
          <span className="text-sm font-normal ms-2 text-brand-light group-hover:text-brand-light/60">
            Sign in
          </span>
        )}
      </button>
    );
  }

  // Menu configuration
  const mainMenu = [
    {
      icon: <User className="w-5 h-5" />,
      label: "My Account",
      action: () => router.push(ROUTES.ACCOUNT),
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: "My Orders",
      action: () => router.push(ROUTES.ORDERS),
    },
    {
      icon: <Heart className="w-5 h-5" />,
      label: "Wishlist",
      action: () => router.push(ROUTES.SAVELISTS),
    },
  ];

  const footerMenu = [
    { icon: <HelpCircle className="w-5 h-5" />, label: "Help" },
    {
      icon: <LogOut className="w-5 h-5" />,
      label: "Log out",
      action: handleLogout,
    },
  ];

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton
            ref={buttonRef}
            className="hidden lg:flex items-center focus:outline-none group"
          >
            <div
              className={cn(
                "cart-button w-11 h-11 flex justify-center items-center rounded-full border-2 transition-colors duration-200",
                open
                  ? "border-brand-light/60 bg-brand-light/10"
                  : "border-border-one group-hover:border-brand-light/60"
              )}
            >
              <AccountIcon
                className={cn(
                  "w-5 h-5 transition-colors duration-200",
                  open
                    ? "text-brand-light/80"
                    : "text-brand-light group-hover:text-brand-light/60"
                )}
              />
            </div>
            {!hideLabel && (
              <span
                className={cn(
                  "text-sm font-normal ms-2 transition-colors duration-200",
                  open
                    ? "text-brand-light/80"
                    : "group-hover:text-brand-light/60"
                )}
              >
                My Account
              </span>
            )}
          </PopoverButton>

          <PopoverPanel
            transition
            className="absolute end-0 z-10 mt-4 w-70 origin-top-right rounded-md bg-brand-light shadow-lg ring-1 ring-border-base/90 transition duration-200 ease-in-out"
          >
            <div className="pt-4">
              <UserProfile user={currentUser} />
              <div className="py-1">
                {mainMenu.map((item) => (
                  <MenuItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    onClick={item.action}
                  />
                ))}
              </div>
              <div className="border-t border-border-base py-1">
                {footerMenu.map((item) => (
                  <MenuItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    onClick={item.action}
                  />
                ))}
              </div>
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="flex items-center w-full px-4 py-3 text-sm text-primary-500 hover:bg-brand-muted hover:text-brand-light transition-colors duration-200"
      onClick={onClick}
    >
      <span className="me-3">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function UserProfile({
  user,
}: {
  user?: { avatar?: string; name?: string; email?: string };
}) {
  const formattedName = user?.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()
    : "Guest";
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="flex items-center gap-3 px-4 pb-4 border-b border-border-base">
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={formattedName}
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-12 h-12 flex items-center justify-center rounded-full border bg-brand-light text-brand-muted font-semibold text-lg">
          {initial}
        </div>
      )}
      <div className="mt-1">
        <h3 className="font-medium text-brand-dark">{formattedName}</h3>
        <p className="text-sm text-brand-muted">{user?.email || "No email"}</p>
      </div>
    </div>
  );
}
