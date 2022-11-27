import { ComponentMeta } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router";
import NavBar from "..";
import MockFeatureProvider from "../../../test/MockFeatureProvider";
import MockUserProvider from "../../../test/MockUserProvider";

export default {
  component: NavBar,

  decorators: [
    (Story) => (
      <MemoryRouter>
        <MockUserProvider>
          <Story />
        </MockUserProvider>
      </MemoryRouter>
    ),
  ],

  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof NavBar>;

export function Default() {
  return <NavBar />;
}

export function WithGroups() {
  return (
    <MockFeatureProvider features={["groups"]}>
      <NavBar />
    </MockFeatureProvider>
  );
}

export function WithProfilePage() {
  return (
    <MockFeatureProvider features={["profile-page"]}>
      <NavBar />
    </MockFeatureProvider>
  );
}

export function WithGroupsAndProfilePage() {
  return (
    <MockFeatureProvider features={["groups", "profile-page"]}>
      <NavBar />
    </MockFeatureProvider>
  );
}
