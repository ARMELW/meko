import React from "react";
import { Link } from "react-router";

interface CustomLinkProps {
  textColor?: string;
  fontSize?: string;
  children?: React.ReactNode;
  useLink?: boolean;
  linkTo?: string;
  customClass?: string;
}

export default function CustomLink({
  children,
  useLink = false,
  linkTo = "#",
  customClass,
}: CustomLinkProps) {
  return (
    <>
      {useLink ? (
        <Link to={linkTo} className={`flex items-center justify-center py-1 px-3 rounded-lg bg-[#000F4733]  transition focus:outline-none ${customClass && customClass}`}>
          {children}
        </Link>
      ) : (
        <button className={`flex items-center justify-center py-1 px-3 rounded-lg bg-[#000F4733]  transition focus:outline-none ${customClass && customClass}`}>
          {children}
        </button>
      )}
    </>
  );
}
