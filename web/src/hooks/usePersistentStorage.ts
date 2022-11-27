import { useState } from "react";

export default function usePersistentStorage<TData>(key: string) {
  const [jsonValue, setJsonValue] = useState(localStorage.getItem(key));

  const set = (newValue: TData | undefined) => {
    if (!newValue) {
      localStorage.removeItem(key);
    } else {
      const newJsonValue = JSON.stringify(newValue);
      localStorage.setItem(key, newJsonValue);
      setJsonValue(newJsonValue);
    }
  };

  const value: TData | undefined = jsonValue && JSON.parse(jsonValue);

  return [value, set] as const;
}
