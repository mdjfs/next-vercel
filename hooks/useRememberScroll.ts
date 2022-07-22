import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useRememberScroll(page: string) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { value, set } = useLocalStorage(`remember-scroll-${page}`);

  useEffect(() => {
    if (value && !scrolled) {
      setTimeout(() => {
        window.scrollTo({ top: parseFloat(value) });
        setScrolled(true);
      }, 0);
    }
  }, [value, scrolled]);

  useEffect(() => {
    const listenScroll = () => {
      set(window.scrollY.toString());
    };
    window.addEventListener("scroll", listenScroll);
    return () => {
      window.removeEventListener("scroll", listenScroll);
    };
  }, [set]);
}
