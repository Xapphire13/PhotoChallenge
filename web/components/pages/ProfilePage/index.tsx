import React from "react";
import Footer from "../../footer";
import CenterLayout from "../../layouts/CenterLayout";
import ColumnLayout from "../../layouts/ColumnLayout";
import FooterLayout from "../../layouts/FooterLayout";
import NavBarLayout from "../../layouts/NavBarLayout";
import NavBar from "../../NavBar";

export default function ProfilePage() {
  return (
    <NavBarLayout>
      <NavBar />

      <FooterLayout>
        <CenterLayout>
          <ColumnLayout>Profile</ColumnLayout>
        </CenterLayout>

        <Footer />
      </FooterLayout>
    </NavBarLayout>
  );
}
