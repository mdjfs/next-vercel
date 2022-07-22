import { useEffect, useState } from "react";

export function useLocalStorage(key: string) {
  const [value, setValue] = useState<string>("");

  function append(content: string) {
    const array = value.split(",");
    array.push(content);
    set(array.join(","));
  }

  function filter(content: string) {
    const array = value.split(",").filter((v) => v != content);
    set(array.join(","));
  }

  function clear() {
    localStorage.removeItem(key);
    setValue("");
  }

  function set(value: string) {
    if (value) setValue(value);
    else clear();
  }

  function includes(content: string) {
    return value.split(",").includes(content);
  }

  useEffect(() => {
    if (value) {
      localStorage.setItem(key, value);
    }
  }, [value, key]);

  useEffect(() => {
    const content = localStorage.getItem(key);
    if (content) setValue(content);
  }, [key]);

  return { append, clear, set, includes, filter, value };
}
