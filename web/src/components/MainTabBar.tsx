import React, { useEffect, useMemo, useState } from "react";
import { Home, Camera, Edit } from "react-feather";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  getGroupLandingPagePath,
  getPostPhotoPagePath,
  getSubmitChallengePathPage,
} from "../utils/paths";
import useFeature from "../hooks/useFeature";
import isNotNull from "../utils/isNotNull";
import TabBar from "./core/TabBar";
import TabBarButton from "./core/TabBar/parts/TabBarButton";

function getTabs(groupId: string, enablePostPhotoPage: boolean) {
  return [
    { name: "Home", icon: Home, path: getGroupLandingPagePath(groupId) },
    enablePostPhotoPage
      ? {
          name: "Post photo",
          icon: Camera,
          path: getPostPhotoPagePath(groupId),
        }
      : null,
    {
      name: "Submit challenge",
      icon: Edit,
      path: getSubmitChallengePathPage(groupId),
    },
  ].filter(isNotNull);
}

export default function MainTabBar() {
  const navigate = useNavigate();
  const { groupId = "" } = useParams();
  const location = useLocation();
  const [enablePostPhotoPage] = useFeature("post-photo-page");
  const tabs = useMemo(
    () => getTabs(groupId, enablePostPhotoPage),
    [enablePostPhotoPage, groupId]
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
