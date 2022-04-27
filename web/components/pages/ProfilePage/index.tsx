import React from "react";
import CenterLayout from "../../layouts/CenterLayout";
import ColumnLayout from "../../layouts/ColumnLayout";
import MainMenuLayout from "../../layouts/MainMenuLayout";
import NavBarLayout from "../../layouts/NavBarLayout";
import NavBar from "../../NavBar";

export default function ProfilePage() {
  return (
    <NavBarLayout>
      <NavBar />

      <MainMenuLayout>
        <CenterLayout>
          <ColumnLayout>Profile</ColumnLayout>
        </CenterLayout>
      </MainMenuLayout>
    </NavBarLayout>
  );
}
