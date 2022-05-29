import React from "react";
import { ComponentMeta } from "@storybook/react";
import GalleryCard from "../GalleryCard";

export default {
  component: GalleryCard,
} as ComponentMeta<typeof GalleryCard>;

export function Default() {
  return (
    <GalleryCard
      src="https://picsum.photos/seed/1/450"
      uploadedBy={{ id: "1", username: "Xapphire13" }}
    />
  );
}
