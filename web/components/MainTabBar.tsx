import React, { useEffect, useState } from "react";
import { Home, Camera, Edit } from "react-feather";
import { useLocation, useNavigate } from "react-router";
import { ENABLE_POST_PHOTO_PAGE } from "../constants/features";
import { ROOT, SUBMIT_CHALLENGE_PAGE } from "../constants/paths";
import isNotNull from "../utils/isNotNull";
import TabBar from "./core/TabBar";
import TabBarButton from "./core/TabBar/parts/TabBarButton";

const TABS = [
  { name: "Home", icon: Home, path: ROOT },
  ENABLE_POST_PHOTO_PAGE
    ? { name: "Post photo", icon: Camera, path: "/TODO" }
    : null,
  { name: "Submit challenge", icon: Edit, path: SUBMIT_CHALLENGE_PAGE },
].filter(isNotNull);

export default function MainTabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [index, setIndex] = useState(
    TABS.findIndex(({ path }) => location.pathname === path)
  );

  useEffect(() => {
    const newTab = TABS[index];

    if (newTab && location.pathname !== newTab.path) {
      navigate(newTab.path);
    }
  }, [index, location.pathname, navigate]);

  return (
    <TabBar activeIndex={index} onIndexChange={setIndex}>
      {TABS.map(({ name, icon, path }) => (
        <TabBarButton key={path} label={name} icon={icon} />
      ))}
    </TabBar>
  );
}
