import React, { useContext, useEffect } from "react";
import {
  matchRoutes,
  Route,
  Routes as ReactRoutes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import InvitePage from "./components/pages/InvitePage";
import LandingPage from "./components/pages/LandingPage";
import LoginPage from "./components/pages/LoginPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import PostPhotoPage from "./components/pages/PostPhotoPage";
import ProfilePage from "./components/pages/ProfilePage";
import RootPage from "./components/pages/RootPage";
import SubmitChallengePage from "./components/pages/SubmitChallengePage";
import {
  GROUP_LANDING_PAGE,
  INVITATION_PAGE,
  LOGIN_PAGE,
  POST_PHOTO_PAGE,
  PROFILE_PAGE,
  ROOT,
  SUBMIT_CHALLENGE_PAGE,
} from "./utils/paths";
import { UserContext } from "./contexts/UserContextProvider";
import useFeature from "./hooks/useFeature";

const LOGGED_OUT_ONLY_ROUTES = [LOGIN_PAGE, INVITATION_PAGE];

export default function Routes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedIn } = useContext(UserContext);
  const [enablePostPhotoPage] = useFeature("post-photo-page");
  const [enableProfilePage] = useFeature("profile-page");

  useEffect(() => {
    const loggedOutOnlyMatches = matchRoutes(
      LOGGED_OUT_ONLY_ROUTES.map((it) => ({
        path: it,
      })),
      location
    );

    if (loggedOutOnlyMatches) {
      if (loggedIn) {
        navigate("/", { replace: true });
      }

      return;
    }

    if (!loggedIn) {
      navigate(
        `/login?redir=${encodeURIComponent(
          location.pathname + location.search
        )}`,
        { replace: true }
      );
    }
  }, [location, loggedIn, navigate]);

  return (
    <ReactRoutes>
      <Route path={ROOT} element={<RootPage />} />
      <Route path={LOGIN_PAGE} element={<LoginPage />} />
      <Route path={GROUP_LANDING_PAGE} element={<LandingPage />} />
      <Route path={SUBMIT_CHALLENGE_PAGE} element={<SubmitChallengePage />} />
      <Route path={INVITATION_PAGE} element={<InvitePage />} />
      {enableProfilePage && (
        <Route path={PROFILE_PAGE} element={<ProfilePage />} />
      )}
      {enablePostPhotoPage && (
        <Route path={POST_PHOTO_PAGE} element={<PostPhotoPage />} />
      )}
      <Route path="*" element={<NotFoundPage />} />
    </ReactRoutes>
  );
}
