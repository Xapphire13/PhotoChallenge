import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = Boolean(localStorage.getItem("logged-in"));
    if (!loggedIn) {
      navigate("/login");
    }
  }, []);

  return <div>Home</div>;
}
