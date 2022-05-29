import React from "react";
import { ComponentMeta } from "@storybook/react";
import Gallery from "..";

export default {
  title: "Gallery",
  component: Gallery,
} as ComponentMeta<typeof Gallery>;

export function Default() {
  return (
    <Gallery
      uploads={[
        {
          id: "1",
          uploadedBy: { id: "1", username: "Xapphire13" },
          url: "https://picsum.photos/seed/1/450",
        },
        {
          id: "2",
          uploadedBy: { id: "1", username: "Xapphire13" },
          url: "https://picsum.photos/seed/2/450",
        },
      ]}
    />
  );
}
