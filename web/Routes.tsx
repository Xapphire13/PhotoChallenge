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
import SubmitChallengePage from "./components/pages/SubmitChallengePage";
import { INVITATION, LOGIN, ROOT, SUBMIT_CHALLENGE } from "./constants/paths";
import { UserContext } from "./contexts/UserContextProvider";

const LOGGED_OUT_ONLY_ROUTES = [LOGIN, INVITATION];

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
      <Route path={LOGIN} element={<LoginPage />} />
      <Route path={SUBMIT_CHALLENGE} element={<SubmitChallengePage />} />
      <Route path={INVITATION} element={<InvitePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </ReactRoutes>
  );
}
