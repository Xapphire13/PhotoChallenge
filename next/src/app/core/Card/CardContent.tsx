import cx from "@/app/utils/cx";
import React from "react";
import styles from "./CardContent.module.css";

export interface CardContentProps {
  className?: string;
}

export default function CardContent({
  children,
  className,
}: React.PropsWithChildren<CardContentProps>) {
  return <div className={cx(styles.container, className)}>{children}</div>;
}
