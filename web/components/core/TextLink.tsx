import { css, cx } from "@linaria/core";
import React from "react";

const classNames = {
  link: css`
    :visited {
      color: inherit;
    }
  `,
};

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
      className={cx(classNames.link)}
      href={href}
      rel="noopener"
      target={target}
      {...rest}
    >
      {children}
    </a>
  );
}
