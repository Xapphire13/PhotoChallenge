import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../theme";
import isNotNull from "../../utils/isNotNull";

const classNames = {
  container: css`
    display: flex;
    gap: ${theme.spacing["4px"]};
  `,
  separator: css`
    color: ${theme.palette.faint};
    font-weight: bold;
  `,
};

export interface InlineListProps {
  children: React.ReactNode;
}

export default function InlineList({ children }: InlineListProps) {
  return (
    <div className={cx(classNames.container)}>
      {React.Children.toArray(children).reduce<React.ReactNode[]>(
        (agg, curr, i) =>
          [
            ...agg,
            i > 0 ? (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`sep-${i}`} className={cx(classNames.separator)}>
                •
              </div>
            ) : null,
            curr,
          ].filter(isNotNull),
        []
      )}
    </div>
  );
}
