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
      uploads={new Array(10).fill(null).map((_, i) => ({
        id: String(i),
        uploadedBy: { id: "1", username: "Xapphire13" },
        url: `https://picsum.photos/seed/${i + 1}/450`,
      }))}
    />
  );
}
