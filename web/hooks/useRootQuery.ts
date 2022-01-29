import { useContext } from "react";
import { RootQueryContext } from "../contexts/RootQueryProvider";

export default function useRootQuery<T = unknown>() {
  const { data, error, fetching } = useContext(RootQueryContext);

  return { data: data as T, error, fetching };
}
