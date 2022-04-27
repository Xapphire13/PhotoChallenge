import { css, cx } from "@linaria/core";
import React from "react";
import theme from "../../../theme";
import { TabBarButtonProps } from "./parts/TabBarButton";

const classNames = {
  container: css`
    display: flex;
    justify-content: space-between;
    background-color: ${theme.palette.background1};
    border-top: 1px solid ${theme.palette.faint};
  `,
};

export interface TabBarProps {
  activeIndex: number;
  onIndexChange: (index: number) => void;
  children: React.ReactElement<TabBarButtonProps>[];
}

export default function TabBar({
  children,
  activeIndex,
  onIndexChange,
}: TabBarProps) {
  return (
    <div className={cx(classNames.container)}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isActive: index === activeIndex,
          onClick: (ev: React.MouseEvent<Element, MouseEvent>) => {
            onIndexChange(index);
            child.props.onClick?.(ev);
          },
        })
      )}
    </div>
  );
}
