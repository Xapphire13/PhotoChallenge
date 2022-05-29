import React, { useEffect, useMemo, useState } from "react";
import { Home, Camera, Edit } from "react-feather";
import { useLocation, useNavigate } from "react-router";
import {
  POST_PHOTO_PAGE,
  ROOT,
  SUBMIT_CHALLENGE_PAGE,
} from "../constants/paths";
import useFeature from "../hooks/useFeature";
import isNotNull from "../utils/isNotNull";
import TabBar from "./core/TabBar";
import TabBarButton from "./core/TabBar/parts/TabBarButton";

function getTabs(enablePostPhotoPage: boolean) {
  return [
    { name: "Home", icon: Home, path: ROOT },
    enablePostPhotoPage
      ? { name: "Post photo", icon: Camera, path: POST_PHOTO_PAGE }
      : null,
    { name: "Submit challenge", icon: Edit, path: SUBMIT_CHALLENGE_PAGE },
  ].filter(isNotNull);
}

export default function MainTabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [enablePostPhotoPage] = useFeature("post-photo-page");
  const tabs = useMemo(
    () => getTabs(enablePostPhotoPage),
    [enablePostPhotoPage]
  );
  const [index, setIndex] = useState(
    tabs.findIndex(({ path }) => location.pathname === path)
  );

  useEffect(() => {
    const newTab = tabs[index];

    if (newTab && location.pathname !== newTab.path) {
      navigate(newTab.path);
    }
  }, [index, location.pathname, navigate, tabs]);

  return (
    <TabBar activeIndex={index} onIndexChange={setIndex}>
      {tabs.map(({ name, icon, path }) => (
        <TabBarButton key={path} label={name} icon={icon} />
      ))}
    </TabBar>
  );
}
