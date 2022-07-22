import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useFavorite(id: number | string) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { includes, append, filter, value } = useLocalStorage("favorites");

  function setFavorite() {
    const idstr = id.toString();
    append(idstr);
  }

  function removeFavorite() {
    const idstr = id.toString();
    filter(idstr);
  }

  useEffect(() => {
    const idstr = id.toString();
    const is = includes(idstr);
    setIsFavorite(is);
  }, [id, includes, value]);

  return { setFavorite, removeFavorite, isFavorite };
}
