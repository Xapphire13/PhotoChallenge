import { ComponentMeta } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router";
import NavBar from "..";

export default {
  component: NavBar,

  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
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
