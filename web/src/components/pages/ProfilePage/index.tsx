import React from "react";
import CenterLayout from "../../layouts/CenterLayout";
import ColumnLayout from "../../layouts/ColumnLayout";
import MainMenuLayout from "../../layouts/MainMenuLayout";
import NavBarLayout from "../../layouts/NavBarLayout";

export default function ProfilePage() {
  return (
    <NavBarLayout>
      <MainMenuLayout>
        <CenterLayout>
          <ColumnLayout>Profile</ColumnLayout>
        </CenterLayout>
      </MainMenuLayout>
    </NavBarLayout>
  );
}
