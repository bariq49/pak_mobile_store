import Link from "@/components/shared/link";
import cn from "classnames";
import Cookies from "js-cookie";
import { useUI } from "@/hooks/use-UI";

import React, { useCallback } from "react";
import { useModal } from "@/hooks/use-modal";
import { ROUTES } from "@/utils/routes";

interface Props {
  className?: string;
}

export default function AuthMenu({
  className,
  children,
}: React.PropsWithChildren<Props>) {
  const { isAuthorized } = useUI();
  const { openModal } = useModal();

  const isLoggedIn = isAuthorized ?? !!Cookies.get("auth_token");
  const handleLogin = useCallback(() => {
    openModal("LOGIN_VIEW");
  }, [openModal]);

  if (!isLoggedIn) {
    return (
      <button
        className={cn("flex items-center focus:outline-none group")}
        onClick={handleLogin}
      >
        {children}
      </button>
    );
  }
  return (
    <Link
      href={ROUTES.ACCOUNT}
      className={cn("text-sm font-normal focus:outline-none", className)}
    >
      {children}
    </Link>
  );
}
