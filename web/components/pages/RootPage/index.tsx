import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { getGroupLandingPagePath } from "../../../utils/paths";
import Loader from "../../core/Loader";
import CenterLayout from "../../layouts/CenterLayout";
import useCurrentUsersGroups from "./hooks/useCurrentUsersGroups";

export default function RootPage() {
  const { groups, fetching } = useCurrentUsersGroups();
  const navigate = useNavigate();

  useEffect(() => {
    const [firstGroup] = groups;

    if (!fetching && firstGroup) {
      navigate(getGroupLandingPagePath(firstGroup), { replace: true });
    }
  }, [fetching, groups, navigate]);

  if (fetching) {
    return (
      <CenterLayout>
        <Loader />
      </CenterLayout>
    );
  }

  if (groups.length === 0) {
    return <CenterLayout>No groups</CenterLayout>;
  }

  return null;
}
