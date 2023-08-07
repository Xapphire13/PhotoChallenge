import React from "react";
import cx from "../utils/cx";
import styles from "./CenterLayout.module.css";

export type CenterLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const CenterLayout = React.forwardRef<HTMLDivElement, CenterLayoutProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cx(styles.container, className)}>
      {children}
    </div>
  )
);

export default CenterLayout;
