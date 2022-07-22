import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const { value } = useLocalStorage("favorites");

  useEffect(() => {
    setFavorites(value.split(","));
  }, [value]);

  return favorites;
}
