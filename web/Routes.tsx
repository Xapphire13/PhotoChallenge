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
import ProfilePage from "./components/pages/ProfilePage";
import SubmitChallengePage from "./components/pages/SubmitChallengePage";
import { ENABLE_PROFILE_PAGE } from "./constants/features";
import {
  INVITATION_PAGE,
  LOGIN_PAGE,
  PROFILE_PAGE,
  ROOT,
  SUBMIT_CHALLENGE_PAGE,
} from "./constants/paths";
import { UserContext } from "./contexts/UserContextProvider";

const LOGGED_OUT_ONLY_ROUTES = [LOGIN_PAGE, INVITATION_PAGE];

export default function Routes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedIn } = useContext(UserContext);

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
      <Route path={ROOT} element={<LandingPage />} />
      <Route path={LOGIN_PAGE} element={<LoginPage />} />
      <Route path={SUBMIT_CHALLENGE_PAGE} element={<SubmitChallengePage />} />
      <Route path={INVITATION_PAGE} element={<InvitePage />} />
      {ENABLE_PROFILE_PAGE && (
        <Route path={PROFILE_PAGE} element={<ProfilePage />} />
      )}
      <Route path="*" element={<NotFoundPage />} />
    </ReactRoutes>
  );
}