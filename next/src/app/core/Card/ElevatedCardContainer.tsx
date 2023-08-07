import cx from "@/app/utils/cx";
import React from "react";
import styles from "./ElevatedCardContainer.module.css";

export interface ElevatedCardContainerProps {
  children: React.ReactNode;
}

export default function ElevatedCardContainer({
  children,
}: ElevatedCardContainerProps) {
  return <div className={cx(styles.container)}>{children}</div>;
}
