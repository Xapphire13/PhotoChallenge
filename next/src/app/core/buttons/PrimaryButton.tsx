import cx from "@/app/utils/cx";
import BaseButton, { BaseButtonProps } from "./BaseButton";
import styles from "./PrimaryButton.module.css";

export default function PrimaryButton({
  className,
  ...props
}: BaseButtonProps) {
  return <BaseButton className={cx(styles.primary, className)} {...props} />;
}
