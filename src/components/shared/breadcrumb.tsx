"use client";

import React from "react";
import ActiveLink from "@/components/shared/active-link";
import useBreadcrumb, { formarBreadcrumbTitle } from "@/utils/use-breadcrumb";
import { IoChevronForward } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { ROUTES } from "@/utils/routes";

interface BreadcrumbItemProps {
  children: React.ReactNode;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  children,
  ...props
}) => {
  return (
    <li
      className="h-full text-sm text-brand-muted transition duration-200 ease-in ltr:first:pl-0 rtl:first:pr-0 ltr:last:pr-0 rtl:last:pl-0 hover:text-brand-dark"
      {...props}
    >
      {children}
    </li>
  );
};

interface BreadcrumbSeparatorProps {
  children: React.ReactNode;
}

const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
  children,
  ...props
}) => {
  return (
    <li className="text-base text-brand-dark" {...props}>
      {children}
    </li>
  );
};

interface BreadcrumbItemsProps {
  children: React.ReactNode;
  separator: React.ReactNode;
}

export const BreadcrumbItems: React.FC<BreadcrumbItemsProps> = ({
  children,
  separator,
}) => {
  const childrenArray = React.Children.toArray(children);

  const items = childrenArray.map((child, index) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ));

  const lastIndex = items.length - 1;

  const itemsWithSeparators = items.reduce(
    (acc: React.ReactNode[], child, index) => {
      const notLast = index < lastIndex;
      if (notLast) {
        acc.push(
          child,
          <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
            {separator}
          </BreadcrumbSeparator>
        );
      } else {
        acc.push(child);
      }
      return acc;
    },
    []
  );

  return (
    <div className="flex items-center">
      <ol className="flex items-center flex-wrap gap-2 w-full overflow-hidden">
        {itemsWithSeparators}
      </ol>
    </div>
  );
};

interface BreadcrumbProps {
  separator?: React.ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  separator = (
    <IoChevronForward className="text-brand-dark opacity-40 text-15px rtl:rotate-180" />
  ),
}) => {
  const breadcrumbs = useBreadcrumb();
  return (
    <BreadcrumbItems separator={separator}>
      <ActiveLink
        href={ROUTES.HOME}
        activeClassName="font-semibold text-heading"
      >
        <span className="flex items-center h-full">
          <IoHomeOutline className="ltr:mr-1.5 rtl:ml-1.5 text-brand-dark text-base " />
          {"Home"}
        </span>
      </ActiveLink>
      {breadcrumbs?.map((breadcrumb: any, index: number) => (
        <span
          key={breadcrumb.href}
          className="capitalize text-brand-muted cursor-default"
        >
          {formarBreadcrumbTitle(breadcrumb.breadcrumb)}
        </span>
      ))}
    </BreadcrumbItems>
  );
};

export default Breadcrumb;
