import React from "react";
import BarLoader from "react-spinners/BarLoader";
import theme from "../../theme";

export default function Loader() {
  return <BarLoader color={theme.palette.primary} />;
}
