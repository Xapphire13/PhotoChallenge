import { useContext } from "react";
import { RootQueryContext } from "../contexts/RootQueryProvider";

export default function useRootQuery() {
  const { data, error, fetching } = useContext(RootQueryContext);

  return { data, error, fetching };
}
