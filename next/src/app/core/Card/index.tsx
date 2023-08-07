import cx from "@/app/utils/cx";
import React from "react";
import styles from "./Card.module.css";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cx(styles.container, className)}>
      {children}
    </div>
  )
);

export default Card;
