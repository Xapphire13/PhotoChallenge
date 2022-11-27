import { useContext } from "react";
import { FeatureProviderContext } from "../contexts/FeatureProvider";

export type Feature = "groups" | "post-photo-page" | "profile-page";

export default function useFeature(featureId: Feature) {
  const featureProviderContext = useContext(FeatureProviderContext);

  return [
    featureProviderContext.features.includes(featureId),
    featureProviderContext.loading,
  ] as const;
}
