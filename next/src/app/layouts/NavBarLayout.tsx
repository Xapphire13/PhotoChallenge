import React from "react";
import NavBar from "../NavBar";
import StaticHeaderLayout from "./StaticHeaderLayout";

export interface NavBarLayoutProps {
  children: React.ReactNode;
}

export default function NavBarLayout({ children }: NavBarLayoutProps) {
  return (
    <StaticHeaderLayout>
      <NavBar />
      {children}
    </StaticHeaderLayout>
  );
}
