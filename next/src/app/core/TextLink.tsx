import React from "react";
import styles from "./TextLink.module.css";
import cx from "../utils/cx";

export type TextLinkProps = {
  children: React.ReactNode;
  href: string;
  newTab?: boolean;
} & Omit<
  React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >,
  "children" | "href" | "rel" | "target"
>;

export default function TextLink({
  children,
  href,
  newTab,
  ...rest
}: TextLinkProps) {
  const target = newTab ? "_blank" : undefined;

  return (
    <a
      className={cx(styles.link)}
      href={href}
      rel="noopener"
      target={target}
      {...rest}
    >
      {children}
    </a>
  );
}
